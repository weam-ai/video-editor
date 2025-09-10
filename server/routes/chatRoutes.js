const express = require('express');
const router = express.Router();
const { requireWeamAuth } = require('../middleware/weamSession');
const geminiService = require('../services/geminiService');
const runwayService = require('../services/runwayService');
const Video = require('../models/Video');
const Chat = require('../models/Chat');
const { v4: uuidv4 } = require('uuid');

// POST /api/chat - Intelligent chat endpoint with Gemini (thread-aware)
router.post('/', requireWeamAuth, async (req, res) => {
  try {
    const { message, chatHistory = [], currentVideo = null, quality, duration, aspectRatio, model, threadId: clientThreadId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Processing chat message with Gemini:', message);

    // Use Gemini to analyze user intent and enhance the prompt
    const analysis = await geminiService.analyzeUserIntent(message, chatHistory);
    
    console.log('Gemini analysis:', analysis);

    let response = {
      type: 'conversation',
      content: analysis.response,
      timestamp: new Date(),
      intent: analysis.intent,
      confidence: analysis.confidence
    };

    // Ensure a thread exists and persist the user message
    const { v4: uuidv4Local } = require('uuid');
    const threadId = clientThreadId || uuidv4Local();
    let chatThread = await Chat.findOne({ threadId, 'user.id': req.user._id });
    if (!chatThread) {
      chatThread = new Chat({
        threadId,
        user: { id: req.user._id, email: req.user.email },
        companyId: req.user.companyId,
        title: message.slice(0, 80),
        messages: []
      });
    }

    const userMessageRecord = {
      id: uuidv4Local(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      user: { id: req.user._id, email: req.user.email }
    };
    chatThread.messages.push(userMessageRecord);

    // If the intent is to create or enhance a video
    if (analysis.intent === 'new_video' || analysis.intent === 'enhance_video') {
      try {
        // Enhance the prompt using Gemini
        const enhancedPrompt = await geminiService.enhanceVideoPrompt(
          analysis.enhanced_prompt,
          { 
            originalMessage: message,
            chatHistory: chatHistory.slice(-3),
            currentVideo: currentVideo
          }
        );

        console.log('Enhanced prompt:', enhancedPrompt);

        // Map incoming UI selection or Gemini suggestion to provider/model
        const uiModel = model || analysis.model_suggestion || 'Runway Gen-4 Turbo';
        const modelMap = {
          'Runway Gen-4 Turbo': { provider: 'runway', model: 'gen4_turbo' },
          'Veo3': { provider: 'runway', model: 'veo3' },
          'Banana': { provider: 'banana', model: 'banana' }
        };
        const resolved = modelMap[uiModel] || modelMap['Runway Gen-4 Turbo'];

        // Create video generation job with selected provider
        const finalDuration = Number.isFinite(parseInt(duration)) ? parseInt(duration) : 5;
        const finalAspect = typeof aspectRatio === 'string' && aspectRatio.includes(':') ? aspectRatio : '16:9';
        let runwayResponse = null;
        if (resolved.provider === 'runway') {
          runwayResponse = await runwayService.createVideoGeneration(
            enhancedPrompt,
            finalDuration,
            finalAspect,
            resolved.model
          );
        } else if (resolved.provider === 'banana') {
          // Placeholder until Banana integration exists
          throw new Error('Banana provider is not configured yet. Please add integration.');
        }

        console.log('Runway API response:', runwayResponse);

        // Create video record in database
        const video = new Video({
          videoId: uuidv4(),
          prompt: enhancedPrompt,
          duration: finalDuration,
          aspectRatio: finalAspect,
          quality: quality || '1080p',
          model: resolved.model,
          runwayJobId: runwayResponse.id,
          status: 'PENDING',
          user: {
            id: req.user._id,
            email: req.user.email
          },
          companyId: req.user.companyId,
          metadata: {
            geminiAnalysis: analysis,
            enhancedPrompt: enhancedPrompt,
            originalMessage: message,
            chatContext: chatHistory.slice(-3)
          }
        });

        await video.save();

        // Update response to include video generation info
        response = {
          type: analysis.intent === 'enhance_video' ? 'video_enhancement' : 'video_generation',
          content: analysis.intent === 'enhance_video' ? 
            'I\'m enhancing your video with your requested changes...' : 
            'I\'m creating your video with an enhanced prompt...',
          timestamp: new Date(),
          videoId: video.videoId,
          status: 'generating',
          enhancedPrompt: enhancedPrompt,
          originalPrompt: message,
          model: uiModel,
          intent: analysis.intent,
          confidence: analysis.confidence,
          threadId
        };

        // Persist AI message into the thread
        chatThread.videoId = video.videoId;
        chatThread.messages.push({
          id: video.videoId,
          type: 'ai',
          content: response.content,
          originalPrompt: message,
          enhancedPrompt,
          videoId: video.videoId,
          status: 'processing',
          timestamp: new Date(),
          intent: analysis.intent,
          confidence: analysis.confidence
        });

        await chatThread.save();

        // Start background polling for video completion
        runwayService.pollJobStatus(video.videoId).catch(error => {
          console.error('Background polling error:', error);
        });

      } catch (videoError) {
        console.error('Error generating video:', videoError);
        
        // Generate a helpful error response using Gemini
        const errorResponse = await geminiService.generateResponse(
          `I tried to create a video but encountered an error: ${videoError.message}. Please help me respond to the user.`,
          chatHistory
        );

        response = {
          type: 'error',
          content: errorResponse,
          timestamp: new Date(),
          error: videoError.message,
          intent: analysis.intent,
          threadId
        };

        chatThread.messages.push({
          id: uuidv4Local(),
          type: 'ai',
          content: errorResponse,
          timestamp: new Date()
        });
        await chatThread.save();
      }
    }

    // Persist general conversation replies as well
    if (!response.videoId) {
      chatThread.messages.push({
        id: uuidv4Local(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        intent: response.intent,
        confidence: response.confidence
      });
      await chatThread.save();
    }

    // Return threadId so client can persist
    res.json({ ...response, threadId });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

// GET /api/chat/video/:videoId/status - Get video status for chat
router.get('/video/:videoId/status', requireWeamAuth, async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const video = await Video.findOne({ 
      videoId,
      'user.id': req.user._id // Ensure user can only access their own videos
    });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      videoId: video.videoId,
      status: video.status === 'SUCCEEDED' ? 'completed' : 
              video.status === 'FAILED' ? 'failed' : 
              video.status === 'CANCELLED' ? 'cancelled' : 'generating',
      videoUrl: video.videoUrl,
      progress: video.progress,
      errorMessage: video.errorMessage,
      enhancedPrompt: video.prompt,
      originalPrompt: video.originalPrompt,
      model: video.model
    });

  } catch (error) {
    console.error('Error getting video status:', error);
    res.status(500).json({ error: 'Failed to get video status' });
  }
});

module.exports = router;
 
// Additional thread endpoints
// GET /api/chat/threads - list user's chat threads (most recent first)
router.get('/threads', requireWeamAuth, async (req, res) => {
  try {
    const threads = await Chat.find({ 'user.id': req.user._id })
      .select('threadId title videoId updatedAt messages')
      .sort({ updatedAt: -1 })
      .limit(50);
    res.json({ threads });
  } catch (e) {
    console.error('Error listing threads:', e);
    res.status(500).json({ error: 'Failed to list threads' });
  }
});

// GET /api/chat/threads/:threadId - get a thread with messages
router.get('/threads/:threadId', requireWeamAuth, async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Chat.findOne({ threadId, 'user.id': req.user._id });
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json(thread);
  } catch (e) {
    console.error('Error fetching thread:', e);
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
});

// POST /api/chat/threads - create a new empty thread
router.post('/threads', requireWeamAuth, async (req, res) => {
  try {
    const { v4: uuidv4Local } = require('uuid');
    const threadId = uuidv4Local();
    const chatThread = new Chat({
      threadId,
      user: { id: req.user._id, email: req.user.email },
      companyId: req.user.companyId,
      title: (req.body && req.body.title) ? String(req.body.title).slice(0, 80) : 'New chat',
      messages: []
    });
    await chatThread.save();
    res.status(201).json({ threadId, thread: { threadId, title: chatThread.title, updatedAt: chatThread.updatedAt } });
  } catch (e) {
    console.error('Error creating thread:', e);
    res.status(500).json({ error: 'Failed to create thread' });
  }
});
