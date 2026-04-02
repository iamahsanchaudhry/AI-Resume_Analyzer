JOB_PROMPT = """
Extract ONLY technical skills from job description.
Return ONLY valid JSON.
Do NOT include:
- explanation
- markdown
- backticks
- text before/after JSON

Strict JSON format:
{
  "skills": ["skill1", "skill2"],
  "confidence": 0.0
}
"""