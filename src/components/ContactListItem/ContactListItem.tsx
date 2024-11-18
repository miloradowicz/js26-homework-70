import { FC } from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import anon from '@/assets/images/anonymous_person.svg';
import { useAppDispatch } from '@/app/hooks';
import { showModal } from '@/app/slices/contactDetailsSlice';
import { Contact } from '@/app/types';

interface Props {
  contact: Contact;
}

const ContactListItem: FC<Props> = ({ contact }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(showModal(contact));
  };

  return (
    <Card
      variant='outlined'
      sx={{ height: 100, display: 'flex', alignItems: 'center', p: 1 }}
      onClick={handleClick}
    >
      <CardMedia
        component='img'
        image={contact.photoURL ?? anon}
        alt={contact.name}
        sx={{ width: 50, height: 50 }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>{contact.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ContactListItem;
