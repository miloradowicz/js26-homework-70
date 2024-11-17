import { createSlice } from '@reduxjs/toolkit';

import { Contact } from '@/app/types';
import { RootState } from '@/app/store';
import {
  createContact,
  deleteContact,
  syncAllContacts,
  syncContact,
  updateContact,
} from '@/app/thunks/contactsThunk';

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncAllContacts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(syncAllContacts.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.contacts = payload;
        } else {
          state.contacts = [];
        }
      })
      .addCase(syncAllContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          state.contacts.push(payload);
        }
      })
      .addCase(createContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(syncContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(syncContact.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.contacts.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.contacts.splice(i, 1, payload);
          }
        }
      })
      .addCase(syncContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.contacts.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.contacts.splice(i, 1, payload);
          }
        }
      })
      .addCase(updateContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          const i = state.contacts.findIndex((x) => x.id === payload);

          if (i >= 0) {
            state.contacts.splice(i, 1);
          }
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const Selectors = {
  contacts: (state: RootState) => state.contacts.contacts,
  loading: (state: RootState) => state.contacts.loading,
  error: (state: RootState) => state.contacts.error,
};
