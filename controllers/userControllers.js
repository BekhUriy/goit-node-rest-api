// controllers/userControllers.js
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../services/emailService.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const verificationToken = uuidv4();

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/users/verify/${verificationToken}`;

    await sendVerificationEmail(email, verificationLink);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user || user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/users/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
