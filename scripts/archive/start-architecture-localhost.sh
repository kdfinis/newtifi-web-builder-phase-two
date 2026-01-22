#!/bin/bash
# NewTIFI Architecture Localhost Script
# This creates a localhost on port 1000 using the new architecture

echo "🚀 Starting NewTIFI Architecture Localhost (Port 1000)"
echo "📝 This uses the new architecture with all services and components"
echo "🔧 Port: 1000 (exclusive)"

# Kill any existing processes on port 1000
echo "🔄 Stopping existing servers on port 1000..."
lsof -ti:1000 | xargs kill -9 2>/dev/null || true

# Clean and build
echo "📦 Building production version with new architecture..."
rm -rf dist/
npm run build

# Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed - no dist directory created"
    exit 1
fi

# Start custom server on port 1000 with proper MIME types
echo "🌐 Starting architecture localhost on port 1000..."
echo "✅ Architecture localhost running at http://localhost:1000"
echo "📝 This showcases the new architecture with all services"
echo "🔄 To restart, run: ./scripts/start-architecture-localhost.sh"

node scripts/architecture-server.cjs
