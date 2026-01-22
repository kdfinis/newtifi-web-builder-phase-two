#!/usr/bin/env node
/**
 * Test script to verify all published articles have proper data indicators
 */

import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const ARTICLES_PATH = join(PROJECT_ROOT, 'data', 'admin_articles.json');

const REQUIRED_FIELDS = [
  'id',
  'title',
  'status',
  'publishedDate',
  'date',
  'pdfUrl',
  'url',
  'journalId',
  'authors',
  'keywords',
  'abstract',
  'doi',
];

const REQUIRED_DATA_INDICATORS = {
  status: ['published', 'draft', 'submitted', 'review', 'accepted', 'archived'],
  publishedDate: (date) => date && date.match(/^\d{4}-\d{2}-\d{2}$/),
  journalId: (id) => id && typeof id === 'string',
  authors: (authors) => Array.isArray(authors) && authors.length > 0,
  pdfUrl: (url) => url && (url.startsWith('/storage/') || url.startsWith('/articles/')),
};

function testArticles() {
  console.log('Testing article data integrity...\n');

  try {
    const articlesData = fs.readFileSync(ARTICLES_PATH, 'utf-8');
    const articles = JSON.parse(articlesData);

    const publishedArticles = articles.filter(a => a.status === 'published');
    console.log(`Found ${publishedArticles.length} published articles\n`);

    let allPassed = true;
    const results = [];

    publishedArticles.forEach((article, index) => {
      console.log(`\n📄 Testing Article ${index + 1}: ${article.id}`);
      console.log(`   Title: ${article.title.substring(0, 60)}...`);

      const articleResults = {
        id: article.id,
        title: article.title,
        passed: true,
        errors: [],
        warnings: [],
      };

      // Check required fields
      REQUIRED_FIELDS.forEach(field => {
        if (!(field in article)) {
          articleResults.passed = false;
          articleResults.errors.push(`Missing required field: ${field}`);
        } else if (article[field] === null || article[field] === undefined || article[field] === '') {
          articleResults.warnings.push(`Empty or null field: ${field}`);
        }
      });

      // Check data indicators
      if (article.status && !REQUIRED_DATA_INDICATORS.status.includes(article.status)) {
        articleResults.errors.push(`Invalid status: ${article.status}`);
        articleResults.passed = false;
      }

      if (article.publishedDate && !REQUIRED_DATA_INDICATORS.publishedDate(article.publishedDate)) {
        articleResults.errors.push(`Invalid publishedDate format: ${article.publishedDate}`);
        articleResults.passed = false;
      }

      if (article.journalId && !REQUIRED_DATA_INDICATORS.journalId(article.journalId)) {
        articleResults.errors.push(`Invalid journalId: ${article.journalId}`);
        articleResults.passed = false;
      }

      if (article.authors && !REQUIRED_DATA_INDICATORS.authors(article.authors)) {
        articleResults.errors.push(`Invalid authors format`);
        articleResults.passed = false;
      }

      if (article.pdfUrl && !REQUIRED_DATA_INDICATORS.pdfUrl(article.pdfUrl)) {
        articleResults.warnings.push(`PDF URL not using new storage structure: ${article.pdfUrl}`);
      }

      // Check storage path
      if (article.pdfUrl && !article.pdfUrl.startsWith('/storage/')) {
        articleResults.warnings.push(`PDF URL not using new storage structure`);
      }

      // Display results
      if (articleResults.errors.length > 0) {
        console.log(`   ❌ FAILED`);
        articleResults.errors.forEach(error => {
          console.log(`      - Error: ${error}`);
        });
        allPassed = false;
      } else {
        console.log(`   ✅ PASSED`);
      }

      if (articleResults.warnings.length > 0) {
        articleResults.warnings.forEach(warning => {
          console.log(`      ⚠️  Warning: ${warning}`);
        });
      }

      // Show key data indicators
      console.log(`      Status: ${article.status}`);
      console.log(`      Published: ${article.publishedDate}`);
      console.log(`      Journal: ${article.journalId}`);
      console.log(`      Authors: ${article.authors?.length || 0}`);
      console.log(`      PDF URL: ${article.pdfUrl}`);
      if (article.subjectAreas) {
        console.log(`      Subject Areas: ${article.subjectAreas.join(', ')}`);
      }
      if (article.peerReviewed !== undefined) {
        console.log(`      Peer Reviewed: ${article.peerReviewed}`);
      }

      results.push(articleResults);
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('TEST SUMMARY');
    console.log('='.repeat(60));
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${results.length}`);

    if (allPassed) {
      console.log('\n🎉 All articles have proper data indicators!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some articles have missing or invalid data indicators.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error testing articles:', error);
    process.exit(1);
  }
}

testArticles();
