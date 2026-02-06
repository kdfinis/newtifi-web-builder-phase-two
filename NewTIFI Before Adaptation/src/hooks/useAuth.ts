// Authentication React Hook

import { useState, useEffect, useCallback } from 'react';
import { User, AuthResult, LoginCredentials, AdminCredentials } from '@/lib/auth/types';
import { authManager } from '@/lib/auth/AuthManager';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = () => {
      try {
        const currentUser = authManager.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error initializing auth:', err);
        setError('Failed to initialize authentication');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signInWithGoogle = useCallback(async (googleToken: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authManager.signInWithGoogle(googleToken);
      
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Google sign-in failed');
      }
      
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const signInWithEmail = useCallback(async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authManager.signInWithEmail(credentials);
      
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Email sign-in failed');
      }
      
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Email sign-in failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const signInAsAdmin = useCallback(async (credentials: AdminCredentials): Promise<AuthResult> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authManager.signInAsAdmin(credentials);
      
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Admin sign-in failed');
      }
      
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Admin sign-in failed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await authManager.signOut();
      setUser(null);
      
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign-out failed';
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  const hasPermission = useCallback((resource: string, action: string): boolean => {
    return authManager.hasPermission(resource, action);
  }, []);

  const canAccessRoute = useCallback((route: string): boolean => {
    return authManager.canAccessRoute(route);
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return authManager.isAuthenticated();
  }, []);

  const isAdmin = useCallback((): boolean => {
    return authManager.isAdmin();
  }, []);

  const isProfessor = useCallback((): boolean => {
    return authManager.isProfessor();
  }, []);

  const isReviewer = useCallback((): boolean => {
    return authManager.isReviewer();
  }, []);

  const isAuthor = useCallback((): boolean => {
    return authManager.isAuthor();
  }, []);

  const isMember = useCallback((): boolean => {
    return authManager.isMember();
  }, []);

  const getAccessibleRoutes = useCallback((): string[] => {
    return authManager.getAccessibleRoutes();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signInAsAdmin,
    signOut,
    hasPermission,
    canAccessRoute,
    isAuthenticated,
    isAdmin,
    isProfessor,
    isReviewer,
    isAuthor,
    isMember,
    getAccessibleRoutes,
    clearError
  };
};