/**
 * Clean text input — equivalent to utils/parser.py
 */
export function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ")
    .trim();
}

/**
 * Safely parse a JSON string returned by the LLM.
 * Equivalent to utils/json_safe.py — tries direct parse first,
 * then extracts the first {...} block if there's surrounding junk.
 */
export function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract the first JSON object from the text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        // fall through to default
      }
    }
  }

  return { skills: [], confidence: 0 };
}
