import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideo } from '../context/VideoContext';
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  RefreshCw, 
  Trash2, 
  Edit3,
  Check,
  X,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Grid3X3,
  List,
  Calendar,
  SortAsc,
  MoreVertical,
  Copy,
  Share2,
  Eye,
  Sparkles
} from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const VideoHistory = () => {
  const { 
    videos, 
    loading, 
    error, 
    fetchVideos, 
    updateVideoTitle, 
    regenerateVideo, 
    deleteVideo,
    clearError 
  } = useVideo();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingTitle, setEditingTitle] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'status'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchVideos(1, 50, statusFilter, searchTerm);
  }, [searchTerm, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(1, 50, statusFilter, searchTerm);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? '' : status);
  };

  const handleEditTitle = (video) => {
    setEditingTitle(video.videoId);
    setEditTitle(video.title || '');
  };

  const handleSaveTitle = async (videoId) => {
    try {
      await updateVideoTitle(videoId, editTitle);
      setEditingTitle(null);
      setEditTitle('');
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTitle(null);
    setEditTitle('');
  };

  const handleRegenerate = async (videoId) => {
    try {
      await regenerateVideo(videoId);
    } catch (error) {
      console.error('Error regenerating video:', error);
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(videoId);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const handleDownload = (video) => {
    if (video.videoUrl) {
      const link = document.createElement('a');
      link.href = video.videoUrl;
      link.download = `video-${video.videoId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'queued':
        return <Clock className="h-4 w-4 text-warning-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-primary-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-error-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'queued':
        return {
          color: 'text-warning-600',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200'
        };
      case 'running':
        return {
          color: 'text-primary-600',
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200'
        };
      case 'completed':
        return {
          color: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200'
        };
      case 'failed':
        return {
          color: 'text-error-600',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const sortedVideos = [...videos].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (loading && videos.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Video Library</h1>
              <p className="text-gray-600">Manage and explore all your generated videos</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-xl">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  {videos.length} Videos
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="bg-error-50 border border-error-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-error-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-error-800 font-semibold mb-1">Error Loading Videos</h3>
                    <p className="text-error-700">{error}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-error-500 hover:text-error-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search videos by prompt or title..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </form>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="status">By Status</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                  showFilters || statusFilter
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {statusFilter && (
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  {['queued', 'running', 'completed', 'failed'].map((status) => {
                    const config = getStatusConfig(status);
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusFilter(status)}
                        className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                          statusFilter === status
                            ? `${config.bgColor} ${config.color} ${config.borderColor} border`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getStatusIcon(status)}
                        <span className="capitalize">{status}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Videos Display */}
        {sortedVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter 
                ? 'Try adjusting your search or filters'
                : 'Start by creating your first video'
              }
            </p>
            {!searchTerm && !statusFilter && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Create Your First Video
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {sortedVideos.map((video, index) => (
              <motion.div
                key={video.videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={viewMode === 'grid' ? 'card-hover' : 'card'}
              >
                {viewMode === 'grid' ? (
                  <VideoCard video={video} />
                ) : (
                  <VideoListItem video={video} />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );

  // Video Card Component for Grid View
  function VideoCard({ video }) {
    const statusConfig = getStatusConfig(video.status);
    
    return (
      <div className="overflow-hidden">
        {/* Video Player */}
        {video.status === 'completed' && video.videoUrl ? (
          <div className="aspect-video">
            <VideoPlayer videoUrl={video.videoUrl} />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              {getStatusIcon(video.status)}
              <p className="text-sm text-gray-600 mt-2">
                {video.status === 'queued' && 'Queued for generation'}
                {video.status === 'running' && 'Generating video...'}
                {video.status === 'failed' && 'Generation failed'}
              </p>
            </div>
          </div>
        )}

        {/* Video Info */}
        <div className="p-6">
          {/* Title */}
          <div className="mb-3">
            {editingTitle === video.videoId ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveTitle(video.videoId)}
                  className="text-success-600 hover:text-success-700"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                  {video.title || 'Untitled Video'}
                </h3>
                <button
                  onClick={() => handleEditTitle(video)}
                  className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2 mb-3">
            {getStatusIcon(video.status)}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border`}>
              {video.status}
            </span>
          </div>

          {/* Prompt */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {video.prompt}
          </p>

          {/* Metadata */}
          <div className="text-xs text-gray-500 mb-4 space-y-1">
            <p>Duration: {video.duration}s • Aspect: {video.aspectRatio}</p>
            <p>Created: {new Date(video.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {video.status === 'completed' && video.videoUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDownload(video)}
                  className="text-success-600 hover:text-success-700"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRegenerate(video.videoId)}
                className="text-primary-600 hover:text-primary-700"
                title="Regenerate"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDelete(video.videoId)}
              className="text-error-600 hover:text-error-700"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Video List Item Component for List View
  function VideoListItem({ video }) {
    const statusConfig = getStatusConfig(video.status);
    
    return (
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Thumbnail */}
          <div className="w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
            {video.status === 'completed' && video.videoUrl ? (
              <div className="w-full h-full rounded-xl overflow-hidden">
                <VideoPlayer videoUrl={video.videoUrl} className="w-full h-full" />
              </div>
            ) : (
              <div className="text-center">
                {getStatusIcon(video.status)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                {editingTitle === video.videoId ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveTitle(video.videoId)}
                      className="text-success-600 hover:text-success-700"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {video.title || 'Untitled Video'}
                    </h3>
                    <button
                      onClick={() => handleEditTitle(video)}
                      className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              {getStatusIcon(video.status)}
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border`}>
                {video.status}
              </span>
              <span className="text-xs text-gray-500">
                {video.duration}s • {video.aspectRatio}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(video.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {video.prompt}
            </p>

            <div className="flex items-center space-x-3">
              {video.status === 'completed' && video.videoUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(video)}
                  className="btn-primary py-1.5 px-3 text-sm"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRegenerate(video.videoId)}
                className="btn-secondary py-1.5 px-3 text-sm"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Regenerate
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopyPrompt(video.prompt)}
                className="btn-ghost py-1.5 px-3 text-sm"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Prompt
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(video.videoId)}
                className="text-error-600 hover:text-error-700 py-1.5 px-3 text-sm"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VideoHistory;