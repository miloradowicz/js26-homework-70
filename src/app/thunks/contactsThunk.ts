import { createAsyncThunk } from '@reduxjs/toolkit';

import { Contact } from '@/app/types';
import api, { ContactBase } from '@/app/api';

export const syncAllContacts = createAsyncThunk(
  'contacts/syncAll',
  api.readAllContacts
);

export const createContact = createAsyncThunk(
  'contacts/create',
  async (contact: ContactBase) => {
    const id = await api.createContact(contact);
    return await api.readContact(id);
  }
);

export const syncContact = createAsyncThunk('contacts/sync', api.readContact);

export const updateContact = createAsyncThunk(
  'contacts/update',
  async ({
    id,
    contact,
  }: {
    id: string;
    contact: ContactBase;
  }): Promise<Contact | null> => {
    void (await api.updateContact(id, contact));
    return await api.readContact(id);
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id: string) => {
    void (await api.deleteContact(id));
    return (await api.readContact(id)) ? null : id;
  }
);
