#!/bin/bash
# Manual Firebase Deployment Script
# Use this if service account keys are blocked by org policies

set -e

echo "🚀 Manual Firebase Deployment"
echo "=============================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Install with: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo "⚠️  Not logged in to Firebase"
    echo "Run: firebase login"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Verify build output
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - dist/index.html missing"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Firebase
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting --project newtifi-web

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://newtifi-web.web.app"
