// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv"; // Додали модуль dotenv для роботи з .env файлом

import contactsRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config(); // Завантажуємо змінні середовища з .env файлу

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  // Використовуємо URI бази даних з .env файлу
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Помилка підключення до бази даних:")
);
db.once("open", function () {
  console.log("Підключення до бази даних успішне");
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Сервер запущено. Використовуйте наш API на порті: 3000");
});
