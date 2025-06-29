#!/bin/bash

echo "🚀 Starting NewTIFI Web Builder Servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server on port 3001..."
node simple-admin-server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Check if backend started successfully
if ! curl -s http://localhost:3001/api/articles > /dev/null; then
    echo "❌ Backend server failed to start"
    exit 1
fi

echo "✅ Backend server running on http://localhost:3001"

# Start frontend server
echo "🌐 Starting frontend server on port 8080..."
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

# Check if frontend started successfully
if ! curl -s http://localhost:8080 > /dev/null; then
    echo "❌ Frontend server failed to start"
    exit 1
fi

echo "✅ Frontend server running on http://localhost:8080"
echo ""
echo "🎉 Both servers are running!"
echo "📱 Frontend: http://localhost:8080"
echo "🔧 Backend: http://localhost:3001"
echo "👨‍💼 Admin Panel: http://localhost:8080/admin"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait 