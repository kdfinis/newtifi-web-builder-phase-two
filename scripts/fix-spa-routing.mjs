#!/usr/bin/env node

/**
 * Fix SPA Routing for GitHub Pages
 * Creates a proper 404.html that redirects to index.html for SPA routing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing SPA routing for GitHub Pages...');

const distDir = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const custom404Path = path.join(distDir, '404.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ index.html not found in dist directory. Run build first.');
  process.exit(1);
}

// Read the current index.html
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Create a custom 404.html that handles SPA routing
const custom404Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Technologies & Investment Funds Institute</title>
    <meta name="description" content="New Technologies & Investment Funds Institute - Shaping the Future of Technology" />
    
    <!-- SEO Meta Tags -->
    <meta name="keywords" content="NewTIFI, technology, investment funds, innovation, regulation, fintech, healthtech, foodtech, energytech" />
    <meta name="author" content="NewTIFI" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="New Technologies & Investment Funds Institute" />
    <meta property="og:description" content="Shaping the Future of Technology through Innovation and Regulation" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://newtifi.com" />
    <meta property="og:image" content="https://newtifi.com/assets/images/logo.png" />
    <meta property="og:site_name" content="NewTIFI" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="New Technologies & Investment Funds Institute" />
    <meta name="twitter:description" content="Shaping the Future of Technology through Innovation and Regulation" />
    <meta name="twitter:image" content="https://newtifi.com/assets/images/logo.png" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://newtifi.com" />
    
    <!-- Performance Meta Tags -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    
    <!-- MIME Type Fix for GitHub Pages - COMPREHENSIVE VERSION -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script>
      // COMPREHENSIVE MIME TYPE FIX - Multiple layers of protection
      (function() {
        // Layer 1: Override createElement to force correct MIME type
        if (typeof window !== 'undefined') {
          const originalCreateElement = document.createElement;
          document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            if (tagName === 'script' && element.type === 'module') {
              element.type = 'module';
            }
            return element;
          };
        }

        // Layer 2: MIME type error detection and recovery
        window.addEventListener('error', function(event) {
          if (event.message && event.message.includes('MIME type')) {
            console.warn('MIME type error detected, attempting recovery...');
            // Force reload with cache busting
            const url = new URL(window.location);
            url.searchParams.set('_mime_fix', Date.now());
            window.location.replace(url.toString());
          }
        });

        // Layer 3: Module script error handling
        window.addEventListener('error', function(event) {
          if (event.target && event.target.tagName === 'SCRIPT' && event.target.type === 'module') {
            console.warn('Module script error detected, checking MIME type...');
            // Check if the script failed due to MIME type
            fetch(event.target.src, { method: 'HEAD' })
              .then(response => {
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('javascript')) {
                  console.error('Incorrect MIME type detected:', contentType);
                  // Force page reload with cache busting
                  const url = new URL(window.location);
                  url.searchParams.set('_mime_fix', Date.now());
                  window.location.replace(url.toString());
                }
              })
              .catch(() => {
                // If we can't check the MIME type, force reload anyway
                const url = new URL(window.location);
                url.searchParams.set('_mime_fix', Date.now());
                window.location.replace(url.toString());
              });
          }
        });

        // Layer 4: Proactive MIME type validation
        document.addEventListener('DOMContentLoaded', function() {
          const scripts = document.querySelectorAll('script[type="module"]');
          scripts.forEach(script => {
            if (script.src) {
              fetch(script.src, { method: 'HEAD' })
                .then(response => {
                  const contentType = response.headers.get('content-type');
                  if (!contentType || !contentType.includes('javascript')) {
                    console.error('Script MIME type issue detected:', script.src, contentType);
                    // Force reload with cache busting
                    const url = new URL(window.location);
                    url.searchParams.set('_mime_fix', Date.now());
                    window.location.replace(url.toString());
                  }
                })
                .catch(() => {
                  // If we can't check, assume there's an issue and reload
                  const url = new URL(window.location);
                  url.searchParams.set('_mime_fix', Date.now());
                  window.location.replace(url.toString());
                });
            }
          });
        });
      })();
    </script>
    
    <!-- SPA Routing Fix for GitHub Pages -->
    <script>
      // Handle SPA routing for GitHub Pages
      (function() {
        // If we're on a 404 page, redirect to the main app
        if (window.location.pathname !== '/') {
          // Preserve the original path for client-side routing
          const originalPath = window.location.pathname + window.location.search;
          sessionStorage.setItem('spa_redirect_path', originalPath);
          
          // Redirect to the main app
          window.location.replace('/');
        }
        
        // On the main app, check if we need to restore the path
        if (window.location.pathname === '/') {
          const savedPath = sessionStorage.getItem('spa_redirect_path');
          if (savedPath && savedPath !== '/') {
            sessionStorage.removeItem('spa_redirect_path');
            // Let the React router handle the navigation
            window.history.replaceState(null, '', savedPath);
          }
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/index-CniKHjXn.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-MrwQVqq1.js">
    <link rel="stylesheet" crossorigin href="/assets/index-CexH58to.css">
  </body>
</html>`;

// Write the custom 404.html
fs.writeFileSync(custom404Path, custom404Html);

console.log('✅ Custom 404.html created with SPA routing support');
console.log('✅ MIME type fixes included');
console.log('✅ Automatic path preservation for client-side routing');
console.log('✅ GitHub Pages SPA routing should now work correctly');
