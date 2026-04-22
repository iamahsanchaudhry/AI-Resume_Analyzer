// /**
//  * Normalize a skill string for comparison.
//  * Lowercases and strips all non-alphanumeric chars.
//  */
// function normalize(skill) {
//   return String(skill)
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "");
// }

// /**
//  * Match resume skills against job skills.
//  * Returns score (0–100), matched skills, and missing skills.
//  */
// export function matchSkills(resumeSkills, jobSkills) {
//   const resumeNorm = resumeSkills.map(normalize);
//   const jobNorm = jobSkills.map(normalize);

//   const matched = jobSkills.filter((_, i) => resumeNorm.includes(jobNorm[i]));
//   const missing = jobSkills.filter((_, i) => !resumeNorm.includes(jobNorm[i]));

//   const score =
//     jobSkills.length === 0 ? 0 : (matched.length / jobSkills.length) * 100;

//   return {
//     score: Math.round(score * 100) / 100, // round to 2 decimals
//     matched,
//     missing,
//   };
// }

/**
 * Normalize a skill string for comparison.
 * Preserves meaningful characters like # + . - that distinguish skills
 * (C# vs C++ vs C, Node.js vs Node, .NET, etc.)
 */
function normalize(skill) {
  return (
    String(skill)
      .toLowerCase()
      .trim()
      // Strip only noisy punctuation — keep #, +, ., -, /
      .replace(/[()[\]{},;:!?"'`]/g, "")
      // Collapse multiple spaces
      .replace(/\s+/g, " ")
  );
}

/**
 * Check if two normalized skills are a "weak" (partial) match.
 * Weak = one skill contains the other as a whole-word substring.
 * Example: "React" ≈ "React Native", "SQL" ≈ "PostgreSQL" (same core tech)
 */
function isWeakMatch(a, b) {
  if (a === b) return false; // exact matches aren't "weak"
  if (a.length < 2 || b.length < 2) return false; // single letters aren't meaningful

  // Word-boundary containment — prevents "c" matching inside "communication"
  const wordBoundary = (haystack, needle) => {
    const regex = new RegExp(`\\b${escapeRegex(needle)}\\b`);
    return regex.test(haystack);
  };

  return wordBoundary(a, b) || wordBoundary(b, a);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Match resume skills against job skills.
 * Returns exact matches, weak (partial) matches, missing skills, and a score.
 */
export function matchSkills(resumeSkills, jobSkills) {
  const resumeNorm = resumeSkills.map(normalize);
  const jobNormPairs = jobSkills.map((original) => ({
    original,
    normalized: normalize(original),
  }));

  const matched = [];
  const weakMatches = [];
  const missing = [];

  for (const { original, normalized } of jobNormPairs) {
    if (resumeNorm.includes(normalized)) {
      matched.push(original);
    } else if (resumeNorm.some((r) => isWeakMatch(r, normalized))) {
      weakMatches.push(original);
    } else {
      missing.push(original);
    }
  }

  const total = jobSkills.length;
  const score =
    total === 0
      ? 0
      : Math.round(((matched.length + weakMatches.length * 0.5) / total) * 100);

  return {
    score,
    matchedSkills: matched,
    missingSkills: missing,
    weakMatches,
  };
}
