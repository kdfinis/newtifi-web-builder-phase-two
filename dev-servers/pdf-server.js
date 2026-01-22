import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3002;

// Serve PDF files from the public/pdfs directory
app.use('/pdfs', express.static(join(__dirname, 'public', 'pdfs')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF server running' });
});

// List available PDFs
app.get('/pdfs', async (req, res) => {
  const fs = await import('fs');
  const pdfDir = join(__dirname, 'public', 'pdfs');
  
  try {
    const files = fs.readdirSync(pdfDir);
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.json({ 
      pdfs: pdfFiles,
      count: pdfFiles.length 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read PDF directory' });
  }
});

app.listen(PORT, () => {
  console.log(`PDF server running at http://localhost:${PORT}`);
  console.log('Serving PDFs from:', join(__dirname, 'public', 'pdfs'));
}); 