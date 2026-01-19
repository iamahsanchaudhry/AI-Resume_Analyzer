import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    // multer puts the uploaded file info in req.file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = await Resume.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      status: "uploaded", // initial status
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
