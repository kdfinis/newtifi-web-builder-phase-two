// LMS Permission Service - Additional to existing auth system
import { UserRole, LMSUser } from './types';

class LMSPermissionService {
  private static instance: LMSPermissionService;

  private constructor() {}

  public static getInstance(): LMSPermissionService {
    if (!LMSPermissionService.instance) {
      LMSPermissionService.instance = new LMSPermissionService();
    }
    return LMSPermissionService.instance;
  }

  public hasRole(user: LMSUser | null, requiredRoles: UserRole[]): boolean {
    if (!user) {
      return false;
    }
    return requiredRoles.includes(user.role);
  }

  public canAccessProfessorDashboard(user: LMSUser | null): boolean {
    return this.hasRole(user, [UserRole.PROFESSOR, UserRole.ADMIN]);
  }

  public canSubmitArticles(user: LMSUser | null): boolean {
    return this.hasRole(user, [UserRole.AUTHOR, UserRole.PROFESSOR, UserRole.ADMIN]);
  }

  public canReviewArticles(user: LMSUser | null): boolean {
    return this.hasRole(user, [UserRole.REVIEWER, UserRole.PROFESSOR, UserRole.ADMIN]);
  }

  public canAccessAdminConsole(user: LMSUser | null): boolean {
    return this.hasRole(user, [UserRole.ADMIN]);
  }

  public canApproveAuthors(user: LMSUser | null): boolean {
    return this.hasRole(user, [UserRole.ADMIN]);
  }
}

export const lmsPermissionService = LMSPermissionService.getInstance();
