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
      // First check localStorage for OAuth users
      const oauthUser = localStorage.getItem('newtifi_user');
      const oauthAuth = localStorage.getItem('newtifi_auth');
      
      if (oauthUser && oauthAuth === 'true') {
        const userData = JSON.parse(oauthUser);
        // Convert OAuth user data to match User interface
        const user: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: 'MEMBER', // Default role for OAuth users
          avatarUrl: userData.avatarUrl,
          hasGoogleAuth: userData.provider === 'google',
          hasLinkedInAuth: userData.provider === 'linkedin',
          hasPasswordAuth: false,
          createdAt: userData.loginTime || new Date().toISOString(),
          updatedAt: userData.loginTime || new Date().toISOString()
        };
        setUser(user);
        setLoading(false);
        return;
      }
      
      // Skip API auth check for OAuth-only setup
      // This prevents 404 errors on /auth/status endpoint
      setUser(null);
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    
    // Listen for storage changes (OAuth login from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'newtifi_user' || e.key === 'newtifi_auth') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom auth events
    const handleAuthEvent = () => {
      checkAuth();
    };
    
    window.addEventListener('authStateChanged', handleAuthEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthEvent);
    };
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
      // Clear OAuth localStorage data
      localStorage.removeItem('newtifi_user');
      localStorage.removeItem('newtifi_auth');
      
      // Try API logout (might fail for OAuth users, that's ok)
      try {
        await logoutApi();
      } catch (err) {
        // OAuth users don't have API sessions, ignore this error
      }
      
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const refreshAuth = useCallback(async () => {
    await checkAuth();
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('authStateChanged'));
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
