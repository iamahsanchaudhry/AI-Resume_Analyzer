import client, { PRIMARY_MODEL, FALLBACK_MODEL } from "./groqClient.js";
import { RESUME_PROMPT, JOB_PROMPT, MATCH_PROMPT } from "./prompts.js";
import { cleanText, safeJson } from "./utils.js";

/**
 * Call Groq with a system prompt and user text.
 * Tries the primary model (70B) first. If it fails with a rate limit,
 * falls back to the secondary model (8B) automatically.
 */
async function callGroq(systemPrompt, userContent, retries = 1) {
  const attemptCall = async (modelConfig) => {
    const completion = await client.chat.completions.create(
      {
        ...modelConfig,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      },
      {
        timeout: 20000,
      },
    );
    return completion.choices[0]?.message?.content || "";
  };

  try {
    console.log("Using model:" + PRIMARY_MODEL.model);
    // Try primary (70B) first
    return await attemptCall(PRIMARY_MODEL);
  } catch (primaryErr) {
    const isRateLimit = primaryErr.status === 429;
    const isTimeout = primaryErr.name === "APITimeoutError";

    // If the primary hit rate limit or timed out, try the fallback (8B) immediately
    if (isRateLimit || isTimeout) {
      console.warn(
        `Primary model (${PRIMARY_MODEL.model}) hit ${isRateLimit ? "rate limit" : "timeout"}, falling back to ${FALLBACK_MODEL.model}`,
      );

      try {
        console.log("Using model:" + FALLBACK_MODEL.model);
        return await attemptCall(FALLBACK_MODEL);
      } catch (fallbackErr) {
        // Fallback also failed — retry once after a brief wait
        if (
          retries > 0 &&
          (fallbackErr.status === 429 || fallbackErr.name === "APITimeoutError")
        ) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return callGroq(systemPrompt, userContent, retries - 1);
        }
        throw fallbackErr;
      }
    }

    // Not a rate-limit error — bubble up
    throw primaryErr;
  }
}

/**
 * Extract skills from resume or job text.
 * Shape: { skills: string[], confidence: number }
 */
async function extractSkills(text, systemPrompt) {
  const cleaned = cleanText(text);
  const content = await callGroq(systemPrompt, cleaned);
  return safeJson(content);
}

export const extractResumeSkills = (text) => extractSkills(text, RESUME_PROMPT);
export const extractJobSkills = (text) => extractSkills(text, JOB_PROMPT);

// matchSkillsAI stays the same — it internally uses callGroq so it gets the fallback behavior automatically
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

  // Collect and filter classifications (keep only skills that exist in the job list)
  const rawMatched = Array.isArray(parsed.matchedSkills)
    ? parsed.matchedSkills.filter((s) => typeof s === "string")
    : [];
  const rawWeak = Array.isArray(parsed.weakMatches)
    ? parsed.weakMatches.filter((s) => typeof s === "string")
    : [];
  const rawMissing = Array.isArray(parsed.missingSkills)
    ? parsed.missingSkills.filter((s) => typeof s === "string")
    : [];

  const jobSkillSet = new Map();
  for (const js of jobSkills) {
    jobSkillSet.set(String(js).toLowerCase().trim(), js);
  }

  const claimed = new Set();
  const matchedSkills = [];
  const weakMatches = [];
  const missingSkills = [];

  const tryClaim = (llmLabel) => {
    const key = String(llmLabel).toLowerCase().trim();
    if (claimed.has(key)) return null;
    const original = jobSkillSet.get(key);
    if (!original) return null;
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

  // Any unclassified job skill → mark missing
  for (const [key, original] of jobSkillSet) {
    if (!claimed.has(key)) {
      missingSkills.push(original);
    }
  }

  const reasoning =
    parsed.reasoning && typeof parsed.reasoning === "object"
      ? parsed.reasoning
      : {};

  return { matchedSkills, weakMatches, missingSkills, reasoning };
}
