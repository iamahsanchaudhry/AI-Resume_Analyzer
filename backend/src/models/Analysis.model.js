import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    guestId: {
      type: String,
      required: false,
    },

    ip: {
      type: String,
      required: false,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: false,
      index: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0, // 0 - 100 match score
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    feedback: {
      type: [String],
      default: [],
    },

    weakMatches: {
      type: [String],
      default: [],
    },

    jobSkills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  },
);

// indexes for performance
analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ resumeId: 1 });

export default mongoose.model("Analysis", analysisSchema);
