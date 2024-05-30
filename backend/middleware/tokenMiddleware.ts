import { Request, Response, NextFunction } from 'express';
import { TokenUsage } from '../models/TokenUsage';

const TOKEN_LIMIT = process.env.TOKEN_LIMIT ?? 1000;

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { text } = req.body;
  try {
    const tokenUsage = await TokenUsage.findOne({ userId, today});
    if (tokenUsage?.tokensUsed + text.length > TOKEN_LIMIT) {
      return res.status(401).json({ message: 'Token limit exceeded' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
