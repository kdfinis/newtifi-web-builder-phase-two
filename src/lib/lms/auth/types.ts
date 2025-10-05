// LMS Authentication Types - Additional to existing auth system
export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  REVIEWER = 'REVIEWER',
  AUTHOR = 'AUTHOR',
  MEMBER = 'MEMBER',
}

export interface LMSUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  googleId?: string;
  linkedinId?: string;
}

export interface LMSAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // Unix timestamp
}

export interface LMSAuthResult {
  success: boolean;
  user?: LMSUser;
  token?: LMSAuthToken;
  error?: string;
}
