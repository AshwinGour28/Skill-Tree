export const extractSkillSection = (text) => {
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);

  const skillSectionKeywords = [
    "skills",
    "technical skills",
    "key skills",
    "skill set"
  ];

  const stopSectionKeywords = [
    "experience",
    "projects",
    "education",
    "positions of responsibility",
    "certifications"
  ];

  let capture = false;
  const capturedLines = [];

  for (let line of lines) {
    const lowerLine = line.toLowerCase();

    if (!capture && skillSectionKeywords.some(keyword => lowerLine.includes(keyword))) {
      capture = true;
      continue;
    }

    if (capture && stopSectionKeywords.some(stop => lowerLine.startsWith(stop))) {
      break;
    }

    if (capture) {
      capturedLines.push(line);
    }
  }

  // Extract skills from captured lines
  const allSkills = [];

  for (let line of capturedLines) {
    // Example: "Languages: JavaScript, C++, Python"
    const parts = line.split(":");
    if (parts.length > 1) {
      const skillsPart = parts[1];
      const skills = skillsPart
        .split(/[|•,]+/)
        .map(s => s.trim())
        .filter(Boolean);
      allSkills.push(...skills);
    } else {
      // Handle skill lines without labels (like: "Team player • Communication")
      const skills = line
        .split(/[|•,]+/)
        .map(s => s.trim())
        .filter(Boolean);
      allSkills.push(...skills);
    }
  }

  return allSkills;
};
