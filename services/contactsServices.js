<<<<<<< Updated upstream
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "./db/contacts.json");
=======
//services/contactsServices.js
import Contact from "../models/contactModel.js";
>>>>>>> Stashed changes

async function readContacts() {
  const data = await fs.readContacts(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeContacts() {
  console.log(contacts, typeof contacts);
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  console.log(contacts, typeof contacts);
  return fs.listContacts(contactsPath, contacts);
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const remove = contacts.splice(index, 1)[0];
    await writeContacts(contacts);
    return remove;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contact = await readContacts();
  const newContact = {
    ...contact,
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
