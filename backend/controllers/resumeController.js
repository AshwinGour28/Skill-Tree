import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';
import { extractSkillSection } from '../utils/sectionExtractor.js';
import { compareSkills } from '../utils/compareSkills.js';
import { jobSkillMap } from '../skills.js';

export const extractWordText = async (req, res) => {
  try {
    const filePath = path.resolve('uploads', req.file.filename);
    const result = await mammoth.extractRawText({ path: filePath });
    await fs.unlink(filePath); // delete after reading
    const skillText = extractSkillSection(result.value);
    const targetRole = req.body.targetRole?.toLowerCase();
    
    if (!targetRole || !jobSkillMap[targetRole]) {
      return res.status(400).json({ error: "Invalid or missing targetRole" });
    }

    const jobSkills = jobSkillMap[targetRole];
    const { matched, missing } = compareSkills(skillText, jobSkills);

    res.json({
      extractedText: result.value,
      skillText,
      jobSkills,
      matchedSkills: matched,
      missingSkills: missing
    });
  } catch (error) {
    console.error('Word extraction error:', error);
    res.status(500).json({ error: 'Failed to extract text from Word file' });
  }
};
