#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const distAssets = path.join(rootDir, 'dist', 'assets');
const rootAssets = path.join(rootDir, 'assets');

// Clean old files
if (fs.existsSync(rootAssets)) {
  const files = fs.readdirSync(rootAssets);
  for (const file of files) {
    const filePath = path.join(rootAssets, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.map'))) {
      fs.unlinkSync(filePath);
    } else if (stat.isDirectory() && file !== 'images') {
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
}

// Copy files
const distFiles = fs.readdirSync(distAssets, { withFileTypes: true });
for (const file of distFiles) {
  const src = path.join(distAssets, file.name);
  const dest = path.join(rootAssets, file.name);
  if (file.isFile()) {
    fs.copyFileSync(src, dest);
  } else if (file.isDirectory()) {
    function copyDir(s, d) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
      const entries = fs.readdirSync(s, { withFileTypes: true });
      for (const entry of entries) {
        const sp = path.join(s, entry.name);
        const dp = path.join(d, entry.name);
        if (entry.isFile()) {
          fs.copyFileSync(sp, dp);
        } else if (entry.isDirectory()) {
          copyDir(sp, dp);
        }
      }
    }
    copyDir(src, dest);
  }
}

console.log('✅ Assets fixed');
