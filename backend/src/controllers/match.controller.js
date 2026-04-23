import Resume from "../models/Resume.model.js";
import Analysis from "../models/Analysis.model.js";
import "dotenv/config";

import { extractJobSkills, matchSkillsAI } from "../ai/skillExtrator.js";
import { matchSkills as matchSkillsDeterministic } from "../utils/skillMatcher.js";

const extractIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip
  );
};

export const matchResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, resumeSkills, guestId } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const ip = extractIp(req);
    const userId = req.user?.userId || null;
    const isGuest = !userId;

    // ─── GUEST USAGE CHECK ───
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

    // ─── MIGRATE GUEST RECORD IF NEWLY LOGGED IN ───
    if (userId && guestId) {
      const guestRecord = await Analysis.findOne({
        $or: [{ guestId }, { ip }],
      });

      if (guestRecord) {
        guestRecord.userId = userId;
        guestRecord.resumeId = resumeId;
        await guestRecord.save();
      }
    }

    // ─── GET RESUME SKILLS ───
    let resume_Skills = resumeSkills || [];

    if (userId && resumeId) {
      const resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      resume_Skills = resume.skills || [];
    }

    // Just after fetching resume_Skills:
    const seen = new Set();
    resume_Skills = resume_Skills.filter((s) => {
      const key = String(s).toLowerCase().trim();
      if (seen.has(key) || !key) return false;
      seen.add(key);
      return true;
    });

    // ─── EXTRACT JD SKILLS ───
    const t1 = Date.now();
    const { skills: jobSkills } = await extractJobSkills(jobDescription);
    console.log(`[TIMING] JD extract: ${Date.now() - t1}ms`);

    // ─── MATCH (AI first, deterministic fallback) ───
    const t2 = Date.now();
    let matchResult;
    let matchMethod = "ai";
    try {
      matchResult = await matchSkillsAI(resume_Skills, jobSkills);
      console.log(`[TIMING] AI match: ${Date.now() - t2}ms`);
      // VERIFIER — catch obvious misses
      //matchResult = verifyAndCorrect(matchResult, resume_Skills, jobSkills);
    } catch (err) {
      console.warn("AI matcher failed:", err.message);
      matchResult = matchSkillsDeterministic(resume_Skills, jobSkills);
      matchMethod = "deterministic";
    }

    const {
      matchedSkills,
      weakMatches,
      missingSkills,
      reasoning = {},
    } = matchResult;

    // ─── SCORE ───
    const total = jobSkills.length;
    const score =
      total === 0
        ? 0
        : Math.round(
            ((matchedSkills.length + weakMatches.length * 0.5) / total) * 100,
          );

    // ─── FEEDBACK ───
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

    // ─── SAVE ANALYSIS ───
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
      matchMethod,
      status: "completed",
    });

    // ─── RESPONSE ───
    res.status(200).json({
      matchScore: score,
      matchedSkills,
      missingSkills,
      weakMatches,
      jobSkills,
      feedback,
      reasoning,
      matchMethod,
    });
  } catch (error) {
    console.error("Match error stack:", error);
    console.error("Match error message:", error.message);
    res.status(500).json({
      message: "Matching failed",
      error: error.message,
    });
  }
};
