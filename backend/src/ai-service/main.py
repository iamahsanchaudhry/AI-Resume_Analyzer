from fastapi import FastAPI
from models.resume import ResumeRequest
from models.job import JobRequest
from services.resume_service import extract_resume_skills
from services.job_service import extract_job_skills_service

app = FastAPI()

@app.post("/extract-skills")
def extract_skills(req: ResumeRequest):
    return extract_resume_skills(req.text)

@app.post("/extract-job-skills")
def extract_job_skills(req: JobRequest):
    return extract_job_skills_service(req.text)