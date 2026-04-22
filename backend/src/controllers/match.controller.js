import Resume from "../models/Resume.model.js";
import Analysis from "../models/Analysis.model.js";
import axios from "axios";
import "dotenv/config";
const extractIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip
  );
};

import { extractJobSkills } from "../ai/skillExtrator.js";
import { matchSkills } from "../utils/skillMatcher.js";
// const AI_SERVICE_URL = process.env.AI_SERVICE_URL ?? "http://127.0.0.1:8000";

export const matchResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, resumeSkills, guestId } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const ip = extractIp(req);
    const userId = req.user?.userId || null;
    const isGuest = !userId;
    console.log(userId);
    // BLOCK guest after one use
    if (isGuest) {
      if (!guestId) {
        return res.status(400).json({ message: "guestId is required" });
      }

      const alreadyUsed = await Analysis.findOne({
        $or: [{ guestId }, { ip }],
      });

      if (alreadyUsed) {
        return res.status(403).json({
          guest: true,
          blocked: true,
          message: "Login required after free usage",
        });
      }
    }

    if (userId && guestId) {
      const guestRecord = await Analysis.findOne({
        $or: [{ guestId }, { ip }],
      });

      if (guestRecord) {
        guestRecord.userId = userId;
        guestRecord.resumeId = resumeId;
        await guestRecord.save();
      }
      // If no guest record exists, that's fine — nothing to migrate
    }

    //  GET RESUME SKILLS
    let resume_Skills = resumeSkills || [];

    if (userId && resumeId) {
      const resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      resume_Skills = resume.skills || [];
    }

    //  AI CALL
    const { skills: jobSkills, confidence } =
      await extractJobSkills(jobDescription);

    //  MATCH
    const { matchedSkills, missingSkills, weakMatches } = matchSkills(
      resume_Skills,
      jobSkills,
    );

    //  SCORE
    const total = jobSkills.length;

    const score =
      total === 0
        ? 0
        : Math.round(
            ((matchedSkills.length + weakMatches.length * 0.5) / total) * 100,
          );

    //  FEEDBACK
    const feedback = [];

    if (missingSkills.length > 0) {
      feedback.push(`Missing skills: ${missingSkills.slice(0, 5).join(", ")}`);
    }

    if (weakMatches.length > 0) {
      feedback.push(`Weak matches: ${weakMatches.slice(0, 5).join(", ")}`);
    }

    if (score > 70) {
      feedback.push("Strong match 🎯");
    } else if (score > 40) {
      feedback.push("Moderate match");
    } else {
      feedback.push("Low match");
    }

    //  SINGLE DB WRITE (FIXED)
    await Analysis.create({
      userId: userId || null,
      guestId: isGuest ? guestId : null,
      ip: isGuest ? ip : null,
      resumeId: userId ? resumeId : null,
      jobDescription,
      score,
      matchedSkills,
      missingSkills,
      weakMatches,
      jobSkills,
      feedback,
      status: "completed",
    });

    //  RESPONSE
    res.status(200).json({
      matchScore: score,
      matchedSkills,
      missingSkills,
      weakMatches,
      jobSkills,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Matching failed",
      error: error.message,
    });
  }
};
