# Firebase Development & Hosting Protocol Guide

## Overview
This codebase is designed to work with **both GitHub Pages and Firebase Hosting**. All development must consider Firebase protocols, requirements, and best practices.

## Firebase Hosting Requirements

### 1. Build Output Structure
- **Firebase expects**: Static files in `dist/` or `build/` directory
- **Current setup**: `dist/` directory (compatible with both GitHub Pages and Firebase)
- **Requirement**: All assets must be in the build output directory

### 2. Firebase Configuration (`firebase.json`)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 3. SPA Routing (Single Page Application)
- **Firebase requirement**: All routes must rewrite to `index.html`
- **Implementation**: Already configured in `firebase.json` rewrites
- **GitHub Pages**: Uses `404.html` for SPA routing (different approach, same result)

### 4. Asset Paths
- **Firebase**: Serves from root, so paths must be relative or absolute from root
- **Current**: Using relative paths (`/assets/...`) - ✅ Compatible
- **Requirement**: Never use `./` or `../` relative paths in production builds

### 5. Environment Variables
- **Firebase**: Use Firebase Functions for server-side env vars
- **Client-side**: Use `import.meta.env` (Vite) - ✅ Already implemented
- **Requirement**: Never hardcode API URLs or secrets in client code

### 6. MIME Types
- **Firebase**: Automatically detects MIME types
- **GitHub Pages**: Requires explicit MIME type configuration
- **Solution**: We configure both via `_headers` file and `.htaccess`

### 7. Build Process
- **Firebase**: Runs `npm run build` automatically
- **Current**: `npm run build` creates `dist/` - ✅ Compatible
- **Requirement**: Build must be production-ready (no dev dependencies)

## Firebase-Specific Adaptations

### Module Imports
- **Firebase**: Supports ES modules and CommonJS
- **Current**: Using ES modules (Vite) - ✅ Compatible
- **Requirement**: Ensure all imports are compatible with Firebase's module system

### Static Assets
- **Firebase**: Serves static assets from `public/` or `dist/`
- **Current**: Assets in `public/` are copied to `dist/` during build - ✅ Compatible
- **Requirement**: All assets must be referenced correctly in production

### API Endpoints
- **Firebase**: Use Firebase Functions for backend APIs
- **Current**: Using separate Node.js server (`simple-admin-server.js`)
- **Future**: Consider migrating to Firebase Functions for scalability

### Authentication
- **Firebase**: Firebase Auth is available
- **Current**: Using custom OAuth (Google, LinkedIn) + password auth
- **Compatibility**: Both approaches can coexist

### GitHub Actions Deployment
- **Method**: CI Token authentication (`FIREBASE_TOKEN`)
- **Setup**: See `docs/FIREBASE_TOKEN_SETUP.md` for setup instructions
- **Workflow**: `.github/workflows/firebase-deploy.yml` handles deployment automatically
- **Trigger**: Automatically deploys on push to `main` branch (when relevant files change)
- **Status**: ✅ Working - Run #48 successful

## Development Protocol

### When Adding New Features
1. ✅ Ensure build output works in `dist/`
2. ✅ Test with both GitHub Pages and Firebase hosting
3. ✅ Use relative/absolute paths (never `./` or `../`)
4. ✅ Configure routes in both `firebase.json` and `404.html` (for GitHub Pages)
5. ✅ Test MIME types work on both platforms

### When Modifying Build Process
1. ✅ Ensure `dist/` directory structure is correct
2. ✅ Verify all assets are included in build
3. ✅ Test that SPA routing works (all routes serve `index.html`)
4. ✅ Check that environment variables work in both contexts

### When Adding Dependencies
1. ✅ Ensure dependencies work in Firebase's Node.js environment
2. ✅ Check for Firebase-specific limitations
3. ✅ Test build process doesn't break

## Firebase Deployment Process

### Automatic Deployment (GitHub Actions)
- **Trigger**: Push to `main` branch (when relevant files change)
- **Workflow**: `.github/workflows/firebase-deploy.yml`
- **Authentication**: Uses `FIREBASE_TOKEN` from GitHub Secrets
- **Status**: ✅ Active and working
- **Setup**: See `docs/FIREBASE_TOKEN_SETUP.md` for token configuration

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Or use the npm script
npm run deploy:auto
```

### Firebase CLI Requirements
- **Installation**: `npm install -g firebase-tools`
- **Login**: `firebase login` (for local deployment)
- **CI Token**: `firebase login:ci` (for GitHub Actions)
- **Project**: `newtifi-web` (configured in `.firebaserc`)

## GitHub Pages vs Firebase Hosting

### GitHub Pages (Current Primary)
- **Source**: `main` branch root or `gh-pages` branch
- **SPA Routing**: Uses `404.html` redirect
- **MIME Types**: Configured via `_headers` and `.htaccess`
- **Deployment**: Copy `dist/*` to branch root

### Firebase Hosting (Available)
- **Source**: `dist/` directory
- **SPA Routing**: Configured in `firebase.json` rewrites
- **MIME Types**: Automatic detection
- **Deployment**: `firebase deploy --only hosting`

## Compatibility Checklist

When developing, ensure:
- [ ] Build outputs to `dist/` directory
- [ ] All asset paths are absolute or root-relative (`/assets/...`)
- [ ] SPA routing works (all routes serve `index.html`)
- [ ] MIME types are configured for GitHub Pages
- [ ] Environment variables use `import.meta.env` (Vite)
- [ ] No hardcoded localhost URLs in production
- [ ] Static assets are in `public/` (copied to `dist/` during build)
- [ ] API endpoints work with both hosting methods

## Firebase Functions (Future Consideration)

### When to Use Firebase Functions
- Backend API endpoints
- Server-side processing
- Authentication logic
- File uploads/processing

### Current Approach
- Using separate Node.js server (`simple-admin-server.js`)
- Can coexist with Firebase Functions
- Consider migration for better scalability

## Important Notes

1. **Always test builds locally** before deploying
2. **Both hosting methods must work** - don't break one for the other
3. **Firebase has stricter security** - ensure CORS and headers are correct
4. **Firebase Functions** can be added later without breaking current setup
5. **Environment variables** must work in both contexts

## Agent Instructions

**For all AI agents working on this codebase:**

1. **Always consider Firebase compatibility** when making changes
2. **Test builds work in `dist/`** directory
3. **Ensure asset paths are Firebase-compatible** (absolute/root-relative)
4. **Don't break SPA routing** - it must work on both platforms
5. **Check MIME types** are configured for both GitHub Pages and Firebase
6. **Never hardcode localhost** or development URLs in production code
7. **Consider Firebase Functions** for future backend needs
8. **Maintain compatibility** with both hosting methods

## Quick Reference

```bash
# Build for both platforms
npm run build

# Deploy to GitHub Pages
npm run deploy  # or copy dist/* to main branch

# Deploy to Firebase
firebase deploy --only hosting

# Test locally (Firebase)
firebase serve

# Test locally (GitHub Pages)
npm run preview
```
