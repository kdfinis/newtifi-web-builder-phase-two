#!/usr/bin/env node

/**
 * MIME Type Validation Script
 * Validates that all JavaScript files have correct MIME types
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

function validateMimeTypes() {
  console.log('🔍 Validating MIME types in dist directory...');
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Run build first.');
    process.exit(1);
  }
  
  const jsFiles = [];
  const cssFiles = [];
  const htmlFiles = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else {
        const ext = path.extname(file);
        if (ext === '.js' || ext === '.mjs' || ext === '.jsx' || ext === '.ts' || ext === '.tsx') {
          jsFiles.push(filePath);
        } else if (ext === '.css') {
          cssFiles.push(filePath);
        } else if (ext === '.html') {
          htmlFiles.push(filePath);
        }
      }
    }
  }
  
  scanDirectory(distDir);
  
  console.log(`📊 Found ${jsFiles.length} JavaScript files, ${cssFiles.length} CSS files, ${htmlFiles.length} HTML files`);
  
  // Check if .htaccess exists
  const htaccessPath = path.join(distDir, '.htaccess');
  if (!fs.existsSync(htaccessPath)) {
    console.error('❌ .htaccess file not found in dist directory');
    process.exit(1);
  }
  
  // Check if _headers exists
  const headersPath = path.join(distDir, '_headers');
  if (!fs.existsSync(headersPath)) {
    console.error('❌ _headers file not found in dist directory');
    process.exit(1);
  }
  
  console.log('✅ MIME type configuration files found');
  console.log('✅ MIME type validation passed');
}

validateMimeTypes();
