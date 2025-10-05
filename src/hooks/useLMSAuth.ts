// LMS Authentication Hook - Additional to existing auth system
import { useState, useEffect, useCallback } from 'react';
import { lmsAuthManager } from '@/lib/lms/auth/LMSAuthManager';
import { lmsPermissionService } from '@/lib/lms/auth/LMSPermissionService';
import { LMSUser, UserRole } from '@/lib/lms/auth/types';

interface LMSAuthState {
  isAuthenticated: boolean;
  user: LMSUser | null;
  isLoading: boolean;
  error: string | null;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessProfessorDashboard: boolean;
  canSubmitArticles: boolean;
  canReviewArticles: boolean;
  canAccessAdminConsole: boolean;
  canApproveAuthors: boolean;
}

export const useLMSAuth = () => {
  const [authState, setAuthState] = useState<LMSAuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
    hasRole: () => false,
    canAccessProfessorDashboard: false,
    canSubmitArticles: false,
    canReviewArticles: false,
    canAccessAdminConsole: false,
    canApproveAuthors: false,
  });

  const updateAuthState = useCallback(() => {
    const user = lmsAuthManager.getCurrentUser();
    const isAuthenticated = lmsAuthManager.isAuthenticated();

    setAuthState({
      isAuthenticated,
      user,
      isLoading: false,
      error: null,
      hasRole: (roles: UserRole[]) => lmsPermissionService.hasRole(user, roles),
      canAccessProfessorDashboard: lmsPermissionService.canAccessProfessorDashboard(user),
      canSubmitArticles: lmsPermissionService.canSubmitArticles(user),
      canReviewArticles: lmsPermissionService.canReviewArticles(user),
      canAccessAdminConsole: lmsPermissionService.canAccessAdminConsole(user),
      canApproveAuthors: lmsPermissionService.canApproveAuthors(user),
    });
  }, []);

  useEffect(() => {
    updateAuthState();
  }, [updateAuthState]);

  const signInWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await lmsAuthManager.signInWithGoogle();
    if (result.success) {
      updateAuthState();
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false, error: result.error || 'Google sign-in failed' }));
    }
    return result;
  };

  const signInWithEmail = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await lmsAuthManager.signInWithEmail(email, password);
    if (result.success) {
      updateAuthState();
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false, error: result.error || 'Email sign-in failed' }));
    }
    return result;
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    await lmsAuthManager.signOut();
    updateAuthState();
  };

  return { ...authState, signInWithGoogle, signInWithEmail, signOut };
};
