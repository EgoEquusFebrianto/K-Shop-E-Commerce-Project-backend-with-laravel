import React, { createContext, useCallback, useEffect, useState } from 'react'
import AuthService from './service/auth-service';
import { TokenStorage } from '../../utils/auth/token-storage';
import { isTokenExpired } from '../../utils/auth/jwt-util';

export const AuthContext = createContext(null);

const INACTIVE_TIMEOUT = 15 * 60 * 1000;

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login
  const login = useCallback(async (email, password) => {
    const data = await AuthService.login(
      email,
      password
    );

    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, []);

  // Register
  const register = useCallback(async (request) => {
    const data = await AuthService.register(request)

    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, []);

  // Logout
  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Restore Login
  useEffect(() => {
    const token = TokenStorage.getToken();
    const user = TokenStorage.getUser();

    if (token && user && !isTokenExpired(token)) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      AuthService.logout();
    }

    setLoading(false);
  }, []);


  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};