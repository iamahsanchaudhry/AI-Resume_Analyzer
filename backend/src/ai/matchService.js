/**
 * Normalize a skill string for comparison.
 * Lowercases and strips all non-alphanumeric chars.
 */
function normalize(skill) {
  return String(skill)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Match resume skills against job skills.
 * Returns score (0–100), matched skills, and missing skills.
 */
export function matchSkills(resumeSkills, jobSkills) {
  const resumeNorm = resumeSkills.map(normalize);
  const jobNorm = jobSkills.map(normalize);

  const matched = jobSkills.filter((_, i) => resumeNorm.includes(jobNorm[i]));
  const missing = jobSkills.filter((_, i) => !resumeNorm.includes(jobNorm[i]));

  const score =
    jobSkills.length === 0 ? 0 : (matched.length / jobSkills.length) * 100;

  return {
    score: Math.round(score * 100) / 100, // round to 2 decimals
    matched,
    missing,
  };
}
