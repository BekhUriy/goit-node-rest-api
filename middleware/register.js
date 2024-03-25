// middleware/register.js

import bcrypt from "bcryptjs";
import User from "./userModel";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка, чи існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(password, 12);

    // Створення нового користувача
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
