import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Download, Clock, CheckCircle, XCircle, AlertCircle, Loader, Search, Filter, Edit3, RefreshCw, Eye, Settings, Scissors, RotateCcw, Zap, Crop, Palette, Volume2 } from 'lucide-react';

const VideoHistory = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [editingTitle, setEditingTitle] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [showVideoEditor, setShowVideoEditor] = useState(null);

  useEffect(() => {
    fetchVideos();
    // Refresh every 10 seconds to get updated status
    const interval = setInterval(fetchVideos, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/videos/');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.videos || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReGenerate = async (video, customPrompt = null) => {
    try {
      const promptToUse = customPrompt || video.prompt;
      const response = await fetch('/api/videos/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToUse,
          duration: video.duration,
          aspectRatio: video.aspectRatio
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Video re-generation started! New video ID: ${result.video.videoId}`);
        // Refresh videos to show the new generation
        fetchVideos();
      } else {
        throw new Error('Failed to re-generate video');
      }
    } catch (error) {
      console.error('Error re-generating video:', error);
      alert('Failed to re-generate video: ' + error.message);
    }
  };

  const handleEditTitle = (video) => {
    setEditingTitle(video.videoId);
    setEditTitle(video.title || getAutoTitle(video.prompt));
  };

  const handleSaveTitle = async (video) => {
    try {
      const response = await fetch(`/api/videos/${video.videoId}/title`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle }),
      });

      if (response.ok) {
        const result = await response.json();
        // Update local state with the response from backend
        const updatedVideos = videos.map(v => 
          v.videoId === video.videoId 
            ? { ...v, title: result.video.title }
            : v
        );
        setVideos(updatedVideos);
      setEditingTitle(null);
      setEditTitle('');
      } else {
        throw new Error('Failed to save title');
      }
    } catch (error) {
      console.error('Error saving title:', error);
      alert('Failed to save title: ' + error.message);
    }
  };

  const handleEditPrompt = (video) => {
    setEditingPrompt(video.videoId);
    setEditPrompt(video.prompt);
  };

  const handleSavePrompt = async (video) => {
    try {
      const response = await fetch(`/api/videos/${video.videoId}/prompt`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: editPrompt }),
      });

      if (response.ok) {
        const result = await response.json();
        // Update local state with the response from backend
        const updatedVideos = videos.map(v => 
          v.videoId === video.videoId 
            ? { ...v, prompt: result.video.prompt }
            : v
        );
        setVideos(updatedVideos);
        setEditingPrompt(null);
        setEditPrompt('');
      } else {
        throw new Error('Failed to save prompt');
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
      alert('Failed to save prompt: ' + error.message);
    }
  };

  const handleVideoEdit = (video) => {
    setShowVideoEditor(video.videoId);
  };

  const handleSaveVideoEdit = async (video, editedData) => {
    try {
      const response = await fetch(`/api/videos/${video.videoId}/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const result = await response.json();
        // Update local state with the response from backend
        const updatedVideos = videos.map(v => 
          v.videoId === video.videoId 
            ? { ...v, ...result.video }
            : v
        );
        setVideos(updatedVideos);
        setShowVideoEditor(null);
        alert('Video edits saved successfully!');
      } else {
        throw new Error('Failed to save video edits');
      }
    } catch (error) {
      console.error('Error saving video edits:', error);
      alert('Failed to save video edits: ' + error.message);
    }
  };

  const getAutoTitle = (prompt) => {
    const words = prompt.split(' ');
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCEEDED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'RUNNING':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'PENDING':
      case 'THROTTLED':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCEEDED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
      case 'THROTTLED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (video) => {
    if (video.videoUrls && video.videoUrls.length > 0) {
      window.open(video.videoUrls[0], '_blank');
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  const handlePlayVideo = (video) => {
    if (video.videoUrls && video.videoUrls.length > 0) {
      window.open(video.videoUrls[0], '_blank');
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  // Filter and sort videos
  const filteredAndSortedVideos = videos
    .filter(video => {
      const matchesSearch = video.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (video.title && video.title.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'duration':
          return b.duration - a.duration;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  if (loading && videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading video history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Eye className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
        <p className="text-gray-500">Generate your first video to see it here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Video History</h2>
          <p className="text-sm text-gray-600 mt-1">
            {videos.length} video{videos.length !== 1 ? 's' : ''} generated
          </p>
      </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
            <button
            onClick={fetchVideos}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
            <RefreshCw className="w-4 h-4 inline mr-1" />
            Refresh
            </button>
          </div>
        </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
            placeholder="Search videos by prompt or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="SUCCEEDED">Completed</option>
                <option value="RUNNING">Processing</option>
                <option value="PENDING">Queued</option>
                <option value="FAILED">Failed</option>
              </select>
          </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="duration">Duration</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <span className="text-sm text-gray-600">
                {filteredAndSortedVideos.length} of {videos.length} videos
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {filteredAndSortedVideos.map((video) => (
          <div
            key={video.videoId}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {/* Thumbnail Preview */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  {video.status === 'SUCCEEDED' ? (
                    <div className="relative w-full h-full">
                      <img
                        src={`https://via.placeholder.com/96x96/4F46E5/FFFFFF?text=${encodeURIComponent(video.prompt.slice(0, 10))}`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handlePlayVideo(video)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-8 h-8 text-white" />
                      </button>
        </div>
      ) : (
                    <div className="text-gray-400">
                      {video.status === 'RUNNING' ? (
                        <Loader className="w-8 h-8 animate-spin mx-auto" />
                      ) : (
                        <Eye className="w-8 h-8 mx-auto" />
                      )}
                </div>
              )}
                </div>
              </div>

              {/* Video Details */}
              <div className="flex-1 min-w-0">
                {/* Title Section */}
                <div className="flex items-center space-x-2 mb-2">
                  {editingTitle === video.videoId ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-lg font-medium text-gray-900 border border-blue-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveTitle(video)}
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTitle(null)}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium text-gray-900">
                        {video.title || getAutoTitle(video.prompt)}
                      </h3>
                      <button
                        onClick={() => handleEditTitle(video)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Status and Progress */}
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(video.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(video.status)}`}>
                    {video.status}
                  </span>
                  {video.progress > 0 && video.progress < 1 && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${video.progress * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round(video.progress * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Prompt Text */}
                <div className="mb-2">
                  {editingPrompt === video.videoId ? (
                    <div className="space-y-2">
                      <textarea
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        className="w-full text-sm text-gray-900 border border-blue-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={2}
                        placeholder="Edit your prompt..."
                        autoFocus
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSavePrompt(video)}
                          className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                          Save Prompt
                        </button>
                        <button
                          onClick={() => setEditingPrompt(null)}
                          className="text-gray-500 hover:text-gray-700 text-xs font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                  {video.prompt}
                </p>
                      <button
                        onClick={() => handleEditPrompt(video)}
                        className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Duration: {video.duration}s</span>
                  <span>Aspect: {video.aspectRatio}</span>
                  <span>Model: {video.model || 'gen4_turbo'}</span>
                  <span>Created: {formatDate(video.createdAt)}</span>
                  {video.completedAt && (
                    <span>Completed: {formatDate(video.completedAt)}</span>
                  )}
                </div>

                {/* Error Message */}
                {video.errorMessage && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    Error: {video.errorMessage}
                    {video.failureCode && (
                      <span className="block text-xs text-red-600">
                        Code: {video.failureCode}
                      </span>
                    )}
                  </div>
                )}

                {/* Re-generate with prompt editing */}
                <div className="space-y-2">
                  {video.status === 'FAILED' && (
                    <button
                      onClick={() => handleReGenerate(video)}
                      className="flex items-center gap-2 bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-700 transition-colors w-full"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-generate
                    </button>
                  )}

                  {video.status === 'SUCCEEDED' && (
                    <>
                      <button
                        onClick={() => handleReGenerate(video)}
                        className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors w-full"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Re-generate Same
                      </button>
                       <button
                         onClick={() => {
                           const newPrompt = window.prompt(`${video.title || 'Video'} - Edit prompt for re-generation:`, video.prompt);
                           if (newPrompt && newPrompt.trim()) {
                             handleReGenerate(video, newPrompt.trim());
                           }
                         }}
                         className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors w-full"
                       >
                         <Edit3 className="w-4 h-4" />
                         Re-generate Modified
                       </button>
                    </>
                  )}
                </div>

                {/* Video Editor Button */}
                {video.status === 'SUCCEEDED' && (
                  <Link
                    to={`/editor/${video.videoId}`}
                    className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition-colors w-full justify-center"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Video
                  </Link>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-end space-y-2">
                {video.status === 'SUCCEEDED' && (
                  <>
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                    <button
                      onClick={() => handleDownload(video)}
                      className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                )}

                {video.status === 'RUNNING' && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Editor Modal */}
      {showVideoEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Video</h3>
              <button
                onClick={() => setShowVideoEditor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {videos.find(v => v.videoId === showVideoEditor) && (
              <VideoEditor
                video={videos.find(v => v.videoId === showVideoEditor)}
                onSave={(editedData) => handleSaveVideoEdit(videos.find(v => v.videoId === showVideoEditor), editedData)}
                onCancel={() => setShowVideoEditor(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Video Editor Component
const VideoEditor = ({ video, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    title: video.title || '',
    prompt: video.prompt,
    duration: video.duration,
    aspectRatio: video.aspectRatio,
    model: video.model || 'gen4_turbo'
  });
  
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [segments, setSegments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    if (video.videoUrl) {
      // Load video to get duration
      const videoElement = document.createElement('video');
      videoElement.src = video.videoUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration);
        setTrimEnd(videoElement.duration);
      });
      videoElement.load();
    }
  }, [video.videoUrl]);

  const handleVideoLoad = (event) => {
    const video = event.target;
    setVideoDuration(video.duration);
    setTrimEnd(video.duration);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time) => {
    if (videoRef) {
      videoRef.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleTrimStart = (value) => {
    const newStart = parseFloat(value);
    setTrimStart(newStart);
    if (newStart >= trimEnd) {
      setTrimEnd(newStart + 1);
    }
  };

  const handleTrimEnd = (value) => {
    const newEnd = parseFloat(value);
    setTrimEnd(newEnd);
    if (newEnd <= trimStart) {
      setTrimStart(newEnd - 1);
    }
  };

  const addSegment = () => {
    const newSegment = {
      id: Date.now(),
      start: trimStart,
      end: trimEnd,
      duration: trimEnd - trimStart
    };
    setSegments([...segments, newSegment]);
  };

  const removeSegment = (segmentId) => {
    setSegments(segments.filter(s => s.id !== segmentId));
  };

  const updateSegment = (segmentId, field, value) => {
    setSegments(segments.map(s => 
      s.id === segmentId ? { ...s, [field]: parseFloat(value) } : s
    ));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = async () => {
    try {
      // Send video editing data to backend
      const response = await fetch(`/api/videos/${video.videoId}/process-edits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trimStart,
          trimEnd,
          segments,
          outputFormat: 'mp4'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Video editing started! ${result.message}\nEstimated time: ${result.estimatedTime}`);
        onSave(editData);
      } else {
        throw new Error('Failed to process video edits');
      }
    } catch (error) {
      console.error('Error processing video edits:', error);
      alert('Failed to process video edits: ' + error.message);
    }
  };

  const handleReset = () => {
    setEditData({
      title: video.title || '',
      prompt: video.prompt,
      duration: video.duration,
      aspectRatio: video.aspectRatio,
      model: video.model || 'gen4_turbo'
    });
    setTrimStart(0);
    setTrimEnd(videoDuration);
    setSegments([]);
    setCurrentTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Video Preview */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Video Preview</h4>
        <div className="relative">
          <video
            ref={setVideoRef}
            src={video.videoUrl}
            className="w-full h-48 object-cover rounded"
            controls={false}
            onLoadedMetadata={handleVideoLoad}
            onTimeUpdate={handleTimeUpdate}
            muted
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b">
            <div className="flex items-center justify-between text-sm">
              <span>{formatTime(currentTime)} / {formatTime(videoDuration)}</span>
              <button
                onClick={handlePlayPause}
                className="bg-white text-black px-3 py-1 rounded text-xs hover:bg-gray-200"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline and Trim Controls */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Timeline & Trim Controls</h4>
        
        {/* Timeline Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Timeline</span>
            <span>{formatTime(currentTime)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={videoDuration}
            step={0.1}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Trim Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="range"
              min={0}
              max={videoDuration - 1}
              step={0.1}
              value={trimStart}
              onChange={(e) => handleTrimStart(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-xs text-gray-600 mt-1">{formatTime(trimStart)}</div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="range"
              min={trimStart + 1}
              max={videoDuration}
              step={0.1}
              value={trimEnd}
              onChange={(e) => handleTrimEnd(e.target.value)}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-xs text-gray-600 mt-1">{formatTime(trimEnd)}</div>
          </div>
        </div>

        {/* Trim Duration Display */}
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <div className="text-sm text-blue-800">
            <strong>Trimmed Duration:</strong> {formatTime(trimEnd - trimStart)}
            <span className="text-xs block mt-1">
              Original: {formatTime(videoDuration)} | 
              Cut: {formatTime(videoDuration - (trimEnd - trimStart))}
            </span>
          </div>
        </div>
      </div>

      {/* Video Segments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Video Segments</h4>
          <button
            onClick={addSegment}
            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
          >
            Add Segment
                    </button>
                  </div>
                  
        {segments.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No segments created yet. Use the trim controls above to create segments.
          </div>
        ) : (
          <div className="space-y-2">
            {segments.map((segment, index) => (
              <div key={segment.id} className="border border-gray-200 rounded p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Segment {index + 1}</span>
                  <button
                    onClick={() => removeSegment(segment.id)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1">Start</label>
                    <input
                      type="number"
                      min={0}
                      max={videoDuration}
                      step={0.1}
                      value={segment.start}
                      onChange={(e) => updateSegment(segment.id, 'start', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-600 mb-1">End</label>
                    <input
                      type="number"
                      min={segment.start + 0.1}
                      max={videoDuration}
                      step={0.1}
                      value={segment.end}
                      onChange={(e) => updateSegment(segment.id, 'end', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mt-2">
                  Duration: {formatTime(segment.end - segment.start)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Basic Metadata (Collapsed by default) */}
      <div className="border-t border-gray-200 pt-4">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
            <span>Basic Metadata</span>
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          
          <div className="mt-3 space-y-3">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video title..."
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
              <textarea
                value={editData.prompt}
                onChange={(e) => setEditData({ ...editData, prompt: e.target.value })}
                rows={2}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Describe your video..."
              />
            </div>
          </div>
        </details>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >  
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoHistory;

