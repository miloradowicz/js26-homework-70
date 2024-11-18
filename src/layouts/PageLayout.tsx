import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';
import { Container } from '@mui/material';

const PageLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default PageLayout;
