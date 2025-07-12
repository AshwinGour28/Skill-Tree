export const compareSkills = (resumeText, jobSkills) => {
  const text = Array.isArray(resumeText)
    ? resumeText.join(" ").toLowerCase()
    : (resumeText || "").toLowerCase();

  const matched = [];
  const missing = [];

  for (let skill of jobSkills) {
    if (text.includes(skill.toLowerCase())) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  return { matched, missing };
};
