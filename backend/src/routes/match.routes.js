import express from "express";
import { matchResume } from "../controllers/match.controller.js";
import { guestAuth } from "../middlewares/authMiddleware/guestAuth.middle.js";

const router = express.Router();

router.post("/match-resume", guestAuth, matchResume);

export default router;
