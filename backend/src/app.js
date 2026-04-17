import express from "express";
import cors from "cors";
import morgan from "morgan";
import resumeRoutes from "./routes/resume.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import matchRoutes from "./routes/match.routes.js";
import { globalLimiter } from "./middlewares/rateLimiter.middleware.js";
import authRoutes from "./routes/authRoutes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//app.use(globalLimiter());

app.use("/api/resumes", resumeRoutes);
app.use("/api", matchRoutes);

//Auth
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
