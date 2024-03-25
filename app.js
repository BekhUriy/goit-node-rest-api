// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/userRouter.js"; // Шлях до вашого файлу userRouter.js

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://db:db@cluster0.zx0orle.mongodb.net/", {
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

mongoose.connect("mongodb+srv://db:db@cluster0.zx0orle.mongodb.net/", {
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

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter); // Доданий маршрут для користувачів

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  process.exit(1);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Сервер запущено. Використовуйте наш API на порті: 3000");
  console.log("Сервер запущено. Використовуйте наш API на порті: 3000");
});
