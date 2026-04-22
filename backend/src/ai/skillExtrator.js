import client, { MODEL_CONFIG } from "./groqClient.js";
import { RESUME_PROMPT, JOB_PROMPT, MATCH_PROMPT } from "./prompts.js";
import { cleanText, safeJson } from "./utils.js";

/**
 * Call Groq with a system prompt, retrying once on rate-limit (429).
 * Returns the raw string content from the model.
 */
async function callGroq(systemPrompt, userContent, retries = 2) {
  try {
    const completion = await client.chat.completions.create(
      {
        ...MODEL_CONFIG,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      },
      {
        timeout: 20000, // 20s per Groq call
      },
    );
    return completion.choices[0]?.message?.content || "";
  } catch (err) {
    // ...
  }
}

/**
 * Extract skills from resume or job text.
 * Returns: { skills: string[], confidence: number }
 */
async function extractSkills(text, systemPrompt) {
  const cleaned = cleanText(text);
  const content = await callGroq(systemPrompt, cleaned);
  return safeJson(content);
}

export const extractResumeSkills = (text) => extractSkills(text, RESUME_PROMPT);
export const extractJobSkills = (text) => extractSkills(text, JOB_PROMPT);

/**
 * Match resume skills against job skills using the LLM.
 * Returns: { matchedSkills, weakMatches, missingSkills, reasoning }
 *
 * Throws on invalid input or LLM failure — caller should handle with fallback.
 */
export async function matchSkillsAI(resumeSkills, jobSkills) {
  if (!Array.isArray(jobSkills) || jobSkills.length === 0) {
    return {
      matchedSkills: [],
      weakMatches: [],
      missingSkills: [],
      reasoning: {},
    };
  }

  if (!Array.isArray(resumeSkills) || resumeSkills.length === 0) {
    return {
      matchedSkills: [],
      weakMatches: [],
      missingSkills: [...jobSkills],
      reasoning: Object.fromEntries(
        jobSkills.map((s) => [s, "No resume skills available for matching"]),
      ),
    };
  }

  const userContent = `Resume skills:
${resumeSkills.join(", ")}

Job skills:
${jobSkills.join(", ")}`;

  const content = await callGroq(MATCH_PROMPT, userContent);
  const parsed = safeJson(content);

  // Collect raw classifications
  const rawMatched = Array.isArray(parsed.matchedSkills)
    ? parsed.matchedSkills.filter((s) => typeof s === "string")
    : [];
  const rawWeak = Array.isArray(parsed.weakMatches)
    ? parsed.weakMatches.filter((s) => typeof s === "string")
    : [];
  const rawMissing = Array.isArray(parsed.missingSkills)
    ? parsed.missingSkills.filter((s) => typeof s === "string")
    : [];

  // Build a normalized lookup of job skills for filtering
  const jobSkillSet = new Map(); // normalizedKey -> originalJobSkill
  for (const js of jobSkills) {
    jobSkillSet.set(String(js).toLowerCase().trim(), js);
  }

  // Filter: only keep items that actually appear in the job skills list.
  // Use each skill at most once — first match wins by priority: matched > weak > missing.
  const claimed = new Set();
  const matchedSkills = [];
  const weakMatches = [];
  const missingSkills = [];

  const tryClaim = (llmLabel) => {
    const key = String(llmLabel).toLowerCase().trim();
    if (claimed.has(key)) return null;
    const original = jobSkillSet.get(key);
    if (!original) return null; // LLM invented this — ignore
    claimed.add(key);
    return original;
  };

  for (const s of rawMatched) {
    const original = tryClaim(s);
    if (original) matchedSkills.push(original);
  }
  for (const s of rawWeak) {
    const original = tryClaim(s);
    if (original) weakMatches.push(original);
  }
  for (const s of rawMissing) {
    const original = tryClaim(s);
    if (original) missingSkills.push(original);
  }

  // Any job skill the LLM failed to classify → mark as missing
  for (const [key, original] of jobSkillSet) {
    if (!claimed.has(key)) {
      missingSkills.push(original);
    }
  }

  const reasoning =
    parsed.reasoning && typeof parsed.reasoning === "object"
      ? parsed.reasoning
      : {};

  return {
    matchedSkills,
    weakMatches,
    missingSkills,
    reasoning,
  };
}
