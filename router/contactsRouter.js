// routes/contactsRouter.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { updateContactFavorite } from "../controllers/contactsControllers.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../services/contactsServices.js";

const contactsRouter = express.Router();

contactsRouter.use(authMiddleware);

contactsRouter.get("/", async (req, res) => {
  try {
    const contacts = await getAllContacts(req.user._id);
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

contactsRouter.get("/:contactId", async (req, res) => {
  try {
    const contact = await getOneContact(req.params.contactId, req.user._id);
    if (!contact) {
      return res.status(404).json({ message: "Контакт не знайдено" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

contactsRouter.post("/", async (req, res) => {
  try {
    const newContact = await createContact(req.body, req.user._id);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

contactsRouter.put("/:contactId", async (req, res) => {
  try {
    const updatedContact = await updateContact(
      req.params.contactId,
      req.body,
      req.user._id
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Контакт не знайдено" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

contactsRouter.delete("/:contactId", async (req, res) => {
  try {
    const deletedContact = await deleteContact(
      req.params.contactId,
      req.user._id
    );
    if (!deletedContact) {
      return res.status(404).json({ message: "Контакт не знайдено" });
    }
    res.status(200).json({ message: "Контакт успішно видалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

contactsRouter.patch("/:contactId/favorite", updateContactFavorite);

export default contactsRouter;
