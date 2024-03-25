// contactsControllers.js

import Contact from "../models/contactModel";

// Функція отримання контактів з пагінацією та фільтрацією
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const query = { owner: req.user._id };

    if (favorite) {
      query.favorite = true;
    }

    const contacts = await Contact.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// contactsRouter.js

import express from "express";
import { authMiddleware } from "./authMiddleware";
import { getContacts } from "./contactsControllers";

const contactsRouter = express.Router();

// Роут для отримання контактів
contactsRouter.get("/", authMiddleware, getContacts);

export default contactsRouter;
