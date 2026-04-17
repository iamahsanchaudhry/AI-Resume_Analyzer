import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    text: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    aiConfidence: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["processing", "processed", "failed"],
      default: "processing",
    },

    extractedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

resumeSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Resume", resumeSchema);
