// Permission and Authorization Service

import { User, UserRole, Permission } from './types';

class PermissionService {
  private permissions: Map<UserRole, Permission[]> = new Map();

  constructor() {
    this.initializePermissions();
  }

  private initializePermissions() {
    // Admin permissions
    this.permissions.set(UserRole.ADMIN, [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'articles', actions: ['create', 'read', 'update', 'delete', 'publish'] },
      { resource: 'reviews', actions: ['create', 'read', 'update', 'delete', 'assign'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'settings', actions: ['read', 'update'] },
      { resource: 'admin', actions: ['access'] }
    ]);

    // Professor permissions
    this.permissions.set(UserRole.PROFESSOR, [
      { resource: 'articles', actions: ['create', 'read', 'update', 'publish'] },
      { resource: 'reviews', actions: ['create', 'read', 'update'] },
      { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'dashboard', actions: ['access'] }
    ]);

    // Reviewer permissions
    this.permissions.set(UserRole.REVIEWER, [
      { resource: 'articles', actions: ['read'] },
      { resource: 'reviews', actions: ['create', 'read', 'update'] },
      { resource: 'dashboard', actions: ['access'] }
    ]);

    // Author permissions
    this.permissions.set(UserRole.AUTHOR, [
      { resource: 'articles', actions: ['create', 'read', 'update'] },
      { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'dashboard', actions: ['access'] }
    ]);

    // Member permissions
    this.permissions.set(UserRole.MEMBER, [
      { resource: 'articles', actions: ['read'] },
      { resource: 'profile', actions: ['read', 'update'] }
    ]);
  }

  hasPermission(user: User, resource: string, action: string): boolean {
    if (!user || !user.isActive) return false;
    
    const userPermissions = this.permissions.get(user.role) || [];
    return userPermissions.some(permission => 
      permission.resource === resource && 
      permission.actions.includes(action)
    );
  }

  canAccessRoute(user: User, route: string): boolean {
    if (!user || !user.isActive) return false;

    const routePermissions: Map<string, { resource: string; action: string }> = new Map([
      ['/admin', { resource: 'admin', action: 'access' }],
      ['/professor', { resource: 'dashboard', action: 'access' }],
      ['/reviewer', { resource: 'dashboard', action: 'access' }],
      ['/author', { resource: 'dashboard', action: 'access' }],
      ['/articles/submit', { resource: 'articles', action: 'create' }],
      ['/articles/edit', { resource: 'articles', action: 'update' }],
      ['/reviews', { resource: 'reviews', action: 'read' }],
      ['/documents', { resource: 'documents', action: 'read' }],
      ['/analytics', { resource: 'analytics', action: 'read' }],
      ['/profile', { resource: 'profile', action: 'read' }]
    ]);

    const permission = routePermissions.get(route);
    if (!permission) return true; // Public routes

    return this.hasPermission(user, permission.resource, permission.action);
  }

  canPerformAction(user: User, resource: string, action: string): boolean {
    return this.hasPermission(user, resource, action);
  }

  getUserRole(user: User): UserRole {
    return user.role;
  }

  isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  isProfessor(user: User): boolean {
    return user.role === UserRole.PROFESSOR;
  }

  isReviewer(user: User): boolean {
    return user.role === UserRole.REVIEWER;
  }

  isAuthor(user: User): boolean {
    return user.role === UserRole.AUTHOR;
  }

  isMember(user: User): boolean {
    return user.role === UserRole.MEMBER;
  }

  canManageUsers(user: User): boolean {
    return this.hasPermission(user, 'users', 'create') || 
           this.hasPermission(user, 'users', 'update') || 
           this.hasPermission(user, 'users', 'delete');
  }

  canManageArticles(user: User): boolean {
    return this.hasPermission(user, 'articles', 'create') || 
           this.hasPermission(user, 'articles', 'update') || 
           this.hasPermission(user, 'articles', 'delete');
  }

  canReviewArticles(user: User): boolean {
    return this.hasPermission(user, 'reviews', 'create') || 
           this.hasPermission(user, 'reviews', 'update');
  }

  canViewAnalytics(user: User): boolean {
    return this.hasPermission(user, 'analytics', 'read');
  }

  getAccessibleRoutes(user: User): string[] {
    const allRoutes = [
      '/admin',
      '/professor',
      '/reviewer', 
      '/author',
      '/articles/submit',
      '/articles/edit',
      '/reviews',
      '/documents',
      '/analytics',
      '/profile'
    ];

    return allRoutes.filter(route => this.canAccessRoute(user, route));
  }
}

export const permissionService = new PermissionService();
