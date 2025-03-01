// src/routes/chatRoutes.js
import express from 'express';
import { askMedPalm } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat/ask
router.post('/ask', askMedPalm);

export default router;
