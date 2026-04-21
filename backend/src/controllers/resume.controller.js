import Resume from "../models/Resume.model.js";
import { extractTextFromBuffer } from "../services/textExtractor.service.js";
import axios from "axios";
import crypto from "crypto";
import "dotenv/config";
import { extractResumeSkills } from "../ai/skillExtrator.js";

export const uploadResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user?.userId || null;
    const fileBuffer = file.buffer;
    const fileHash = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    let resume = null;

    if (userId) {
      resume = await Resume.findOne({ fileHash, userId });

      if (resume?.status === "processed") {
        console.log("Duplicate found for user, returning existing record");
        return res.status(200).json({
          message: "Resume already processed",
          resumeId: resume._id, // _id not resumeId
          skills: resume.skills,
          confidence: resume.aiConfidence,
          guest: false,
        });
      } else if (resume?.status === "failed") {
        console.log(
          "Duplicate found but previous processing failed, reprocessing",
        );
        resume.status = "processing";
        await resume.save();
      } else if (resume?.status === "processing") {
        // still processing, let it fall through and reprocess
      } else {
        console.log("No duplicate found for user, creating new record");
        // no duplicate found
        resume = await Resume.create({
          userId,
          filename: file.originalname,
          originalName: file.originalname,
          fileHash,
          status: "processing",
        });
      }
    }

    // Extract text
    const extractedText = await extractTextFromBuffer(
      fileBuffer,
      file.mimetype,
    );

    // Call AI service
    const { skills: resumeSkills } = await extractResumeSkills(resumeText);

    //const { skills, confidence } = aiResponse.data;

    if (userId && resume) {
      // Logged-in — save to DB
      resume.text = extractedText;
      resume.skills = skills;
      resume.aiConfidence = confidence;
      resume.status = "processed";
      await resume.save();

      return res.status(201).json({
        guest: false,
        resumeId: resume._id,
        skills,
        confidence,
      });
    } else {
      // Guest — return without saving
      return res.status(201).json({
        guest: true,
        resumeId: null,
        skills,
        confidence,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Resume processing failed",
      error: error.message,
    });
  }
};
