import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 minute
  max: 1, // limit each IP to 30 requests per minute
  message: {
    error: "Too many requests, please try again later.",
  },
});