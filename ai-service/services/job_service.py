import json
from core.groq_client import client
from prompts.job_prompt import JOB_PROMPT
from core.config import settings
from utils.parser import clean_text
from utils.json_safe import safe_json


def extract_job_skills_service(text: str):

    text = clean_text(text)

    completion = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {"role": "system", "content": JOB_PROMPT},
            {"role": "user", "content": text},
        ],
    )

    content = completion.choices[0].message.content or ""

    # print("RAW JOB AI RESPONSE:", content)  # DEBUG

    return safe_json(content)
