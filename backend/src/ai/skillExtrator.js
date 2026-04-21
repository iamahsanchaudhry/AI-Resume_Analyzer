import client, { MODEL_CONFIG } from "./groqClient.js";
import { RESUME_PROMPT, JOB_PROMPT } from "./prompts.js";
import { cleanText, safeJson } from "./utils.js";

/**
 * Call Groq with a system prompt and user text, return parsed JSON.
 * Shape: { skills: string[], confidence: number }
 */
async function extractSkills(text, systemPrompt) {
  const cleaned = cleanText(text);

  const completion = await client.chat.completions.create({
    ...MODEL_CONFIG,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: cleaned },
    ],
  });

  const content = completion.choices[0]?.message?.content || "";
  return safeJson(content);
}

export const extractResumeSkills = (text) => extractSkills(text, RESUME_PROMPT);

export const extractJobSkills = (text) => extractSkills(text, JOB_PROMPT);
