import Resume from "../models/Resume.js";
import axios from "axios";
import { matchSkills } from "../utils/skillMatcher.js";

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
      },
    );

    const jobSkills = aiResponse.data.skills || [];

    // 3. Normalize (IMPORTANT)
    const normalize = (arr) => arr.map((s) => s.toLowerCase().trim());

    const normalizedResume = normalize(resumeSkills);
    const normalizedJob = normalize(jobSkills);

    // 4. Match skills
    const { matchedSkills, missingSkills, weakMatches } = matchSkills(
      resumeSkills,
      jobSkills,
    );

    // 5. Score
    const total = jobSkills.length;

    const score =
      total === 0
        ? 0
        : Math.round(
            ((matchedSkills.length + weakMatches.length * 0.5) / total) * 100,
          );
    //console.log(score,matchedSkills.length, jobSkills.length);

    //6. Feedback
    const feedback = [];

    if (missingSkills.length > 0) {
      feedback.push(
        `You are missing key skills: ${missingSkills.slice(0, 5).join(", ")}`,
      );
    }

    if (weakMatches.length > 0) {
      feedback.push(
        `Partial matches found (improve naming or usage): ${weakMatches.slice(0, 5).join(", ")}`,
      );
    }

    if (score > 70) {
      feedback.push("Strong match for this role 🎯");
    } else if (score > 40) {
      feedback.push("Moderate match — some improvements needed");
    } else {
      feedback.push("Low match — consider upskilling for this role");
    }
    // 7. Response
    res.json({
      matchScore: score,
      matchedSkills,
      missingSkills,
      jobSkills, // optional (good for debugging)
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Matching failed",
      error: error.message,
    });
  }
};
