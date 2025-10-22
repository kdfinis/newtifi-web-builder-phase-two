#!/usr/bin/env node

/**
 * Final GitHub Pages SPA Routing Fix
 * Creates a proper 404.html that works with GitHub Pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Final GitHub Pages SPA routing fix...');

const distDir = path.join(__dirname, '..', 'dist');

// Create a simple 404.html that redirects to index.html
const simple404Html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
        // Store the current path
        const currentPath = window.location.pathname + window.location.search;
        if (currentPath !== '/') {
            sessionStorage.setItem('spa_redirect_path', currentPath);
        }
        // Redirect to index.html
        window.location.replace('/');
    </script>
</head>
<body>
    <p>Redirecting...</p>
</body>
</html>`;

// Write the 404.html file
const custom404Path = path.join(distDir, '404.html');
fs.writeFileSync(custom404Path, simple404Html);

console.log('✅ Simple 404.html created');

// Ensure .nojekyll file exists
const noJekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');

console.log('✅ .nojekyll file ensured');

// Update index.html to handle SPA redirects
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Add SPA redirect handling before the closing head tag
  const spaScript = `
    <script>
      // Handle SPA redirects from 404.html
      (function() {
        const savedPath = sessionStorage.getItem('spa_redirect_path');
        if (savedPath && savedPath !== '/') {
          sessionStorage.removeItem('spa_redirect_path');
          // Use history.replaceState to change URL without reload
          window.history.replaceState(null, '', savedPath);
        }
      })();
    </script>`;
  
  // Insert before closing head tag
  indexHtml = indexHtml.replace('</head>', spaScript + '\n  </head>');
  
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log('✅ Updated index.html with SPA redirect handling');
}

console.log('✅ GitHub Pages SPA routing fix complete');
