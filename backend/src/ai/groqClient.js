import Groq from "groq-sdk";
import "dotenv/config";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const MODEL_CONFIG = {
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  top_p: 1.0,
};

export default client;
