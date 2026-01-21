/**
 * AssetDiscovery - Discover and manage reusable assets across journals
 * Enables asset sharing, discovery, and reuse tracking
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { assetRegistry } from '../storage/AssetRegistry';
import type { AssetReference, UsageContext } from '../storage/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface AssetQuery {
  type?: 'image' | 'figure' | 'dataset' | 'media' | 'document';
  journalId?: string;
  category?: string;
  tags?: string[];
  search?: string;
  shared?: boolean;
  limit?: number;
}

export interface DiscoveredAsset extends AssetReference {
  usageCount: number;
  lastUsed?: string;
  journals: string[];
  articles: string[];
}

export class AssetDiscovery {
  private static instance: AssetDiscovery;

  private constructor() {}

  static getInstance(): AssetDiscovery {
    if (!AssetDiscovery.instance) {
      AssetDiscovery.instance = new AssetDiscovery();
    }
    return AssetDiscovery.instance;
  }

  /**
   * Discover assets matching query
   */
  async discoverAssets(query: AssetQuery): Promise<DiscoveredAsset[]> {
    const assets = assetRegistry.findAssets({
      type: query.type,
      journalId: query.journalId,
      shared: query.shared,
      search: query.search,
    });

    // Enrich with usage information
    const discovered: DiscoveredAsset[] = assets.map(asset => {
      const usage = assetRegistry.getAssetUsage(asset.id);
      const journals = new Set<string>();
      const articles = new Set<string>();

      usage?.contexts.forEach(ctx => {
        if (ctx.journalId) journals.add(ctx.journalId);
        if (ctx.articleId) articles.add(ctx.articleId);
      });

      return {
        ...asset,
        usageCount: usage?.contexts.length || 0,
        lastUsed: usage?.lastUsed,
        journals: Array.from(journals),
        articles: Array.from(articles),
      };
    });

    // Filter by category if specified
    if (query.category) {
      return discovered.filter(a => 
        a.path.includes(query.category!) || 
        a.url.includes(query.category!)
      );
    }

    // Filter by tags if specified
    if (query.tags && query.tags.length > 0) {
      // Tags would be stored in metadata - simplified for now
      return discovered;
    }

    // Sort by usage count (most used first)
    discovered.sort((a, b) => b.usageCount - a.usageCount);

    // Apply limit
    const limit = query.limit || 20;
    return discovered.slice(0, limit);
  }

  /**
   * Get shared assets available for reuse
   */
  async getSharedAssets(journalId?: string): Promise<DiscoveredAsset[]> {
    return this.discoverAssets({
      shared: true,
      journalId,
      limit: 50,
    });
  }

  /**
   * Get assets used by a specific article
   */
  async getArticleAssets(journalId: string, articleId: string): Promise<DiscoveredAsset[]> {
    const assets = assetRegistry.findAssets({
      journalId,
      articleId,
    });

    return assets.map(asset => {
      const usage = assetRegistry.getAssetUsage(asset.id);
      return {
        ...asset,
        usageCount: usage?.contexts.length || 0,
        lastUsed: usage?.lastUsed,
        journals: [journalId],
        articles: [articleId],
      };
    });
  }

  /**
   * Get assets by type
   */
  async getAssetsByType(type: AssetReference['type'], limit: number = 20): Promise<DiscoveredAsset[]> {
    return this.discoverAssets({
      type,
      limit,
    });
  }

  /**
   * Get popular assets (most used)
   */
  async getPopularAssets(limit: number = 10): Promise<DiscoveredAsset[]> {
    const allAssets = await this.discoverAssets({ limit: 100 });
    return allAssets
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }

  /**
   * Get recently used assets
   */
  async getRecentAssets(limit: number = 10): Promise<DiscoveredAsset[]> {
    const allAssets = await this.discoverAssets({ limit: 100 });
    return allAssets
      .filter(a => a.lastUsed)
      .sort((a, b) => {
        const aTime = a.lastUsed ? new Date(a.lastUsed).getTime() : 0;
        const bTime = b.lastUsed ? new Date(b.lastUsed).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, limit);
  }

  /**
   * Suggest assets for an article based on keywords
   */
  async suggestAssets(articleKeywords: string[], limit: number = 5): Promise<DiscoveredAsset[]> {
    // Simplified suggestion - in production, use ML or semantic matching
    const allAssets = await this.discoverAssets({ limit: 50 });
    
    // Score assets based on keyword matching in paths/names
    const scored = allAssets.map(asset => {
      const assetText = `${asset.path} ${asset.metadata.originalName}`.toLowerCase();
      const score = articleKeywords.reduce((sum, keyword) => {
        if (assetText.includes(keyword.toLowerCase())) {
          return sum + 1;
        }
        return sum;
      }, 0);

      return { asset, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => ({
        ...item.asset,
        usageCount: 0,
        journals: [],
        articles: [],
      }));
  }

  /**
   * Link asset to article
   */
  async linkAssetToArticle(
    assetId: string,
    journalId: string,
    articleId: string,
    context: UsageContext['context'] = 'main'
  ): Promise<void> {
    await assetRegistry.linkAsset(assetId, {
      journalId,
      articleId,
      context,
    });
  }

  /**
   * Get asset statistics
   */
  async getAssetStats(): Promise<{
    totalAssets: number;
    sharedAssets: number;
    byType: Record<string, number>;
    totalUsage: number;
  }> {
    const allAssets = assetRegistry.findAssets({});
    const sharedAssets = assetRegistry.findAssets({ shared: true });

    const byType: Record<string, number> = {};
    let totalUsage = 0;

    allAssets.forEach(asset => {
      byType[asset.type] = (byType[asset.type] || 0) + 1;
      const usage = assetRegistry.getAssetUsage(asset.id);
      totalUsage += usage?.contexts.length || 0;
    });

    return {
      totalAssets: allAssets.length,
      sharedAssets: sharedAssets.length,
      byType,
      totalUsage,
    };
  }
}

export const assetDiscovery = AssetDiscovery.getInstance();
