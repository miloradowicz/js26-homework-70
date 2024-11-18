import { useEffect } from 'react';

import { useAppDispatch } from '@/app/hooks';
import { syncAllContacts } from '@/app/thunks/contactsThunk';
import ContactList from '@/components/ContactList/ContactList';
import ContactDetailsModal from '@/components/ContactDetailsModal/ContactDetailsModal';

const Viewer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(syncAllContacts());
  }, []);

  return (
    <>
      <ContactList />
      <ContactDetailsModal />
    </>
  );
};

export default Viewer;
