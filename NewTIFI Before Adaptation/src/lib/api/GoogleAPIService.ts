// GoogleAPIService - Integration with Google APIs
import { authManager } from '../auth/AuthManager';
import { configManager } from '../config/ConfigManager';
import { URLS, buildExternalUrl } from '../urls';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  webContentLink?: string;
  parents?: string[];
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus: string;
  }>;
}

export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
}

export class GoogleAPIService {
  private static instance: GoogleAPIService;
  private initialized = false;

  private constructor() {}

  static getInstance(): GoogleAPIService {
    if (!GoogleAPIService.instance) {
      GoogleAPIService.instance = new GoogleAPIService();
    }
    return GoogleAPIService.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await configManager.initialize();
      await authManager.initialize();
      this.initialized = true;
      console.log('✅ GoogleAPIService initialized');
    } catch (error) {
      console.error('❌ GoogleAPIService initialization failed:', error);
      throw new Error('Google API service initialization failed');
    }
  }

  // Get user profile from Google
  async getUserProfile(): Promise<GoogleProfile | null> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', '/oauth2/v2/userinfo'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  }

  // Get files from Google Drive
  async getDriveFiles(folderId?: string): Promise<GoogleDriveFile[]> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      let url = buildExternalUrl('GOOGLE_APIS', '/drive/v3/files?fields=files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,parents)');
      
      if (folderId) {
        url += `&q='${folderId}' in parents`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status}`);
      }

      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Failed to fetch Drive files:', error);
      return [];
    }
  }

  // Upload file to Google Drive
  async uploadToDrive(file: File, folderId?: string): Promise<GoogleDriveFile | null> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      // Create file metadata
      const metadata = {
        name: file.name,
        parents: folderId ? [folderId] : [],
      };

      // Create form data
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', '/upload/drive/v3/files?uploadType=multipart'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error(`Google Drive upload error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to upload to Drive:', error);
      return null;
    }
  }

  // Get calendar events
  async getCalendarEvents(maxResults: number = 10): Promise<GoogleCalendarEvent[]> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', `/calendar/v3/events?maxResults=${maxResults}&singleEvents=true&orderBy=startTime`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Calendar API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      return [];
    }
  }

  // Create calendar event
  async createCalendarEvent(event: Omit<GoogleCalendarEvent, 'id'>): Promise<GoogleCalendarEvent | null> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', '/calendar/v3/events'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Google Calendar API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      return null;
    }
  }

  // Search files in Google Drive
  async searchDriveFiles(query: string): Promise<GoogleDriveFile[]> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(buildExternalUrl('GOOGLE_APIS', `/drive/v3/files?q=${encodedQuery}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,parents)`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status}`);
      }

      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Failed to search Drive files:', error);
      return [];
    }
  }

  // Get file content from Google Drive
  async getFileContent(fileId: string): Promise<Blob | null> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', `/drive/v3/files/${fileId}?alt=media`), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Failed to get file content:', error);
      return null;
    }
  }

  // Share file with specific users
  async shareFile(fileId: string, email: string, role: 'reader' | 'writer' | 'owner' = 'reader'): Promise<boolean> {
    try {
      const token = authManager.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(buildExternalUrl('GOOGLE_APIS', `/drive/v3/files/${fileId}/permissions`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          type: 'user',
          emailAddress: email,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to share file:', error);
      return false;
    }
  }

  // Check if user has required permissions
  hasRequiredPermissions(): boolean {
    const token = authManager.getAccessToken();
    return !!token;
  }

  // Get available scopes
  getAvailableScopes(): string[] {
    const authConfig = configManager.getAuthConfig();
    return authConfig.google.scopes;
  }
}

// Export singleton instance
export const googleAPIService = GoogleAPIService.getInstance();
