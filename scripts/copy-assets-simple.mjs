#!/usr/bin/env node

/**
 * Simple Asset Copy - Minimal resource usage
 * Just copies files from dist/assets/ to assets/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('Copying assets...\n');

const distAssets = path.join(rootDir, 'dist', 'assets');
const rootAssets = path.join(rootDir, 'assets');

// Ensure root assets exists
if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true });
}

// Get list of files in dist/assets
const files = fs.readdirSync(distAssets, { withFileTypes: true });

let copied = 0;
for (const file of files) {
  const src = path.join(distAssets, file.name);
  const dest = path.join(rootAssets, file.name);
  
  if (file.isFile()) {
    try {
      fs.copyFileSync(src, dest);
      copied++;
      if (copied % 10 === 0) {
        process.stdout.write('.');
      }
    } catch (err) {
      console.error(`\nError copying ${file.name}:`, err.message);
    }
  } else if (file.isDirectory()) {
    // Copy directory recursively
    function copyDir(srcDir, destDir) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      const entries = fs.readdirSync(srcDir, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);
        if (entry.isFile()) {
          fs.copyFileSync(srcPath, destPath);
          copied++;
        } else if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        }
      }
    }
    copyDir(src, dest);
  }
}

console.log(`\n\n✅ Copied ${copied} files`);
console.log('✅ Done!');
