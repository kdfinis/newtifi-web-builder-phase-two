#!/usr/bin/env node
// MIME Type Validation Script - validates build output and required config files

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

console.log('🔍 Validating MIME types in build output...');

if (!fs.existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run build first.');
  process.exit(1);
}

// Check required files
const requiredFiles = [
  { path: path.join(distDir, 'index.html'), name: 'index.html' },
  { path: path.join(distDir, '.htaccess'), name: '.htaccess' },
  { path: path.join(distDir, '_headers'), name: '_headers' }
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file.path)) {
    console.error(`❌ ${file.name} not found in dist directory`);
    process.exit(1);
  }
}

// Validate index.html has module scripts
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const scriptMatches = indexHtml.match(/<script[^>]*type="module"[^>]*src="([^"]*)"[^>]*>/g);

if (!scriptMatches) {
  console.error('❌ No module scripts found in index.html');
  process.exit(1);
}

// Validate script files exist
let hasErrors = false;
for (const scriptTag of scriptMatches) {
  const srcMatch = scriptTag.match(/src="([^"]*)"/);
  if (srcMatch) {
    const src = srcMatch[1];
    const scriptPath = path.join(distDir, src);
    if (!fs.existsSync(scriptPath)) {
      console.error(`❌ Script not found: ${src}`);
      hasErrors = true;
    }
  }
}

// Validate MIME type configuration
const headers = fs.readFileSync(path.join(distDir, '_headers'), 'utf8');
const htaccess = fs.readFileSync(path.join(distDir, '.htaccess'), 'utf8');

if (!headers.includes('application/javascript')) {
  console.error('❌ _headers file missing JavaScript MIME type configuration');
  hasErrors = true;
}

if (!htaccess.includes('application/javascript')) {
  console.error('❌ .htaccess file missing JavaScript MIME type configuration');
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ MIME type validation failed!');
  process.exit(1);
}

console.log(`✅ Found ${scriptMatches.length} module scripts`);
console.log('✅ MIME type configuration files validated');
console.log('✅ MIME type validation passed');
