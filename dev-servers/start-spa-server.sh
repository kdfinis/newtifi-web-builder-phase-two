#!/bin/bash

# Kill any existing server on port 8080
echo "Killing any existing server on port 8080..."
lsof -t -iTCP:8080 -sTCP:LISTEN | xargs -r kill -9

# Build the project
echo "Building project..."
npm run build

# Start the SPA server
echo "Starting SPA server on port 8080..."
python3 spa-server.py
