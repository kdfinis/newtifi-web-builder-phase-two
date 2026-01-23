# Deployment Troubleshooting Guide

## Deployment Methods

This project supports two deployment methods:
- **Firebase Hosting**: Automatic via GitHub Actions (`.github/workflows/firebase-deploy.yml`)
- **GitHub Pages**: Manual deployment via `npm run deploy`

## Firebase Hosting Deployment

### Status
✅ **Active** - Automatically deploys on push to `main` branch

### Setup
- Uses `FIREBASE_TOKEN` from GitHub Secrets
- See `docs/FIREBASE_TOKEN_SETUP.md` for configuration

### Troubleshooting
- Check GitHub Actions workflow logs for errors
- Verify `FIREBASE_TOKEN` is set in repository secrets
- Ensure build completes successfully (`dist/` directory exists)

## If You're Not Seeing Latest Code on newtifi.com

### Issue: GitHub Pages Cache
GitHub Pages has a CDN cache that can take **5-15 minutes** to update after deployment.

**Solution**: Wait 10-15 minutes, then try again.

### Issue: Browser Cache
Your browser may be caching the old version.

**Solutions**:
1. **Hard Refresh**:
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Clear Cache**:
   - Open DevTools (F12)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Incognito/Private Window**:
   - Open newtifi.com in incognito/private mode
   - This bypasses all browser cache

### Issue: CDN Cache
GitHub Pages uses a CDN that may cache content.

**Solution**: Wait 15 minutes or use incognito mode.

## Verify Deployment

### Check GitHub Repository
1. Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two
2. Check latest commit: Should be `4630ac8` or newer
3. Verify files exist in root: `index.html`, `assets/ArticleViewer-*.js`

### Check GitHub Pages Settings
1. Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/pages
2. Verify source branch (should be `main` or `gh-pages`)
3. Check deployment status (should show recent deployment)

### Test Specific Features
- Admin article browser: https://newtifi.com/admin/articles
- Article page: https://newtifi.com/publishing/article/eltifs-compulsory-redemptions
- Homepage: https://newtifi.com

## If Still Not Working

After waiting 15 minutes AND doing a hard refresh:

1. **Check what you're seeing**:
   - Old version of the site?
   - 404 error on specific pages?
   - Missing features?
   - Blank page?

2. **Check browser console** (F12):
   - Any JavaScript errors?
   - Any 404 errors for assets?
   - Network tab: Are files loading?

3. **Test in different browser**:
   - Try Chrome, Firefox, Safari
   - Try incognito mode

4. **Check GitHub Pages logs**:
   - Visit repository Settings > Pages
   - Check for any deployment errors

## Quick Test Commands

```bash
# Check if files are on GitHub
curl -I https://newtifi.com/assets/ArticleViewer-5k7SNViw-B-LtLDhY.js

# Check if index.html is updated
curl -s https://newtifi.com | grep -o 'ArticleViewer[^"]*' | head -1

# Check GitHub Pages status
# Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/pages
```

## Quick Reference

### Firebase Hosting
- **Deployment**: Automatic via GitHub Actions
- **Cache**: Firebase CDN cache (usually instant, max 5 minutes)
- **Check Status**: GitHub Actions → "Deploy to Firebase Hosting" workflow

### GitHub Pages
- **Deployment**: Manual via `npm run deploy`
- **Cache**: GitHub Pages CDN (5-15 minutes)
- **Check Status**: Repository Settings → Pages
