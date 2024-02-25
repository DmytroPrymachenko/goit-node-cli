import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactPath = path.resolve("db", "contacts.json");

const upListContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function getAllContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

export async function getContactById(id) {
  const contact = await getAllContacts();
  const res = contact.find(contact.id === id);
  return res || null;
}

export async function removeContact(id) {
  const contact = await getAllContacts();
  const index = contact.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const res = contact.splise(index, 1);
  await upListContacts(contact);
  return res;
}

export async function addContact(name, email, phone) {
  const contact = await getAllContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contact.push(newContact);
  await upListContacts(contact);
  return newContacts;
}
