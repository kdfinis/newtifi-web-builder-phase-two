/**
 * AssetRegistry - Central registry for tracking all assets
 * Enables asset reuse, discovery, and usage tracking
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import crypto from 'crypto';
import type { AssetReference, UsageContext, AssetUsage, FileMetadata } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_ROOT = join(__dirname, '../../../data');
const REGISTRY_PATH = join(DATA_ROOT, 'assets', 'registry.json');

export interface AssetQuery {
  type?: string;
  journalId?: string;
  articleId?: string;
  shared?: boolean;
  category?: string;
  search?: string;
}

export class AssetRegistry {
  private static instance: AssetRegistry;
  private registry: Map<string, AssetReference> = new Map();

  private constructor() {
    this.loadRegistry();
  }

  static getInstance(): AssetRegistry {
    if (!AssetRegistry.instance) {
      AssetRegistry.instance = new AssetRegistry();
    }
    return AssetRegistry.instance;
  }

  /**
   * Load registry from disk
   */
  private loadRegistry(): void {
    try {
      if (fs.existsSync(REGISTRY_PATH)) {
        const data = fs.readFileSync(REGISTRY_PATH, 'utf-8');
        const assets: AssetReference[] = JSON.parse(data);
        assets.forEach(asset => {
          this.registry.set(asset.id, asset);
        });
      }
    } catch (error) {
      // Start with empty registry if file doesn't exist or is corrupted
      this.registry = new Map();
    }
  }

  /**
   * Save registry to disk
   */
  private saveRegistry(): void {
    try {
      const dir = dirname(REGISTRY_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const assets = Array.from(this.registry.values());
      fs.writeFileSync(REGISTRY_PATH, JSON.stringify(assets, null, 2));
    } catch (error) {
      console.error('Failed to save asset registry:', error);
    }
  }

  /**
   * Generate asset ID from file
   */
  private async generateAssetId(filePath: string): Promise<string> {
    const checksum = await this.generateChecksum(filePath);
    const stats = fs.statSync(filePath);
    const filename = filePath.split('/').pop() || 'asset';
    const hash = crypto.createHash('md5')
      .update(`${checksum}-${stats.size}-${filename}`)
      .digest('hex')
      .substring(0, 12);
    return `asset-${hash}`;
  }

  /**
   * Generate checksum
   */
  private async generateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Register a new asset
   */
  async registerAsset(
    filePath: string,
    type: AssetReference['type'],
    metadata: Partial<FileMetadata>,
    shared: boolean = false,
    journalId?: string,
    articleId?: string
  ): Promise<string> {
    try {
      // Check for duplicates
      const existing = await this.detectDuplicate(filePath);
      if (existing) {
        // Link existing asset to new context
        if (articleId && journalId) {
          await this.linkAsset(existing.id, { journalId, articleId, context: 'main' });
        }
        return existing.id;
      }

      // Generate asset ID
      const assetId = await this.generateAssetId(filePath);
      
      // Get file stats
      const stats = fs.statSync(filePath);
      const ext = filePath.split('.').pop() || '';
      
      // Determine storage path
      let storagePath: string;
      let url: string;
      
      if (shared) {
        const category = type === 'image' ? 'images' : type === 'figure' ? 'figures' : 'media';
        storagePath = join(__dirname, '../../../storage/shared', category, `${assetId}.${ext}`);
        url = `/storage/shared/${category}/${assetId}.${ext}`;
      } else if (journalId && articleId) {
        storagePath = filePath; // Already in journal structure
        url = `/storage/journals/${journalId}/articles/${articleId}/assets/${assetId}.${ext}`;
      } else {
        storagePath = join(__dirname, '../../../storage/assets', `${assetId}.${ext}`);
        url = `/storage/assets/${assetId}.${ext}`;
      }

      // Create asset reference
      const asset: AssetReference = {
        id: assetId,
        type,
        path: storagePath,
        url,
        metadata: {
          filename: `${assetId}.${ext}`,
          originalName: metadata.originalName || filePath.split('/').pop() || 'asset',
          mimeType: metadata.mimeType || this.getMimeType(ext),
          size: stats.size,
          checksum: `sha256:${await this.generateChecksum(filePath)}`,
          uploadedAt: new Date().toISOString(),
          uploadedBy: metadata.uploadedBy,
        },
        journalId,
        articleId,
        shared,
      };

      // Register asset
      this.registry.set(assetId, asset);
      this.saveRegistry();

      return assetId;
    } catch (error) {
      throw new Error(`Failed to register asset: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get asset by ID
   */
  getAsset(assetId: string): AssetReference | null {
    return this.registry.get(assetId) || null;
  }

  /**
   * Find assets matching query
   */
  findAssets(query: AssetQuery): AssetReference[] {
    let results = Array.from(this.registry.values());

    if (query.type) {
      results = results.filter(a => a.type === query.type);
    }

    if (query.journalId) {
      results = results.filter(a => a.journalId === query.journalId);
    }

    if (query.articleId) {
      results = results.filter(a => a.articleId === query.articleId);
    }

    if (query.shared !== undefined) {
      results = results.filter(a => a.shared === query.shared);
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      results = results.filter(a => 
        a.metadata.originalName.toLowerCase().includes(searchLower) ||
        a.id.toLowerCase().includes(searchLower)
      );
    }

    return results;
  }

  /**
   * Get asset usage across articles/journals
   */
  getAssetUsage(assetId: string): AssetUsage | null {
    const asset = this.getAsset(assetId);
    if (!asset) return null;

    // Find all contexts where this asset is used
    const contexts: UsageContext[] = [];
    
    if (asset.journalId && asset.articleId) {
      contexts.push({
        journalId: asset.journalId,
        articleId: asset.articleId,
        context: 'main',
      });
    }

    // TODO: Load usage data from separate usage tracking file
    // For now, return basic usage info

    return {
      assetId,
      contexts,
      lastUsed: asset.metadata.uploadedAt,
    };
  }

  /**
   * Link asset to a context
   */
  async linkAsset(assetId: string, context: UsageContext): Promise<void> {
    const asset = this.getAsset(assetId);
    if (!asset) {
      throw new Error(`Asset ${assetId} not found`);
    }

    // Update asset with new context
    if (context.articleId) {
      asset.articleId = context.articleId;
    }
    if (context.journalId) {
      asset.journalId = context.journalId;
    }

    this.registry.set(assetId, asset);
    this.saveRegistry();
  }

  /**
   * Detect duplicate files
   */
  async detectDuplicate(filePath: string): Promise<AssetReference | null> {
    try {
      const checksum = await this.generateChecksum(filePath);
      const stats = fs.statSync(filePath);

      // Check all assets for matching checksum and size
      for (const asset of this.registry.values()) {
        if (asset.metadata.checksum === `sha256:${checksum}` && 
            asset.metadata.size === stats.size) {
          return asset;
        }
      }

      return null;
    } catch (error) {
      return null;
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
}

export const assetRegistry = AssetRegistry.getInstance();
