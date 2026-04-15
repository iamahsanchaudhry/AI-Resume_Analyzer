import mongoose from "mongoose";

// This schema represents a single uploaded resume
const resumeSchema = new mongoose.Schema(
  {
    // Stored filename on server (unique, disk storage)
    filename: {
      type: String,
      required: true,
    },

    // Original filename uploaded by user
    originalName: {
      type: String,
      required: true,
    },

    // File Hash
    fileHash: {
      type: String,
      required: true,
    },

    // Full extracted text (used for AI parsing later)
    text: {
      type: String,
      default: "",
    },

    // Array of extracted skills from resume (empty for now)
    skills: {
      type: [String],
      default: [],
    },

    aiConfidence:{
      type: Number,
      default:0,
    },

    // Optional field: Job matching score (0-100)
    matchScore: {
      type: Number,
      default: 0,
    },

    // Optional field: Stores the job description ID if you match later
    matchedJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },

    // Processing status: uploaded → processing → processed → failed
    status: {
      type: String,
      enum: ["uploaded", "processing", "processed", "failed"],
      default: "uploaded",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Index on status & createdAt for faster queries in dashboards
resumeSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Resume", resumeSchema);
