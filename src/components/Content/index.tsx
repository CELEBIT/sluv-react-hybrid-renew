import React, { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes from '../../routes';
import BottomNav from '../BottomNav/BottomNav';

const AppContent = () => {
  const location = useLocation();
  const [isExistsFilteredRoute] = useState(
    routes.filter((route) => route.path === location.pathname).length > 0,
  );

  return (
    <>
      {!isExistsFilteredRoute ? (
        <Navigate to='/404' />
      ) : (
        <Routes>
          {routes.map(
            (route, idx) =>
              route.element && <Route key={idx} path={route.path} element={<route.element />} />,
          )}
        </Routes>
      )}
      <BottomNav
        // items={bottomNavItems} 
        // defaultSelected={0} 
      />
    </>
  )
}

export default React.memo(AppContent);