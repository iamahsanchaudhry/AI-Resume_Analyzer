import Resume from "../models/Resume.js";
import { extractTextFromFile } from "../services/textExtractor.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 1. Create DB record first
    const resume = await Resume.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      status: "processing",
    });

    // 2. Extract text
    const filePath = `uploads/${req.file.filename}`;
    const extractedText = await extractTextFromFile(filePath);

    // 3. Update resume with extracted text
    resume.text = extractedText;
    resume.status = "processed";
    await resume.save();

    res.status(201).json({
      message: "Resume uploaded and processed successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume processing failed",
      error: error.message,
    });
  }
};
