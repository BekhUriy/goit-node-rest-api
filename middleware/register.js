// middleware/register.js
import bcrypt from "bcryptjs";
import User from "./userModel";
import { v4 as uuidv4 } from "uuid"; // імпорт генератора UUID

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка, чи існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Генерація verificationToken
    const verificationToken = uuidv4();

    // Відправка email з посиланням для верифікації
    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/users/verify/${verificationToken}`;
    // Реалізуйте відправку email тут з використанням пакету для роботи з email, наприклад nodemailer

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(password, 12);

    // Створення нового користувача з verificationToken
    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });

    // Відповідь з користувачем і статусом 201
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// // middleware/register.js

// import bcrypt from "bcryptjs";
// import User from "./userModel";

// export const registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Перевірка, чи існує користувач з таким email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email in use" });
//     }

//     // Хешування паролю
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Створення нового користувача
//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       user: { email: newUser.email, subscription: newUser.subscription },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Помилка сервера" });
//   }
// };
