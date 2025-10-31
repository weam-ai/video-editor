import mongoose, { Schema, models, model } from 'mongoose'

const MessageSchema = new Schema({
  id: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const ChatSchema = new Schema({
  id: { type: String }, // Optional, will mirror _id or can be left for app to fill
  title: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    email: { type: String, required: true },
  },
  companyId: { type: String, required: true },
  threadId: { type: String, required: true, unique: true },
  messages: { type: [MessageSchema], default: [] },
  // Any other fields...
}, { timestamps: { createdAt: true, updatedAt: true } })

export type MessageDoc = mongoose.InferSchemaType<typeof MessageSchema>
export type ChatDoc = mongoose.InferSchemaType<typeof ChatSchema>

export default models.Chat || model('Chat', ChatSchema)


