import axios from 'axios';

import { Contact } from '@/app/types';

const baseURL =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-70/';

const api = axios.create({ baseURL });

export type ContactBase = Omit<Contact, 'id'>;

type Identifier = {
  name: string;
};

type ContactContainer = {
  [name: string]: ContactBase;
};

const readAllContacts = async (): Promise<Contact[] | null> => {
  const endpoint = 'contacts.json';

  const { data, status, statusText } = await api.get<ContactContainer>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
};

const createContact = async (contact: ContactBase) => {
  const endpoint = `contacts.json`;

  const { data, status, statusText } = await api.post<Identifier>(
    endpoint,
    contact
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data.name;
};

const readContact = async (id: string): Promise<Contact | null> => {
  const endpoint = `contacts/${id}.json`;

  const { data, status, statusText } = await api.get<ContactBase | null>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && { ...data, id };
};

const updateContact = async (
  id: string,
  contact: ContactBase
): Promise<Contact> => {
  const endpoint = `contacts/${id}.json`;

  const { data, status, statusText } = await api.put<ContactBase>(
    endpoint,
    contact
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return { ...data, id };
};

const deleteContact = async (id: string): Promise<void> => {
  const endpoint = `contacts/${id}.json`;

  const { status, statusText } = await api.delete(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }
};

export default {
  readAllContacts,
  createContact,
  readContact,
  updateContact,
  deleteContact,
};
