import React from 'react'
import { useAuth } from '../hooks/auth-hook'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const {loading, isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}