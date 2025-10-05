// Admin Authentication Service

import { User, UserRole, AuthResult, AdminCredentials } from './types';

class AdminAuthService {
  private adminCredentials: AdminCredentials = {
    username: 'admin',
    password: 'B1950'
  };

  async authenticateAdmin(credentials: AdminCredentials): Promise<AuthResult> {
    try {
      console.log('🔐 Authenticating admin user');
      
      if (credentials.username === this.adminCredentials.username && 
          credentials.password === this.adminCredentials.password) {
        
        // Create or get admin user
        let adminUser = await this.findAdminUser();
        if (!adminUser) {
          console.log('👤 Creating admin user');
          adminUser = await this.createAdminUser();
        } else {
          console.log('👤 Updating admin last login');
          await this.updateLastLogin(adminUser.id);
        }
        
        // Generate auth token
        const token = this.generateAuthToken(adminUser);
        
        return { 
          success: true, 
          user: adminUser, 
          token 
        };
      }
      
      return { 
        success: false, 
        error: 'Invalid admin credentials' 
      };
    } catch (error) {
      console.error('❌ Admin authentication failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Admin authentication failed' 
      };
    }
  }

  private async findAdminUser(): Promise<User | null> {
    try {
      const users = this.getStoredUsers();
      return users.find(user => user.role === UserRole.ADMIN) || null;
    } catch (error) {
      console.error('❌ Error finding admin user:', error);
      return null;
    }
  }

  private async createAdminUser(): Promise<User> {
    const adminUser: User = {
      id: 'admin-001',
      email: 'admin@newtifi.com',
      name: 'System Administrator',
      role: UserRole.ADMIN,
      permissions: this.getAdminPermissions(),
      profile: {
        researchInterests: ['System Administration', 'Technology Management'],
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

    // Store admin user
    this.storeUser(adminUser);
    console.log('✅ Admin user created and stored');
    
    return adminUser;
  }

  private getAdminPermissions() {
    return [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'articles', actions: ['create', 'read', 'update', 'delete', 'publish'] },
      { resource: 'reviews', actions: ['create', 'read', 'update', 'delete', 'assign'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'settings', actions: ['read', 'update'] },
      { resource: 'admin', actions: ['access'] }
    ];
  }

  private async updateLastLogin(userId: string): Promise<void> {
    try {
      const users = this.getStoredUsers();
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date();
        this.storeUsers(users);
        console.log('✅ Admin last login updated');
      }
    } catch (error) {
      console.error('❌ Error updating admin last login:', error);
    }
  }

  private generateAuthToken(user: User) {
    return {
      accessToken: `admin_token_${user.id}_${Date.now()}`,
      refreshToken: `admin_refresh_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8 hours for admin
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
      console.error('❌ Error storing admin user:', error);
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

export const adminAuthService = new AdminAuthService();
