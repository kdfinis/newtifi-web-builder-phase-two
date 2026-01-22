import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, 'data');
const ARTICLES_PATH = join(DATA_DIR, 'admin_articles.json');
const JOURNALS_PATH = join(DATA_DIR, 'admin_journals.json');
const USERS_PATH = join(DATA_DIR, 'users.json');
const APPLICATIONS_PATH = join(DATA_DIR, 'applications.json');
const CONTACT_SUBMISSIONS_PATH = join(DATA_DIR, 'contact-submissions.json');
const RESET_TOKENS_PATH = join(DATA_DIR, 'reset-tokens.json');

const PORT = process.env.PORT || 3001;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Simple in-memory session store (for production, use Redis or database)
const sessions = new Map();

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
    url: "/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf",
    pdfUrl: "/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: true,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal',
    fileSize: '0.39 MB',
    lastModified: '2025-06-28T11:59:53.645Z'
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
    url: "/storage/journals/investment-management/articles/IMJ-2025-002/current/article.pdf",
    pdfUrl: "/storage/journals/investment-management/articles/IMJ-2025-002/current/article.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: true,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal',
    fileSize: '0.33 MB',
    lastModified: '2025-06-28T11:59:53.646Z'
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
    url: "/storage/journals/investment-management/articles/IMJ-2025-003/current/article.pdf",
    pdfUrl: "/storage/journals/investment-management/articles/IMJ-2025-003/current/article.pdf",
    status: 'published',
    views: 0,
    downloads: 0,
    featured: false,
    category: 'journal',
    journal: 'NewTiFi Investment Management Journal',
    fileSize: '0.47 MB',
    lastModified: '2025-06-28T11:59:53.647Z'
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
            publisher: 'New Technologies & Investment Funds Institute',
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
      
      // Check if we have the correct real articles
      const hasRealArticles = articles.some(article => 
        article.id === 'IMJ-2025-001' && 
        article.filename && 
        article.filename.includes('Closed-Ended Luxembourg ELTIFs')
      );
      
      // If we do not have the real articles or have too many fake ones, reset
      if (!hasRealArticles || articles.length > 3) {
        console.log('Resetting articles to only real PDF articles...');
        writeArticles(initialArticles);
        return initialArticles;
      }
      
      return articles;
    } else {
      // If file does not exist, create it with initial articles
      writeArticles(initialArticles);
      return initialArticles;
    }
  } catch (e) {
    console.error('Error reading articles:', e);
    // Reset to real articles on error
    writeArticles(initialArticles);
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
      // If file does not exist, create it with initial journals
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

// Session management (simple, stable, free)
function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  sessions.set(sessionId, {
    userId,
    createdAt: Date.now(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  });
  return sessionId;
}

function getUserIdFromSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies?.sessionId;
  if (!sessionId) return null;
  
  const session = sessions.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session.userId;
}

function isAdmin(req) {
  const userId = getUserIdFromSession(req);
  if (!userId) return false;
  
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  return user?.role === 'ADMIN';
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

// Data storage functions
function readUsers() {
  try {
    if (fs.existsSync(USERS_PATH)) {
      return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
    }
    return [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users:', error);
  }
}

function readApplications() {
  try {
    if (fs.existsSync(APPLICATIONS_PATH)) {
      return JSON.parse(fs.readFileSync(APPLICATIONS_PATH, 'utf8'));
    }
    return [];
  } catch (error) {
    console.error('Error reading applications:', error);
    return [];
  }
}

function writeApplications(applications) {
  try {
    fs.writeFileSync(APPLICATIONS_PATH, JSON.stringify(applications, null, 2));
  } catch (error) {
    console.error('Error writing applications:', error);
  }
}

function readContactSubmissions() {
  try {
    if (fs.existsSync(CONTACT_SUBMISSIONS_PATH)) {
      return JSON.parse(fs.readFileSync(CONTACT_SUBMISSIONS_PATH, 'utf8'));
    }
    return [];
  } catch (error) {
    console.error('Error reading contact submissions:', error);
    return [];
  }
}

function writeContactSubmissions(submissions) {
  try {
    fs.writeFileSync(CONTACT_SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error writing contact submissions:', error);
  }
}

function readResetTokens() {
  try {
    if (fs.existsSync(RESET_TOKENS_PATH)) {
      return JSON.parse(fs.readFileSync(RESET_TOKENS_PATH, 'utf8'));
    }
    return [];
  } catch (error) {
    console.error('Error reading reset tokens:', error);
    return [];
  }
}

function writeResetTokens(tokens) {
  try {
    fs.writeFileSync(RESET_TOKENS_PATH, JSON.stringify(tokens, null, 2));
  } catch (error) {
    console.error('Error writing reset tokens:', error);
  }
}

// Simple password hashing (for production, use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
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

// Helper function to send JSON response with cookie support
function sendJsonResponse(res, statusCode, data, cookie = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (cookie) {
    headers['Set-Cookie'] = cookie;
  }
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Enable CORS with credentials support
  const origin = req.headers.origin;
  if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('newtifi'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve static files from new storage structure and legacy paths
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // Serve from new storage structure: /storage/journals/{journal-id}/articles/{article-id}/{version}/file
  if (path.startsWith('/storage/') && req.method === 'GET') {
    try {
      // Remove leading /storage/ and build path from project root
      const relativePath = path.replace(/^\/storage\//, '');
      let filePath = join(__dirname, 'storage', relativePath);
      
      // Handle symlinks and directories
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.isSymbolicLink()) {
          // Resolve symlink
          const resolved = fs.readlinkSync(filePath);
          const resolvedPath = join(dirname(filePath), resolved);
          filePath = join(resolvedPath, 'article.pdf');
        } else if (stats.isDirectory()) {
          // If it's a directory, look for article.pdf inside
          filePath = join(filePath, 'article.pdf');
        }
      }
      
      // Final check and serve
      if (fs.existsSync(filePath)) {
        const finalStats = fs.statSync(filePath);
        if (finalStats.isFile()) {
          const ext = path.split('.').pop()?.toLowerCase() || 'pdf';
          let contentType = 'application/octet-stream';
          
          if (ext === 'pdf') contentType = 'application/pdf';
          else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
          else if (ext === 'png') contentType = 'image/png';
          else if (ext === 'json') contentType = 'application/json';
          
          const fileStream = fs.createReadStream(filePath);
          res.writeHead(200, { 
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${path.split('/').pop()}"`,
            'Cache-Control': 'public, max-age=3600'
          });
          fileStream.pipe(res);
          return;
        }
      }
      console.log('Storage file not found at:', filePath);
    } catch (error) {
      console.error('Error serving storage file:', error.message);
    }
  }

  // Legacy: Serve from /public/articles/ for backward compatibility
  if (path.startsWith('/articles/') && req.method === 'GET') {
    try {
      const filePath = join(__dirname, 'public', path);
      if (fs.existsSync(filePath)) {
        const ext = path.split('.').pop()?.toLowerCase() || 'pdf';
        let contentType = 'application/octet-stream';
        
        if (ext === 'pdf') contentType = 'application/pdf';
        else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        
        const fileStream = fs.createReadStream(filePath);
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${path.split('/').pop()}"`
        });
        fileStream.pipe(res);
        return;
      }
    } catch (error) {
      console.error('Error serving legacy file:', error);
    }
  }

  try {
    // ============================================
    // AUTHENTICATION ENDPOINTS
    // ============================================
    
    // POST /api/auth/login - Regular user login
    if (path === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;
      
      if (!email || !password) {
        sendJsonResponse(res, 400, { error: 'Email and password are required' });
        return;
      }
      
      const users = readUsers();
      const user = users.find(u => u.email === email);
      
      if (!user || !user.password) {
        sendJsonResponse(res, 401, { error: 'Invalid credentials' });
        return;
      }
      
      // Verify password
      const hashedPassword = hashPassword(password);
      if (user.password !== hashedPassword) {
        sendJsonResponse(res, 401, { error: 'Invalid credentials' });
        return;
      }
      
      // Create session
      const sessionId = createSession(user.id);
      const cookie = `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
      
      // Remove password from response
      const { password: _, ...safeUser } = user;
      sendJsonResponse(res, 200, { success: true, message: 'Login successful', user: safeUser }, cookie);
      return;
    }
    
    // POST /api/auth/register - User registration
    if (path === '/api/auth/register' && req.method === 'POST') {
      const body = await parseBody(req);
      const { email, password, name } = body;
      
      if (!email || !password) {
        sendJsonResponse(res, 400, { error: 'Email and password are required' });
        return;
      }
      
      if (password.length < 6) {
        sendJsonResponse(res, 400, { error: 'Password must be at least 6 characters' });
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        sendJsonResponse(res, 400, { error: 'Invalid email address' });
        return;
      }
      
      const users = readUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        sendJsonResponse(res, 409, { error: 'User already exists' });
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
        password: hashPassword(password),
        role: 'MEMBER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      users.push(newUser);
      writeUsers(users);
      
      // Create session
      const sessionId = createSession(newUser.id);
      const cookie = `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
      
      // Remove password from response
      const { password: _, ...safeUser } = newUser;
      sendJsonResponse(res, 201, { success: true, message: 'Registration successful', user: safeUser }, cookie);
      return;
    }
    
    // POST /api/auth/logout - Logout
    if (path === '/api/auth/logout' && req.method === 'POST') {
      const cookies = parseCookies(req.headers.cookie);
      const sessionId = cookies?.sessionId;
      
      if (sessionId) {
        sessions.delete(sessionId);
      }
      
      // Clear cookie
      const cookie = `sessionId=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      sendJsonResponse(res, 200, { success: true, message: 'Logout successful' }, cookie);
      return;
    }
    
    // GET /api/auth/status - Check authentication status
    if (path === '/api/auth/status' && req.method === 'GET') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 200, { authenticated: false });
        return;
      }
      
      const users = readUsers();
      const user = users.find(u => u.id === userId);
      if (!user) {
        sendJsonResponse(res, 200, { authenticated: false });
        return;
      }
      
      // Remove sensitive data
      const { password, ...safeUser } = user;
      sendJsonResponse(res, 200, { authenticated: true, user: safeUser });
      return;
    }
    
    // Admin login
    if (path === '/api/admin/login' && req.method === 'POST') {
      const body = await parseBody(req);
      if (authenticateAdmin(body.email, body.password)) {
        // Create session for admin
        const users = readUsers();
        let adminUser = users.find(u => u.email === body.email && u.role === 'ADMIN');
        
        // Create admin user if doesn't exist
        if (!adminUser) {
          adminUser = {
            id: Date.now().toString(),
            email: body.email,
            name: 'Admin User',
            role: 'ADMIN',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          users.push(adminUser);
          writeUsers(users);
        }
        
        const sessionId = createSession(adminUser.id);
        const cookie = `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
        sendJsonResponse(res, 200, { success: true, message: 'Login successful', user: adminUser }, cookie);
      } else {
        sendJsonResponse(res, 401, { error: 'Invalid credentials' });
      }
      return;
    }

    // Get all articles for admin
    if (path === '/api/admin/articles' && req.method === 'GET') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden. Admin privileges required.' });
        return;
      }
      
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

    // Patch article (for featured status updates)
    if (path.startsWith('/api/admin/articles/') && req.method === 'PATCH') {
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

    // Scan for real PDF articles
    if (path === '/api/admin/scan-articles' && req.method === 'GET') {
      try {
        const publicArticlesDir = join(__dirname, 'public', 'articles');
        const srcArticlesDir = join(__dirname, 'src', 'articles');
        const scannedArticles = [];

        // Scan public/articles directory
        if (fs.existsSync(publicArticlesDir)) {
          const scanDirectory = (dir, baseUrl) => {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            items.forEach(item => {
              const fullPath = join(dir, item.name);
              if (item.isDirectory()) {
                scanDirectory(fullPath, `${baseUrl}/${item.name}`);
              } else if (item.name.endsWith('.pdf')) {
                const stats = fs.statSync(fullPath);
                const relativePath = fullPath.replace(join(__dirname, 'public'), '');
                const articleId = `SCANNED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                
                scannedArticles.push({
                  id: articleId,
                  title: item.name.replace('.pdf', '').replace(/_/g, ' '),
                  author: 'Unknown',
                  date: stats.mtime.toISOString().split('T')[0],
                  filename: item.name,
                  url: relativePath,
                  pdfUrl: relativePath,
                  status: 'published',
                  views: 0,
                  downloads: 0,
                  featured: false,
                  category: 'journal',
                  fileSize: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
                  lastModified: stats.mtime.toISOString()
                });
              }
            });
          };
          
          scanDirectory(publicArticlesDir, '/articles');
        }

        // Scan src/articles directory
        if (fs.existsSync(srcArticlesDir)) {
          const scanDirectory = (dir, baseUrl) => {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            items.forEach(item => {
              const fullPath = join(dir, item.name);
              if (item.isDirectory()) {
                scanDirectory(fullPath, `${baseUrl}/${item.name}`);
              } else if (item.name.endsWith('.pdf')) {
                const stats = fs.statSync(fullPath);
                const relativePath = fullPath.replace(join(__dirname, 'src'), '');
                const articleId = `SCANNED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                
                scannedArticles.push({
                  id: articleId,
                  title: item.name.replace('.pdf', '').replace(/_/g, ' '),
                  author: 'Unknown',
                  date: stats.mtime.toISOString().split('T')[0],
                  filename: item.name,
                  url: relativePath,
                  pdfUrl: relativePath,
                  status: 'published',
                  views: 0,
                  downloads: 0,
                  featured: false,
                  category: 'journal',
                  fileSize: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
                  lastModified: stats.mtime.toISOString()
                });
              }
            });
          };
          
          scanDirectory(srcArticlesDir, '/src/articles');
        }

        sendJsonResponse(res, 200, scannedArticles);
        return;
      } catch (error) {
        console.error('Error scanning articles:', error);
        sendJsonResponse(res, 500, { error: 'Failed to scan articles' });
        return;
      }
    }

    // Get article metadata
    if (path.startsWith('/api/admin/article-metadata/') && req.method === 'GET') {
      const articleId = path.split('/').pop();
      const articles = readArticles();
      const article = articles.find(a => a.id === articleId);
      
      if (!article) {
        sendJsonResponse(res, 404, { error: 'Article not found' });
        return;
      }

      try {
        let filePath = '';
        if (article.url && article.url.startsWith('/articles/')) {
          filePath = join(__dirname, 'public', article.url);
        } else if (article.url && article.url.startsWith('/src/articles/')) {
          filePath = join(__dirname, article.url);
        }

        if (filePath && fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          const metadata = {
            fileSize: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
            lastModified: stats.mtime.toISOString(),
            created: stats.birthtime.toISOString(),
            exists: true
          };
          sendJsonResponse(res, 200, metadata);
        } else {
          sendJsonResponse(res, 200, { exists: false, error: 'File not found' });
        }
        return;
      } catch (error) {
        console.error('Error getting article metadata:', error);
        sendJsonResponse(res, 500, { error: 'Failed to get metadata' });
        return;
      }
    }

    // Upload article endpoint
    if (path === '/api/admin/upload-article' && req.method === 'POST') {
      // This is a placeholder - in a real implementation, you would handle file uploads
      // For now, we will just return success
      sendJsonResponse(res, 200, { success: true, message: 'Upload endpoint ready' });
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

    // GET /api/articles/search - Search articles
    if (path === '/api/articles/search' && req.method === 'GET') {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const query = url.searchParams.get('q') || '';
      const journalId = url.searchParams.get('journalId') || undefined;
      const author = url.searchParams.get('author') || undefined;
      const keyword = url.searchParams.get('keyword') || undefined;
      const status = url.searchParams.get('status') || undefined;
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      const offset = parseInt(url.searchParams.get('offset') || '0', 10);

      try {
        // Import search service (dynamic import for ESM)
        const { searchService } = await import('./src/lib/search/SearchService.js');
        
        const results = await searchService.search({
          q: query,
          journalId,
          author,
          keyword,
          status,
          limit,
          offset,
        });

        sendJsonResponse(res, 200, {
          results: results.map(r => ({
            article: r.article,
            score: r.score,
            highlights: r.highlights,
            matchedFields: r.matchedFields,
          })),
          total: results.length,
          limit,
          offset,
        });
        return;
      } catch (error) {
        // Fallback to simple search if service not available
        const articles = readArticles();
        const searchLower = query.toLowerCase();
        const filtered = articles
          .filter(article => {
            if (journalId && article.journalId !== journalId) return false;
            if (status && article.status !== status) return false;
            if (!query) return true;
            return (
              article.title.toLowerCase().includes(searchLower) ||
              article.abstract?.toLowerCase().includes(searchLower) ||
              article.keywords?.some(k => k.toLowerCase().includes(searchLower)) ||
              article.author?.toLowerCase().includes(searchLower)
            );
          })
          .slice(offset, offset + limit);

        sendJsonResponse(res, 200, {
          results: filtered,
          total: filtered.length,
          limit,
          offset,
        });
        return;
      }
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

    // OAI-PMH endpoint for metadata harvesting
    if (path.startsWith('/oai-pmh') && req.method === 'GET') {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const verb = url.searchParams.get('verb');
      
      if (verb === 'Identify') {
        sendJsonResponse(res, 200, {
          repositoryName: 'NewTIFI Academic Publishing Platform',
          baseURL: `http://${req.headers.host}/oai-pmh`,
          protocolVersion: '2.0',
          adminEmail: 'admin@newtifi.com',
          earliestDatestamp: '2025-01-01T00:00:00Z',
          deletedRecord: 'no',
          granularity: 'YYYY-MM-DDThh:mm:ssZ',
        });
        return;
      }

      if (verb === 'ListMetadataFormats') {
        sendJsonResponse(res, 200, {
          metadataFormats: [
            {
              metadataPrefix: 'oai_dc',
              schema: 'http://www.openarchives.org/OAI/2.0/oai_dc.xsd',
              metadataNamespace: 'http://www.openarchives.org/OAI/2.0/oai_dc/',
            },
          ],
        });
        return;
      }

      if (verb === 'ListSets') {
        const journals = readJournals();
        sendJsonResponse(res, 200, {
          sets: journals.map(j => ({
            setSpec: j.id,
            setName: j.title,
          })),
        });
        return;
      }

      if (verb === 'ListRecords' || verb === 'GetRecord') {
        try {
          const { metadataService } = await import('./src/lib/storage/MetadataService.js');
          const articles = readArticles();
          const publishedArticles = articles.filter(a => a.status === 'published');
          
          const records = await Promise.all(
            publishedArticles.map(async (article) => {
              const metadata = await metadataService.enrichFromExisting(
                article.journalId || 'investment-management',
                article.id,
                article
              );
              const oaiRecord = metadataService.generateOAIRecord(metadata);
              return oaiRecord;
            })
          );

          if (verb === 'GetRecord') {
            const identifier = url.searchParams.get('identifier');
            const record = records.find(r => r.header.identifier === identifier);
            if (record) {
              sendJsonResponse(res, 200, { record });
            } else {
              sendJsonResponse(res, 404, { error: 'Record not found' });
            }
          } else {
            sendJsonResponse(res, 200, {
              records,
              resumptionToken: null,
            });
          }
          return;
        } catch (error) {
          sendJsonResponse(res, 500, { error: 'Failed to generate OAI-PMH records' });
          return;
        }
      }

      sendJsonResponse(res, 400, { error: 'Invalid or missing verb parameter' });
      return;
    }

    // ============================================
    // USER MANAGEMENT ENDPOINTS
    // ============================================
    
    // GET /api/me - Get current user
    if (path === '/api/me' && req.method === 'GET') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const users = readUsers();
      const user = users.find(u => u.id === userId);
      if (!user) {
        sendJsonResponse(res, 404, { error: 'User not found' });
        return;
      }
      
      // Remove sensitive data
      const { password, ...safeUser } = user;
      sendJsonResponse(res, 200, safeUser);
      return;
    }

    // PUT /api/me - Update current user
    if (path === '/api/me' && req.method === 'PUT') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const body = await parseBody(req);
      const users = readUsers();
      const idx = users.findIndex(u => u.id === userId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'User not found' });
        return;
      }
      
      // Don't allow role changes via this endpoint
      const { role, password, id, ...updateData } = body;
      users[idx] = { 
        ...users[idx], 
        ...updateData, 
        updatedAt: new Date().toISOString() 
      };
      writeUsers(users);
      
      const { password: _, ...safeUser } = users[idx];
      sendJsonResponse(res, 200, safeUser);
      return;
    }

    // ============================================
    // CONTACT FORM ENDPOINT
    // ============================================
    
    // POST /api/contact - Submit contact form
    if (path === '/api/contact' && req.method === 'POST') {
      const body = await parseBody(req);
      const { name, email, subject, message } = body;
      
      if (!name || !email || !message) {
        sendJsonResponse(res, 400, { error: 'Name, email, and message are required' });
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        sendJsonResponse(res, 400, { error: 'Invalid email address' });
        return;
      }
      
      const submissions = readContactSubmissions();
      const submission = {
        id: Date.now().toString(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      
      submissions.push(submission);
      writeContactSubmissions(submissions);
      
      // Log submission (in production, send email here)
      console.log('Contact form submission:', submission);
      
      sendJsonResponse(res, 201, { 
        success: true, 
        message: 'Your message has been received. We will get back to you soon.',
        id: submission.id 
      });
      return;
    }

    // ============================================
    // CONTRIBUTOR APPLICATION ENDPOINTS
    // ============================================
    
    // POST /api/applications - Submit contributor application
    if (path === '/api/applications' && req.method === 'POST') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const body = await parseBody(req);
      const { bio, motivation } = body;
      
      if (!bio || !motivation) {
        sendJsonResponse(res, 400, { error: 'Bio and motivation are required' });
        return;
      }
      
      // Check if user already has an application
      const applications = readApplications();
      const existing = applications.find(app => app.userId === userId);
      if (existing) {
        sendJsonResponse(res, 409, { error: 'Application already exists' });
        return;
      }
      
      const application = {
        id: Date.now().toString(),
        userId,
        bio,
        motivation,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      applications.push(application);
      writeApplications(applications);
      
      console.log('New contributor application:', application);
      
      sendJsonResponse(res, 201, application);
      return;
    }

    // GET /api/applications/me - Get user's application
    if (path === '/api/applications/me' && req.method === 'GET') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const applications = readApplications();
      const application = applications.find(app => app.userId === userId);
      
      if (!application) {
        sendJsonResponse(res, 404, { error: 'No application found' });
        return;
      }
      
      sendJsonResponse(res, 200, application);
      return;
    }

    // ============================================
    // ADMIN APPLICATION MANAGEMENT
    // ============================================
    
    // GET /api/admin/applications - Get all applications
    if (path === '/api/admin/applications' && req.method === 'GET') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const applications = readApplications();
      const users = readUsers();
      
      // Enrich with user data
      const enriched = applications.map(app => ({
        ...app,
        user: users.find(u => u.id === app.userId)
      }));
      
      sendJsonResponse(res, 200, enriched);
      return;
    }

    // POST /api/admin/applications/:id/approve
    if (path.startsWith('/api/admin/applications/') && path.endsWith('/approve') && req.method === 'POST') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const appId = path.split('/')[4];
      const applications = readApplications();
      const idx = applications.findIndex(app => app.id === appId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Application not found' });
        return;
      }
      
      applications[idx].status = 'approved';
      applications[idx].updatedAt = new Date().toISOString();
      applications[idx].reviewedBy = getUserIdFromSession(req);
      applications[idx].reviewedAt = new Date().toISOString();
      
      writeApplications(applications);
      
      // Update user role
      const users = readUsers();
      const userIdx = users.findIndex(u => u.id === applications[idx].userId);
      if (userIdx !== -1) {
        users[userIdx].role = 'CONTRIBUTOR';
        users[userIdx].updatedAt = new Date().toISOString();
        writeUsers(users);
      }
      
      console.log('Application approved:', appId);
      
      sendJsonResponse(res, 200, applications[idx]);
      return;
    }

    // POST /api/admin/applications/:id/reject
    if (path.startsWith('/api/admin/applications/') && path.endsWith('/reject') && req.method === 'POST') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const appId = path.split('/')[4];
      const applications = readApplications();
      const idx = applications.findIndex(app => app.id === appId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Application not found' });
        return;
      }
      
      applications[idx].status = 'rejected';
      applications[idx].updatedAt = new Date().toISOString();
      applications[idx].reviewedBy = getUserIdFromSession(req);
      applications[idx].reviewedAt = new Date().toISOString();
      
      writeApplications(applications);
      
      console.log('Application rejected:', appId);
      
      sendJsonResponse(res, 200, applications[idx]);
      return;
    }

    // ============================================
    // ARTICLE MANAGEMENT FOR CONTRIBUTORS
    // ============================================
    
    // GET /api/articles/my - Get user's articles
    if (path === '/api/articles/my' && req.method === 'GET') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const articles = readArticles();
      // Filter articles by authorId (for new articles) or by author email/name (for legacy articles)
      const userArticles = articles.filter(article => {
        if (article.authorId === userId) return true;
        // For legacy articles without authorId, check if user email matches author field
        const users = readUsers();
        const user = users.find(u => u.id === userId);
        if (user && article.author && article.author.toLowerCase().includes(user.email.toLowerCase())) {
          return true;
        }
        return false;
      });
      sendJsonResponse(res, 200, userArticles);
      return;
    }

    // POST /api/articles - Create article
    if (path === '/api/articles' && req.method === 'POST') {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      // Check if user is contributor or admin
      const users = readUsers();
      const user = users.find(u => u.id === userId);
      if (!user || (user.role !== 'CONTRIBUTOR' && user.role !== 'ADMIN')) {
        sendJsonResponse(res, 403, { error: 'Only contributors can create articles' });
        return;
      }
      
      const body = await parseBody(req);
      const articles = readArticles();
      const article = {
        id: Date.now().toString(),
        ...body,
        authorId: userId,
        status: 'draft',
        views: 0,
        downloads: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      articles.push(article);
      writeArticles(articles);
      
      sendJsonResponse(res, 201, article);
      return;
    }

    // PUT /api/articles/:id - Update article
    if (path.startsWith('/api/articles/') && req.method === 'PUT' && !path.includes('/admin/')) {
      const userId = getUserIdFromSession(req);
      if (!userId) {
        sendJsonResponse(res, 401, { error: 'Unauthorized' });
        return;
      }
      
      const articleId = path.split('/')[3];
      const articles = readArticles();
      const idx = articles.findIndex(a => a.id === articleId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Article not found' });
        return;
      }
      
      // Check ownership or admin
      const users = readUsers();
      const user = users.find(u => u.id === userId);
      if (articles[idx].authorId !== userId && user?.role !== 'ADMIN') {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const body = await parseBody(req);
      articles[idx] = { 
        ...articles[idx], 
        ...body, 
        updatedAt: new Date().toISOString() 
      };
      writeArticles(articles);
      
      sendJsonResponse(res, 200, articles[idx]);
      return;
    }

    // POST /api/admin/articles/:id/publish - Publish article
    if (path.startsWith('/api/admin/articles/') && path.endsWith('/publish') && req.method === 'POST') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const articleId = path.split('/')[4];
      const articles = readArticles();
      const idx = articles.findIndex(a => a.id === articleId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'Article not found' });
        return;
      }
      
      articles[idx].status = 'published';
      articles[idx].publishedAt = new Date().toISOString();
      articles[idx].updatedAt = new Date().toISOString();
      writeArticles(articles);
      
      sendJsonResponse(res, 200, articles[idx]);
      return;
    }

    // ============================================
    // PASSWORD RESET ENDPOINTS
    // ============================================
    
    // POST /api/auth/forgot-password
    if (path === '/api/auth/forgot-password' && req.method === 'POST') {
      const body = await parseBody(req);
      const { email } = body;
      
      if (!email) {
        sendJsonResponse(res, 400, { error: 'Email is required' });
        return;
      }
      
      const users = readUsers();
      const user = users.find(u => u.email === email);
      
      // Don't reveal if user exists (security best practice)
      if (user) {
        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour
        
        // Store token
        const resetTokens = readResetTokens();
        resetTokens.push({
          token,
          userId: user.id,
          expiresAt,
          createdAt: Date.now()
        });
        writeResetTokens(resetTokens);
        
        // Log token (in production, send email here)
        console.log(`Password reset token for ${email}: ${token}`);
        console.log(`Reset URL: http://localhost:8080/reset-password?token=${token}`);
      }
      
      // Always return success (don't reveal if user exists)
      sendJsonResponse(res, 200, { 
        message: 'If an account exists with this email, a password reset link has been sent.' 
      });
      return;
    }

    // POST /api/auth/reset-password
    if (path === '/api/auth/reset-password' && req.method === 'POST') {
      const body = await parseBody(req);
      const { token, password } = body;
      
      if (!token || !password) {
        sendJsonResponse(res, 400, { error: 'Token and password are required' });
        return;
      }
      
      if (password.length < 6) {
        sendJsonResponse(res, 400, { error: 'Password must be at least 6 characters' });
        return;
      }
      
      const resetTokens = readResetTokens();
      const resetToken = resetTokens.find(t => t.token === token);
      
      if (!resetToken || resetToken.expiresAt < Date.now()) {
        sendJsonResponse(res, 400, { error: 'Invalid or expired token' });
        return;
      }
      
      // Update user password
      const users = readUsers();
      const userIdx = users.findIndex(u => u.id === resetToken.userId);
      
      if (userIdx === -1) {
        sendJsonResponse(res, 404, { error: 'User not found' });
        return;
      }
      
      users[userIdx].password = hashPassword(password);
      users[userIdx].updatedAt = new Date().toISOString();
      writeUsers(users);
      
      // Remove used token
      const updatedTokens = resetTokens.filter(t => t.token !== token);
      writeResetTokens(updatedTokens);
      
      sendJsonResponse(res, 200, { message: 'Password reset successfully' });
      return;
    }

    // ============================================
    // ADMIN USER MANAGEMENT
    // ============================================
    
    // GET /api/admin/users
    if (path === '/api/admin/users' && req.method === 'GET') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const users = readUsers();
      // Remove sensitive data
      const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
      }));
      
      sendJsonResponse(res, 200, safeUsers);
      return;
    }

    // PUT /api/admin/users/:id
    if (path.startsWith('/api/admin/users/') && req.method === 'PUT') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const userId = path.split('/')[4];
      const body = await parseBody(req);
      const users = readUsers();
      const idx = users.findIndex(u => u.id === userId);
      
      if (idx === -1) {
        sendJsonResponse(res, 404, { error: 'User not found' });
        return;
      }
      
      // Don't allow password changes via this endpoint
      const { password, ...updateData } = body;
      users[idx] = { 
        ...users[idx], 
        ...updateData, 
        updatedAt: new Date().toISOString() 
      };
      writeUsers(users);
      
      const { password: _, ...safeUser } = users[idx];
      sendJsonResponse(res, 200, safeUser);
      return;
    }

    // ============================================
    // ENHANCED ANALYTICS
    // ============================================
    
    // GET /api/admin/analytics (enhanced)
    if (path === '/api/admin/analytics' && req.method === 'GET') {
      if (!isAdmin(req)) {
        sendJsonResponse(res, 403, { error: 'Forbidden' });
        return;
      }
      
      const analytics = viewTracker.getAnalytics();
      const articles = readArticles();
      const users = readUsers();
      const applications = readApplications();
      const submissions = readContactSubmissions();
      
      const data = {
        ...analytics,
        totalArticles: articles.length,
        publishedArticles: articles.filter(a => a.status === 'published').length,
        draftArticles: articles.filter(a => a.status === 'draft').length,
        totalUsers: users.length,
        totalContributors: users.filter(u => u.role === 'CONTRIBUTOR').length,
        totalAdmins: users.filter(u => u.role === 'ADMIN').length,
        pendingApplications: applications.filter(a => a.status === 'pending').length,
        approvedApplications: applications.filter(a => a.status === 'approved').length,
        totalViews: articles.reduce((sum, a) => sum + (viewTracker.getArticleViews(a.id) || 0), 0),
        totalDownloads: articles.reduce((sum, a) => sum + (a.downloads || 0), 0),
        recentSubmissions: submissions.filter(s => {
          const date = new Date(s.createdAt);
          const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          return date.getTime() > weekAgo;
        }).length
      };
      
      sendJsonResponse(res, 200, data);
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
  console.log('Session management initialized');
  console.log('Admin credentials: karlodefinis@newtifi.com / mistamoney');
  console.log('Initialized with', initialArticles.length, 'articles and', initialJournals.length, 'journals');
  console.log('\n✅ API Endpoints Available:');
  console.log('\n📝 Authentication:');
  console.log('  - POST /api/auth/login');
  console.log('  - POST /api/auth/register');
  console.log('  - POST /api/auth/logout');
  console.log('  - POST /api/auth/forgot-password');
  console.log('  - POST /api/auth/reset-password');
  console.log('  - POST /api/admin/login');
  console.log('\n👤 User Management:');
  console.log('  - GET  /api/me');
  console.log('  - PUT  /api/me');
  console.log('  - GET  /api/admin/users');
  console.log('  - PUT  /api/admin/users/:id');
  console.log('\n📧 Contact & Applications:');
  console.log('  - POST /api/contact');
  console.log('  - POST /api/applications');
  console.log('  - GET  /api/applications/me');
  console.log('  - GET  /api/admin/applications');
  console.log('  - POST /api/admin/applications/:id/approve');
  console.log('  - POST /api/admin/applications/:id/reject');
  console.log('\n📄 Articles:');
  console.log('  - GET  /api/articles/my');
  console.log('  - POST /api/articles');
  console.log('  - PUT  /api/articles/:id');
  console.log('  - POST /api/admin/articles/:id/publish');
  console.log('\n📊 Analytics:');
  console.log('  - GET  /api/admin/analytics (enhanced)');
}); 