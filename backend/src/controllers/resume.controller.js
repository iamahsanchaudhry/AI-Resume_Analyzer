import { processResume } from "../workers/resume.processor.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await processResume(req.file);

   
    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume processing failed",
      error: error.message,
    });
  }
};