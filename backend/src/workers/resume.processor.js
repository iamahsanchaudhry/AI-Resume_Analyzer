import Resume from "../models/Resume.js";
import { extractTextFromFile } from "../services/textExtractor.service.js";
import axios from "axios";

export const processResume = async (file) => {

  // 1. Create DB record
  const resume = await Resume.create({
    filename: file.filename,
    originalName: file.originalname,
    status: "processing",
  });

  const filePath = `uploads/${file.filename}`;

  // 2. Extract text
  const extractedText = await extractTextFromFile(filePath);

  // 3. Call Python AI service
  const aiResponse = await axios.post(
    "http://localhost:8000/extract-skills",
    {
      text: extractedText
    }
  );

  const { skills, confidence } = aiResponse.data;

  // 4. Save AI result into DB
  resume.text = extractedText;
  resume.skills = skills;
  resume.aiConfidence = confidence;
  resume.status = "processed";

  await resume.save();

  return resume;
};