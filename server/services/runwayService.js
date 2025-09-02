const axios = require('axios');
const Video = require('../models/Video');

class RunwayService {
  constructor() {
    this.apiKey = process.env.RUNWAY_API_KEY;
    // Use the development API hostname as indicated by the error message
    this.baseURL = 'https://api.dev.runwayml.com';
    
    if (!this.apiKey) {
      console.error('RUNWAY_API_KEY is not set in environment variables');
      throw new Error('RUNWAY_API_KEY is required');
    }
    
    // Validate API key format
    if (!this.apiKey.startsWith('key_')) {
      console.warn('Warning: RUNWAY_API_KEY does not start with "key_". This might indicate an invalid API key format.');
    }
    
    console.log(`Initializing Runway service with base URL: ${this.baseURL}`);
    console.log(`API Key format check: ${this.apiKey.startsWith('key_') ? 'Valid format' : 'Invalid format'}`);
    
    // Try alternative base URLs if the main one fails
    this.alternativeURLs = [
      'https://api.dev.runwayml.com/v1',  // Primary - development API
      'https://api.runwayml.com/v1',      // Fallback - production API
      'https://api.dev.runwayml.com',     // Alternative dev URL
      'https://runwayml.com/api/v1'      // Legacy URL
    ];
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'  // Correct API version from documentation
      },
      timeout: 30000 // 30 second timeout
    });
    
    // Also try without Bearer prefix in case that's the issue
    this.clientNoBearer = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06'  // Correct API version from documentation
      },
      timeout: 30000
    });
  }

  async createVideoGeneration(prompt, duration = 5, aspectRatio = '16:9') {
    try {
      console.log(`Attempting to create video generation with prompt: "${prompt}", duration: ${duration}s, aspect ratio: ${aspectRatio}`);
      
      // Use the image_to_video endpoint directly since it's working
      console.log('Using image_to_video endpoint with gen4_turbo...');
      
      const response = await this.client.post('/v1/image_to_video', {
        promptImage: 'https://picsum.photos/512/512',
        promptText: prompt,
        duration: duration,
        ratio: this.convertAspectRatioToRatio(aspectRatio),
        model: 'gen4_turbo'
      });
      console.log('Image-to-video endpoint successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Image-to-video endpoint failed:', error.response?.data || error.message);
      throw new Error(`Video generation failed: ${error.response?.data?.error || error.message}`);
    }
  }

  // Helper method to convert aspect ratio to the format expected by the API
  convertAspectRatioToRatio(aspectRatio) {
    const ratioMap = {
      '16:9': '1280:720',
      '9:16': '720:1280',
      '1:1': '960:960',
      '4:3': '1280:960',
      '3:4': '960:1280'
    };
    return ratioMap[aspectRatio] || '1280:720';
  }

  async getJobStatus(jobId) {
    try {
      console.log('Getting job status for:', jobId);
      
      // Based on the Runway API documentation, use the correct endpoint
      const response = await this.client.get(`/v1/tasks/${jobId}`);
      console.log('Job status retrieved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting job status:', error.response?.data || error.message);
      throw error;
    }
  }

  // Test method to discover available API endpoints
  async discoverEndpoints() {
    const endpoints = [
      '/',
      '/models',
      '/gen-4',
      '/gen-3',
      '/gen-4/generate',
      '/gen-3/generate',
      '/gen-4/jobs',
      '/gen-3/jobs',
      '/v1',
      '/v1/models',
      '/v1/gen-4',
      '/v1/gen-3'
    ];
    
    const results = {};
    
    for (const endpoint of endpoints) {
      try {
        const response = await this.client.get(endpoint);
        results[endpoint] = {
          success: true,
          status: response.status,
          data: response.data
        };
      } catch (error) {
        results[endpoint] = {
          success: false,
          status: error.response?.status,
          error: error.response?.data || error.message
        };
      }
    }
    
    return results;
  }

  // Test method to try different authorization formats
  async testAuthFormats() {
    const testEndpoint = '/';
    const results = {};
    
    // Test with Bearer prefix
    try {
      const response = await this.client.get(testEndpoint);
      results['with_bearer'] = {
        success: true,
        status: response.status,
        data: response.data
      };
    } catch (error) {
      results['with_bearer'] = {
        success: false,
        status: error.response?.status,
        error: error.response?.data || error.message
      };
    }
    
    // Test without Bearer prefix
    try {
      const response = await this.clientNoBearer.get(testEndpoint);
      results['without_bearer'] = {
        success: true,
        status: response.status,
        data: response.data
      };
    } catch (error) {
      results['without_bearer'] = {
        success: false,
        status: error.response?.status,
        error: error.response?.data || error.message
      };
    }
    
    return results;
  }

  // Validate API key by making a simple request
  async validateApiKey() {
    try {
      console.log('Validating API key...');
      
      // Try to get basic API info
      const response = await this.client.get('/');
      
      return {
        valid: true,
        message: 'API key is valid',
        response: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('API key validation failed:', error.response?.data || error.message);
      
      return {
        valid: false,
        message: 'API key validation failed',
        error: error.response?.data || error.message,
        status: error.response?.status,
        suggestion: this.getApiKeySuggestion(error.response?.status)
      };
    }
  }

  // Get suggestion based on error status
  getApiKeySuggestion(status) {
    switch (status) {
      case 401:
        return 'API key is invalid or expired. Please check your Runway API key.';
      case 403:
        return 'API key does not have permission to access this endpoint.';
      case 404:
        return 'API endpoint not found. The API structure may have changed.';
      case 429:
        return 'Rate limit exceeded. Please wait before making another request.';
      default:
        return 'Unknown error. Please check your API key and try again.';
    }
  }

  // Try to discover the correct API version
  async discoverApiVersion() {
    const versions = [
      '2024-01-01',
      '2024-02-01', 
      '2024-03-01',
      '2024-04-01',
      '2024-05-01',
      '2024-06-01',
      '2024-07-01',
      '2024-08-01',
      '2024-09-01',
      '2024-10-01',
      '2023-12-01',
      '2023-11-01',
      '2023-10-01'
    ];
    
    console.log('Trying to discover correct API version...');
    
    for (const version of versions) {
      try {
        console.log(`Trying version: ${version}`);
        const testClient = axios.create({
          baseURL: this.baseURL,
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'X-Runway-Version': version
          },
          timeout: 10000
        });
        
        const response = await testClient.get('/');
        console.log(`Version ${version} works! Response:`, response.data);
        return version;
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.includes('version')) {
          console.log(`Version ${version} failed:`, error.response.data.error);
          continue;
        } else {
          console.log(`Version ${version} failed with different error:`, error.response?.data || error.message);
          // If it's not a version error, this version might work
          return version;
        }
      }
    }
    
    throw new Error('Could not find a working API version');
  }

  async pollJobStatus(videoId, maxAttempts = 60) {
    const video = await Video.findOne({ videoId });
    if (!video) {
      throw new Error('Video not found');
    }

    let attempts = 0;
    const pollInterval = 5000; // 5 seconds

    while (attempts < maxAttempts) {
      try {
        const jobStatus = await this.getJobStatus(video.runwayJobId);
        
        // Update video status based on Runway API status values
        console.log(`Job status update: ${jobStatus.status} for video ${videoId}`);
        
        switch (jobStatus.status) {
          case 'PENDING':
          case 'THROTTLED':
            video.status = jobStatus.status;
            break;
          case 'RUNNING':
            video.status = 'RUNNING';
            video.progress = jobStatus.progress || 0;
            break;
          case 'SUCCEEDED':
            video.status = 'SUCCEEDED';
            video.videoUrls = jobStatus.output || [];
            video.videoUrl = jobStatus.output?.[0] || ''; // Keep backward compatibility
            video.completedAt = new Date();
            video.progress = 1;
            video.metadata = {
              ...video.metadata,
              completedAt: new Date(),
              jobDetails: jobStatus,
              finalStatus: 'SUCCEEDED'
            };
            await video.save();
            console.log(`Video ${videoId} completed successfully with ${video.videoUrls.length} output(s)`);
            return video;
          case 'FAILED':
            video.status = 'FAILED';
            video.errorMessage = jobStatus.failure || jobStatus.error || 'Job failed';
            video.failureCode = jobStatus.failureCode || '';
            video.metadata = {
              ...video.metadata,
              failedAt: new Date(),
              jobDetails: jobStatus,
              finalStatus: 'FAILED'
            };
            await video.save();
            throw new Error(`Video generation failed: ${jobStatus.failure || 'Unknown error'}`);
          case 'CANCELLED':
            video.status = 'CANCELLED';
            video.metadata = {
              ...video.metadata,
              cancelledAt: new Date(),
              jobDetails: jobStatus,
              finalStatus: 'CANCELLED'
            };
            await video.save();
            return video;
          default:
            console.log(`Unknown job status: ${jobStatus.status}`);
        }

        await video.save();
        
        if (jobStatus.status === 'SUCCEEDED' || jobStatus.status === 'FAILED' || jobStatus.status === 'CANCELLED') {
          break;
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        attempts++;
      } catch (error) {
        console.error(`Error polling job status (attempt ${attempts + 1}):`, error);
        attempts++;
        
        if (attempts >= maxAttempts) {
          video.status = 'failed';
          video.errorMessage = 'Polling timeout';
          await video.save();
          throw new Error('Job polling timeout');
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }

    return video;
  }
}

module.exports = new RunwayService();
