#!/usr/bin/env node
/**
 * Enrich existing articles with enhanced metadata
 * Migrates from basic article data to rich ArticleMetadata format
 */

import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const DATA_DIR = join(PROJECT_ROOT, 'data');
const ARTICLES_PATH = join(DATA_DIR, 'admin_articles.json');

async function enrichMetadata() {
  console.log('Enriching article metadata...\n');

  try {
    // Read existing articles
    const articlesData = fs.readFileSync(ARTICLES_PATH, 'utf-8');
    const articles = JSON.parse(articlesData);

    // Ensure metadata directory exists
    const metadataDir = join(DATA_DIR, 'articles', 'investment-management');
    if (!fs.existsSync(metadataDir)) {
      fs.mkdirSync(metadataDir, { recursive: true });
    }

    let enriched = 0;
    let skipped = 0;

    for (const article of articles) {
      const articleId = article.id;
      const metadataPath = join(metadataDir, `${articleId}.json`);

      // Skip if already enriched
      if (fs.existsSync(metadataPath)) {
        console.log(`  ⏭️  Skipping ${articleId} (already enriched)`);
        skipped++;
        continue;
      }

      // Create enriched metadata
      const metadata = {
        id: articleId,
        journalId: 'investment-management',
        version: 'v1',
        title: article.title || '',
        abstract: article.abstract || '',
        authors: parseAuthors(article.author || article.authors),
        keywords: article.keywords || [],
        doi: article.doi,
        status: article.status || 'published',
        publishedDate: article.date || article.publishedDate,
        submittedDate: article.date || article.publishedDate,
        files: {
          main: {
            path: article.pdfUrl || article.url || '',
            url: article.pdfUrl || article.url || '',
            type: 'pdf',
            size: 0,
            mimeType: 'application/pdf',
            checksum: '',
          },
        },
        versionHistory: [
          {
            version: 'v1',
            createdAt: article.date || new Date().toISOString(),
            isCurrent: true,
          },
        ],
        currentVersion: 'v1',
        subjectAreas: extractSubjectAreas(article.keywords || []),
        peerReviewed: true,
        license: 'All Rights Reserved',
      };

      // Save metadata
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`  ✅ Enriched ${articleId}`);
      enriched++;
    }

    console.log(`\n✅ Enrichment complete!`);
    console.log(`   - Enriched: ${enriched}`);
    console.log(`   - Skipped: ${skipped}`);
    console.log(`   - Total: ${articles.length}`);
  } catch (error) {
    console.error('❌ Error enriching metadata:', error);
    process.exit(1);
  }
}

function parseAuthors(authorData) {
  if (Array.isArray(authorData)) {
    return authorData.map((name, index) => ({
      name: String(name),
      order: index + 1,
      corresponding: index === 0,
    }));
  }
  
  if (typeof authorData === 'string') {
    return [{
      name: authorData,
      order: 1,
      corresponding: true,
    }];
  }

  return [];
}

function extractSubjectAreas(keywords) {
  const subjectMap = {
    'ELTIFs': 'Investment Funds',
    'Luxembourg': 'Regulatory Framework',
    'AIFM': 'Fund Management',
    'BaFin': 'Regulatory Compliance',
    'SICARs': 'Investment Vehicles',
    'SIFs': 'Investment Funds',
    'RAIFs': 'Investment Funds',
  };

  const subjects = new Set();
  keywords.forEach(kw => {
    Object.keys(subjectMap).forEach(key => {
      if (kw.toUpperCase().includes(key.toUpperCase())) {
        subjects.add(subjectMap[key]);
      }
    });
  });

  return Array.from(subjects);
}

enrichMetadata();
