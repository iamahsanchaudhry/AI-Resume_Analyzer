import multer from "multer";
import path from "path";

// Where to store uploaded files
const storage = multer.diskStorage({
  destination: "uploads/", // local folder for now
  filename: (req, file, cb) => {
    // Unique filename: timestamp-originalName
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Only allow PDF and DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", 
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "application/msword"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
