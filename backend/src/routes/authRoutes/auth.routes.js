import express from "express";
import {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  forgetPassword,
} from "../../controllers/AuthControllers/auth.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/update-profile", authMiddleware, updateUserProfile);
router.post("/forget-password", authMiddleware, forgetPassword);

export default router;
