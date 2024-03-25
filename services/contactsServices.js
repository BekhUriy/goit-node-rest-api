// services/contactsServices.js

import Contact from "../models/contactModel.js";

export const getAllContacts = async (userId) => {
  try {
    return await Contact.find({ owner: userId });
  } catch (error) {
    throw new Error("Не вдалося отримати контакти");
  }
};

export const getOneContact = async (contactId, userId) => {
  try {
    return await Contact.findOne({ _id: contactId, owner: userId });
  } catch (error) {
    throw new Error("Не вдалося знайти контакт");
  }
};

export const deleteContact = async (contactId, userId) => {
  try {
    return await Contact.findOneAndDelete({ _id: contactId, owner: userId });
  } catch (error) {
    throw new Error("Не вдалося видалити контакт");
  }
};

export const createContact = async (contactData, userId) => {
  try {
    return await Contact.create({ ...contactData, owner: userId });
  } catch (error) {
    throw new Error("Не вдалося додати контакт");
  }
};

export const updateContact = async (contactId, contactData, userId) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      contactData,
      { new: true }
    );
  } catch (error) {
    throw new Error("Не вдалося оновити контакт");
  }
};
