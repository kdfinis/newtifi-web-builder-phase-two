/**
 * Storage System Type Definitions
 * For multi-journal academic publishing platform
 */

export interface StoragePath {
  journalId: string;
  articleId?: string;
  version?: string;
  category?: string;
  assetId?: string;
}

export interface FileMetadata {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  checksum: string;
  uploadedAt: string;
  uploadedBy?: string;
  version?: string;
}

export interface VersionMetadata {
  version: string;
  createdAt: string;
  createdBy?: string;
  reason?: string;
  changes?: string;
  isCurrent: boolean;
}

export interface StorageResult {
  success: boolean;
  path: string;
  url: string;
  metadata: FileMetadata;
  version?: string;
  error?: string;
}

export interface AssetReference {
  id: string;
  type: 'article' | 'image' | 'figure' | 'dataset' | 'media' | 'document';
  path: string;
  url: string;
  metadata: FileMetadata;
  journalId?: string;
  articleId?: string;
  shared: boolean;
}

export interface UsageContext {
  journalId: string;
  articleId?: string;
  context: 'main' | 'supplementary' | 'figure' | 'dataset' | 'cover' | 'logo';
}

export interface AssetUsage {
  assetId: string;
  contexts: UsageContext[];
  lastUsed: string;
}
