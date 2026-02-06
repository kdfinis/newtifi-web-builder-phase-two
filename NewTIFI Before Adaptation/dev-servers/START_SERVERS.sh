#!/bin/bash
# Start both servers for NewTIFI website

echo "🚀 Starting NewTIFI Development Servers..."
echo ""

# Kill any existing processes
echo "Cleaning up existing processes..."
pkill -f "node.*simple-admin-server" 2>/dev/null
pkill -f "vite.*8080" 2>/dev/null
sleep 1

# Start backend
echo "Starting backend server on port 3001..."
cd "$(dirname "$0")"
node simple-admin-server.js > /tmp/newtifi-backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
sleep 2

# Check if backend started
if curl -s http://localhost:3001/api/articles > /dev/null 2>&1; then
    echo "✅ Backend server started successfully"
else
    echo "❌ Backend server failed to start. Check /tmp/newtifi-backend.log"
    exit 1
fi

# Start frontend
echo ""
echo "Starting frontend server on port 8080..."
npm run dev > /tmp/newtifi-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
sleep 3

# Check if frontend started
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Frontend server started successfully"
else
    echo "❌ Frontend server failed to start. Check /tmp/newtifi-frontend.log"
    exit 1
fi

echo ""
echo "✅ Both servers are running!"
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:8080"
echo ""
echo "Logs:"
echo "  Backend:  tail -f /tmp/newtifi-backend.log"
echo "  Frontend: tail -f /tmp/newtifi-frontend.log"
echo ""
echo "To stop: pkill -f 'node.*simple-admin-server'; pkill -f 'vite.*8080'"
