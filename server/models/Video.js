const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    default: 'default-user' // For demo purposes
  },
  teamId: {
    type: String,
    default: 'default-team' // For demo purposes
  },
  prompt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['queued', 'running', 'completed', 'failed', 'SUCCEEDED', 'FAILED', 'PENDING', 'RUNNING', 'THROTTLED', 'CANCELLED'],
    default: 'queued'
  },
  runwayJobId: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  videoUrls: [{
    type: String
  }],
  duration: {
    type: Number,
    default: 5
  },
  aspectRatio: {
    type: String,
    default: '16:9'
  },
  model: {
    type: String,
    default: 'gen4_turbo'
  },
  progress: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  metadata: {
    type: Object,
    default: {}
  },
  errorMessage: {
    type: String,
    default: ''
  },
  failureCode: {
    type: String,
    default: ''
  },
  completedAt: {
    type: Date,
    default: null
  },
  videoEdits: {
    type: Object,
    default: null
  }
}, {
  timestamps: true
});

// Auto-generate title from prompt if not provided
videoSchema.pre('save', function(next) {
  if (!this.title && this.prompt) {
    this.title = this.prompt.split(' ').slice(0, 5).join(' ') + '...';
  }
  next();
});

module.exports = mongoose.model('Video', videoSchema);
