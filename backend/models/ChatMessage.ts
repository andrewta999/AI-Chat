import mongoose, { Document, Schema } from "mongoose";

export interface IChatMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  messageId: string;
  text: string;
  role: "user" | "ai";
  date: Date;
}

const ChatMessageSchema: Schema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  messageId: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  role: { type: String, enum: ["user", "ai"], required: true },
  date: { type: Date, default: Date.now },
});

export const ChatMessage = mongoose.model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);
