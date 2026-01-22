#!/usr/bin/env node
/**
 * Migration Script: Move existing files to new storage structure
 * Migrates from /public/articles/ to /storage/journals/{journal-id}/articles/{article-id}/v1/
 */

import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

// Article ID to Journal ID mapping
const ARTICLE_JOURNAL_MAP = {
  'eltifs-compulsory-redemptions': 'investment-management',
  'IMJ-2025-001': 'investment-management',
  'bafin-portfolio-control': 'investment-management',
  'IMJ-2025-002': 'investment-management',
  'luxembourg-well-informed-investor': 'investment-management',
  'IMJ-2025-003': 'investment-management',
};

// Slug to Article ID mapping
const SLUG_TO_ID = {
  'eltifs-compulsory-redemptions': 'IMJ-2025-001',
  'bafin-portfolio-control': 'IMJ-2025-002',
  'luxembourg-well-informed-investor': 'IMJ-2025-003',
};

async function generateChecksum(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

async function migrateArticle(articlePath, articleId, journalId) {
  try {
    console.log(`Migrating article: ${articleId} to journal: ${journalId}`);

    // Determine article ID from path or slug
    let finalArticleId = articleId;
    const filename = articlePath.split('/').pop() || '';
    
    // Try to match by slug
    for (const [slug, id] of Object.entries(SLUG_TO_ID)) {
      if (filename.includes(slug) || articlePath.includes(slug)) {
        finalArticleId = id;
        break;
      }
    }

    // If still not found, use IMJ format if it looks like an article
    if (!finalArticleId.startsWith('IMJ-')) {
      // Try to extract from filename
      if (filename.includes('ELTIFs') || filename.includes('eltifs')) {
        finalArticleId = 'IMJ-2025-001';
      } else if (filename.includes('BaFin') || filename.includes('bafin')) {
        finalArticleId = 'IMJ-2025-002';
      } else if (filename.includes('Luxembourg') || filename.includes('SICAR')) {
        finalArticleId = 'IMJ-2025-003';
      }
    }

    // Create new directory structure
    const newArticlePath = join(
      PROJECT_ROOT,
      'storage',
      'journals',
      journalId,
      'articles',
      finalArticleId,
      'v1'
    );

    if (!fs.existsSync(newArticlePath)) {
      fs.mkdirSync(newArticlePath, { recursive: true });
    }

    // Copy file
    const ext = articlePath.split('.').pop() || 'pdf';
    const targetFile = join(newArticlePath, `article.${ext}`);
    
    if (!fs.existsSync(targetFile)) {
      fs.copyFileSync(articlePath, targetFile);
      console.log(`  ✓ Copied to: ${targetFile}`);
    } else {
      console.log(`  - Already exists: ${targetFile}`);
    }

    // Generate checksum
    const checksum = await generateChecksum(targetFile);
    const stats = fs.statSync(targetFile);

    // Create metadata
    const metadata = {
      filename: `article.${ext}`,
      originalName: filename,
      mimeType: 'application/pdf',
      size: stats.size,
      checksum: `sha256:${checksum}`,
      uploadedAt: stats.mtime.toISOString(),
      version: 'v1',
    };

    // Save metadata
    const metadataPath = join(newArticlePath, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // Create current symlink
    const articleDir = dirname(newArticlePath);
    const currentLink = join(articleDir, 'current');
    if (fs.existsSync(currentLink)) {
      fs.unlinkSync(currentLink);
    }
    fs.symlinkSync('v1', currentLink, 'dir');

    // Create version entry
    const versionsPath = join(PROJECT_ROOT, 'data', 'versions', `${finalArticleId}-versions.json`);
    const versionEntry = {
      version: 'v1',
      createdAt: metadata.uploadedAt,
      isCurrent: true,
    };
    fs.writeFileSync(versionsPath, JSON.stringify([versionEntry], null, 2));

    console.log(`  ✓ Created version v1 for ${finalArticleId}`);
    return { success: true, articleId: finalArticleId };
  } catch (error) {
    console.error(`  ✗ Error migrating ${articleId}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function scanAndMigrate() {
  console.log('Starting migration to new storage structure...\n');

  const publicArticlesDir = join(PROJECT_ROOT, 'public', 'articles');
  const results = [];

  // Scan public/articles directory
  if (fs.existsSync(publicArticlesDir)) {
    const scanDirectory = async (dir, basePath = '') => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = join(dir, item.name);
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
          await scanDirectory(fullPath, relativePath);
        } else if (item.name.endsWith('.pdf')) {
          // Determine journal and article ID
          let journalId = 'investment-management'; // Default
          let articleId = item.name.replace('.pdf', '');

          // Check if in journal subdirectory
          if (relativePath.includes('investment-management-journal')) {
            journalId = 'investment-management';
          }

          // Try to match article
          for (const [slug, id] of Object.entries(SLUG_TO_ID)) {
            if (item.name.includes(slug) || relativePath.includes(slug)) {
              articleId = id;
              break;
            }
          }

          // Check mapping
          if (ARTICLE_JOURNAL_MAP[articleId]) {
            journalId = ARTICLE_JOURNAL_MAP[articleId];
          }

          console.log(`\nFound PDF: ${item.name}`);
          const result = await migrateArticle(fullPath, articleId, journalId);
          results.push({ file: item.name, ...result });
        }
      }
    };

    await scanDirectory(publicArticlesDir);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Migration Summary:');
  console.log('='.repeat(60));
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✓ Successful: ${successful}`);
  console.log(`✗ Failed: ${failed}`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\nFailed migrations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.file}: ${r.error}`);
    });
  }

  console.log('\nMigration complete!');
}

// Run migration
scanAndMigrate().catch(console.error);
