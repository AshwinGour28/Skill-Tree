import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';

export const extractWordText = async (req, res) => {
  try {
    const filePath = path.resolve('uploads', req.file.filename);

    const result = await mammoth.extractRawText({ path: filePath });
    await fs.unlink(filePath); // delete after reading

    res.json({ text: result.value });
  } catch (error) {
    console.error('Word extraction error:', error);
    res.status(500).json({ error: 'Failed to extract text from Word file' });
  }
};
