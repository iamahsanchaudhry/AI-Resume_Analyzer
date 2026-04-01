from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
import json
from dotenv import load_dotenv

load_dotenv()
import os

app = FastAPI()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


class ResumeRequest(BaseModel):
    text: str


SYSTEM_PROMPT = """
You are an AI HR assistant.

Extract skills from resume text.

Rules:
- Infer skills from context (DO NOT use predefined lists)
- Return ONLY valid JSON
- No explanations

Format:
{
  "skills": ["skill1", "skill2"],
  "confidence": 0.0-1.0
}
"""


@app.post("/extract-skills")
def extract_skills(req: ResumeRequest):

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": req.text},
            ],
        )
        content = completion.choices[0].message.content

        return json.loads(content)

    except Exception as e:
        return {"skills": [], "confidence": 0, "error": str(e)}
