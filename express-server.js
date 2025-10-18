import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// LinkedIn OAuth will be implemented manually
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import bcrypt from 'bcrypt';
import fs from 'fs';
import prismaPkg from './generated/prisma/index.js';
const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

// Load auth configuration
const authConfig = JSON.parse(fs.readFileSync('./config/auth.json', 'utf8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable compression
app.use(compression());

// Security headers
app.use(helmet({
    // Allow cross-origin iframes like Google Maps
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: (() => {
              const base = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
              if (process.env.LIVE_RELOAD) base.push('http://localhost:35729');
              return base;
            })(),
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: (() => {
              const base = ["'self'", "http://localhost:8080"];
              if (process.env.LIVE_RELOAD) base.push('http://localhost:35729');
              return base;
            })(),
            // Allow map embeds (Google and OpenStreetMap)
            frameSrc: [
              "'self'",
              "https://www.google.com",
              "https://google.com",
              "https://maps.google.com",
              "https://*.google.com",
              "https://www.openstreetmap.org"
            ],
            childSrc: [
              "'self'",
              "https://www.google.com",
              "https://google.com",
              "https://maps.google.com",
              "https://*.google.com",
              "https://www.openstreetmap.org"
            ],
        },
    },
}));

// CORS to allow frontend (8080) to call backend (3000)
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

// Development mode - attach Vite middlewares only (catch-all added after APIs)
let viteDev;
// Live reload (injection) in production-like flow without dev server
if (process.env.LIVE_RELOAD) {
  const lrServer = livereload.createServer({ exts: ['html', 'css', 'js'] });
  lrServer.watch(path.join(__dirname, 'dist'));
  app.use(connectLivereload());
}
if (process.env.NODE_ENV === 'development') {
    (async () => {
        viteDev = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        });
        app.use(viteDev.middlewares);
    })();
}

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'changeme-please-use-env-var',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '604800000'), // 7 days default
    domain: process.env.NODE_ENV === 'production' ? '.newtifi.org' : undefined
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

// Helper to get callback URL based on environment
function getCallbackUrl(provider) {
  const appOrigin = process.env.APP_ORIGIN || 'http://localhost:8080';
  return `${appOrigin}/auth/${provider}/callback`;
}

// Local (email/password) strategy
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return done(null, false, { message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return done(null, false, { message: 'Invalid credentials' });
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || authConfig.google.clientId,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || authConfig.google.clientSecret,
  callbackURL: getCallbackUrl('google'),
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('🔐 Google OAuth - Processing authentication');
    
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;
    const displayName = profile.displayName || '';
    const avatarUrl = profile.photos?.[0]?.value || null;
    
    if (!email) {
      console.error('❌ No email provided by Google');
      return done(new Error('No email provided by Google'), null);
    }
    
    // Try to find existing user by googleId
    let user = await prisma.user.findUnique({ where: { googleId } });
    
    if (!user) {
      // Try to find by email (user might have registered with email first)
      const existingEmailUser = await prisma.user.findUnique({ where: { email } });
      
      if (existingEmailUser) {
        // Link Google account to existing email user
        console.log('🔗 Linking Google account to existing user:', email);
        user = await prisma.user.update({
          where: { email },
          data: { 
            googleId,
            avatarUrl: avatarUrl || existingEmailUser.avatarUrl,
            name: existingEmailUser.name || displayName
          }
        });
      } else {
        // Create new user
        console.log('👤 Creating new user from Google:', email);
        user = await prisma.user.create({ 
          data: { 
            email, 
            name: displayName,
            googleId,
            avatarUrl
          } 
        });
      }
    } else {
      // Update existing user's avatar and name if not set
      console.log('✅ Existing Google user found:', email);
      user = await prisma.user.update({
        where: { googleId },
        data: {
          avatarUrl: avatarUrl || user.avatarUrl,
          name: user.name || displayName,
          updatedAt: new Date()
        }
      });
    }
    
    console.log('✅ Google OAuth successful for:', user.email);
    return done(null, user);
  } catch (e) {
    console.error('❌ Google OAuth error:', e);
    return done(e, null);
  }
}));

// LinkedIn OAuth will be handled manually in routes

// Google OAuth endpoints
app.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account' // Always show account selection
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }), 
  (req, res) => {
    console.log('✅ Google OAuth callback successful');
    res.redirect('/dashboard?auth=success&provider=google');
  }
);

// LinkedIn OAuth endpoints - Manual Implementation
app.get('/auth/linkedin', (req, res) => {
  const state = Math.random().toString(36).substring(2, 15);
  req.session.linkedinState = state;
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID || authConfig.linkedin.clientId,
    redirect_uri: getCallbackUrl('linkedin'),
    state: state,
    scope: 'openid profile email'
  });
  
  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  console.log('🔐 Redirecting to LinkedIn:', linkedinAuthUrl);
  res.redirect(linkedinAuthUrl);
});

app.get('/auth/linkedin/callback', async (req, res) => {
  try {
    console.log('🔍 LinkedIn callback received:', req.query);
    
    const { code, state, error } = req.query;
    
    if (error) {
      console.error('❌ LinkedIn OAuth error:', error);
      return res.redirect('/login?error=linkedin_auth_failed&details=' + encodeURIComponent(error));
    }
    
    if (!code) {
      console.error('❌ No authorization code received');
      return res.redirect('/login?error=linkedin_auth_failed&details=no_code');
    }
    
    // Verify state parameter
    if (state !== req.session.linkedinState) {
      console.error('❌ Invalid state parameter');
      return res.redirect('/login?error=linkedin_auth_failed&details=invalid_state');
    }
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: getCallbackUrl('linkedin'),
        client_id: process.env.LINKEDIN_CLIENT_ID || authConfig.linkedin.clientId,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || authConfig.linkedin.clientSecret,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    console.log('🔑 Token response:', tokenData);
    
    if (!tokenData.access_token) {
      console.error('❌ No access token received:', tokenData);
      return res.redirect('/login?error=linkedin_auth_failed&details=no_token');
    }
    
    // Get user info from LinkedIn
    const userResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });
    
    const userData = await userResponse.json();
    console.log('👤 User data from LinkedIn:', userData);
    
    // Extract user information
    const linkedinId = userData.sub;
    const email = userData.email || `${linkedinId}@linkedin.local`;
    const displayName = userData.name || 'LinkedIn User';
    const avatarUrl = userData.picture || null;
    
    console.log('📋 Extracted data:', { linkedinId, email, displayName, avatarUrl });
    
    // Create or find user
    let user = await prisma.user.upsert({
      where: { linkedinId },
      update: {
        email,
        name: displayName,
        avatarUrl: avatarUrl || undefined,
        updatedAt: new Date()
      },
      create: {
        email,
        name: displayName,
        linkedinId,
        avatarUrl,
        role: 'MEMBER'
      }
    });
    
    // Log user in
    req.login(user, (err) => {
      if (err) {
        console.error('❌ Login error:', err);
        return res.redirect('/login?error=linkedin_auth_failed&details=login_error');
      }
      
      console.log('✅ LinkedIn OAuth successful for:', user.email);
      res.redirect('/dashboard?auth=success&provider=linkedin');
    });
    
  } catch (error) {
    console.error('❌ LinkedIn OAuth error:', error);
    res.redirect('/login?error=linkedin_auth_failed&details=' + encodeURIComponent(error.message));
  }
});

// Email auth endpoints
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 11);
    const user = await prisma.user.create({ data: { email, passwordHash, name } });
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login after register failed' });
      return res.json({ ok: true, user });
    });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ ok: true, user });
    });
  })(req, res, next);
});

app.post('/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ ok: true });
  });
});

// Enhanced auth status endpoint
app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.json({ 
      loggedIn: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        organization: user.organization,
        hasGoogleAuth: !!user.googleId,
        hasLinkedInAuth: !!user.linkedinId,
        hasPasswordAuth: !!user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Additional auth check endpoint (alias)
app.get('/auth/check', (req, res) => {
  res.redirect(307, '/auth/status');
});

// Password reset: request reset link
app.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const user = await prisma.user.findUnique({ where: { email } });
    // Do not leak existence; still behave as success
    if (!user) return res.json({ ok: true });

    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await prisma.resetToken.create({ data: { userId: user.id, token, expiresAt } });

    // For dev MVP: log link to console instead of sending email
    const link = `${process.env.APP_ORIGIN || 'http://localhost:8080'}/reset-password?token=${encodeURIComponent(token)}`;
    console.log(`Password reset link for ${email}: ${link}`);

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Password reset: perform reset
app.post('/auth/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) return res.status(400).json({ error: 'Invalid request' });

    const record = await prisma.resetToken.findUnique({ where: { token } });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Token invalid or expired' });
    }

    const hashed = await bcrypt.hash(password, 11);
    await prisma.user.update({ where: { id: record.userId }, data: { passwordHash: hashed } });
    await prisma.resetToken.delete({ where: { token } });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// DEV-ONLY: fetch latest reset token (to aid local testing)
if (process.env.NODE_ENV !== 'production') {
  app.get('/auth/dev/latest-reset-token', async (req, res) => {
    try {
      const latest = await prisma.resetToken.findFirst({ orderBy: { createdAt: 'desc' } });
      if (!latest) return res.status(404).json({ error: 'No tokens found' });
      res.json({ token: latest.token, userId: latest.userId, expiresAt: latest.expiresAt });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to fetch token' });
    }
  });
}

// Profile endpoints
app.get('/api/me', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  res.json(req.user);
});

app.put('/api/me', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const { name, bio, organization } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, bio, organization }
  });
  res.json(user);
});

// Account linking endpoints
app.post('/api/me/link-google', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  
  const { googleId } = req.body;
  if (!googleId) return res.status(400).json({ error: 'Google ID required' });
  
  try {
    // Check if googleId is already linked to another user
    const existing = await prisma.user.findUnique({ where: { googleId } });
    if (existing && existing.id !== req.user.id) {
      return res.status(409).json({ error: 'Google account already linked to another user' });
    }
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { googleId }
    });
    res.json({ ok: true, user });
  } catch (e) {
    console.error('Link Google error:', e);
    res.status(500).json({ error: 'Failed to link Google account' });
  }
});

app.post('/api/me/link-linkedin', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  
  const { linkedinId } = req.body;
  if (!linkedinId) return res.status(400).json({ error: 'LinkedIn ID required' });
  
  try {
    // Check if linkedinId is already linked to another user
    const existing = await prisma.user.findUnique({ where: { linkedinId } });
    if (existing && existing.id !== req.user.id) {
      return res.status(409).json({ error: 'LinkedIn account already linked to another user' });
    }
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { linkedinId }
    });
    res.json({ ok: true, user });
  } catch (e) {
    console.error('Link LinkedIn error:', e);
    res.status(500).json({ error: 'Failed to link LinkedIn account' });
  }
});

app.post('/api/me/unlink-provider', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  
  const { provider } = req.body;
  if (!['google', 'linkedin'].includes(provider)) {
    return res.status(400).json({ error: 'Invalid provider' });
  }
  
  try {
    const user = req.user;
    
    // Ensure user has at least one auth method remaining
    const authMethods = [
      !!user.passwordHash,
      !!user.googleId,
      !!user.linkedinId
    ].filter(Boolean).length;
    
    if (authMethods <= 1) {
      return res.status(400).json({ 
        error: 'Cannot unlink last authentication method. Please set a password first.' 
      });
    }
    
    const updateData = provider === 'google' 
      ? { googleId: null } 
      : { linkedinId: null };
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData
    });
    
    res.json({ ok: true, user: updatedUser });
  } catch (e) {
    console.error('Unlink provider error:', e);
    res.status(500).json({ error: 'Failed to unlink provider' });
  }
});

// Contributor application endpoints
app.post('/api/applications', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const { bio, motivation } = req.body;
  const app = await prisma.contributorApplication.create({
    data: { userId: req.user.id, bio, motivation, status: 'pending' }
  });
  res.json(app);
});

app.get('/api/applications/me', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const app = await prisma.contributorApplication.findUnique({
    where: { userId: req.user.id }
  });
  res.json(app);
});

// Admin application management
app.get('/api/admin/applications', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const applications = await prisma.contributorApplication.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(applications);
});

app.post('/api/admin/applications/:id/approve', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const app = await prisma.contributorApplication.update({
    where: { id: req.params.id },
    data: { status: 'approved' }
  });
  await prisma.user.update({
    where: { id: app.userId },
    data: { role: 'CONTRIBUTOR' }
  });
  res.json({ ok: true });
});

app.post('/api/admin/applications/:id/reject', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const app = await prisma.contributorApplication.update({
    where: { id: req.params.id },
    data: { status: 'rejected' }
  });
  res.json({ ok: true });
});

// Article endpoints
app.post('/api/articles', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role === 'MEMBER') 
    return res.status(403).json({ error: 'Contributors only' });
  
  const { title, summary, body, journal, category } = req.body;
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Handle slug conflicts
  let existingArticle = await prisma.article.findUnique({ where: { slug } });
  let counter = 2;
  while (existingArticle) {
    slug = `${slug}-${counter}`;
    existingArticle = await prisma.article.findUnique({ where: { slug } });
    counter++;
  }
  
  const article = await prisma.article.create({
    data: {
      authorId: req.user.id,
      title, slug, summary, body, journal, category,
      status: 'draft'
    }
  });
  res.json(article);
});

app.get('/api/articles/my', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const articles = await prisma.article.findMany({
    where: { authorId: req.user.id },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(articles);
});

app.get('/api/articles', async (req, res) => {
  const { status } = req.query;
  const where = status ? { status } : {};
  const articles = await prisma.article.findMany({
    where,
    include: { author: true },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(articles);
});

app.get('/api/articles/:id', async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { id: req.params.id },
    include: { author: true }
  });
  if (!article) return res.status(404).json({ error: 'Article not found' });
  
  // Check permissions
  if (article.status !== 'published' && article.authorId !== req.user?.id && req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  res.json(article);
});

app.put('/api/articles/:id', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const article = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (article.authorId !== req.user.id && req.user.role !== 'ADMIN')
    return res.status(403).json({ error: 'Not your article' });
  
  const updated = await prisma.article.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(updated);
});

app.post('/api/articles/:id/submit', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data: { status: 'pending' }
  });
  res.json(article);
});

// Admin article management
app.get('/api/admin/articles', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(articles);
});

app.post('/api/admin/articles/:id/publish', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data: { status: 'published', publishedAt: new Date() }
  });
  res.json(article);
});

app.post('/api/admin/articles/:id/reject', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const { editorNotes } = req.body;
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data: { status: 'rejected' }
  });
  res.json(article);
});

// Admin Users basic endpoints (expand later)
app.get('/admin/api/users', async (req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(users);
});

app.post('/admin/api/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await prisma.user.update({ where: { id }, data: { role } });
  res.json(user);
});

    // Dev catch-all must come AFTER API routes, so APIs do not get swallowed
if (process.env.NODE_ENV === 'development') {
  app.get(/.*/, async (req, res, next) => {
    try {
      if (!viteDev) return next();
      const url = req.originalUrl;
      const template = await viteDev.transformIndexHtml(url, '');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      viteDev.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// Production mode - serve static files AFTER API routes
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'dist'), {
      maxAge: '1d',
      etag: true,
      lastModified: true
  }));

  // Handle all routes by serving index.html
  app.get(/.*/, (req, res) => {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`
        <html>
            <head>
                <title>Error - New Technologies & Investment Funds Institute</title>
                <style>
                    body { font-family: Verdana, sans-serif; padding: 2rem; text-align: center; }
                    h1 { color: #1a365d; }
                    p { color: #2d3748; }
                </style>
            </head>
            <body>
                <h1>Something went wrong</h1>
                <p>We are working on fixing this issue. Please try again later.</p>
            </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Mode:', process.env.NODE_ENV || 'development');
}); 