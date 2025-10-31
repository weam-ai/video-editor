import mongoose from 'mongoose'

let isConnected = 0

function buildMongoUriFromEnv() {
  const conn = process.env.DB_CONNECTION || 'mongodb+srv'
  const host = process.env.DB_HOST
  const db = process.env.DB_DATABASE
  const user = process.env.DB_USERNAME
  const pass = process.env.DB_PASSWORD
  const port = process.env.DB_PORT // optional, may be undefined

  if (!(host && db && user && pass)) {
    throw new Error('Missing database env variables for custom MongoDB URI')
  }

  // SRV = no port, non-SRV can have port
  let uri
  if (conn === 'mongodb+srv') {
    uri = `${conn}://${user}:${encodeURIComponent(pass)}@${host}/${db}`
  } else {
    const portPart = port ? `:${port}` : ''
    uri = `${conn}://${user}:${encodeURIComponent(pass)}@${host}${portPart}/${db}`
  }
  return uri
}

export async function connectToDatabase() {
  if (isConnected) return
  let uri = process.env.MONGODB_URI
  if (!uri) {
    uri = buildMongoUriFromEnv()
  }
  const conn = await mongoose.connect(uri, { dbName: process.env.MONGODB_DATABASE || undefined })
  isConnected = conn.connections[0].readyState
}


