import mongoose, { Document, Schema } from 'mongoose';

interface ITokenUsage extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  tokensUsed: number;
}

const TokenUsageSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  tokensUsed: { type: Number, required: true, default: 0 },
});

// Ensure a unique index on userId and date to prevent duplicate entries
TokenUsageSchema.index({ userId: 1, date: 1 }, { unique: true });

export const TokenUsage = mongoose.model<ITokenUsage>('TokenUsage', TokenUsageSchema);
