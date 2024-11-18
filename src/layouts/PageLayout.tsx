import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PageLayout;
