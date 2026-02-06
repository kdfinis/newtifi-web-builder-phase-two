// useGoogleAPI - Hook for Google API integration
import { useState, useEffect, useCallback } from 'react';
import { googleAPIService, GoogleDriveFile, GoogleCalendarEvent, GoogleProfile } from '@/lib/api/GoogleAPIService';
import { useAuth } from './useAuth';

export interface UseGoogleAPIReturn {
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  hasPermissions: boolean;
  
  // Profile
  profile: GoogleProfile | null;
  getProfile: () => Promise<GoogleProfile | null>;
  
  // Drive
  driveFiles: GoogleDriveFile[];
  getDriveFiles: (folderId?: string) => Promise<GoogleDriveFile[]>;
  uploadToDrive: (file: File, folderId?: string) => Promise<GoogleDriveFile | null>;
  searchDriveFiles: (query: string) => Promise<GoogleDriveFile[]>;
  getFileContent: (fileId: string) => Promise<Blob | null>;
  shareFile: (fileId: string, email: string, role?: 'reader' | 'writer' | 'owner') => Promise<boolean>;
  
  // Calendar
  calendarEvents: GoogleCalendarEvent[];
  getCalendarEvents: (maxResults?: number) => Promise<GoogleCalendarEvent[]>;
  createCalendarEvent: (event: Omit<GoogleCalendarEvent, 'id'>) => Promise<GoogleCalendarEvent | null>;
  
  // Utility
  clearError: () => void;
  refreshData: () => Promise<void>;
}

export const useGoogleAPI = (): UseGoogleAPIReturn => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  
  // Data state
  const [profile, setProfile] = useState<GoogleProfile | null>(null);
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);

  // Initialize Google API service
  useEffect(() => {
    const initializeGoogleAPI = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        await googleAPIService.initialize();
        setIsInitialized(true);
        setHasPermissions(googleAPIService.hasRequiredPermissions());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Google API initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initializeGoogleAPI();
  }, [isAuthenticated]);

  // Get user profile
  const getProfile = useCallback(async (): Promise<GoogleProfile | null> => {
    if (!isAuthenticated || !hasPermissions) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const profileData = await googleAPIService.getUserProfile();
      setProfile(profileData);
      return profileData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions]);

  // Get Drive files
  const getDriveFiles = useCallback(async (folderId?: string): Promise<GoogleDriveFile[]> => {
    if (!isAuthenticated || !hasPermissions) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const files = await googleAPIService.getDriveFiles(folderId);
      setDriveFiles(files);
      return files;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Drive files';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions]);

  // Upload to Drive
  const uploadToDrive = useCallback(async (file: File, folderId?: string): Promise<GoogleDriveFile | null> => {
    if (!isAuthenticated || !hasPermissions) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const uploadedFile = await googleAPIService.uploadToDrive(file, folderId);
      
      if (uploadedFile) {
        // Refresh files list
        await getDriveFiles();
      }
      
      return uploadedFile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions, getDriveFiles]);

  // Search Drive files
  const searchDriveFiles = useCallback(async (query: string): Promise<GoogleDriveFile[]> => {
    if (!isAuthenticated || !hasPermissions) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const files = await googleAPIService.searchDriveFiles(query);
      return files;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search files';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions]);

  // Get file content
  const getFileContent = useCallback(async (fileId: string): Promise<Blob | null> => {
    if (!isAuthenticated || !hasPermissions) return null;
    
    try {
      setError(null);
      return await googleAPIService.getFileContent(fileId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get file content';
      setError(errorMessage);
      return null;
    }
  }, [isAuthenticated, hasPermissions]);

  // Share file
  const shareFile = useCallback(async (fileId: string, email: string, role: 'reader' | 'writer' | 'owner' = 'reader'): Promise<boolean> => {
    if (!isAuthenticated || !hasPermissions) return false;
    
    try {
      setError(null);
      return await googleAPIService.shareFile(fileId, email, role);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to share file';
      setError(errorMessage);
      return false;
    }
  }, [isAuthenticated, hasPermissions]);

  // Get calendar events
  const getCalendarEvents = useCallback(async (maxResults: number = 10): Promise<GoogleCalendarEvent[]> => {
    if (!isAuthenticated || !hasPermissions) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const events = await googleAPIService.getCalendarEvents(maxResults);
      setCalendarEvents(events);
      return events;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch calendar events';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions]);

  // Create calendar event
  const createCalendarEvent = useCallback(async (event: Omit<GoogleCalendarEvent, 'id'>): Promise<GoogleCalendarEvent | null> => {
    if (!isAuthenticated || !hasPermissions) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const createdEvent = await googleAPIService.createCalendarEvent(event);
      
      if (createdEvent) {
        // Refresh events list
        await getCalendarEvents();
      }
      
      return createdEvent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create calendar event';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions, getCalendarEvents]);

  // Clear error
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Refresh all data
  const refreshData = useCallback(async (): Promise<void> => {
    if (!isAuthenticated || !hasPermissions) return;
    
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        getProfile(),
        getDriveFiles(),
        getCalendarEvents(),
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, hasPermissions, getProfile, getDriveFiles, getCalendarEvents]);

  return {
    loading,
    error,
    isInitialized,
    hasPermissions,
    profile,
    getProfile,
    driveFiles,
    getDriveFiles,
    uploadToDrive,
    searchDriveFiles,
    getFileContent,
    shareFile,
    calendarEvents,
    getCalendarEvents,
    createCalendarEvent,
    clearError,
    refreshData,
  };
};
