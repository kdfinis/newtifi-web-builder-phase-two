import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable compression
app.use(compression());

// Basic security headers for local preview
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback - serve index.html for all routes
// Use a string pattern to avoid path-to-regexp parameter errors
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SPA server running at http://localhost:${PORT}`);
  console.log(`All routes will serve index.html for SPA routing`);
});
