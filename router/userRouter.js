// router/userRouter.js

import express from "express";
import { authMiddleware } from "./authMiddleware";
import { updateUserSubscription } from "./userControllers";

const userRouter = express.Router();

// Роут для оновлення підписки користувача
userRouter.patch("/", authMiddleware, updateUserSubscription);

export default userRouter;
