/**
 * StorageService - Core storage operations for multi-journal platform
 * Handles journal-scoped file storage, versioning, and path management
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import type { StoragePath, FileMetadata, StorageResult, VersionMetadata } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const STORAGE_ROOT = join(__dirname, '../../../storage');
const DATA_ROOT = join(__dirname, '../../../data');

export class StorageService {
  private static instance: StorageService;

  private constructor() {
    this.ensureDirectories();
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private ensureDirectories(): void {
    const dirs = [
      STORAGE_ROOT,
      join(STORAGE_ROOT, 'journals'),
      join(STORAGE_ROOT, 'shared'),
      join(STORAGE_ROOT, 'assets'),
      join(STORAGE_ROOT, 'archives'),
      DATA_ROOT,
      join(DATA_ROOT, 'journals'),
      join(DATA_ROOT, 'articles'),
      join(DATA_ROOT, 'assets'),
      join(DATA_ROOT, 'versions'),
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Get storage path for a journal
   */
  getJournalPath(journalId: string): string {
    return join(STORAGE_ROOT, 'journals', journalId);
  }

  /**
   * Get storage path for an article
   */
  getArticlePath(journalId: string, articleId: string): string {
    return join(STORAGE_ROOT, 'journals', journalId, 'articles', articleId);
  }

  /**
   * Get storage path for a specific version
   */
  getVersionPath(journalId: string, articleId: string, version: string): string {
    return join(STORAGE_ROOT, 'journals', journalId, 'articles', articleId, version);
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(path: StoragePath): string {
    if (path.articleId && path.version) {
      return `/storage/journals/${path.journalId}/articles/${path.articleId}/${path.version}/file`;
    } else if (path.articleId) {
      return `/storage/journals/${path.journalId}/articles/${path.articleId}/current/file`;
    } else if (path.assetId) {
      if (path.category) {
        return `/storage/shared/${path.category}/${path.assetId}`;
      }
      return `/storage/assets/${path.assetId}`;
    }
    return `/storage/journals/${path.journalId}`;
  }

  /**
   * Generate checksum for a file
   */
  async generateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);
      
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Get next version number for an article
   */
  async getNextVersion(journalId: string, articleId: string): Promise<string> {
    const articlePath = this.getArticlePath(journalId, articleId);
    
    if (!fs.existsSync(articlePath)) {
      return 'v1';
    }

    const entries = fs.readdirSync(articlePath, { withFileTypes: true });
    const versions = entries
      .filter(e => e.isDirectory() && e.name.startsWith('v'))
      .map(e => {
        const match = e.name.match(/^v(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(v => v > 0)
      .sort((a, b) => b - a);

    const nextVersion = versions.length > 0 ? versions[0] + 1 : 1;
    return `v${nextVersion}`;
  }

  /**
   * Store a file with versioning
   */
  async storeFile(
    journalId: string,
    articleId: string,
    filePath: string,
    metadata: Partial<FileMetadata>
  ): Promise<StorageResult> {
    try {
      // Get next version
      const version = await this.getNextVersion(journalId, articleId);
      const versionPath = this.getVersionPath(journalId, articleId, version);
      
      // Create version directory
      if (!fs.existsSync(versionPath)) {
        fs.mkdirSync(versionPath, { recursive: true });
      }

      // Determine file extension and name
      const ext = metadata.filename?.split('.').pop() || 'pdf';
      const storedFilename = `article.${ext}`;
      const targetPath = join(versionPath, storedFilename);

      // Copy file to version directory
      fs.copyFileSync(filePath, targetPath);

      // Generate checksum
      const checksum = await this.generateChecksum(targetPath);

      // Get file stats
      const stats = fs.statSync(targetPath);

      // Create file metadata
      const fileMetadata: FileMetadata = {
        filename: storedFilename,
        originalName: metadata.originalName || metadata.filename || 'article.pdf',
        mimeType: metadata.mimeType || this.getMimeType(ext),
        size: stats.size,
        checksum: `sha256:${checksum}`,
        uploadedAt: new Date().toISOString(),
        uploadedBy: metadata.uploadedBy,
        version,
      };

      // Save metadata
      const metadataPath = join(versionPath, 'metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify(fileMetadata, null, 2));

      // Update current symlink
      const articlePath = this.getArticlePath(journalId, articleId);
      const currentLink = join(articlePath, 'current');
      if (fs.existsSync(currentLink)) {
        fs.unlinkSync(currentLink);
      }
      fs.symlinkSync(version, currentLink, 'dir');

      // Update versions.json
      await this.updateVersionsFile(journalId, articleId, version, {
        version,
        createdAt: fileMetadata.uploadedAt,
        createdBy: metadata.uploadedBy,
        isCurrent: true,
      });

      return {
        success: true,
        path: targetPath,
        url: this.getPublicUrl({ journalId, articleId, version }),
        metadata: fileMetadata,
        version,
      };
    } catch (error) {
      return {
        success: false,
        path: '',
        url: '',
        metadata: {} as FileMetadata,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get file from storage
   */
  getFile(journalId: string, articleId: string, version?: string): string | null {
    try {
      if (version) {
        const versionPath = this.getVersionPath(journalId, articleId, version);
        const filePath = join(versionPath, 'article.pdf');
        if (fs.existsSync(filePath)) {
          return filePath;
        }
      } else {
        // Get current version
        const articlePath = this.getArticlePath(journalId, articleId);
        const currentLink = join(articlePath, 'current');
        if (fs.existsSync(currentLink)) {
          const resolved = fs.readlinkSync(currentLink);
          const filePath = join(articlePath, resolved, 'article.pdf');
          if (fs.existsSync(filePath)) {
            return filePath;
          }
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * List all versions for an article
   */
  listVersions(journalId: string, articleId: string): string[] {
    try {
      const articlePath = this.getArticlePath(journalId, articleId);
      if (!fs.existsSync(articlePath)) {
        return [];
      }

      const entries = fs.readdirSync(articlePath, { withFileTypes: true });
      return entries
        .filter(e => e.isDirectory() && e.name.startsWith('v'))
        .map(e => e.name)
        .sort((a, b) => {
          const aNum = parseInt(a.replace('v', ''), 10);
          const bNum = parseInt(b.replace('v', ''), 10);
          return bNum - aNum; // Newest first
        });
    } catch (error) {
      return [];
    }
  }

  /**
   * Get MIME type from extension
   */
  private getMimeType(ext: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
  }

  /**
   * Update versions.json file
   */
  private async updateVersionsFile(
    journalId: string,
    articleId: string,
    newVersion: string,
    versionMeta: VersionMetadata
  ): Promise<void> {
    const versionsPath = join(DATA_ROOT, 'versions', `${articleId}-versions.json`);
    let versions: VersionMetadata[] = [];

    if (fs.existsSync(versionsPath)) {
      try {
        const data = fs.readFileSync(versionsPath, 'utf-8');
        versions = JSON.parse(data);
        // Mark all previous versions as not current
        versions.forEach(v => {
          if (v.isCurrent) {
            v.isCurrent = false;
          }
        });
      } catch (error) {
        // If file is corrupted, start fresh
        versions = [];
      }
    }

    versions.push(versionMeta);
    versions.sort((a, b) => {
      const aNum = parseInt(a.version.replace('v', ''), 10);
      const bNum = parseInt(b.version.replace('v', ''), 10);
      return bNum - aNum; // Newest first
    });

    fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2));
  }
}

export const storageService = StorageService.getInstance();
