import { createContext, useCallback, useEffect, useState } from 'react'
import AuthService from './service/auth-service';
import { AccessTokenStorage } from '../../utils/auth/access-token-storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Restore User Data
  const restore = useCallback(async () => {
      const response = await AuthService.getMe();
      const {user} = response;

      if (user !== null) {
          setUser(user);
          setIsAuthenticated(true);
      } else {
          setUser(null);
          setIsAuthenticated(false);
          AccessTokenStorage.clear()
      }

      setLoading(false);
  }, []);

  // Initial restore
  useEffect(() => {
    const restoreSession = async () => {
      await restore();
    };

    restoreSession();
  }, [restore]);

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