#!/bin/bash
# NewTIFI Stable Localhost Script
# This creates a production-mirror localhost that's extremely stable

echo "🚀 Starting NewTIFI Stable Localhost (Production Mirror)"
echo "📝 This mirrors production exactly - no dev features"

# Kill any existing processes
echo "🔄 Stopping existing servers..."
pkill -f "vite\|serve\|node.*dev" 2>/dev/null || true

# Clean and build
echo "📦 Building production version..."
rm -rf dist/
npm run build

# Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed - no dist directory created"
    exit 1
fi

# Start static server
echo "🌐 Starting static server on localhost:8080..."
echo "✅ Stable localhost running at http://localhost:8080"
echo "📝 This is a production mirror - no hot reload, no dev features"
echo "🔄 To restart, run: ./scripts/start-stable-localhost.sh"

npx serve -s dist -l 8080 --single
