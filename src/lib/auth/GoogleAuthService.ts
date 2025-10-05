// Google OAuth Authentication Service

import { GoogleUser, AuthResult, User, UserRole, Permission } from './types';
import { URLS } from '../urls';

class GoogleAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
    this.clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'your-google-client-secret';
    this.redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:1000/auth/callback';
  }

  async authenticateUser(googleToken: string): Promise<AuthResult> {
    try {
      console.log('🔐 Authenticating user with Google token');
      
      // Verify Google token
      const googleUser = await this.verifyGoogleToken(googleToken);
      console.log('✅ Google token verified for:', googleUser.email);
      
      // Check if user exists in localStorage (simulating database)
      let user = await this.findUserByEmail(googleUser.email);
      
      if (!user) {
        console.log('👤 Creating new user with MEMBER role');
        // Create new user with MEMBER role
        user = await this.createUser({
          email: googleUser.email,
          name: googleUser.name,
          role: UserRole.MEMBER,
          profile: {
            avatar: googleUser.picture,
            researchInterests: [],
            publications: [],
            socialLinks: []
          }
        });
      } else {
        console.log('👤 Updating existing user last login');
        // Update last login
        await this.updateLastLogin(user.id);
      }
      
      // Generate auth token
      const token = this.generateAuthToken(user);
      
      return { 
        success: true, 
        user, 
        token 
      };
    } catch (error) {
      console.error('❌ Google authentication failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Authentication failed' 
      };
    }
  }

  async verifyGoogleToken(token: string): Promise<GoogleUser> {
    try {
      const response = await fetch(`${URLS.EXTERNAL.GOOGLE_OAUTH}/tokeninfo?access_token=${token}`);
      if (!response.ok) {
        throw new Error('Invalid Google token');
      }
      const data = await response.json();
      return {
        id: data.sub,
        email: data.email,
        name: data.name,
        picture: data.picture,
        verified_email: data.email_verified === 'true'
      };
    } catch (error) {
      console.error('❌ Google token verification failed:', error);
      throw new Error('Failed to verify Google token');
    }
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    try {
      const users = this.getStoredUsers();
      return users.find(user => user.email === email) || null;
    } catch (error) {
      console.error('❌ Error finding user by email:', error);
      return null;
    }
  }

  private async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      permissions: this.getDefaultPermissions(userData.role!),
      profile: userData.profile!,
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

    // Store user in localStorage
    this.storeUser(newUser);
    console.log('✅ User created and stored:', newUser.email);
    
    return newUser;
  }

  private async updateLastLogin(userId: string): Promise<void> {
    try {
      const users = this.getStoredUsers();
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date();
        this.storeUsers(users);
        console.log('✅ Last login updated for user:', userId);
      }
    } catch (error) {
      console.error('❌ Error updating last login:', error);
    }
  }

  private getDefaultPermissions(role: UserRole): Permission[] {
    const permissions: Map<UserRole, Permission[]> = new Map([
      [UserRole.ADMIN, [
        { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'articles', actions: ['create', 'read', 'update', 'delete', 'publish'] },
        { resource: 'reviews', actions: ['create', 'read', 'update', 'delete', 'assign'] },
        { resource: 'analytics', actions: ['read'] },
        { resource: 'settings', actions: ['read', 'update'] }
      ]],
      [UserRole.PROFESSOR, [
        { resource: 'articles', actions: ['create', 'read', 'update', 'publish'] },
        { resource: 'reviews', actions: ['create', 'read', 'update'] },
        { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'analytics', actions: ['read'] }
      ]],
      [UserRole.REVIEWER, [
        { resource: 'articles', actions: ['read'] },
        { resource: 'reviews', actions: ['create', 'read', 'update'] }
      ]],
      [UserRole.AUTHOR, [
        { resource: 'articles', actions: ['create', 'read', 'update'] },
        { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] }
      ]],
      [UserRole.MEMBER, [
        { resource: 'articles', actions: ['read'] }
      ]]
    ]);

    return permissions.get(role) || [];
  }

  private generateAuthToken(user: User): AuthToken {
    return {
      accessToken: `token_${user.id}_${Date.now()}`,
      refreshToken: `refresh_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
  }

  private getStoredUsers(): User[] {
    try {
      const stored = localStorage.getItem('newtifi_users');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('❌ Error reading stored users:', error);
      return [];
    }
  }

  private storeUser(user: User): void {
    try {
      const users = this.getStoredUsers();
      const existingIndex = users.findIndex(u => u.id === user.id);
      
      if (existingIndex !== -1) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }
      
      this.storeUsers(users);
    } catch (error) {
      console.error('❌ Error storing user:', error);
    }
  }

  private storeUsers(users: User[]): void {
    try {
      localStorage.setItem('newtifi_users', JSON.stringify(users));
    } catch (error) {
      console.error('❌ Error storing users:', error);
    }
  }
}

export const googleAuthService = new GoogleAuthService();
