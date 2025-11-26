import express from 'express';
import { createProfile, getProfile, flagProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfile);
router.post('/flag', authMiddleware, flagProfile);

export default router;