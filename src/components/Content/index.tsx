import React from 'react'
import { Route, Routes } from 'react-router-dom';
import routes from '../../routes';
import BottomNav from '../BottomNav/BottomNav';

const AppContent = () => {
  return (
    <>
      <Routes>
          {routes.map(
            (route, idx) =>
              route.element && <Route key={idx} path={route.path} element={<route.element />} />,
          )}
        </Routes>
      <BottomNav />
    </>
  )
}

export default AppContent;