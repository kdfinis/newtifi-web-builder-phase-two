// Centralized Authentication Manager

import { User, AuthResult, AuthToken, LoginCredentials, AdminCredentials } from './types';
import { googleAuthService } from './GoogleAuthService';
import { adminAuthService } from './AdminAuthService';
import { permissionService } from './PermissionService';

class AuthManager {
  private static instance: AuthManager;
  private currentUser: User | null = null;
  private currentToken: AuthToken | null = null;

  private constructor() {
    this.initializeFromStorage();
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private initializeFromStorage(): void {
    try {
      const storedUser = localStorage.getItem('newtifi_current_user');
      const storedToken = localStorage.getItem('newtifi_auth_token');
      
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.currentToken = JSON.parse(storedToken);
        
        // Check if token is expired
        if (this.isTokenExpired(this.currentToken)) {
          console.log('🔄 Auth token expired, clearing session');
          this.clearSession();
        } else {
          console.log('✅ User session restored from storage');
        }
      }
    } catch (error) {
      console.error('❌ Error initializing auth from storage:', error);
      this.clearSession();
    }
  }

  async signInWithGoogle(googleToken: string): Promise<AuthResult> {
    try {
      console.log('🔐 Signing in with Google');
      const result = await googleAuthService.authenticateUser(googleToken);
      
      if (result.success && result.user && result.token) {
        this.setCurrentUser(result.user, result.token);
        console.log('✅ Google sign-in successful');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Google sign-in failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Google sign-in failed' 
      };
    }
  }

  async signInWithEmail(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      console.log('🔐 Signing in with email');
      
      // For now, we'll simulate email login with a test account
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        const user: User = {
          id: 'email-user-456',
          email: credentials.email,
          name: 'Test User',
          role: 'member' as any,
          permissions: permissionService.getUserRole({ role: 'member' as any } as User) ? 
            [{ resource: 'articles', actions: ['read'] }] : [],
          profile: {
            researchInterests: [],
            publications: [],
            socialLinks: []
          },
          kpis: {
            articlesPublished: 0,
            articlesReviewed: 0,
            reviewScore: 0,
            responseTime: 0,
            collaborationScore: 0,
            lastUpdated: new Date()
          },
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true
        };

        const token: AuthToken = {
          accessToken: `email_token_${user.id}_${Date.now()}`,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };

        this.setCurrentUser(user, token);
        console.log('✅ Email sign-in successful');
        
        return { success: true, user, token };
      }
      
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    } catch (error) {
      console.error('❌ Email sign-in failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Email sign-in failed' 
      };
    }
  }

  async signInAsAdmin(credentials: AdminCredentials): Promise<AuthResult> {
    try {
      console.log('🔐 Signing in as admin');
      const result = await adminAuthService.authenticateAdmin(credentials);
      
      if (result.success && result.user && result.token) {
        this.setCurrentUser(result.user, result.token);
        console.log('✅ Admin sign-in successful');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Admin sign-in failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Admin sign-in failed' 
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      console.log('🔐 Signing out user');
      this.clearSession();
      console.log('✅ Sign-out successful');
    } catch (error) {
      console.error('❌ Sign-out failed:', error);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentToken(): AuthToken | null {
    return this.currentToken;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && 
           this.currentToken !== null && 
           !this.isTokenExpired(this.currentToken);
  }

  hasPermission(resource: string, action: string): boolean {
    if (!this.currentUser) return false;
    return permissionService.hasPermission(this.currentUser, resource, action);
  }

  canAccessRoute(route: string): boolean {
    if (!this.currentUser) return false;
    return permissionService.canAccessRoute(this.currentUser, route);
  }

  isAdmin(): boolean {
    return this.currentUser ? permissionService.isAdmin(this.currentUser) : false;
  }

  isProfessor(): boolean {
    return this.currentUser ? permissionService.isProfessor(this.currentUser) : false;
  }

  isReviewer(): boolean {
    return this.currentUser ? permissionService.isReviewer(this.currentUser) : false;
  }

  isAuthor(): boolean {
    return this.currentUser ? permissionService.isAuthor(this.currentUser) : false;
  }

  isMember(): boolean {
    return this.currentUser ? permissionService.isMember(this.currentUser) : false;
  }

  getAccessibleRoutes(): string[] {
    if (!this.currentUser) return [];
    return permissionService.getAccessibleRoutes(this.currentUser);
  }

  private setCurrentUser(user: User, token: AuthToken): void {
    this.currentUser = user;
    this.currentToken = token;
    
    // Store in localStorage
    try {
      localStorage.setItem('newtifi_current_user', JSON.stringify(user));
      localStorage.setItem('newtifi_auth_token', JSON.stringify(token));
    } catch (error) {
      console.error('❌ Error storing user session:', error);
    }
  }

  private clearSession(): void {
    this.currentUser = null;
    this.currentToken = null;
    
    try {
      localStorage.removeItem('newtifi_current_user');
      localStorage.removeItem('newtifi_auth_token');
    } catch (error) {
      console.error('❌ Error clearing user session:', error);
    }
  }

  private isTokenExpired(token: AuthToken | null): boolean {
    if (!token) return true;
    return Date.now() >= token.expiresAt;
  }
}

export const authManager = AuthManager.getInstance();