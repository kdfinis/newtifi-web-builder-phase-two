// Authentication Types and Interfaces

export enum UserRole {
  ADMIN = 'admin',
  PROFESSOR = 'professor',
  REVIEWER = 'reviewer',
  AUTHOR = 'author',
  MEMBER = 'member'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  profile: UserProfile;
  kpis: UserKPI;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface UserProfile {
  avatar?: string;
  bio?: string;
  institution?: string;
  department?: string;
  researchInterests: string[];
  publications: Publication[];
  socialLinks: SocialLink[];
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface UserKPI {
  articlesPublished: number;
  articlesReviewed: number;
  reviewScore: number;
  responseTime: number;
  collaborationScore: number;
  lastUpdated: Date;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: AuthToken;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
