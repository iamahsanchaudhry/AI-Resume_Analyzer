import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadResume } from "../controllers/resume.controller.js";

const router = express.Router();

// Single file upload with field name "resume"
router.post("/upload", upload.single("resume"), uploadResume);

export default router;
