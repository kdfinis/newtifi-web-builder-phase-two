#!/usr/bin/env node
/**
 * Sync articles with enriched metadata
 * Ensures all published articles have proper data indicators and use new storage paths
 */

import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const DATA_DIR = join(PROJECT_ROOT, 'data');
const ARTICLES_PATH = join(DATA_DIR, 'admin_articles.json');
const METADATA_DIR = join(DATA_DIR, 'articles', 'investment-management');

// Article ID to new storage path mapping
const ARTICLE_STORAGE_MAP = {
  'IMJ-2025-001': '/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf',
  'IMJ-2025-002': '/storage/journals/investment-management/articles/IMJ-2025-002/current/article.pdf',
  'IMJ-2025-003': '/storage/journals/investment-management/articles/IMJ-2025-003/current/article.pdf',
};

function syncArticles() {
  console.log('Syncing articles with enriched metadata...\n');

  try {
    // Read existing articles
    const articlesData = fs.readFileSync(ARTICLES_PATH, 'utf-8');
    const articles = JSON.parse(articlesData);

    // Read enriched metadata
    const metadataFiles = fs.readdirSync(METADATA_DIR).filter(f => f.endsWith('.json'));
    const metadataMap = new Map();

    metadataFiles.forEach(file => {
      try {
        const metadataPath = join(METADATA_DIR, file);
        const metadataData = fs.readFileSync(metadataPath, 'utf-8');
        const metadata = JSON.parse(metadataData);
        metadataMap.set(metadata.id, metadata);
      } catch (error) {
        console.error(`Error reading metadata file ${file}:`, error);
      }
    });

    // Update articles with enriched metadata and new storage paths
    const syncedArticles = articles.map(article => {
      const metadata = metadataMap.get(article.id);
      const newStoragePath = ARTICLE_STORAGE_MAP[article.id];

      // Merge article with metadata
      const synced = {
        ...article,
        // Ensure proper data indicators
        id: article.id,
        status: article.status || 'published',
        publishedDate: article.date || metadata?.publishedDate || new Date().toISOString().split('T')[0],
        date: article.date || metadata?.publishedDate || new Date().toISOString().split('T')[0],
        
        // Update URLs to new storage structure
        url: newStoragePath || article.url,
        pdfUrl: newStoragePath || article.pdfUrl,
        
        // Add enriched metadata if available
        ...(metadata && {
          journalId: metadata.journalId || 'investment-management',
          authors: metadata.authors || [{ name: article.author, order: 1, corresponding: true }],
          subjectAreas: metadata.subjectAreas || [],
          peerReviewed: metadata.peerReviewed !== undefined ? metadata.peerReviewed : true,
          license: metadata.license || 'All Rights Reserved',
          version: metadata.version || 'v1',
          currentVersion: metadata.currentVersion || 'v1',
        }),
        
        // Ensure all required fields
        title: article.title || metadata?.title || '',
        abstract: article.abstract || metadata?.abstract || '',
        author: article.author || (metadata?.authors?.[0]?.name) || '',
        keywords: article.keywords || metadata?.keywords || [],
        doi: article.doi || metadata?.doi || '',
        views: article.views || 0,
        downloads: article.downloads || 0,
        featured: article.featured !== undefined ? article.featured : false,
        category: article.category || 'journal',
        journal: article.journal || 'NewTiFi Investment Management Journal',
        fileSize: article.fileSize || '0 MB',
        lastModified: article.lastModified || new Date().toISOString(),
        requiresLogin: article.requiresLogin !== undefined ? article.requiresLogin : false,
      };

      return synced;
    });

    // Write synced articles back
    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(syncedArticles, null, 2));
    
    console.log('✅ Synced articles:');
    syncedArticles.forEach(article => {
      console.log(`   - ${article.id}: ${article.title.substring(0, 50)}...`);
      console.log(`     Status: ${article.status}, Published: ${article.publishedDate}`);
      console.log(`     Storage: ${article.pdfUrl}`);
    });

    console.log(`\n✅ Sync complete! ${syncedArticles.length} articles synced.`);
  } catch (error) {
    console.error('❌ Error syncing articles:', error);
    process.exit(1);
  }
}

syncArticles();
