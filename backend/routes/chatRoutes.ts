import express from 'express';
import { getChat, postMessage } from '../controllers/chatController';
import { authMiddleware } from '../middleware/authMiddleware';
import { tokenMiddleware } from '../middleware/tokenMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getChat);
router.post('/', authMiddleware, tokenMiddleware, postMessage);

export default router;
