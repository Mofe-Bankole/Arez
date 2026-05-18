import { PublicKey } from "@solana/web3.js";

const STORAGE_KEY = "arez.contacts";

export type Contact = {
  id: string;
  label: string;
  wallet: string;
  department?: string;
  lastPaid?: string;
};

export function isValidSolanaPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

function readContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Contact[];
  } catch {
    return [];
  }
}

function writeContacts(contacts: Contact[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {
    // ignore
  }
}

export function loadContacts(): Contact[] {
  return readContacts();
}

export function saveContact(contact: Omit<Contact, "id">): Contact {
  const contacts = readContacts();
  const newContact: Contact = {
    ...contact,
    id: crypto.randomUUID(),
  };
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
}

export function deleteContact(id: string): void {
  writeContacts(readContacts().filter((c) => c.id !== id));
}

export function updateContactLastPaid(id: string, date: string): void {
  const contacts = readContacts().map((c) =>
    c.id === id ? { ...c, lastPaid: date } : c,
  );
  writeContacts(contacts);
}
