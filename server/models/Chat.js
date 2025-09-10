const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  docType: {
    type: String,
    default: 'chat',
    index: true,
  },
  // Stable identifier for a chat thread, independent of video
  threadId: {
    type: String,
    required: true,
    unique: true,
  },
  // Human-friendly name for the chat (first user prompt snippet)
  title: {
    type: String,
  },
  // Optional link to a generated video (by business videoId string)
  videoId: {
    type: String,
  },
  messages: [{
    id: {
      type: String,
      required: true,
    },
    user: {
      id: { type: String },
      email: { type: String },
    },
    type: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // For AI messages containing video info
    originalPrompt: {
      type: String,
    },
    enhancedPrompt: {
      type: String,
    },
    videoId: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    },
    intent: {
      type: String,
    },
    confidence: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  user: {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  companyId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Store all AI-VideoGen docs inside a single collection if requested
// e.g., COLLECTION_PREFIX=solution_aivideo → collection "solution_aivideo"
// Fallback to "chats" when no prefix provided
const collectionName = process.env.COLLECTION_PREFIX 
  ? `${process.env.COLLECTION_PREFIX}` 
  : 'chats';

module.exports = mongoose.models.Chat || mongoose.model('Chat', ChatSchema, collectionName);
