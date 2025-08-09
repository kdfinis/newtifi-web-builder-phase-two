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
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import bcrypt from 'bcrypt';
import prismaPkg from './generated/prisma/index.js';
const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable compression
app.use(compression());

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: (() => {
              const base = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
              if (process.env.LIVE_RELOAD) base.push('http://localhost:35729');
              return base;
            })(),
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: (() => {
              const base = ["'self'", "http://localhost:8080"];
              if (process.env.LIVE_RELOAD) base.push('http://localhost:35729');
              return base;
            })(),
            frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com"],
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
  secret: process.env.SESSION_SECRET || 'changeme',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax'
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
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:8080/auth/${provider}/callback`;
  }
  return `/auth/${provider}/callback`;
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
  clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
  callbackURL: getCallbackUrl('google'),
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;
    let user = await prisma.user.findUnique({ where: { googleId } });
    if (!user && email) {
      // Upsert by email if exists
      user = await prisma.user.upsert({
        where: { email },
        update: { googleId },
        create: { email, name: profile.displayName || email, googleId }
      });
    }
    if (!user) {
      user = await prisma.user.create({ data: { email: email || `${googleId}@google.local`, name: profile.displayName || 'Google User', googleId } });
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

// LinkedIn OAuth Strategy
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID || 'LINKEDIN_CLIENT_ID',
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'LINKEDIN_CLIENT_SECRET',
  callbackURL: getCallbackUrl('linkedin'),
  scope: ['r_emailaddress', 'r_liteprofile'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const linkedinId = profile.id;
    let user = await prisma.user.findUnique({ where: { linkedinId } });
    if (!user && email) {
      user = await prisma.user.upsert({
        where: { email },
        update: { linkedinId },
        create: { email, name: profile.displayName || email, linkedinId }
      });
    }
    if (!user) {
      user = await prisma.user.create({ data: { email: email || `${linkedinId}@linkedin.local`, name: profile.displayName || 'LinkedIn User', linkedinId } });
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

// Google OAuth endpoints
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// LinkedIn OAuth endpoints
app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
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

// Auth status endpoint
app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
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

// Dev catch-all must come AFTER API routes, so APIs don't get swallowed
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
                <title>Error - New Technologies and Investment Funds Institute</title>
                <style>
                    body { font-family: Verdana, sans-serif; padding: 2rem; text-align: center; }
                    h1 { color: #1a365d; }
                    p { color: #2d3748; }
                </style>
            </head>
            <body>
                <h1>Something went wrong</h1>
                <p>We're working on fixing this issue. Please try again later.</p>
            </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Mode:', process.env.NODE_ENV || 'development');
}); 