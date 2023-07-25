import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../constants/routeConfig';

export const AppRouter = () => {
  const routes = Object.values(routeConfig);

  return (
   
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
   
  );
};
