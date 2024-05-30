import { Request, Response } from 'express';
import { Chat } from '../models/Chat';
import { ChatMessage } from '../models/ChatMessage';
import { TokenUsage } from '../models/TokenUsage';
import { getAIResponse } from '../utils/openai';
import { IUser } from '../models/User';

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export const getChat = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Assuming userId is set by authMiddleware

  try {
    const chats = await Chat.find({ userId }).populate('messages');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Assuming userId is set by authMiddleware
  const { chatID, text } = req.body;

  try {
    let chat;
    if (chatID !== "") {
      chat = await Chat.findOne({ _id: chatID });
      if (!chat) {
        chat = new Chat({ userId });
        await chat.save();
      }
    } else {
      chat = new Chat({ userId });
      await chat.save();
    }

    const userMessage = new ChatMessage({ chatId: chat._id, messageId: `${chatID}_user_${Date.now()}`, text, role: 'user' });
    await userMessage.save();

    // Call AI API to get response
    const aiResponseText = await getAIResponse(text);
    const aiMessage = new ChatMessage({ chatId: chat._id, messageId: `${chatID}_ai_${Date.now()}`, text: aiResponseText, role: 'ai' });
    await aiMessage.save();

    // Record token usage (example, adjust based on actual token usage calculation)
    const tokensUsed = calculateTokens(text, aiResponseText); // Implement this function based on your API's token usage
    await recordTokenUsage(userId, tokensUsed);

    res.json({ userMessage, aiMessage });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

const calculateTokens = (userText: string, aiText: string) => {
  // simple token calculation
  return userText.length + aiText.length;
};

const recordTokenUsage = async (userId: string, tokensUsed: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await TokenUsage.findOneAndUpdate(
    { userId, date: today },
    { $inc: { tokensUsed } },
    { new: true, upsert: true }
  );
};
