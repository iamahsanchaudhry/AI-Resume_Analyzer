import express from "express";
import cors from "cors";
import morgan from "morgan";
import resumeRoutes from "./routes/resume.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/resumes", resumeRoutes);
export default app;
