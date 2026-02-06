#!/bin/bash
# Start local servers for testing

cd "$(dirname "$0")/.."

echo "🚀 Starting local servers for testing..."
echo ""

# Kill any existing servers
echo "Cleaning up existing servers..."
pkill -f "simple-admin-server" 2>/dev/null
pkill -f "vite.*8080" 2>/dev/null
sleep 1

# Start backend server
echo "📡 Starting backend server on port 3001..."
node simple-admin-server.js > server.log 2>&1 &
BACKEND_PID=$!
sleep 2

# Check if backend started
if ps -p $BACKEND_PID > /dev/null; then
  echo "✅ Backend server started (PID: $BACKEND_PID)"
else
  echo "❌ Backend server failed to start. Check server.log"
  exit 1
fi

# Start frontend dev server
echo "🌐 Starting frontend dev server on port 8080..."
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 3

# Check if frontend started
if ps -p $FRONTEND_PID > /dev/null; then
  echo "✅ Frontend server started (PID: $FRONTEND_PID)"
else
  echo "❌ Frontend server failed to start"
  exit 1
fi

echo ""
echo "=========================================="
echo "✅ Servers are running!"
echo "=========================================="
echo ""
echo "📍 Backend API:  http://localhost:3001"
echo "📍 Frontend:     http://localhost:8080"
echo ""
echo "📊 Test endpoints:"
echo "   - http://localhost:3001/api/articles"
echo "   - http://localhost:3001/api/articles/search?q=ELTIFs"
echo "   - http://localhost:3001/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf"
echo ""
echo "🧪 Test pages:"
echo "   - http://localhost:8080/articles"
echo "   - http://localhost:8080/publishing"
echo "   - http://localhost:8080/publishing/article/eltifs-compulsory-redemptions"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

# Wait for interrupt
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
