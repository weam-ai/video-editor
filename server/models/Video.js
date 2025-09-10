const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  docType: {
    type: String,
    default: 'video',
    index: true,
  },
  videoId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  prompt: {
    type: String,
    required: true,
  },
  enhancedPrompt: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED'],
    default: 'PENDING',
  },
  runwayJobId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
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
  isPublic: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  // History of edits performed on this video
  videoEdits: [
    {
      editId: {
        type: String,
        required: true,
      },
      type: {
        type: String, // e.g., "trim", "crop", "music", "composite"
        default: 'composite',
      },
      params: {
        type: mongoose.Schema.Types.Mixed, // stores trimStart, trimEnd, segments, crop, music, etc.
        default: {},
      },
      status: {
        type: String,
        enum: ['processing', 'completed', 'failed'],
        default: 'processing',
      },
      outputUrl: {
        type: String, // URL to the edited video if completed
      },
      errorMessage: {
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // For traceability from chats
  createdBy: {
    id: { type: String },
    email: { type: String },
  },
});

VideoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Store all AI-VideoGen docs inside a single collection if requested
// e.g., COLLECTION_PREFIX=solution_aivideo → collection "solution_aivideo"
// Fallback to "videos" when no prefix provided
const collectionName = process.env.COLLECTION_PREFIX 
  ? `${process.env.COLLECTION_PREFIX}` 
  : 'videos';

module.exports = mongoose.models.Video || mongoose.model('Video', VideoSchema, collectionName);