import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';
import { extractSkillSection } from '../utils/sectionExtractor.js';

export const extractWordText = async (req, res) => {
  try {
    const filePath = path.resolve('uploads', req.file.filename);
    const result = await mammoth.extractRawText({ path: filePath });
    await fs.unlink(filePath); // delete after reading
    const skillText = extractSkillSection(result.value);
    res.json({ text: result.value , skill: skillText});
  } catch (error) {
    console.error('Word extraction error:', error);
    res.status(500).json({ error: 'Failed to extract text from Word file' });
  }
};
