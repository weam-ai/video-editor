const mongoose = require('mongoose');

// Only validate MongoDB URI at runtime, not during build time
let MONGODB_URI = null;

function getMongoDBUriSafe() {
  if (!MONGODB_URI) {
    // Check if MONGODB_URI environment variable exists and use it
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) {
      MONGODB_URI = process.env.MONGODB_URI.trim();
    } else {
      // Construct URI from individual environment variables
      const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb';
      const DB_HOST = process.env.DB_HOST;
      const DB_PORT = process.env.DB_PORT;
      const DB_DATABASE = process.env.DB_DATABASE;
      const DB_USERNAME = process.env.DB_USERNAME;
      const DB_PASSWORD = process.env.DB_PASSWORD;

      // Validate required fields
      if (!DB_HOST || !DB_DATABASE) {
        throw new Error(
          'MongoDB configuration is incomplete. Either provide MONGODB_URI or ensure DB_HOST and DB_DATABASE are set.'
        );
      }

      // Construct the authentication part if username/password are provided
      const authPart = DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : '';
      
      // Construct the full URI
      MONGODB_URI = `${DB_CONNECTION}://${authPart}${DB_HOST}${DB_PORT ? ':' + DB_PORT : ''}/${DB_DATABASE}?retryWrites=true&w=majority&readPreference=nearest`;
    }
    
    if (!MONGODB_URI || !validateMongoDBUri(MONGODB_URI)) {
      throw new Error('Invalid MongoDB URI. Please check your MongoDB configuration.');
    }
  }
  
  return MONGODB_URI;
}

/**
 * Validate MongoDB URI format
 * @param {string} uri - MongoDB URI to validate
 * @returns {boolean} boolean indicating if URI is valid
 */
function validateMongoDBUri(uri) {
  try {
    // Basic validation - check if it starts with mongodb:// or mongodb+srv://
    const mongoProtocolRegex = /^mongodb(\+srv)?:\/\/.+/;
    return mongoProtocolRegex.test(uri);
  } catch {
    return false;
  }
}

let cached = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached = {
      conn: null,
      promise: mongoose.connect(getMongoDBUriSafe(), opts)
    };
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

module.exports = dbConnect;
