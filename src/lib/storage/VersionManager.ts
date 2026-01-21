/**
 * VersionManager - Version control for articles and assets
 * Handles version creation, tracking, rollback, and history
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { storageService } from './StorageService';
import type { VersionMetadata } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_ROOT = join(__dirname, '../../../data');

export class VersionManager {
  private static instance: VersionManager;

  private constructor() {}

  static getInstance(): VersionManager {
    if (!VersionManager.instance) {
      VersionManager.instance = new VersionManager();
    }
    return VersionManager.instance;
  }

  /**
   * Get versions file path
   */
  private getVersionsPath(articleId: string): string {
    return join(DATA_ROOT, 'versions', `${articleId}-versions.json`);
  }

  /**
   * Create a new version
   */
  async createVersion(
    journalId: string,
    articleId: string,
    version: string,
    metadata: Partial<VersionMetadata>
  ): Promise<VersionMetadata> {
    const versionMeta: VersionMetadata = {
      version,
      createdAt: new Date().toISOString(),
      createdBy: metadata.createdBy,
      reason: metadata.reason,
      changes: metadata.changes,
      isCurrent: true,
    };

    await this.updateVersionsFile(articleId, versionMeta);
    return versionMeta;
  }

  /**
   * Get version metadata
   */
  getVersion(journalId: string, articleId: string, version: string): VersionMetadata | null {
    const versions = this.listVersions(journalId, articleId);
    return versions.find(v => v.version === version) || null;
  }

  /**
   * List all versions for an article
   */
  listVersions(journalId: string, articleId: string): VersionMetadata[] {
    try {
      const versionsPath = this.getVersionsPath(articleId);
      if (!fs.existsSync(versionsPath)) {
        return [];
      }

      const data = fs.readFileSync(versionsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  /**
   * Set current version
   */
  async setCurrentVersion(
    journalId: string,
    articleId: string,
    version: string
  ): Promise<void> {
    const versions = this.listVersions(journalId, articleId);
    const versionMeta = versions.find(v => v.version === version);
    
    if (!versionMeta) {
      throw new Error(`Version ${version} not found`);
    }

    // Update all versions to mark only this one as current
    versions.forEach(v => {
      v.isCurrent = v.version === version;
    });

    // Save updated versions
    const versionsPath = this.getVersionsPath(articleId);
    fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2));

    // Update symlink
    const articlePath = storageService.getArticlePath(journalId, articleId);
    const currentLink = join(articlePath, 'current');
    if (fs.existsSync(currentLink)) {
      fs.unlinkSync(currentLink);
    }
    fs.symlinkSync(version, currentLink, 'dir');
  }

  /**
   * Rollback to a previous version
   */
  async rollback(
    journalId: string,
    articleId: string,
    targetVersion: string
  ): Promise<void> {
    // Verify version exists
    const version = this.getVersion(journalId, articleId, targetVersion);
    if (!version) {
      throw new Error(`Version ${targetVersion} not found`);
    }

    // Set as current
    await this.setCurrentVersion(journalId, articleId, targetVersion);
  }

  /**
   * Archive a version (move to archives)
   */
  async archiveVersion(
    journalId: string,
    articleId: string,
    version: string
  ): Promise<void> {
    const versionPath = storageService.getVersionPath(journalId, articleId, version);
    if (!fs.existsSync(versionPath)) {
      throw new Error(`Version ${version} not found`);
    }

    const archivePath = join(
      __dirname,
      '../../../storage/archives',
      journalId,
      articleId,
      version
    );

    // Create archive directory
    const archiveDir = dirname(archivePath);
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }

    // Move version to archive
    if (fs.existsSync(archivePath)) {
      // Remove existing archive
      fs.rmSync(archivePath, { recursive: true, force: true });
    }
    fs.renameSync(versionPath, archivePath);
  }

  /**
   * Update versions file
   */
  private async updateVersionsFile(
    articleId: string,
    newVersion: VersionMetadata
  ): Promise<void> {
    const versionsPath = this.getVersionsPath(articleId);
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
        versions = [];
      }
    }

    versions.push(newVersion);
    versions.sort((a, b) => {
      const aNum = parseInt(a.version.replace('v', ''), 10);
      const bNum = parseInt(b.version.replace('v', ''), 10);
      return bNum - aNum; // Newest first
    });

    const dir = dirname(versionsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2));
  }
}

export const versionManager = VersionManager.getInstance();
