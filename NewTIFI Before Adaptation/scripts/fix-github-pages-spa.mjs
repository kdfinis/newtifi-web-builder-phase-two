#!/usr/bin/env node

/**
 * Fix GitHub Pages SPA Routing
 * Creates proper configuration for GitHub Pages to handle SPA routing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing GitHub Pages SPA routing...');

const distDir = path.join(__dirname, '..', 'dist');

// Create a proper 404.html that redirects to index.html
const spa404Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NewTIFI - Loading...</title>
    <script>
      // Immediate redirect to index.html for SPA routing
      (function() {
        const currentPath = window.location.pathname + window.location.search;
        if (currentPath !== '/') {
          // Store the original path for React Router
          sessionStorage.setItem('spa_redirect_path', currentPath);
        }
        // Redirect to index.html
        window.location.replace('/');
      })();
    </script>
  </head>
  <body>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h2>Loading NewTIFI...</h2>
        <p>Redirecting to the main application...</p>
      </div>
    </div>
  </body>
</html>`;

// Write the 404.html file
const custom404Path = path.join(distDir, '404.html');
fs.writeFileSync(custom404Path, spa404Html);

console.log('✅ Custom 404.html created for GitHub Pages SPA routing');

// Create a .nojekyll file to disable Jekyll processing
const noJekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');

console.log('✅ .nojekyll file created to disable Jekyll processing');

// Update the main index.html to handle SPA redirects
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Add SPA redirect handling script
  const spaRedirectScript = `
    <script>
      // Handle SPA redirects from 404.html
      (function() {
        const savedPath = sessionStorage.getItem('spa_redirect_path');
        if (savedPath && savedPath !== '/') {
          sessionStorage.removeItem('spa_redirect_path');
          // Let React Router handle the navigation
          window.history.replaceState(null, '', savedPath);
        }
      })();
    </script>`;
  
  // Insert the script before the closing head tag
  indexHtml = indexHtml.replace('</head>', spaRedirectScript + '\n  </head>');
  
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log('✅ Updated index.html with SPA redirect handling');
}

console.log('✅ GitHub Pages SPA routing configuration complete');
console.log('✅ All routes should now work correctly on production');
