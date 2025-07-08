import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { extractWordText } from '../controllers/resumeController.js';

const router = express.Router();


router.post('/extract-text', upload.single('docx'), extractWordText);

export default router;
