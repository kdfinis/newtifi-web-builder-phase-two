// LMS Authentication Manager - Additional to existing auth system
import { LMSUser, LMSAuthToken, LMSAuthResult, UserRole } from './types';

class LMSAuthManager {
  private static instance: LMSAuthManager;
  private user: LMSUser | null = null;
  private token: LMSAuthToken | null = null;
  private localStorageKey = 'newtifi_lms_auth';

  private constructor() {
    this.loadSession();
  }

  public static getInstance(): LMSAuthManager {
    if (!LMSAuthManager.instance) {
      LMSAuthManager.instance = new LMSAuthManager();
    }
    return LMSAuthManager.instance;
  }

  public async signInWithGoogle(): Promise<LMSAuthResult> {
    try {
      // Mock Google sign-in for now
      const user: LMSUser = {
        id: 'google-user-123',
        email: 'testuser@gmail.com',
        name: 'Test User',
        avatar: '/assets/images/placeholder-avatar.png',
        role: UserRole.MEMBER, // Default role upon Google sign-in
        googleId: 'mock-google-id-123'
      };
      const token: LMSAuthToken = {
        accessToken: 'mock_google_access_token',
        refreshToken: 'mock_google_refresh_token',
        expiresAt: Date.now() + 3600 * 1000 // 1 hour from now
      };
      
      this.user = user;
      this.token = token;
      this.saveSession();
      
      return { success: true, user, token };
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return { success: false, error: error.message };
    }
  }

  public async signInWithEmail(email: string, password: string): Promise<LMSAuthResult> {
    try {
      // Check for admin login first
      if (email === 'admin' && password === 'B1950') {
        const adminUser: LMSUser = {
          id: 'admin-user-001',
          email: 'admin@newtifi.com',
          name: 'NewTIFI Admin',
          avatar: '/assets/images/admin-avatar.png',
          role: UserRole.ADMIN,
        };
        const adminToken: LMSAuthToken = {
          accessToken: 'mock_admin_access_token_supersecret',
          expiresAt: Date.now() + 7 * 24 * 3600 * 1000, // 7 days
        };
        this.user = adminUser;
        this.token = adminToken;
        this.saveSession();
        return { success: true, user: adminUser, token: adminToken };
      }

      // Simulate email/password login for regular users
      if (email === 'test@example.com' && password === 'password') {
        const user: LMSUser = {
          id: 'email-user-456',
          email: email,
          name: 'Email User',
          avatar: '/assets/images/user-avatar.png',
          role: UserRole.AUTHOR,
        };
        const token: LMSAuthToken = {
          accessToken: 'mock_email_access_token',
          expiresAt: Date.now() + 3600 * 1000
        };
        this.user = user;
        this.token = token;
        this.saveSession();
        return { success: true, user, token };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Email sign-in failed:', error);
      return { success: false, error: error.message };
    }
  }

  public async signOut(): Promise<void> {
    this.user = null;
    this.token = null;
    this.clearSession();
  }

  public isAuthenticated(): boolean {
    return this.user !== null && this.token !== null && !this.isTokenExpired(this.token);
  }

  public getCurrentUser(): LMSUser | null {
    return this.user;
  }

  public getAccessToken(): string | null {
    return this.token?.accessToken || null;
  }

  public getUserRole(): UserRole | null {
    return this.user?.role || null;
  }

  private loadSession(): void {
    try {
      const sessionData = localStorage.getItem(this.localStorageKey);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        this.user = session.user;
        this.token = session.token;
        
        if (this.token && this.isTokenExpired(this.token)) {
          this.clearSession();
        }
      }
    } catch (error) {
      console.error('Session restoration failed:', error);
      this.clearSession();
    }
  }

  private saveSession(): void {
    if (this.user && this.token) {
      const sessionData = {
        user: this.user,
        token: this.token,
        timestamp: Date.now()
      };
      localStorage.setItem(this.localStorageKey, JSON.stringify(sessionData));
    }
  }

  private clearSession(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  private isTokenExpired(token: LMSAuthToken): boolean {
    return Date.now() >= token.expiresAt;
  }
}

export const lmsAuthManager = LMSAuthManager.getInstance();
