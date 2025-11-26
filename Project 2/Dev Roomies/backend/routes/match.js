import express from 'express';
import { getMatches, createConnection } from '../controllers/matchController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMatches);
router.post('/connect', authMiddleware, createConnection);

export default router;