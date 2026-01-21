# Development Protocol - Firebase & GitHub Pages Compatibility

## Core Principle
**All development must maintain compatibility with both GitHub Pages and Firebase Hosting.**

## Firebase Protocol Awareness

### Required Knowledge
All developers and AI agents working on this codebase must be aware of:

1. **Firebase Hosting Requirements**
   - Build output must be in `dist/` directory
   - SPA routing via `firebase.json` rewrites
   - Asset paths must be absolute or root-relative
   - MIME types are auto-detected (but we configure explicitly for GitHub Pages compatibility)

2. **GitHub Pages Requirements**
   - SPA routing via `404.html` redirect
   - MIME types configured via `_headers` and `.htaccess`
   - Files served from branch root or `gh-pages` branch

3. **Dual Compatibility**
   - Code must work on both platforms
   - Build process must output compatible structure
   - Asset paths must work on both

## Development Checklist

### Before Making Changes
- [ ] Review `docs/FIREBASE_PROTOCOL_GUIDE.md`
- [ ] Understand Firebase hosting requirements
- [ ] Check current Firebase configuration (`firebase.json`, `.firebaserc`)

### During Development
- [ ] Ensure build outputs to `dist/` directory
- [ ] Use absolute paths (`/assets/...`) not relative (`./assets/...`)
- [ ] Test SPA routing works (all routes serve `index.html`)
- [ ] Verify MIME types are configured
- [ ] Check environment variables use `import.meta.env` (Vite)
- [ ] Never hardcode localhost URLs in production code

### After Making Changes
- [ ] Test build: `npm run build`
- [ ] Verify `dist/` contains all necessary files
- [ ] Test locally: `npm run preview` (GitHub Pages) or `firebase serve` (Firebase)
- [ ] Ensure both hosting methods still work

## Firebase-Specific Considerations

### Module System
- **Firebase**: Supports ES modules and CommonJS
- **Current**: Using ES modules (Vite) - ✅ Compatible
- **Action**: Ensure all imports are ES module compatible

### Static Assets
- **Firebase**: Serves from `public/` or `dist/`
- **Current**: Assets in `public/` copied to `dist/` during build - ✅ Compatible
- **Action**: Verify all assets are correctly referenced

### API Endpoints
- **Firebase**: Can use Firebase Functions
- **Current**: Using separate Node.js server
- **Action**: Maintain compatibility with both approaches

### Authentication
- **Firebase**: Firebase Auth available
- **Current**: Custom OAuth + password auth
- **Action**: Ensure both can coexist

## Build Process Requirements

### Must Work For Both Platforms
1. **Build Output**: `dist/` directory
2. **Asset Paths**: Absolute or root-relative
3. **SPA Routing**: Configured for both platforms
4. **MIME Types**: Explicitly configured
5. **Environment Variables**: Use Vite's `import.meta.env`

## Deployment Process

### GitHub Pages (Primary)
```bash
npm run build
cp -r dist/* .
git add .
git commit -m "Deploy"
git push origin main
```

### Firebase Hosting (Available)
```bash
npm run build
firebase deploy --only hosting
```

## Agent Instructions

**For all AI agents working on this codebase:**

1. **Always check Firebase compatibility** before making changes
2. **Read `docs/FIREBASE_PROTOCOL_GUIDE.md`** for Firebase requirements
3. **Test builds work in `dist/`** directory
4. **Ensure asset paths are Firebase-compatible**
5. **Don't break SPA routing** - must work on both platforms
6. **Check MIME types** are configured
7. **Never hardcode localhost** in production code
8. **Consider Firebase Functions** for future backend needs
9. **Maintain dual compatibility** at all times

## Quick Reference

- **Firebase Config**: `firebase.json`, `.firebaserc`
- **Build Output**: `dist/` directory
- **Asset Paths**: Use `/assets/...` (absolute from root)
- **SPA Routing**: Configured in both `firebase.json` and `404.html`
- **MIME Types**: Configured in `_headers` and `.htaccess`
- **Environment**: Use `import.meta.env` (Vite)

## Important Notes

- Firebase and GitHub Pages can coexist
- Code must work on both platforms
- Build process must be compatible with both
- Never break one platform for the other
- Always test both deployment methods
