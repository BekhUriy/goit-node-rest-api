//services/contactsServices.js
import Contact from "../models/contactModel.js";

export const getAllContacts = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    throw new Error("Не вдалося отримати контакти");
  }
};

export const getOneContact = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error("Не вдалося знайти контакт");
  }
};

export const deleteContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    throw new Error("Не вдалося видалити контакт");
  }
};

export const createContact = async (contactData) => {
  try {
    return await Contact.create(contactData);
  } catch (error) {
    throw new Error("Не вдалося додати контакт");
  }
};

export const updateContact = async (contactId, contactData) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Не вдалося оновити контакт");
  }
};