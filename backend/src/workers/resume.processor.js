import Resume from "../models/Resume.model.js";
import { extractTextFromBuffer } from "../services/textExtractor.service.js";
import axios from "axios";
import crypto from "crypto";

export const processResume = async (file) => {
  // 1. Get buffer directly
  const fileBuffer = file.buffer;

  // 2. Create hash
  const fileHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // 3. Check duplicate
  let resume = await Resume.findOne({
    fileHash,
  });

  if (resume && resume.status === "processed") {
    console.log("Duplicate found, returning existing record");
    return resume;
  } else if (resume && resume.status === "processing") {
    console.log(
      "Duplicate found but still processing, returning existing record",
    );
  } else if (resume && resume.status === "failed") {
    console.log("Duplicate found but previous processing failed, reprocessing");
    resume.status = "processing";
    await resume.save();
  } else {
    console.log("No duplicate found, creating new record");
    // 4. Create DB record
    resume = await Resume.create({
      filename: file.originalname,
      originalName: file.originalname,
      fileHash,
      status: "processing",
    });
  }

  // 5. Extract text FROM BUFFER (NOT FILE PATH)
  const extractedText = await extractTextFromBuffer(fileBuffer, file.mimetype);

  // 6. Call AI service
  const aiResponse = await axios.post("http://localhost:8000/extract-skills", {
    text: extractedText,
  });

  const { skills, confidence } = aiResponse.data;

  // 7. Save result
  resume.text = extractedText;
  resume.skills = skills;
  resume.aiConfidence = confidence;
  resume.status = "processed";

  await resume.save();

  return resume;
};
