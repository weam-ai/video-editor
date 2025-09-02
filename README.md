<<<<<<< HEAD
# Runway Video Creator

A modern web application for creating AI-generated videos using Runway's Gen-4 model. Built with React, Node.js, and MongoDB.

## Features

- 🎬 **AI Video Generation**: Create videos from natural language prompts using Runway's Gen-4 model
- 📱 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 📊 **Video History**: View, search, and manage all your generated videos
- ⚙️ **Advanced Options**: Customize duration and aspect ratio
- 🔄 **Real-time Status**: Live updates on video generation progress


- 📥 **Download Videos**: Download completed videos directly
- 🔍 **Search & Filter**: Find videos by prompt, title, or status
- ✏️ **Edit Titles**: Rename your videos for better organization

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Runway API** for video generation
- **Axios** for HTTP requests

### Frontend
- **React 18** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Runway API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd runway-video-creator
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   
   Create a `config.env` file in the root directory:
   ```env
   RUNWAY_API_KEY=your_runway_api_key_here
   MONGODB_URI=mongodb://localhost:27017/runway-video-creator
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using a local installation:
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Creating Videos

1. Navigate to the "Create Video" page
2. Enter a detailed prompt describing your video idea
3. (Optional) Click "Advanced Options" to customize duration and aspect ratio
4. Click "Generate Video"
5. Wait for the video to be generated (this may take several minutes)
6. Once complete, you can play and download the video

### Managing Videos

1. Go to the "History" page to view all your videos
2. Use the search bar to find specific videos
3. Filter by status (queued, running, completed, failed)
4. Edit video titles by clicking the edit icon
5. Regenerate videos with the same prompt
6. Download completed videos
7. Delete videos you no longer need

## API Endpoints

### Video Generation
- `POST /api/videos/generate` - Create a new video generation job
- `GET /api/videos/:videoId/status` - Get video generation status
- `GET /api/videos` - Get all videos with pagination and filtering

### Video Management
- `PATCH /api/videos/:videoId/title` - Update video title
- `POST /api/videos/:videoId/regenerate` - Regenerate video with same prompt
- `DELETE /api/videos/:videoId` - Delete video

## Configuration

### Runway API Setup

1. Sign up for a Runway account at https://runwayml.com
2. Get your API key from the developer dashboard
3. Add the API key to your `config.env` file

### MongoDB Setup

The application uses MongoDB to store video metadata. You can use:
- Local MongoDB installation
- MongoDB Atlas (cloud)
- Any other MongoDB-compatible database

Update the `MONGODB_URI` in your `config.env` file accordingly.

## Project Structure

```
runway-video-creator/
├── server/
│   ├── index.js              # Express server entry point
│   ├── models/
│   │   └── Video.js          # MongoDB schema
│   ├── routes/
│   │   └── videoRoutes.js    # API routes
│   └── services/
│       └── runwayService.js  # Runway API integration
├── client/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React context
│   │   ├── App.js           # Main app component
│   │   └── index.js         # React entry point
│   └── package.json
├── config.env               # Environment variables
├── package.json            # Backend dependencies
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `config.env`
   - Verify network connectivity if using cloud MongoDB

2. **Runway API Errors**
   - Verify your API key is correct
   - Check your Runway account status and credits
   - Ensure you're using the correct API endpoint

3. **Video Generation Fails**
   - Check the prompt length and content
   - Verify your Runway API quota
   - Check the server logs for detailed error messages

4. **Frontend Not Loading**
   - Ensure both frontend and backend are running
   - Check browser console for errors
   - Verify the proxy configuration in `client/package.json`

### Development Tips

- Use `npm run dev` for development (runs both frontend and backend)
- Check the browser console and server logs for debugging
- The application polls for video status every 3 seconds
- Video generation can take 2-5 minutes depending on complexity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the Runway API documentation
3. Open an issue on GitHub

---

**Note**: This application requires a valid Runway API key and may incur costs based on your Runway usage plan.

=======
# video-editor
>>>>>>> 09555506077b572024796aad510fc40e95612d4f
