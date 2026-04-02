def match_skills(resume_skills, job_skills):

    matched = [s for s in resume_skills if s in job_skills]

    missing = [s for s in job_skills if s not in resume_skills]

    score = 0 if not job_skills else len(matched) / len(job_skills) * 100

    return {
        "score": round(score, 2),
        "matched": matched,
        "missing": missing
    }