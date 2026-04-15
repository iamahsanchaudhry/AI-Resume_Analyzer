import Resume from "../models/Resume.js";
import { extractTextFromFile } from "../services/textExtractor.service.js";
import axios from "axios";
import fs from "fs";
import crypto from "crypto";

export const processResume = async (file) => {
  const filePath = `uploads/${file.filename}`;

  // 1. Create file hash (IMPORTANT)
  const fileBuffer = fs.readFileSync(filePath);
  const fileHash = crypto
    .createHash("sha256")
    .update(fileBuffer)
    .digest("hex");

  // 2. Check existing resume by hash
  const existing = await Resume.findOne({
    fileHash,
    status: "processed",
  });

  if (existing) {
    console.log("Already exists");
    return existing;
  }

  // 3. Create DB record
  const resume = await Resume.create({
    filename: file.filename,
    originalName: file.originalname,
    fileHash: fileHash,
    status: "processing",
  });

  // 4. Extract text
  const extractedText = await extractTextFromFile(filePath);

  // 5. Call AI service
  const aiResponse = await axios.post(
    "http://localhost:8000/extract-skills",
    { text: extractedText }
  );

  const { skills, confidence } = aiResponse.data;

  // 6. Save result
  resume.text = extractedText;
  resume.skills = skills;
  resume.aiConfidence = confidence;
  resume.status = "processed";

  await resume.save();

  return resume;
};