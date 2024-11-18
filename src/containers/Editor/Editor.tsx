import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

import anon from '@/assets/images/anonymous_person.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Selectors } from '@/app/slices/contactsSlice';
import { createContact, updateContact } from '@/app/thunks/contactsThunk';

interface FormData {
  name: string;
  phone: string;
  email: string;
  photoURL?: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
};

const Editor = () => {
  const contacts = useAppSelector(Selectors.contacts);

  const [data, setData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const i = contacts.find((x) => x.id === id);

      if (i) {
        const { id: _, ..._data } = i;
        setData(_data);
      }
    }
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!data.name || !data.phone || !data.email) {
      openModal();

      return;
    }

    if (!data.photoURL) {
      setData((data) => ({ ...data, photoURL: undefined }));
    }

    if (id) {
      dispatch(updateContact({ id, contact: data }));
    } else {
      dispatch(createContact(data));
    }

    navigate('/');
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Stack gap={1} width={400}>
          <TextField
            label='Name'
            name='name'
            variant='outlined'
            type='text'
            value={data.name}
            onChange={handleChange}
          />
          <TextField
            label='Phone'
            name='phone'
            variant='outlined'
            type='tel'
            value={data.phone}
            onChange={handleChange}
          />
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            type='email'
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            label='Photo URL'
            name='photoURL'
            variant='outlined'
            type='url'
            value={data.photoURL}
            onChange={handleChange}
          />
          <Box sx={{ width: 200, height: 200 }}>
            <img
              src={data.photoURL ? data.photoURL : anon}
              alt={data.photoURL}
              width='100%'
              height='100%'
            />
          </Box>
          <Stack direction='row'>
            <Button type='submit'>Save</Button>
            <Button component={Link} to='/'>
              Back to contacts
            </Button>
          </Stack>
        </Stack>
      </form>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
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
          <Typography>Invalid form values.</Typography>
          <Box alignSelf='flex-end'>
            <Button color='error' onClick={closeModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Editor;
