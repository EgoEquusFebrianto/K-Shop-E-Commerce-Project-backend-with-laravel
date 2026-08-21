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
    const restoreSession = async () => {
      const token = TokenStorage.getToken();

      if (!token || isTokenExpired(token)) {
        AuthService.logout();
        setLoading(false);
        return;
      }

      try {
        const response = await AuthService.getMe();

        const user = response.data ?? response.message;

        setUser(user);
        setIsAuthenticated(true);

        // Simpan data user terbaru
        TokenStorage.save(token, user);
      } catch (error) {
        console.error("Failed to restore session:", error);

        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
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