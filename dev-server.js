import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001; // Different port from Vite

// Basic error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Middleware
app.use(compression());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Development mode - proxy to Vite
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    // Handle API routes here
    next();
  } else {
    // Proxy to Vite dev server
    res.redirect(`http://localhost:5173${req.url}`);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
  console.log('Proxying to Vite dev server at http://localhost:5173');
}); 