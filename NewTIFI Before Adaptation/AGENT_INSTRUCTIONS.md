# Agent Instructions - Firebase Protocol Awareness

## ⚠️ CRITICAL: Firebase Protocol Awareness Required

**All AI agents and developers working on this codebase MUST be aware of Firebase hosting requirements and protocols.**

## Required Reading

Before making any changes, read:
1. **`docs/FIREBASE_PROTOCOL_GUIDE.md`** - Complete Firebase hosting requirements
2. **`docs/DEVELOPMENT_PROTOCOL.md`** - Development guidelines for dual hosting
3. **`.cursorrules`** - Quick reference rules

## Core Principle

**This codebase supports BOTH GitHub Pages and Firebase Hosting. All development must maintain compatibility with both platforms.**

## Firebase Requirements (Hardcoded Awareness)

### 1. Build Output Structure
- ✅ Build MUST output to `dist/` directory
- ✅ Firebase expects files in `dist/`
- ✅ GitHub Pages also uses `dist/` (copied to branch root)

### 2. Asset Paths
- ✅ Use absolute paths: `/assets/...`, `/images/...`
- ❌ Never use relative paths: `./assets/...`, `../assets/...`
- ✅ Firebase serves from root, paths must be root-relative

### 3. SPA Routing
- ✅ Configured in `firebase.json` (Firebase)
- ✅ Configured in `404.html` (GitHub Pages)
- ✅ Both must work - don't break either

### 4. MIME Types
- ✅ Configured in `_headers` (GitHub Pages)
- ✅ Configured in `.htaccess` (GitHub Pages)
- ✅ Firebase auto-detects, but we configure for compatibility

### 5. Environment Variables
- ✅ Use `import.meta.env` (Vite) for client-side
- ✅ Firebase Functions available for server-side
- ❌ Never hardcode localhost URLs in production

### 6. Module System
- ✅ Use ES modules (Vite default)
- ✅ Firebase supports ES modules
- ✅ Compatible with both platforms

## Development Protocol

### Before Making Changes
1. Read `docs/FIREBASE_PROTOCOL_GUIDE.md`
2. Check Firebase compatibility
3. Verify build outputs to `dist/`
4. Ensure asset paths are absolute

### During Development
1. Test build: `npm run build`
2. Verify `dist/` contains all files
3. Check asset paths are correct
4. Test SPA routing works
5. Verify MIME types configured

### After Making Changes
1. Test with `npm run preview` (GitHub Pages)
2. Test with `firebase serve` (Firebase)
3. Ensure both platforms work
4. Update documentation if needed

## Firebase Configuration Files

- **`firebase.json`**: Firebase hosting configuration
- **`.firebaserc`**: Firebase project configuration
- **`.github/workflows/deploy.yml`**: Firebase deployment workflow
- **`.github/workflows/firebase-deploy.yml`**: Alternative Firebase workflow

## Deployment Methods

### GitHub Pages (Primary)
```bash
npm run predeploy  # Build + fix SPA routing
npm run deploy     # Deploy to gh-pages branch
# OR manually copy dist/* to main branch root
```

### Firebase Hosting (Available)
```bash
npm run build
firebase deploy --only hosting
```

## Compatibility Checklist

When developing, ensure:
- [ ] Build outputs to `dist/` directory
- [ ] Asset paths are absolute/root-relative
- [ ] SPA routing works on both platforms
- [ ] MIME types configured
- [ ] Environment variables use `import.meta.env`
- [ ] No hardcoded localhost URLs
- [ ] Static assets in `public/` (copied to `dist/`)

## Important Notes

1. **Firebase and GitHub Pages can coexist** - don't break one for the other
2. **Build process must be compatible** with both platforms
3. **Asset paths must work** on both platforms
4. **SPA routing must work** on both platforms
5. **Always test both** deployment methods

## Agent Behavior

**When working on this codebase:**
- Always consider Firebase requirements
- Check Firebase compatibility before changes
- Test builds work in `dist/` directory
- Verify asset paths are Firebase-compatible
- Don't break SPA routing
- Maintain dual compatibility
- Read Firebase protocol guide when unsure

## Quick Reference

- **Firebase Config**: `firebase.json`, `.firebaserc`
- **Build Output**: `dist/` directory
- **Asset Paths**: `/assets/...` (absolute from root)
- **SPA Routing**: `firebase.json` rewrites + `404.html` redirect
- **MIME Types**: `_headers` + `.htaccess`
- **Environment**: `import.meta.env` (Vite)
