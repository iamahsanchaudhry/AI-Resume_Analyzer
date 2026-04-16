import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export const extractTextFromBuffer = async (buffer, mimetype) => {
  // PDF
  if (mimetype === "application/pdf") {
    const data = await PDFParse(buffer);
    return data.text;
  }

  // DOCX
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
};