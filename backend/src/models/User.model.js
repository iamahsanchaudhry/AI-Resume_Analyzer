import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },

    firstName: {
      type: String,
      default: "User",
    },
    lastName: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    providerId: {
      type: String,
    },

    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    limits: {
      analysesPerMonth: {
        type: Number,
        default: 5,
      },
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

export default mongoose.model("User", UserSchema);
