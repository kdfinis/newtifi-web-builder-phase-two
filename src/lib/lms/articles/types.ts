// LMS Article Types - Additional to existing article system
import { LMSUser } from '../auth/types';

export enum ArticleStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
}

export interface Author {
  id: string;
  name: string;
  email: string;
  isCorresponding: boolean;
}

export interface LMSArticle {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  journalId: string;
  status: ArticleStatus;
  submissionDate: string; // ISO date string
  publishedDate?: string; // ISO date string
  lastModifiedDate: string; // ISO date string
  content: {
    pdfUrl?: string;
    docxUrl?: string;
    thumbnailUrl?: string;
    fullText?: string; // For dynamic articles
  };
  metadata: {
    category: string;
    readingTime?: number; // in minutes
    featured: boolean;
    tags: string[];
    views: number;
    downloads: number;
    citations: number;
    socialShares: {
      twitter: number;
      linkedin: number;
    };
  };
  reviewers?: { userId: string; status: 'assigned' | 'completed' | 'pending' }[];
  reviews?: {
    reviewerId: string;
    score: number; // e.g., 1-10
    comments: string;
    date: string;
  }[];
}
