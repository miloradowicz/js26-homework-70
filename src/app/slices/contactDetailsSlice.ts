import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Contact } from '@/app/types';
import { RootState } from '@/app/store';

interface ContactDetailsState {
  isModalOpen: boolean;
  contact?: Contact;
}

const initialState: ContactDetailsState = { isModalOpen: false };

const contactDetailsSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<Contact>) => {
      state.isModalOpen = true;
      state.contact = payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const contactDetailsReducer = contactDetailsSlice.reducer;
export const { showModal, closeModal } = contactDetailsSlice.actions;

export const Selectors = {
  contact: (state: RootState) => state.contactDetails.contact,
  isModalOpen: (state: RootState) => state.contactDetails.isModalOpen,
};
