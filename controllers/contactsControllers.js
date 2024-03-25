import { updateContact } from "../services/contactsService.js";

export const updateContactFavorite = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res
        .status(400)
        .json({ message: "Невірне значення для статусу обрані" });
    }

    const updatedContact = await updateContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: "Контакт не знайдено" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};
