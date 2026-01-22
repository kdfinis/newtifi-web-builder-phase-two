import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ARTICLES_PATH = join(__dirname, 'data', 'admin_articles.json');
const JOURNALS_PATH = join(__dirname, 'data', 'admin_journals.json');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for view tracking
const viewTracker = {
  articles: new Map(),
  pages: new Map(),
  trackArticleView: (articleId) => {
    const currentViews = viewTracker.articles.get(articleId) || 0;
    viewTracker.articles.set(articleId, currentViews + 1);
    return currentViews + 1;
  },
  trackPageView: (pagePath) => {
    const currentViews = viewTracker.pages.get(pagePath) || 0;
    viewTracker.pages.set(pagePath, currentViews + 1);
    return currentViews + 1;
  },
  getArticleViews: (articleId) => {
    return viewTracker.articles.get(articleId) || 0;
  },
  getPageViews: (pagePath) => {
    return viewTracker.pages.get(pagePath) || 0;
  },
  getAnalytics: () => {
    const totalArticleViews = Array.from(viewTracker.articles.values()).reduce((sum, views) => sum + views, 0);
    const totalPageViews = Array.from(viewTracker.pages.values()).reduce((sum, views) => sum + views, 0);
    return {
      totalViews: totalArticleViews + totalPageViews,
      totalArticleViews,
      totalPageViews,
      uniqueArticles: viewTracker.articles.size,
      uniquePages: viewTracker.pages.size
    };
  }
};

app.use(compression());
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

// Helper functions to read/write data
function readArticles() {
  try {
    if (fs.existsSync(ARTICLES_PATH)) {
      const data = fs.readFileSync(ARTICLES_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (e) {
    console.error('Error reading articles:', e);
    return [];
  }
}

function writeArticles(articles) {
  try {
    // Ensure data directory exists
    const dataDir = join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  } catch (e) {
    console.error('Error writing articles:', e);
  }
}

function readJournals() {
  try {
    if (fs.existsSync(JOURNALS_PATH)) {
      const data = fs.readFileSync(JOURNALS_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (e) {
    console.error('Error reading journals:', e);
    return [];
  }
}

function writeJournals(journals) {
  try {
    // Ensure data directory exists
    const dataDir = join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(JOURNALS_PATH, JSON.stringify(journals, null, 2));
  } catch (e) {
    console.error('Error writing journals:', e);
  }
}

// Authentication middleware
const authenticateAdmin = (req, res, next) => {
  const { email, password } = req.body;
  if (email === 'karlodefinis@newtifi.com' && password === 'mistamoney') {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// API: Admin login
app.post('/api/admin/login', authenticateAdmin, (req, res) => {
  res.json({ success: true, message: 'Login successful' });
});

// API: Get all articles for admin
app.get('/api/admin/articles', (req, res) => {
  const articles = readArticles();
  // Attach real view counts
  const articlesWithViews = articles.map(article => ({
    ...article,
    views: viewTracker.getArticleViews(article.id),
    downloads: article.downloads || 0
  }));
  res.json(articlesWithViews);
});

// API: Add new article
app.post('/api/admin/articles', (req, res) => {
  const articles = readArticles();
  const newArticle = {
    ...req.body,
    id: req.body.id || Date.now().toString(),
    views: 0,
    downloads: 0
  };
  articles.push(newArticle);
  writeArticles(articles);
  res.status(201).json(newArticle);
});

// API: Update article
app.put('/api/admin/articles/:id', (req, res) => {
  const articles = readArticles();
  const idx = articles.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });
  articles[idx] = { ...articles[idx], ...req.body };
  writeArticles(articles);
  res.json(articles[idx]);
});

// API: Delete article
app.delete('/api/admin/articles/:id', (req, res) => {
  let articles = readArticles();
  const idx = articles.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });
  const deleted = articles[idx];
  articles = articles.filter(a => a.id !== req.params.id);
  writeArticles(articles);
  res.json(deleted);
});

// API: Get all journals for admin
app.get('/api/admin/journals', (req, res) => {
  const journals = readJournals();
  res.json(journals);
});

// API: Add new journal
app.post('/api/admin/journals', (req, res) => {
  const journals = readJournals();
  const newJournal = {
    ...req.body,
    id: req.body.id || Date.now().toString(),
    articles: req.body.articles || []
  };
  journals.push(newJournal);
  writeJournals(journals);
  res.status(201).json(newJournal);
});

// API: Update journal
app.put('/api/admin/journals/:id', (req, res) => {
  const journals = readJournals();
  const idx = journals.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Journal not found' });
  journals[idx] = { ...journals[idx], ...req.body };
  writeJournals(journals);
  res.json(journals[idx]);
});

// API: Delete journal
app.delete('/api/admin/journals/:id', (req, res) => {
  let journals = readJournals();
  const idx = journals.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Journal not found' });
  const deleted = journals[idx];
  journals = journals.filter(j => j.id !== req.params.id);
  writeJournals(journals);
  res.json(deleted);
});

// API: Track article view
app.post('/api/track/article/:id', (req, res) => {
  const articleId = req.params.id;
  const views = viewTracker.trackArticleView(articleId);
  res.json({ success: true, views });
});

// API: Track page view
app.post('/api/track/page', (req, res) => {
  const { path } = req.body;
  if (!path) {
    return res.status(400).json({ error: 'Path is required' });
  }
  const views = viewTracker.trackPageView(path);
  res.json({ success: true, views });
});

// API: Get analytics
app.get('/api/admin/analytics', (req, res) => {
  const analytics = viewTracker.getAnalytics();
  const articles = readArticles();
  res.json({
    ...analytics,
    totalArticles: articles.length,
    totalJournals: readJournals().length,
    topArticles: articles.map(a => ({ 
      title: a.title, 
      views: viewTracker.getArticleViews(a.id) 
    })).sort((a, b) => b.views - a.views),
    monthlyViews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, analytics.totalViews]
  });
});

// API: Get public articles (for home page)
app.get('/api/articles', (req, res) => {
  const articles = readArticles();
  const publishedArticles = articles
    .filter(article => article.status === 'published')
    .map(article => ({
      ...article,
      views: viewTracker.getArticleViews(article.id),
      downloads: article.downloads || 0
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(publishedArticles);
});

// API: Get public journals
app.get('/api/journals', (req, res) => {
  const journals = readJournals();
  const activeJournals = journals.filter(journal => journal.status === 'active');
  res.json(activeJournals);
});

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Admin server running at http://localhost:${PORT}`);
  console.log('View tracking system initialized');
  console.log('Admin credentials: karlodefinis@newtifi.com / mistamoney');
}); 