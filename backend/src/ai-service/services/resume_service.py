import json
from core.groq_client import client
from prompts.resume_prompt import RESUME_PROMPT
from core.config import settings
from utils.parser import clean_text
from utils.json_safe import safe_json

def extract_resume_skills(text: str):

    text = clean_text(text)

    completion = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {"role": "system", "content": RESUME_PROMPT},
            {"role": "user", "content": text},
        ],
    )

    content = completion.choices[0].message.content or ""

    print("RAW RESUME AI RESPONSE:", content)

    return safe_json(content)