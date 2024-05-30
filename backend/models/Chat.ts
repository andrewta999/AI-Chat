import mongoose, { Document, Schema } from "mongoose";

interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ChatSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

ChatSchema.virtual('messages', {
  ref: "ChatMessage", // The model to use
  localField: '_id', // Find chats where `localField`
  foreignField: 'chatId', // is equal to `foreignField`
  options: { refPath: 'chatId' }
});

ChatSchema.set('toObject', { virtuals: true });
ChatSchema.set('toJSON', { virtuals: true });

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
