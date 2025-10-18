import { useState, useEffect, useCallback } from 'react';
import { loginEmail, registerEmail, logout as logoutApi, authStatus } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  organization?: string;
  hasGoogleAuth?: boolean;
  hasLinkedInAuth?: boolean;
  hasPasswordAuth?: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useSimpleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const data = await authStatus();
      if (data.loggedIn) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginEmail(email, password);
      if (result.ok && result.user) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const result = await registerEmail(email, password, name);
      if (result.ok && result.user) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Registration failed:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const refreshAuth = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  return { 
    user, 
    loading, 
    login,
    register,
    logout, 
    refreshAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isContributor: user?.role === 'CONTRIBUTOR',
    isMember: user?.role === 'MEMBER'
  };
}
