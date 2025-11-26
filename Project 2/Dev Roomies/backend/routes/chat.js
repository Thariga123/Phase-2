import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:connectionId', authMiddleware, getMessages);
router.post('/:connectionId', authMiddleware, sendMessage);

export default router;