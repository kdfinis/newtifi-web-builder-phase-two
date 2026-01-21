import { useState, useEffect, useCallback } from 'react';
import { loginEmail, registerEmail, logout as logoutApi, authStatus } from '@/lib/auth';
import { buildApiUrl } from '@/lib/urls';

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
  // LinkedIn API v2 exact field names
  headline?: string;
  location?: {
    name: string;
    country: string;
    geographicArea?: string;
  };
  industry?: string;
  positions?: Array<{
    title: string;
    companyName: string;
    companyId?: string;
    startDate?: {
      year: number;
      month: number;
    };
    endDate?: {
      year: number;
      month: number;
    };
    description?: string;
    location?: {
      name: string;
      country: string;
    };
  }>;
  educations?: Array<{
    schoolName: string;
    schoolId?: string;
    degreeName?: string;
    fieldOfStudy?: string;
    startDate?: {
      year: number;
    };
    endDate?: {
      year: number;
    };
    activities?: string;
  }>;
  skills?: Array<{
    name: string;
    endorsements?: number;
  }>;
  numConnections?: number;
  profileUrl?: string;
  // Additional LinkedIn fields
  firstName?: string;
  lastName?: string;
  vanityName?: string;
  summary?: string;
  specialties?: string[];
  interests?: string[];
  honors?: string[];
  publications?: string[];
  patents?: string[];
  certifications?: Array<{
    name: string;
    authority: string;
    number?: string;
    startDate?: {
      year: number;
      month: number;
    };
    endDate?: {
      year: number;
      month: number;
    };
  }>;
  courses?: Array<{
    name: string;
    number?: string;
  }>;
  volunteer?: Array<{
    role: string;
    organization: string;
    cause: string;
    startDate?: {
      year: number;
      month: number;
    };
    endDate?: {
      year: number;
      month: number;
    };
  }>;
  languages?: Array<{
    name: string;
    proficiency: string;
  }>;
}

export function useSimpleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      // First, check backend session via /api/me
      try {
        const response = await fetch(buildApiUrl('/me'), {
          credentials: 'include'
        });
        
        if (response.ok) {
          const backendUser = await response.json();
          if (backendUser && !backendUser.error) {
            // Backend session exists - use this user
            setUser(backendUser as User);
            setLoading(false);
            return;
          }
        }
      } catch (backendErr) {
        // Backend session check failed, continue to check OAuth
        console.debug('Backend session check failed, checking OAuth:', backendErr);
      }
      
      // Check localStorage for OAuth users
      const oauthUser = localStorage.getItem('newtifi_user');
      const oauthAuth = localStorage.getItem('newtifi_auth');
      
      if (oauthUser && oauthAuth === 'true') {
        const userData = JSON.parse(oauthUser);
        
        // Simple OAuth user - use email as ID for consistency
        const user: User = {
          id: userData.email,
          email: userData.email,
          name: userData.name,
          role: 'MEMBER',
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
      
      // No user found
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
