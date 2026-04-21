# ai-service/utils/parser.py

def clean_text(text: str) -> str:
    if not text:
        return ""

    # remove extra spaces
    text = text.replace("\n", " ")
    text = text.replace("\t", " ")

    # remove multiple spaces
    text = " ".join(text.split())

    return text.strip()