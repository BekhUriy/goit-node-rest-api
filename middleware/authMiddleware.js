// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "./userModel";

export const authMiddleware = async (req, res, next) => {
  try {
    // Отримання токена з заголовків Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Перевірка токена на валідність
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Запис користувача у req для подальшого використання
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};