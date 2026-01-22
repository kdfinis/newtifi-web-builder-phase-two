#!/usr/bin/env python3
"""
Simple Python HTTP server with SPA routing support.
Serves index.html for all routes to enable React Router deep linking.
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        
        # Check if the path is for a static asset
        if path.startswith('/assets/') or path.startswith('/images/') or path.startswith('/files/') or path.startswith('/favicon.ico'):
            # Serve static files normally
            return super().do_GET()
        
        # For all other routes, serve index.html (SPA routing)
        try:
            with open('index.html', 'rb') as f:
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()
                self.wfile.write(f.read())
        except FileNotFoundError:
            self.send_error(404, "index.html not found")
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    PORT = 8080
    
    # Change to dist directory
    os.chdir('dist')
    
    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        print(f"SPA server running at http://localhost:{PORT}")
        print("All routes will serve index.html for SPA routing")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()
