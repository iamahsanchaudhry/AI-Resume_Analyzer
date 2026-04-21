import Groq from "groq-sdk";
import "dotenv/config";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const MODEL_CONFIG = {
  model: "llama-3.1-8b-instant",
  temperature: 0,
  top_p: 1.0,
};

export default client;
