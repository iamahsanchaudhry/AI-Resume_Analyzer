import re

def normalize(skill):
    skill = skill.lower()
    skill = re.sub(r'[^a-z0-9]', '', skill)  # remove dots, spaces, symbols
    return skill


def match_skills(resume_skills, job_skills):

    resume_norm = [normalize(s) for s in resume_skills]
    job_norm = [normalize(s) for s in job_skills]

    matched = [job_skills[i] for i, s in enumerate(job_norm) if s in resume_norm]

    missing = [job_skills[i] for i, s in enumerate(job_norm) if s not in resume_norm]

    score = 0 if not job_skills else len(matched) / len(job_skills) * 100

    return {
        "score": round(score, 2),
        "matched": matched,
        "missing": missing
    }