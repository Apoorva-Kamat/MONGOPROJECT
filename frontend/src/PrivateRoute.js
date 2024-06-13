import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('token'); // Replace with your authentication logic

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
