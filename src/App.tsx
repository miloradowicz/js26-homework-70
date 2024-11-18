import { Route, Routes } from 'react-router-dom';

import PageLayout from '@/layouts/PageLayout';
import Page404 from '@/components/Page404/Page404';

import Viewer from '@/containers/Viewer/Viewer';
import Editor from '@/containers/Editor/Editor';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Viewer />} />
          <Route path='new' element={<Editor />} />
          <Route path='edit/:id' element={<Editor />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
