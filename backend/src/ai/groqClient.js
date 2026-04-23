import Groq from "groq-sdk";
import "dotenv/config";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Primary model — higher quality, lower TPM (6K/min on free tier)
export const PRIMARY_MODEL = {
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  top_p: 1.0,
};

// Fallback model — lower quality, higher TPM (20K/min on free tier)
export const FALLBACK_MODEL = {
  model: "llama-3.1-8b-instant",
  temperature: 0,
  top_p: 1.0,
};

// Kept for backwards compatibility with existing imports
export const MODEL_CONFIG = PRIMARY_MODEL;

export default client;
