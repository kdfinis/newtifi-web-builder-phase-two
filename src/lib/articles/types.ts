// Article Management Types and Interfaces

export enum ArticleStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  REVISION_REQUESTED = 'revision_requested',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PUBLISHED = 'published'
}

export enum ArticleType {
  RESEARCH = 'research',
  REVIEW = 'review',
  CASE_STUDY = 'case_study',
  COMMENTARY = 'commentary',
  BOOK_REVIEW = 'book_review'
}

export interface Author {
  id: string;
  name: string;
  email: string;
  institution: string;
  orcid?: string;
  isCorresponding: boolean;
}

export interface ArticleFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface ArticleMetadata {
  doi?: string;
  keywords: string[];
  subjectAreas: string[];
  language: string;
  pageCount: number;
  wordCount: number;
  references: Reference[];
}

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  score: number;
  comments: string;
  recommendations: string[];
  status: ReviewStatus;
  submittedAt?: Date;
  deadline: Date;
  createdAt: Date;
}

export enum ReviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue'
}

export interface ArticleKPI {
  views: number;
  downloads: number;
  citations: number;
  socialShares: number;
  reviewScore: number;
  publicationTime: number;
  lastUpdated: Date;
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  content: string;
  authors: Author[];
  status: ArticleStatus;
  type: ArticleType;
  journal: string;
  metadata: ArticleMetadata;
  files: ArticleFile[];
  reviews: Review[];
  kpis: ArticleKPI;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
}

export interface ArticleFormData {
  title: string;
  abstract: string;
  content: string;
  authors: Author[];
  type: ArticleType;
  journal: string;
  keywords: string[];
  files: ArticleFile[];
}

export interface ReviewFormData {
  score: number;
  comments: string;
  recommendations: string[];
}

export interface ArticleFilters {
  status?: ArticleStatus[];
  type?: ArticleType[];
  journal?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ArticleSearchParams {
  query?: string;
  filters?: ArticleFilters;
  sortBy?: 'title' | 'createdAt' | 'publishedAt' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
