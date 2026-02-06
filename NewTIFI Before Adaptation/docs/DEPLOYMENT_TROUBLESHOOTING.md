# Deployment Troubleshooting Guide

## Deployment Method

This project uses **Firebase Hosting** for production deployment:
- **Automatic**: Via GitHub Actions (`.github/workflows/firebase-deploy.yml`)
- **Live Site**: https://newtifi.com
- **Firebase Project**: `newtifi-web`

## Firebase Hosting Deployment

### Status
✅ **Active** - Automatically deploys on push to `main` branch

### Setup
- Uses `FIREBASE_TOKEN` from GitHub Secrets
- See `docs/FIREBASE_TOKEN_SETUP.md` for configuration
- See `docs/FIREBASE_DEPLOYMENT_SETUP.md` for complete guide

### Troubleshooting
- Check GitHub Actions workflow logs for errors
- Verify `FIREBASE_TOKEN` is set in repository secrets
- Ensure build completes successfully (`dist/` directory exists)
- Check Firebase Console: https://console.firebase.google.com/project/newtifi-web/hosting

## If You're Not Seeing Latest Code on newtifi.com

### Issue: Firebase CDN Cache
Firebase Hosting uses a CDN cache that can take **2-5 minutes** to update after deployment.

**Solution**: Wait 2-5 minutes, then try again.

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

### Check GitHub Actions
1. Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions
2. Look for "Deploy to Firebase Hosting" workflow
3. Check latest run status (should be green ✅)
4. Verify deployment completed successfully

### Check Firebase Console
1. Visit: https://console.firebase.google.com/project/newtifi-web/hosting
2. Check "Current release" - should show latest deployment
3. Verify timestamp matches recent GitHub Actions run
4. Check deployment hash matches latest commit

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
# Check if site is accessible
curl -I https://newtifi.com

# Check if index.html is updated
curl -s https://newtifi.com | grep -o 'ArticleViewer[^"]*' | head -1

# Test Firebase token
firebase projects:list --token "$FIREBASE_TOKEN" --non-interactive

# Run diagnostics
node scripts/diagnose-firebase.mjs
```

## Quick Reference

### Firebase Hosting
- **Deployment**: Automatic via GitHub Actions (`.github/workflows/firebase-deploy.yml`)
- **Cache**: Firebase CDN cache (usually instant, max 5 minutes)
- **Check Status**: 
  - GitHub Actions: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions
  - Firebase Console: https://console.firebase.google.com/project/newtifi-web/hosting
- **Live Site**: https://newtifi.com
