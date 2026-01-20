import multer from "multer";

const errorHandler = (err, req, res, next) => {
  // Multer built-in errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  // Custom fileFilter errors
  if (err.message === "Only PDF and DOCX files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
