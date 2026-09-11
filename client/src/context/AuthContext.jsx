import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setAdmin(res.data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Admin token verification failed:', err.response?.data?.message || err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('admin_token', res.data.token);
      setToken(res.data.token);
      setAdmin(res.data.user);
      return res.data;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: Boolean(admin), loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
