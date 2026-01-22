#!/bin/bash

# Deploy to GitHub Pages (main branch)
# GitHub Pages serves from main branch root

set -e

echo "🚀 Deploying to GitHub Pages (newtifi.com)"
echo ""

# Step 1: Build the application
echo "📦 Building application..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist/ directory not found"
    exit 1
fi

# Step 2: Copy built files to root
echo "📋 Copying built files to root..."
cp -r dist/* .

# Step 3: Ensure .nojekyll exists
touch .nojekyll

# Step 4: Verify critical files exist
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found in root"
    exit 1
fi

if [ ! -d "assets" ]; then
    echo "❌ assets/ directory not found in root"
    exit 1
fi

echo "✅ Files copied successfully"
echo ""
echo "📋 Next steps:"
echo "1. Review changes: git status"
echo "2. Commit: git add . && git commit -m 'Deploy latest build to GitHub Pages'"
echo "3. Push: git push origin main"
echo ""
echo "⏱️  GitHub Pages will update within 5-15 minutes"
