import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = () => {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // Token expired
      return <Navigate to="/login" replace />;
    }
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    // Invalid token
    return <Navigate to="/login" replace />;
  }

  // Token is valid, render children routes/components
  return <Outlet />;
};

export default ProtectedRoute;
