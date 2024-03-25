// routes/userRouter.js
import express from "express";
import {
  resendVerificationEmail,
  verifyUserEmail,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/verify/:verificationToken", verifyUserEmail);
userRouter.post("/verify", resendVerificationEmail); // Новий ендпоінт для повторної відправки email

export default userRouter;
