import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from '@/app/slices/contactsSlice';
import { contactDetailsReducer } from './slices/contactDetailsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    contactDetails: contactDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
