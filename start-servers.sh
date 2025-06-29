#!/bin/bash

echo "🚀 Starting NewTIFI Web Builder servers..."

# Kill any existing processes on ports 3001 and 8080
echo "🔄 Cleaning up existing processes..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Start backend server
echo "🔧 Starting backend server on port 3001..."
node simple-admin-server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🌐 Starting frontend server on port 8080..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started successfully!"
echo "📊 Backend API: http://localhost:3001"
echo "🌐 Frontend: http://localhost:8080"
echo "🔐 Admin Panel: http://localhost:8080/admin"
echo "👤 Admin Login: karlodefinis@newtifi.com / mistamoney"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 