#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, '..', 'dist');

// MIME types for proper module serving
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(req, res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head><title>404 Not Found</title></head>
          <body><h1>404 Not Found</h1></body>
        </html>
      `);
      return;
    }

    const mimeType = getMimeType(filePath);
    const headers = {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600'
    };

    // Add CORS headers for development
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

    res.writeHead(200, headers);
    res.end(data);
  });
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = url.pathname;

  // Handle root path
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Remove leading slash and resolve path
  const fullPath = path.join(DIST_DIR, filePath);

  // Security check - ensure path is within dist directory
  if (!fullPath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>403 Forbidden</h1>');
    return;
  }

  // Check if file exists
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try serving index.html for SPA routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.stat(indexPath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        } else {
          serveFile(req, res, indexPath);
        }
      });
    } else {
      serveFile(req, res, fullPath);
    }
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`🚀 Architecture localhost running at http://localhost:${PORT}`);
  console.log('📝 This showcases the new architecture with all services');
  console.log('🔧 Port: 1000 (exclusive)');
  console.log('✅ Proper MIME types for ES modules enabled');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🔄 Gracefully shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🔄 Gracefully shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
