import { useAppSelector } from '@/app/hooks';
import { Selectors } from '@/app/slices/contactsSlice';

import { Stack, Typography } from '@mui/material';

import ContactListItem from '@/components/ContactListItem/ContactListItem';

const ContactList = () => {
  const contacts = useAppSelector(Selectors.contacts);

  return (
    <Stack gap={1}>
      {contacts.length ? (
        contacts.map((x) => <ContactListItem key={x.id} contact={x} />)
      ) : (
        <Typography>No contacts yet.</Typography>
      )}
    </Stack>
  );
};

export default ContactList;
