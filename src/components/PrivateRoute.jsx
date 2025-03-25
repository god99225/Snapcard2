import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Check if a token exists in localStorage
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;
