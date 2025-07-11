import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { extractWordText } from '../controllers/resumeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/extract-text', authMiddleware, upload.single('docx'), extractWordText);

export default router;
