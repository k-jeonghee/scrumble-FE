import { globalStyles } from '@/styles';
import { Global } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Outlet />
    </>
  );
}

export default App;
