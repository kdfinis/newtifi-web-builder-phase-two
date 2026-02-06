# NewTIFI Web Builder

A comprehensive web platform for New Technologies & Investment Funds Institute, featuring academic publishing, ISSN compliance, and a full admin management suite.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd newtifi-web-builder

# Install dependencies
npm install
```

### Running the Application

#### Option 1: Use the startup script (Recommended)
```bash
# Make the script executable (first time only)
chmod +x start-servers.sh

# Start both servers
./start-servers.sh
```

#### Option 2: Manual startup
```bash
# Terminal 1: Start backend server
node simple-admin-server.js

# Terminal 2: Start frontend server
npm run dev
```

### Access URLs
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001
- **Admin Panel**: http://localhost:8080/admin

## 🏗️ Architecture

### Frontend (React + Vite)
- **Port**: 8080 (development)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + custom components
- **Routing**: React Router
- **Build Output**: `dist/` directory (Firebase & GitHub Pages compatible)
- **Hosting**: Supports both GitHub Pages and Firebase Hosting

### Backend (Node.js + Express)
- **Port**: 3001
- **Framework**: Express.js
- **Database**: In-memory (JSON files)
- **Features**: Article management, admin authentication, analytics
- **Future**: Can migrate to Firebase Functions for scalability

### Hosting Configuration
- **GitHub Pages**: Primary deployment method (serves from `main` branch)
- **Firebase Hosting**: Available as alternative (serves from `dist/` directory)
- **SPA Routing**: Configured for both platforms (`firebase.json` + `404.html`)
- **Asset Serving**: Compatible with both hosting methods

## 📚 Features

### Public Site
- **Homepage**: Featured articles, institute overview
- **Publishing**: Investment Management Journal with ISSN compliance
- **Articles**: PDF viewing and download
- **About**: Team and mission information
- **Contact**: Contact forms and information

### Admin Panel
Complete admin suite with 10 modules:

1. **Dashboard Overview**
   - Analytics dashboard
   - Activity monitoring
   - Quick stats

2. **Article Collating Tool** ⭐ **NEW**
   - **Real PDF Article Management**: Only shows articles with actual PDF files
   - **Dynamic Scanning**: Automatically scans website directories for PDF articles
   - **File Validation**: Ensures articles have real PDF files before display
   - **Metadata Extraction**: Gets file size, dates, and other metadata
   - **Upload System**: Upload new PDF articles to the system
   - **Featured Management**: Toggle featured status for homepage display
   - **Delete Articles**: Remove articles from the system

3. **RAIF Code Legal Commentary Manager**
   - Legal commentary management
   - Regulatory updates
   - Compliance tracking

4. **News/Events/Updates**
   - News article management
   - Event scheduling
   - Update publishing

5. **Scholar Funding Program Manager**
   - Scholarship applications
   - Funding allocation
   - Program management

6. **People & Contributors Management**
   - Team member profiles
   - Contributor management
   - Role assignments

7. **Citation & Metadata Generator**
   - DOI generation
   - Citation formatting
   - Metadata management

8. **Media & Asset Library**
   - File uploads
   - Asset organization
   - Media management

9. **Static Content Editor**
   - Page content editing
   - SEO management
   - Content versioning

10. **Analytics Dashboard**
    - View tracking
    - Download analytics
    - Performance metrics

## 🔐 Admin Access

### Default Credentials
- **Email**: karlodefinis@newtifi.com
- **Password**: mistamoney

### Admin Features
- Secure authentication
- Real-time data updates
- File upload capabilities
- Analytics tracking
- Content management

## 📊 Data Management

### Articles
- **Real PDF Validation**: Only articles with actual PDF files are displayed
- **Dynamic Scanning**: Automatic detection of PDF articles in website directories
- **File Metadata**: File size, modification dates, and other metadata tracking
- **Featured Articles**: Select articles for homepage hero display
- **API Integration**: All articles loaded dynamically from backend API
- **View Tracking**: Real-time view and download analytics

### Current Real Articles
The system currently contains these real PDF articles:
- **Closed-Ended Luxembourg ELTIFs**: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions
- **Investor Oversight or Undue Influence**: Reassessing BaFin's Stance on AIFM Portfolio Control  
- **Luxembourg SICARs, SIFs, and RAIFs**: A 20-year Perspective on the Well-Informed Investor Notion

### Journals
- ISSN compliance
- Peer review tracking
- Editorial board management
- Archiving policies

## 🛠️ Development

### Project Structure
```
newtifi-web-builder/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
├── data/                  # JSON data files
├── simple-admin-server.js # Backend server
└── start-servers.sh       # Startup script
```

### Key Files
- `src/pages/Admin.tsx` - Main admin panel
- `src/components/admin/` - Admin module components
- `simple-admin-server.js` - Backend API server
- `vite.config.ts` - Frontend configuration

### API Endpoints
- `GET /api/articles` - Get all articles
- `GET /api/admin/articles` - Admin article management
- `GET /api/admin/scan-articles` - **NEW**: Scan for real PDF articles
- `GET /api/admin/article-metadata/:id` - **NEW**: Get article file metadata
- `PATCH /api/admin/articles/:id` - **NEW**: Update article (e.g., featured status)
- `DELETE /api/admin/articles/:id` - **NEW**: Delete article
- `POST /api/admin/upload-article` - **NEW**: Upload new PDF articles
- `POST /api/admin/login` - Admin authentication
- `POST /api/track/page` - Page view tracking

## 🚀 Deployment

### Hosting Platforms
This codebase supports **both GitHub Pages and Firebase Hosting**. All development must maintain compatibility with both platforms.

**⚠️ FIREBASE PROTOCOL AWARENESS REQUIRED:**
- See `docs/FIREBASE_PROTOCOL_GUIDE.md` for complete Firebase requirements
- See `docs/DEVELOPMENT_PROTOCOL.md` for development guidelines
- **All agents/developers must be aware of Firebase hosting requirements**

### Production Build
```bash
# Build frontend (compatible with both GitHub Pages and Firebase)
npm run build

# Test locally (GitHub Pages)
npm run preview

# Test locally (Firebase)
firebase serve
```

### Deployment Methods

#### GitHub Pages (Primary)
```bash
npm run predeploy  # Build + fix SPA routing + validate
npm run deploy     # Deploy to gh-pages branch
# OR manually: cp -r dist/* . && git commit && git push
```

#### Firebase Hosting (Available)
```bash
npm run build
firebase deploy --only hosting
# OR use: npm run deploy:auto
```

### Firebase Requirements
- ✅ Build output in `dist/` directory
- ✅ SPA routing configured in `firebase.json`
- ✅ Asset paths are absolute/root-relative (`/assets/...`)
- ✅ MIME types configured for both platforms
- ✅ Environment variables use `import.meta.env` (Vite)

### Environment Variables
- No environment variables required for development
- Use `import.meta.env` for client-side variables (Vite)
- Firebase Functions can be used for server-side env vars
- Configure production settings as needed

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Kill processes on ports 8080 and 3001
   lsof -ti:8080 | xargs kill -9
   lsof -ti:3001 | xargs kill -9
   ```

2. **API connection errors**
   - Ensure backend server is running on port 3001
   - Check proxy configuration in vite.config.ts

3. **Blank page**
   - Clear browser cache
   - Check browser console for errors
   - Verify both servers are running

### Debug Mode
```bash
# Run with debug logging
DEBUG=* node simple-admin-server.js
```

## 📝 License

This project is proprietary to New Technologies & Investment Funds Institute.

## 🤝 Support

For technical support or questions:
- Email: info@newtifi.com
- Check the admin panel for system status
# Force deployment Tue Oct 21 12:29:32 CEST 2025
