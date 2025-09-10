const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    
    if (!this.apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      throw new Error('GEMINI_API_KEY is required');
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log('Gemini service initialized successfully');
  }

  // Analyze user input to determine intent and enhance prompts
  async analyzeUserIntent(userMessage, chatHistory = []) {
    try {
      const systemPrompt = `You are an AI assistant specialized in video generation and enhancement. Your job is to:

1. Analyze user messages to understand their intent
2. Determine if they want to create a new video or enhance an existing one
3. Enhance and improve video generation prompts for better results
4. Provide context-aware responses

Available video models: Runway Gen-4 Turbo, Runway Gen-3, Veo3

Respond with a JSON object containing:
{
  "intent": "new_video" | "enhance_video" | "conversation",
  "enhanced_prompt": "improved prompt for video generation",
  "model_suggestion": "recommended model",
  "response": "friendly response to user",
  "confidence": 0.0-1.0
}

Chat history context: ${JSON.stringify(chatHistory.slice(-5))}

User message: "${userMessage}"`;

      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse Gemini JSON response:', parseError);
      }
      
      // Fallback response if JSON parsing fails
      return {
        intent: "new_video",
        enhanced_prompt: userMessage,
        model_suggestion: "Runway Gen-4 Turbo",
        response: "I'll help you create that video!",
        confidence: 0.7
      };
      
    } catch (error) {
      console.error('Error analyzing user intent with Gemini:', error);
      return {
        intent: "new_video",
        enhanced_prompt: userMessage,
        model_suggestion: "Runway Gen-4 Turbo",
        response: "I'll help you create that video!",
        confidence: 0.5
      };
    }
  }

  // Enhance a video prompt for better generation results
  async enhanceVideoPrompt(originalPrompt, context = {}) {
    try {
      const enhancementPrompt = `You are a video generation expert. Enhance this video prompt to get better, more detailed results from AI video generation models like Runway.

Original prompt: "${originalPrompt}"

Context: ${JSON.stringify(context)}

Enhance the prompt by:
1. Adding specific visual details (lighting, camera angles, style)
2. Adding artistic direction (mood, atmosphere, color palette)
3. Making it more descriptive and cinematic

Do NOT include video resolution/quality, duration, or aspect ratio in the enhanced prompt. Those will be provided separately by the user.

Respond with just the enhanced prompt, nothing else.`;

      const result = await this.model.generateContent(enhancementPrompt);
      const response = await result.response;
      return response.text().trim();
      
    } catch (error) {
      console.error('Error enhancing prompt with Gemini:', error);
      return originalPrompt; // Return original if enhancement fails
    }
  }

  // Generate a conversational response
  async generateResponse(userMessage, chatHistory = [], videoContext = null) {
    try {
      const contextInfo = videoContext ? 
        `Current video context: ${JSON.stringify(videoContext)}` : 
        'No current video context';
      
      const systemPrompt = `You are a friendly AI assistant for a video generation platform. You help users create and enhance videos through natural conversation.

${contextInfo}

Recent chat history: ${JSON.stringify(chatHistory.slice(-3))}

User message: "${userMessage}"

Respond naturally and helpfully. If they're asking about video generation, be encouraging and offer suggestions. If they want to enhance a video, acknowledge what they want to improve. Keep responses concise but friendly.`;

      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text().trim();
      
    } catch (error) {
      console.error('Error generating response with Gemini:', error);
      return "I'm here to help you create amazing videos! What would you like to make?";
    }
  }

  // Determine if a message is asking for video enhancement
  async isEnhancementRequest(userMessage, chatHistory = []) {
    try {
      const analysisPrompt = `Analyze this user message to determine if they want to enhance or modify an existing video.

User message: "${userMessage}"
Chat history: ${JSON.stringify(chatHistory.slice(-3))}

Look for keywords and context that suggest enhancement:
- Direct enhancement words: enhance, improve, modify, change, add, remove, make it, make the
- Comparative words: better, more, less, brighter, darker, faster, slower
- Modification words: update, edit, adjust, fix

Respond with just "true" or "false".`;

      const result = await this.model.generateContent(analysisPrompt);
      const response = await result.response;
      const text = response.text().trim().toLowerCase();
      
      return text.includes('true');
      
    } catch (error) {
      console.error('Error analyzing enhancement request:', error);
      // Fallback to keyword detection
      const enhancementKeywords = [
        'enhance', 'improve', 'modify', 'change', 'add', 'remove', 'make it', 
        'make the', 'update', 'edit', 'adjust', 'fix', 'better', 'more',
        'less', 'brighter', 'darker', 'faster', 'slower', 'longer', 'shorter'
      ];
      
      const lowerMessage = userMessage.toLowerCase();
      return enhancementKeywords.some(keyword => lowerMessage.includes(keyword));
    }
  }
}

module.exports = new GeminiService();
