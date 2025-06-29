import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ARTICLES_PATH = join(__dirname, 'data', 'admin_articles.json');
const JOURNALS_PATH = join(__dirname, 'data', 'admin_journals.json');

const PORT = process.env.PORT || 3001;

// Initialize with existing articles from investment management page
const initialArticles = [
  {
    id: 'IMJ-2025-001',
    title: "Closed-Ended Luxembourg ELTIFs Compulsory Redemption Matters and Compartment Termination & Amalgamation Provisions",
    author: "Ezechiel Havrenne",
    affiliation: "Lecturer at the Luxembourg School of Business",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.001",
    keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Fund Management"],
    abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs. Focusing on the interplay between EU law, Luxembourg product regimes, and CSSF practice, it analyses how these mechanisms enhance capital efficiency, support fund liquidity management, and ensure investor protection.",
    filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: true,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal'
  },
  {
    id: 'IMJ-2025-002',
    title: "Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control",
    author: "Ezechiel Havrenne",
    affiliation: "Lecturer at the Luxembourg School of Business",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.002",
    keywords: ["AIFM", "BaFin", "Portfolio Control", "Investor Oversight"],
    abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions. While reaffirming the AIFM's exclusive mandate under the AIFMD, BaFin's strict stance on veto rights, LPAC involvement, and investor oversight diverges from more pragmatic regulatory approaches in other EU jurisdictions.",
    filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: true,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal'
  },
  {
    id: 'IMJ-2025-003',
    title: "Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion",
    author: "Ezechiel Havrenne",
    affiliation: "Lecturer at the Luxembourg School of Business",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.003",
    keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"],
    abstract: "This article provides a comprehensive analysis of Luxembourg's \"Well-Informed Investor\" regime as applied to SICARs, SIFs, and RAIFs, tracing its legislative and regulatory evolution over the past two decades.",
    filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: true,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal'
  }
];

// Initialize with existing journals
const initialJournals = [
  {
    id: 'IMJ-001',
    title: 'NewTiFi Investment Management Journal',
    issn: 'XXXX-XXXX',
    description: 'A peer-reviewed journal focusing on investment management, financial regulation, and sustainable finance in Luxembourg and the EU.',
    status: 'active',
    articles: ['IMJ-2025-001', 'IMJ-2025-002', 'IMJ-2025-003'],
    publisher: 'New Technologies and Investment Fund Institute',
    frequency: 'Quarterly',
    peerReviewStatus: 'Double-blind peer review'
  }
];

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

// Helper functions to read/write data
function readArticles() {
  try {
    if (fs.existsSync(ARTICLES_PATH)) {
      const data = fs.readFileSync(ARTICLES_PATH, 'utf-8');
      const articles = JSON.parse(data);
      // If articles file is empty, initialize with default articles
      if (articles.length === 0) {
        writeArticles(initialArticles);
        return initialArticles;
      }
      return articles;
    } else {
      // If file doesn't exist, create it with initial articles
      writeArticles(initialArticles);
      return initialArticles;
    }
  } catch (e) {
    console.error('Error reading articles:', e);
    return initialArticles;
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
      const journals = JSON.parse(data);
      // If journals file is empty, initialize with default journals
      if (journals.length === 0) {
        writeJournals(initialJournals);
        return initialJournals;
      }
      return journals;
    } else {
      // If file doesn't exist, create it with initial journals
      writeJournals(initialJournals);
      return initialJournals;
    }
  } catch (e) {
    console.error('Error reading journals:', e);
    return initialJournals;
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

// Authentication function
function authenticateAdmin(email, password) {
  return email === 'karlodefinis@newtifi.com' && password === 'mistamoney';
}

// Helper function to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Helper function to send JSON response
function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // Admin login
    if (path === '/api/admin/login' && req.method === 'POST') {
      const body = await parseBody(req);
      if (authenticateAdmin(body.email, body.password)) {
        sendJsonResponse(res, 200, { success: true, message: 'Login successful' });
      } else {
        sendJsonResponse(res, 401, { error: 'Invalid credentials' });
      }
      return;
    }

    // Get all articles for admin
    if (path === '/api/admin/articles' && req.method === 'GET') {
      const articles = readArticles();
      const articlesWithViews = articles.map(article => ({
        ...article,
        views: viewTracker.getArticleViews(article.id),
        downloads: article.downloads || 0
      }));
      sendJsonResponse(res, 200, articlesWithViews);
      return;
    }

    // Add new article
    if (path === '/api/admin/articles' && req.method === 'POST') {
      const body = await parseBody(req);
      const articles = readArticles();
      const newArticle = {
        ...body,
        id: body.id || Date.now().toString(),
        views: 0,
        downloads: 0,
        date: body.date || new Date().toISOString().split('T')[0]
      };
      articles.push(newArticle);
      writeArticles(articles);
      sendJsonResponse(res, 201, newArticle);
      return;
    }

    // Update article
    if (path.startsWith('/api/admin/articles/') && req.method === 'PUT') {
      const articleId = path.split('/').pop();
      const body = await parseBody(req);
      const articles = readArticles();
      const idx = articles.findIndex(a => a.id === articleId);
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Article not found' });
        return;
      }
      articles[idx] = { ...articles[idx], ...body };
      writeArticles(articles);
      sendJsonResponse(res, 200, articles[idx]);
      return;
    }

    // Delete article
    if (path.startsWith('/api/admin/articles/') && req.method === 'DELETE') {
      const articleId = path.split('/').pop();
      let articles = readArticles();
      const idx = articles.findIndex(a => a.id === articleId);
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Article not found' });
        return;
      }
      const deleted = articles[idx];
      articles = articles.filter(a => a.id !== articleId);
      writeArticles(articles);
      sendJsonResponse(res, 200, deleted);
      return;
    }

    // Get all journals for admin
    if (path === '/api/admin/journals' && req.method === 'GET') {
      const journals = readJournals();
      sendJsonResponse(res, 200, journals);
      return;
    }

    // Add new journal
    if (path === '/api/admin/journals' && req.method === 'POST') {
      const body = await parseBody(req);
      const journals = readJournals();
      const newJournal = {
        ...body,
        id: body.id || Date.now().toString(),
        articles: body.articles || []
      };
      journals.push(newJournal);
      writeJournals(journals);
      sendJsonResponse(res, 201, newJournal);
      return;
    }

    // Update journal
    if (path.startsWith('/api/admin/journals/') && req.method === 'PUT') {
      const journalId = path.split('/').pop();
      const body = await parseBody(req);
      const journals = readJournals();
      const idx = journals.findIndex(j => j.id === journalId);
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Journal not found' });
        return;
      }
      journals[idx] = { ...journals[idx], ...body };
      writeJournals(journals);
      sendJsonResponse(res, 200, journals[idx]);
      return;
    }

    // Delete journal
    if (path.startsWith('/api/admin/journals/') && req.method === 'DELETE') {
      const journalId = path.split('/').pop();
      let journals = readJournals();
      const idx = journals.findIndex(j => j.id === journalId);
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Journal not found' });
        return;
      }
      const deleted = journals[idx];
      journals = journals.filter(j => j.id !== journalId);
      writeJournals(journals);
      sendJsonResponse(res, 200, deleted);
      return;
    }

    // Track article view
    if (path.startsWith('/api/track/article/') && req.method === 'POST') {
      const articleId = path.split('/').pop();
      const views = viewTracker.trackArticleView(articleId);
      sendJsonResponse(res, 200, { success: true, views });
      return;
    }

    // Track page view
    if (path === '/api/track/page' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.path) {
        sendJsonResponse(res, 400, { error: 'Path is required' });
        return;
      }
      const views = viewTracker.trackPageView(body.path);
      sendJsonResponse(res, 200, { success: true, views });
      return;
    }

    // Get analytics
    if (path === '/api/admin/analytics' && req.method === 'GET') {
      const analytics = viewTracker.getAnalytics();
      const articles = readArticles();
      const data = {
        ...analytics,
        totalArticles: articles.length,
        totalJournals: readJournals().length,
        topArticles: articles.map(a => ({ 
          title: a.title, 
          views: viewTracker.getArticleViews(a.id),
          downloads: a.downloads || 0
        })).sort((a, b) => b.views - a.views).slice(0, 5),
        monthlyViews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, analytics.totalViews],
        featuredArticles: articles.filter(a => a.featured).length,
        publishedArticles: articles.filter(a => a.status === 'published').length,
        draftArticles: articles.filter(a => a.status === 'draft').length
      };
      sendJsonResponse(res, 200, data);
      return;
    }

    // Get public articles (for home page)
    if (path === '/api/articles' && req.method === 'GET') {
      const articles = readArticles();
      const publishedArticles = articles
        .filter(article => article.status === 'published')
        .map(article => ({
          ...article,
          views: viewTracker.getArticleViews(article.id),
          downloads: article.downloads || 0
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      sendJsonResponse(res, 200, publishedArticles);
      return;
    }

    // Get public journals
    if (path === '/api/journals' && req.method === 'GET') {
      const journals = readJournals();
      const activeJournals = journals.filter(journal => journal.status === 'active');
      sendJsonResponse(res, 200, activeJournals);
      return;
    }

    // Default response for unmatched routes
    sendJsonResponse(res, 404, { error: 'Not found' });

  } catch (error) {
    console.error('Server error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Simple admin server running at http://localhost:${PORT}`);
  console.log('View tracking system initialized');
  console.log('Admin credentials: karlodefinis@newtifi.com / mistamoney');
  console.log('Initialized with', initialArticles.length, 'articles and', initialJournals.length, 'journals');
}); 