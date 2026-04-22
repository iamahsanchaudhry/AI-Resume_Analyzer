/**
 * Normalize a skill for comparison.
 * Preserves characters that meaningfully distinguish skills:
 *   C# vs C++ vs C
 *   Node.js vs Node
 *   .NET, UI/UX, C#.NET
 */
function normalize(skill) {
  return String(skill)
    .toLowerCase()
    .trim()
    .replace(/[()[\]{},;:!?"'`]/g, "")
    .replace(/\s+/g, " ")
    .replace(/-/g, " ") // ← NEW: treat hyphens as spaces
    .replace(/\s+/g, " ") // then collapse again
    .trim();
}

/**
 * Known skill aliases — handles semantic equivalence the LLM sometimes drifts on.
 * Keys and values MUST be stored already-normalized (lowercase, no trailing spaces).
 * Keep this list small and focused on observed drift.
 */
const ALIASES = {
  "c#": ["c sharp", "csharp"],
  "c++": ["c plus plus", "cplusplus", "cpp"],
  "f#": ["f sharp", "fsharp"],
  "object-oriented programming": ["oop", "object oriented programming"],
  javascript: ["js"],
  typescript: ["ts"],
  "node.js": ["nodejs", "node js"],
  "next.js": ["nextjs", "next js"],
  "nest.js": ["nestjs", "nest js"],
  "vue.js": ["vuejs", "vue js", "vue"],
  "machine learning": ["ml"],
  "artificial intelligence": ["ai"],
  teamwork: ["team collaboration", "team work", "collaboration"],
  "team collaboration": ["teamwork", "collaboration"],
  communication: ["verbal communication", "engaging presentation"],
  "problem-solving": ["problem solving", "analytical thinking"],
  "full stack development": ["full-stack development", "fullstack development"],
  "restful apis": ["rest apis", "rest", "restful api"],
  agile: ["agile development", "agile methodology", "agile methodologies"],
  "backend development": [
    "server-side programming",
    "server side programming",
    "server-side development",
  ],
  "server-side programming": ["backend development", "server side programming"],
};

/**
 * Given an already-normalized skill string,
 * return the set of all equivalent forms (including itself).
 */
function expandAliases(normalizedSkill) {
  const forms = new Set([normalizedSkill]);

  // Forward: skill → its aliases
  if (ALIASES[normalizedSkill]) {
    ALIASES[normalizedSkill].forEach((a) => forms.add(a));
  }

  // Reverse: if this skill is an alias of something, pull in the canonical + siblings
  for (const [canon, aliases] of Object.entries(ALIASES)) {
    if (aliases.includes(normalizedSkill)) {
      forms.add(canon);
      aliases.forEach((a) => forms.add(a));
    }
  }

  return forms;
}

/**
 * Word-boundary substring check.
 * "c" is NOT contained in "communication" (no word boundary on either side).
 * "react" IS contained in "react native" (word boundaries on both sides).
 */
function containsAsWord(haystack, needle) {
  if (needle.length < 2) return false; // single letters are noise
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\s)${escaped}($|\\s)`);
  return regex.test(haystack);
}

/**
 * Two skills are a weak match if one contains the other as a whole word
 * (and they're not identical).
 */
function isWeakMatch(a, b) {
  if (a === b) return false;
  return containsAsWord(a, b) || containsAsWord(b, a);
}

/**
 * Match a list of resume skills against a list of job skills.
 *
 * Returns:
 *   matchedSkills — job skills with an exact (or alias-equivalent) resume match
 *   weakMatches   — job skills that partially match
 *   missingSkills — job skills with no match at all
 */
export function matchSkills(resumeSkills, jobSkills) {
  // Expand every resume skill into its alias set, then flatten
  const resumeExpanded = new Set(
    resumeSkills.flatMap((s) => [...expandAliases(normalize(s))]),
  );

  const matchedSkills = [];
  const weakMatches = [];
  const missingSkills = [];

  for (const jobSkill of jobSkills) {
    const jobNorm = normalize(jobSkill);
    const jobForms = expandAliases(jobNorm);

    // Exact match (through any alias form)
    let matched = false;
    for (const form of jobForms) {
      if (resumeExpanded.has(form)) {
        matchedSkills.push(jobSkill);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Weak match (word-boundary containment, any resume form ↔ any job form)
    let weakHit = false;
    for (const r of resumeExpanded) {
      for (const j of jobForms) {
        if (isWeakMatch(r, j)) {
          weakHit = true;
          break;
        }
      }
      if (weakHit) break;
    }
    if (weakHit) {
      weakMatches.push(jobSkill);
      continue;
    }

    missingSkills.push(jobSkill);
  }

  return {
    matchedSkills,
    weakMatches,
    missingSkills,
  };
}
