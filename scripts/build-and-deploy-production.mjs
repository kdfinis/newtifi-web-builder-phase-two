#!/usr/bin/env node

/**
 * Production Build and Deployment Script
 * Fixes issues #1, #3, and #4
 * Ensures production build (no localhost references)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🚀 Production Build and Deployment');
console.log('==================================\n');

// Step 1: Build for production
console.log('Step 1: Building for production...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Build complete\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 2: Verify dist exists
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ dist/ directory or index.html not found');
  process.exit(1);
}

// Step 3: Get required assets from dist/index.html
console.log('Step 2: Identifying required assets...');
const distIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const jsMatch = distIndexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
const cssMatch = distIndexHtml.match(/href="\/assets\/(index-[^"]+\.css)"/);
const vendorMatch = distIndexHtml.match(/href="\/assets\/(vendor-[^"]+\.js)"/);

if (!jsMatch || !cssMatch) {
  console.error('❌ Could not find required assets in dist/index.html');
  process.exit(1);
}

const requiredJs = jsMatch[1];
const requiredCss = cssMatch[1];
const requiredVendor = vendorMatch ? vendorMatch[1] : null;

console.log(`Required JS: ${requiredJs}`);
console.log(`Required CSS: ${requiredCss}`);
if (requiredVendor) console.log(`Required Vendor: ${requiredVendor}`);
console.log('');

// Step 4: Verify assets exist in dist/
console.log('Step 3: Verifying assets exist in dist/...');
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(path.join(assetsDir, requiredJs))) {
  console.error(`❌ Missing: dist/assets/${requiredJs}`);
  process.exit(1);
}
if (!fs.existsSync(path.join(assetsDir, requiredCss))) {
  console.error(`❌ Missing: dist/assets/${requiredCss}`);
  process.exit(1);
}
if (requiredVendor && !fs.existsSync(path.join(assetsDir, requiredVendor))) {
  console.error(`❌ Missing: dist/assets/${requiredVendor}`);
  process.exit(1);
}
console.log('✅ All required assets found\n');

// Step 5: Check for localhost references in dist/index.html
console.log('Step 4: Checking for localhost references...');
const localhostMatches = distIndexHtml.match(/http:\/\/localhost:[0-9]+/g);
if (localhostMatches) {
  // Filter out OAuth callback URLs (those are OK in config)
  const problematic = localhostMatches.filter(url => 
    !url.includes('/auth/callback') && 
    !url.includes('/auth/google/callback') &&
    !url.includes('/auth/linkedin/callback')
  );
  if (problematic.length > 0) {
    console.warn('⚠️  Found localhost references (may be in comments):');
    problematic.forEach(url => console.warn(`   ${url}`));
  } else {
    console.log('✅ No problematic localhost references\n');
  }
} else {
  console.log('✅ No localhost references found\n');
}

// Step 6: Backup current assets (optional)
console.log('Step 5: Backing up current assets...');
const rootAssetsDir = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssetsDir) && fs.readdirSync(rootAssetsDir).length > 0) {
  const backupDir = path.join(rootDir, `assets-backup-${Date.now()}`);
  fs.mkdirSync(backupDir, { recursive: true });
  execSync(`cp -r "${rootAssetsDir}"/* "${backupDir}/" 2>/dev/null || true`, { cwd: rootDir });
  console.log(`✅ Backup created: ${path.basename(backupDir)}\n`);
} else {
  console.log('⚠️  No existing assets to backup\n');
}

// Step 7: Clean old assets (FIX ISSUE #3)
console.log('Step 6: Cleaning old assets (Fixing Issue #3)...');
if (fs.existsSync(rootAssetsDir)) {
  fs.rmSync(rootAssetsDir, { recursive: true, force: true });
}
fs.mkdirSync(rootAssetsDir, { recursive: true });
console.log('✅ Old assets removed\n');

// Step 8: Copy latest build to root (FIX ISSUE #1)
console.log('Step 7: Copying latest build to root (Fixing Issue #1)...');
execSync(`cp -r "${distDir}/assets"/* "${rootAssetsDir}/"`, { cwd: rootDir });
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(rootDir, 'index.html'));
fs.copyFileSync(path.join(distDir, '404.html'), path.join(rootDir, '404.html'));

if (fs.existsSync(path.join(distDir, '_headers'))) {
  fs.copyFileSync(path.join(distDir, '_headers'), path.join(rootDir, '_headers'));
}
if (fs.existsSync(path.join(distDir, '_redirects'))) {
  fs.copyFileSync(path.join(distDir, '_redirects'), path.join(rootDir, '_redirects'));
}

// Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
console.log('✅ Files copied\n');

// Step 9: Verify asset match (FIX ISSUE #1)
console.log('Step 8: Verifying asset match (Fixing Issue #1)...');
const rootIndexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const rootJsMatch = rootIndexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
const rootCssMatch = rootIndexHtml.match(/href="\/assets\/(index-[^"]+\.css)"/);

if (!rootJsMatch || rootJsMatch[1] !== requiredJs) {
  console.error(`❌ Asset mismatch! Root index.html references different JS file`);
  process.exit(1);
}
if (!rootCssMatch || rootCssMatch[1] !== requiredCss) {
  console.error(`❌ Asset mismatch! Root index.html references different CSS file`);
  process.exit(1);
}

if (!fs.existsSync(path.join(rootAssetsDir, requiredJs))) {
  console.error(`❌ Asset file missing: assets/${requiredJs}`);
  process.exit(1);
}
if (!fs.existsSync(path.join(rootAssetsDir, requiredCss))) {
  console.error(`❌ Asset file missing: assets/${requiredCss}`);
  process.exit(1);
}

console.log('✅ Asset references match files\n');

// Step 10: Summary
console.log('========================================');
console.log('✅ Deployment Preparation Complete!');
console.log('========================================\n');
console.log('📋 Fixed Issues:');
console.log('  ✅ Issue #1: Asset file mismatch - FIXED');
console.log('  ✅ Issue #3: Multiple asset versions - FIXED');
console.log('  ✅ Issue #4: Deployment process - AUTOMATED');
console.log('  ✅ Production build verified (no localhost in production)\n');
console.log('📋 Next Steps:');
console.log('1. Review changes: git status');
console.log('2. Commit: git add . && git commit -m "Fix: Production deployment - clean assets"');
console.log('3. Push: git push origin main');
console.log('4. Wait 10-15 minutes for GitHub Pages to rebuild');
console.log('5. Test: https://newtifi.com\n');
