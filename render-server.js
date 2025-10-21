// Simplified Express server for Render free tier
// No database dependencies - uses in-memory storage

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { PrismaClient } = require('./generated/prisma');

const app = express();
const PORT = process.env.PORT || 3001;

// Simple in-memory database
const db = require('./render-database');

// CORS to allow frontend to call backend
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://newtifi.com', 'https://www.newtifi.com', 'https://newtifi-web-builder-phase-two.onrender.com']
  : ['http://localhost:8080'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'render-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Google OAuth endpoint
app.get('/auth/google', (req, res) => {
  const googleClientId = '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com';
  const redirectUri = 'https://newtifi-web-builder-phase-two.onrender.com/auth/google/callback';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${googleClientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=profile email&` +
    `prompt=select_account`;
  
  res.redirect(authUrl);
});

// Google OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('https://newtifi.com/login?error=google_auth_failed');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com',
        client_secret: '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',
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'https://newtifi-web-builder-phase-two.onrender.com/auth/google/callback'
      })
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return res.redirect('https://newtifi.com/login?error=google_auth_failed');
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    
    const googleUser = await userResponse.json();
    
    // Find or create user
    let user = await db.findUserByGoogleId(googleUser.id);
    
    if (!user) {
      user = await db.createUser({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.id,
        avatarUrl: googleUser.picture
      });
    }

    // Create session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.createSession(user.id, sessionId);
    
    // Set session cookie and redirect
    res.cookie('sessionId', sessionId, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect('https://newtifi.com/dashboard?auth=success&provider=google');
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('https://newtifi.com/login?error=google_auth_failed');
  }
});

// LinkedIn OAuth endpoint
app.get('/auth/linkedin', (req, res) => {
  const linkedinClientId = '784sx1yh2lpuxm';
  const redirectUri = 'https://newtifi-web-builder-phase-two.onrender.com/auth/linkedin/callback';
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${linkedinClientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=openid profile email&` +
    `state=linkedin_auth`;
  
  res.redirect(authUrl);
});

// LinkedIn OAuth callback
app.get('/auth/linkedin/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('https://newtifi.com/login?error=linkedin_auth_failed');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: '784sx1yh2lpuxm',
        client_secret: 'WPL_AP1.ZCdvRZtOo5BgQfzD.pZ9uHQ==',
        redirect_uri: 'https://newtifi-web-builder-phase-two.onrender.com/auth/linkedin/callback'
      })
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return res.redirect('https://newtifi.com/login?error=linkedin_auth_failed');
    }

    // Get user info from LinkedIn
    const userResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    
    const linkedinUser = await userResponse.json();
    
    // Find or create user
    let user = await db.findUserByLinkedInId(linkedinUser.sub);
    
    if (!user) {
      user = await db.createUser({
        email: linkedinUser.email,
        name: linkedinUser.name,
        linkedinId: linkedinUser.sub,
        avatarUrl: linkedinUser.picture
      });
    }

    // Create session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.createSession(user.id, sessionId);
    
    // Set session cookie and redirect
    res.cookie('sessionId', sessionId, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect('https://newtifi.com/dashboard?auth=success&provider=linkedin');
    
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    res.redirect('https://newtifi.com/login?error=linkedin_auth_failed');
  }
});

// Auth status endpoint
app.get('/auth/status', async (req, res) => {
  try {
    const sessionId = req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.json({ authenticated: false });
    }

    const session = await db.findSession(sessionId);
    
    if (!session) {
      return res.json({ authenticated: false });
    }

    // Find user by ID (simplified)
    let user = null;
    for (const u of db.users?.values() || []) {
      if (u.id === session.userId) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Auth status error:', error);
    res.json({ authenticated: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Render OAuth server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
