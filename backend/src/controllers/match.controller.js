import Resume from "../models/Resume.model.js";
import Analysis from "../models/Analysis.model.js";
import { matchSkills } from "../utils/skillMatcher.js";

import axios from "axios";

export const matchResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, resumeSkills } = req.body;

    const userId = req.user?.userId;
    let resume_Skills = resumeSkills || [];

    if (resumeId && userId) {
      // 1. Get resume
      const resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      resume_Skills = resume.skills || [];
    }

    // 2. Get job skills from AI service
    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/extract-job-skills",
      { text: jobDescription },
    );

    const jobSkills = aiResponse.data.skills || [];

    // 3. NORMALIZE (IMPORTANT FIX)
    const normalize = (arr) =>
      arr.map((s) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, " "),
      );

    const normalizedResume = normalize(resume_Skills);
    const normalizedJob = normalize(jobSkills);

    // 4. MATCH using normalized data
    const { matchedSkills, missingSkills, weakMatches } = matchSkills(
      normalizedResume,
      normalizedJob,
    );

    // 5. SCORE
    const total = normalizedJob.length;

    const score =
      total === 0
        ? 0
        : Math.round(
            ((matchedSkills.length + weakMatches.length * 0.5) / total) * 100,
          );

    // 6. FEEDBACK
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

    //saving analysis to DB if user is logged in and resumeId is provided
    if (resumeId && userId) {
      const analysisData = await Analysis.create({
        userId,
        resumeId,
        jobDescription,
        score,
        matchedSkills: matchedSkills,
        missingSkills: missingSkills,
        weakMatches: weakMatches,
        jobSkills: jobSkills,
        feedback: feedback,
        status: "completed",
      });
    }
    const isGuest = !userId || !resumeId;
    // 7. RESPONSE
    res.status(201).json({
      matchScore: score,
      matchedSkills,
      missingSkills,
      weakMatches,
      jobSkills,
      feedback,
      guest: isGuest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Matching failed",
      error: error.message,
    });
  }
};
