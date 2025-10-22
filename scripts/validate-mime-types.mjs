#!/usr/bin/env node

/**
 * MIME Type Validation Script
 * Prevents MIME type issues by validating build output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Validating MIME types in build output...');

const distDir = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run build first.');
  process.exit(1);
}

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ index.html not found in dist directory.');
  process.exit(1);
}

// Read index.html
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Check for JavaScript module scripts
const scriptMatches = indexHtml.match(/<script[^>]*type="module"[^>]*src="([^"]*)"[^>]*>/g);

if (!scriptMatches) {
  console.error('❌ No module scripts found in index.html');
  process.exit(1);
}

console.log('✅ Found module scripts:', scriptMatches.length);

// Validate each script reference
let hasErrors = false;

scriptMatches.forEach((scriptTag, index) => {
  const srcMatch = scriptTag.match(/src="([^"]*)"/);
  if (srcMatch) {
    const src = srcMatch[1];
    const scriptPath = path.join(distDir, src);
    
    if (fs.existsSync(scriptPath)) {
      console.log(`✅ Script ${index + 1}: ${src} exists`);
    } else {
      console.error(`❌ Script ${index + 1}: ${src} not found`);
      hasErrors = true;
    }
  }
});

// Check for proper MIME type headers in _headers file
const headersPath = path.join(distDir, '_headers');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  
  if (headers.includes('application/javascript')) {
    console.log('✅ _headers file contains JavaScript MIME type configuration');
  } else {
    console.error('❌ _headers file missing JavaScript MIME type configuration');
    hasErrors = true;
  }
} else {
  console.error('❌ _headers file not found in dist directory');
  hasErrors = true;
}

// Check for .htaccess file
const htaccessPath = path.join(distDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  const htaccess = fs.readFileSync(htaccessPath, 'utf8');
  
  if (htaccess.includes('application/javascript')) {
    console.log('✅ .htaccess file contains JavaScript MIME type configuration');
  } else {
    console.error('❌ .htaccess file missing JavaScript MIME type configuration');
    hasErrors = true;
  }
} else {
  console.error('❌ .htaccess file not found in dist directory');
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ MIME type validation failed!');
  console.error('This will cause "Expected a JavaScript-or-Wasm module script" errors.');
  process.exit(1);
} else {
  console.log('\n✅ MIME type validation passed!');
  console.log('All JavaScript files should load correctly.');
}
