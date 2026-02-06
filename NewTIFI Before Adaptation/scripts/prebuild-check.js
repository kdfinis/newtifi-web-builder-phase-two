// Prebuild duplicate-pages check
// Fails the build if there are page files with the same name in both
// the root app (`src/pages`) and the nested app (`newtifi-web-builder/src/pages`).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Recursively list page files (simplified sync version)
function listPageFiles(dir, fileList = []) {
  const full = path.resolve(repoRoot, dir);
  
  if (!fs.existsSync(full)) {
    return fileList;
  }
  
  try {
    const entries = fs.readdirSync(full, { withFileTypes: true });
    
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        listPageFiles(p, fileList);
      } else if (entry.isFile() && /\.(tsx|jsx|ts|js)$/.test(entry.name)) {
        fileList.push(p);
      }
    }
  } catch {
    // Skip directories we can't access
  }
  
  return fileList;
}

function toBaseSet(files) {
  return new Set(files.map(f => path.basename(f)));
}

function intersect(a, b) {
  const out = [];
  for (const x of a) if (b.has(x)) out.push(x);
  return out;
}

// Main execution (simplified sync version)
const rootPages = listPageFiles('src/pages');
const nestedPages = listPageFiles('newtifi-web-builder/src/pages');

if (nestedPages.length === 0) {
  // nothing to check
  process.exit(0);
}

const dupes = intersect(toBaseSet(rootPages), toBaseSet(nestedPages));
if (dupes.length > 0) {
  const msg = [
    'Duplicate page filenames detected across apps. This causes confusion when viewing/editing code and can lead to stale pages.',
    '',
    `Root pages dir:   ${path.resolve(repoRoot, 'src/pages')}`,
    `Nested pages dir: ${path.resolve(repoRoot, 'newtifi-web-builder/src/pages')}`,
    '',
    'Duplicates:',
    ...dupes.map(d => `  - ${d}`),
    '',
    'Fix options:',
    '  1) Edit or remove the nested app files, or',
    '  2) Rename the nested files, or',
    '  3) Move all active development to the root app only.',
    '',
    'This check can be adjusted in scripts/prebuild-check.js if needed.'
  ].join('\n');
  console.error(msg);
  process.exit(1);
}



