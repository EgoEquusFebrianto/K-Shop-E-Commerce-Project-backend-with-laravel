import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth-hook';

export const GuestRoute = () => {
    const {isAuthenticated} = useAuth();

    if (isAuthenticated) {
        return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
}