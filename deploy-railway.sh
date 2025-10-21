#!/bin/bash

# Railway Deployment Script for NewTIFI OAuth Backend
echo "🚀 Deploying NewTIFI OAuth Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (this will open browser)
echo "🔐 Logging into Railway..."
railway login

# Initialize Railway project
echo "🏗️  Initializing Railway project..."
railway init --name "newtifi-oauth-backend"

# Set environment variables
echo "⚙️  Setting environment variables..."
railway variables set NODE_ENV=production
railway variables set PORT=3001

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

# Get the deployment URL
echo "🌐 Getting deployment URL..."
RAILWAY_URL=$(railway domain)

echo "✅ Deployment complete!"
echo "🔗 Railway URL: $RAILWAY_URL"
echo ""
echo "📝 Next steps:"
echo "1. Update Google OAuth redirect URI to: $RAILWAY_URL/auth/google/callback"
echo "2. Update LinkedIn OAuth redirect URI to: $RAILWAY_URL/auth/linkedin/callback"
echo "3. Update frontend configuration to use Railway backend"
echo ""
echo "🎉 OAuth backend is now live on Railway!"
