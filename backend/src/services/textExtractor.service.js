import path from "path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export const extractTextFromFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const parser = new PDFParse({ url: filePath, verbosity: 0 });
    await parser.load();
    const result = await parser.getText();
    await parser.destroy();
    return result.text; 
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  throw new Error("Unsupported file type");
};
