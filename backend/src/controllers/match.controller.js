import Resume from "../models/Resume.js";
import axios from "axios";

export const matchResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    // 1. Get resume
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeSkills = resume.skills || [];

    // 2. Call AI service for job skills
    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/extract-job-skills",
      {
        text: jobDescription,
      }
    );

    const jobSkills = aiResponse.data.skills || [];

    // 3. Normalize (IMPORTANT)
    const normalize = (arr) =>
      arr.map((s) => s.toLowerCase().trim());

    const normalizedResume = normalize(resumeSkills);
    const normalizedJob = normalize(jobSkills);

    // 4. Match skills
    const matchedSkills = resumeSkills.filter((skill) =>
      normalizedJob.includes(skill.toLowerCase())
    );

    const missingSkills = jobSkills.filter(
      (skill) => !normalizedResume.includes(skill.toLowerCase())
    );

    // 5. Score
    const score =
      normalizedJob.length === 0
        ? 0
        : Math.round((matchedSkills.length / normalizedJob.length) * 100);

    // 6. Response
    res.json({
      matchScore: score,
      matchedSkills,
      missingSkills,
      jobSkills // optional (good for debugging)
    });

  } catch (error) {
    res.status(500).json({
      message: "Matching failed",
      error: error.message,
    });
  }
};