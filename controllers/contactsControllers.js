<<<<<<< Updated upstream
import contactsService from "../services/contactsServices.js";
import { validationResult } from "express-validator";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  const contact = contactsService.getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const deletedContact = contactsService.removeContact(id);
  if (deletedContact) {
    res.status(200).json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, phone } = req.body;
  const newContact = contactsService.addContact(name, email, phone);
  res.status(201).json(newContact);
};

export const updateContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = contactsService.updateContact(id, {
    name,
    email,
    phone,
  });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
=======
// controllers/contactsControllers.js

import Contact from "./contactModel";

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
>>>>>>> Stashed changes
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
