#!/bin/bash

# 🚀 AUTOMATED FIREBASE DEPLOYMENT SCRIPT
# This script automatically builds and deploys to Firebase

set -e  # Exit on any error

echo "🚀 Starting automated Firebase deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if we're authenticated
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not authenticated with Firebase. Please run: firebase login"
    exit 1
fi

echo "✅ Firebase CLI ready"

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting --non-interactive

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your site is live at: https://newtifi.com"
else
    echo "❌ Deployment failed!"
    exit 1
fi
