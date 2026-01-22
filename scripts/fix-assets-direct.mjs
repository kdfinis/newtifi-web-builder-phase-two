#!/usr/bin/env node

/**
 * Direct Asset Fix - No execSync, just file operations
 * Fixes assets directory without needing terminal
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔧 Direct Asset Fix');
console.log('===================\n');

// Step 1: Verify dist exists
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run: npm run build');
  process.exit(1);
}

// Step 2: Get required assets from dist/index.html
const distIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const jsMatch = distIndexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
const cssMatch = distIndexHtml.match(/href="\/assets\/(index-[^"]+\.css)"/);

if (!jsMatch || !cssMatch) {
  console.error('❌ Could not parse required assets from dist/index.html');
  process.exit(1);
}

const requiredJs = jsMatch[1];
const requiredCss = cssMatch[1];

console.log(`Required JS: ${requiredJs}`);
console.log(`Required CSS: ${requiredCss}\n`);

// Step 3: Verify assets exist in dist/
const distAssetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(path.join(distAssetsDir, requiredJs))) {
  console.error(`❌ Missing in dist: ${requiredJs}`);
  process.exit(1);
}
if (!fs.existsSync(path.join(distAssetsDir, requiredCss))) {
  console.error(`❌ Missing in dist: ${requiredCss}`);
  process.exit(1);
}
console.log('✅ Required assets found in dist/\n');

// Step 4: Clean root assets (keep images if needed)
console.log('Cleaning root assets...');
const rootAssetsDir = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssetsDir)) {
  const files = fs.readdirSync(rootAssetsDir);
  let cleaned = 0;
  for (const file of files) {
    const filePath = path.join(rootAssetsDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      fs.unlinkSync(filePath);
      cleaned++;
    } else if (stat.isDirectory() && file !== 'images') {
      fs.rmSync(filePath, { recursive: true, force: true });
      cleaned++;
    }
  }
  console.log(`✅ Cleaned ${cleaned} old files/directories\n`);
} else {
  fs.mkdirSync(rootAssetsDir, { recursive: true });
  console.log('✅ Created assets directory\n');
}

// Step 5: Copy all assets from dist/assets/ to root/assets/
console.log('Copying assets from dist/ to root...');
if (fs.existsSync(distAssetsDir)) {
  const distAssets = fs.readdirSync(distAssetsDir);
  let copied = 0;
  
  function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isFile()) {
      fs.copyFileSync(src, dest);
      copied++;
    } else if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const entries = fs.readdirSync(src);
      for (const entry of entries) {
        copyRecursive(path.join(src, entry), path.join(dest, entry));
      }
    }
  }
  
  for (const asset of distAssets) {
    const srcPath = path.join(distAssetsDir, asset);
    const destPath = path.join(rootAssetsDir, asset);
    copyRecursive(srcPath, destPath);
  }
  
  console.log(`✅ Copied ${copied} files\n`);
}

// Step 6: Verify
console.log('Verifying...');
if (!fs.existsSync(path.join(rootAssetsDir, requiredJs))) {
  console.error(`❌ Verification failed: ${requiredJs} not found in root/assets/`);
  process.exit(1);
}
if (!fs.existsSync(path.join(rootAssetsDir, requiredCss))) {
  console.error(`❌ Verification failed: ${requiredCss} not found in root/assets/`);
  process.exit(1);
}

console.log('✅ Verification passed!');
console.log('\n🎉 Asset fix complete!');
console.log('\nNext steps:');
console.log('1. git add .');
console.log('2. git commit -m "Fix: Clean assets deployment"');
console.log('3. git push origin main');
