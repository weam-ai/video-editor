import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideo } from '../context/VideoContext';
import { 
  Play, 
  Download, 
  RefreshCw, 
  Settings, 
  AlertCircle,
  Sparkles,
  Wand2,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Copy,
  Share2
} from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import AdvancedOptions from './AdvancedOptions';

const VideoGenerator = () => {
  const { generateVideo, currentVideo, loading, error, clearError } = useVideo();
  const [prompt, setPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState({
    duration: 5,
    aspectRatio: '16:9'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      await generateVideo(prompt, advancedOptions.duration, advancedOptions.aspectRatio);
      setPrompt('');
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  const handleDownload = () => {
    if (currentVideo?.videoUrl) {
      const link = document.createElement('a');
      link.href = currentVideo.videoUrl;
      link.download = `video-${currentVideo.videoId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyPrompt = () => {
    if (currentVideo?.prompt) {
      navigator.clipboard.writeText(currentVideo.prompt);
    }
  };

  const getStatusConfig = () => {
    if (!currentVideo) return null;
    
    switch (currentVideo.status) {
      case 'queued':
        return {
          icon: Clock,
          message: 'Video generation queued...',
          color: 'text-warning-600',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200'
        };
      case 'running':
        return {
          icon: Loader2,
          message: 'Generating your video...',
          color: 'text-primary-600',
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          message: 'Video generation completed!',
          color: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200'
        };
      case 'failed':
        return {
          icon: XCircle,
          message: 'Video generation failed',
          color: 'text-error-600',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200'
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-full mb-6"
        >
          <Sparkles className="h-4 w-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">Powered by Runway Gen-4</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Create{' '}
          <span className="gradient-text">Stunning Videos</span>
          <br />
          with AI Magic
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Transform your ideas into professional videos using advanced AI. 
          Simply describe what you want to see, and watch it come to life.
        </p>
      </motion.div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-8"
          >
            <div className="bg-error-50 border border-error-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-error-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-error-800 font-semibold mb-1">Generation Failed</h3>
                  <p className="text-error-700">{error}</p>
                </div>
                <button
                  onClick={clearError}
                  className="text-error-500 hover:text-error-700 transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Video Prompt</h2>
                <p className="text-gray-600">Describe your vision in detail</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-3">
                  What would you like to create?
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your video idea in detail... (e.g., 'A cinematic aerial shot of a futuristic cityscape at sunset, with neon lights reflecting on wet streets, drone movement, 5 seconds, cinematic lighting')"
                  className="textarea-field min-h-[120px]"
                  disabled={loading}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    Be specific for better results
                  </p>
                  <span className="text-sm text-gray-400">
                    {prompt.length}/500
                  </span>
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Advanced Options</span>
                </button>
              </div>

              {/* Advanced Options */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AdvancedOptions
                      options={advancedOptions}
                      onChange={setAdvancedOptions}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate Button */}
              <motion.button
                type="submit"
                disabled={loading || !prompt.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating Video...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Play className="h-5 w-5" />
                    <span>Generate Video</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Current Video Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <AnimatePresence>
            {currentVideo && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="card p-6 sticky top-32"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Current Video</h3>
                  {statusConfig && (
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                      {statusConfig.icon === Loader2 ? (
                        <Loader2 className={`h-4 w-4 animate-spin ${statusConfig.color}`} />
                      ) : (
                        <statusConfig.icon className={`h-4 w-4 ${statusConfig.color}`} />
                      )}
                      <span className={`text-sm font-medium ${statusConfig.color}`}>
                        {statusConfig.message}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Prompt Display */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Prompt</h4>
                      <button
                        onClick={handleCopyPrompt}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy prompt"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {currentVideo.prompt}
                    </p>
                  </div>

                  {/* Video Display */}
                  {currentVideo.status === 'completed' && currentVideo.videoUrl && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <VideoPlayer videoUrl={currentVideo.videoUrl} />
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handleDownload}
                          className="flex-1 btn-primary py-2.5 text-sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                        <button
                          className="btn-secondary py-2.5 px-4"
                          title="Share video"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Status Placeholder */}
                  {currentVideo.status !== 'completed' && (
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        {statusConfig && (
                          <>
                            {statusConfig.icon === Loader2 ? (
                              <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto mb-3" />
                            ) : (
                              <statusConfig.icon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                            )}
                            <p className="text-sm text-gray-600">
                              {currentVideo.status === 'queued' && 'Waiting in queue...'}
                              {currentVideo.status === 'running' && 'Creating your video...'}
                              {currentVideo.status === 'failed' && 'Generation failed'}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
                    <p>ID: {currentVideo.videoId}</p>
                    <p>Created: {new Date(currentVideo.createdAt).toLocaleString()}</p>
                    <p>Duration: {currentVideo.duration}s • Aspect: {currentVideo.aspectRatio}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!currentVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Video Yet</h3>
              <p className="text-gray-600 text-sm">
                Generate your first video to see it here
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VideoGenerator;
