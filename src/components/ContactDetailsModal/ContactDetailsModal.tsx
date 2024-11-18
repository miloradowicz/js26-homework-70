import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import anon from '@/assets/images/anonymous_person.svg';
import { Link } from 'react-router-dom';
import { deleteContact } from '@/app/thunks/contactsThunk';
import { closeModal, Selectors } from '@/app/slices/contactDetailsSlice';

const ContactDetailsModal = () => {
  const contact = useAppSelector(Selectors.contact);
  const isModalOpen = useAppSelector(Selectors.isModalOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    if (contact) {
      void (await dispatch(deleteContact(contact.id)));
    }
    dispatch(closeModal());
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Button onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>
          Close
        </Button>
        <Card>
          <Stack direction='row'>
            <CardMedia
              component='img'
              image={contact?.photoURL ?? anon}
              sx={{ width: 100, height: 100 }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>{contact?.name}</Typography>
              <Typography>{contact?.phone}</Typography>
              <Typography>{contact?.email}</Typography>
            </CardContent>
          </Stack>
          <CardActions>
            <Button component={Link} to={`edit/${contact?.id}`}>
              Edit
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </CardActions>
        </Card>
      </Stack>
    </Modal>
  );
};

export default ContactDetailsModal;
