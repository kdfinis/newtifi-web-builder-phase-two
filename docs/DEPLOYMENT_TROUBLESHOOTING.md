# Deployment Troubleshooting Guide

## ✅ Code is Deployed

The latest code has been successfully deployed to both branches:
- **main branch**: Latest commit `4630ac8` - "Force redeploy: Fresh build with all latest code"
- **gh-pages branch**: Also updated via `npm run deploy`

All files are confirmed on GitHub:
- ArticleViewer component: ✅ Deployed
- Admin article browser route: ✅ Deployed  
- Security fixes: ✅ Deployed
- Article page fixes: ✅ Deployed

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

## Current Deployment Status

- ✅ Latest code built
- ✅ Deployed to main branch
- ✅ Deployed to gh-pages branch
- ✅ All files committed and pushed
- ⏱️ Waiting for GitHub Pages cache to update (5-15 min)

## Next Steps

1. **Wait 10-15 minutes** for GitHub Pages cache
2. **Hard refresh** your browser (Ctrl+Shift+R / Cmd+Shift+R)
3. **Test in incognito** window
4. If still not working, provide specific details about what you see
