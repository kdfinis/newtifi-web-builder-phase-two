# Firebase Deployment Setup - Complete Guide

## Overview

This project uses **Firebase Hosting** for production deployment via GitHub Actions. The deployment is fully automated and triggers on pushes to the `main` branch.

**Live Site**: https://newtifi.com  
**Firebase Project**: `newtifi-web`  
**Deployment Workflow**: `.github/workflows/firebase-deploy.yml`

---

## Current Setup (Working)

### Authentication Method
✅ **CI Token** (`FIREBASE_TOKEN`)

### How It Works
1. Developer generates a CI token using `firebase login:ci`
2. Token is stored in GitHub Secrets as `FIREBASE_TOKEN`
3. GitHub Actions workflow uses the token to authenticate with Firebase
4. Deployment happens automatically on push to `main` branch

### Setup Steps

#### 1. Generate CI Token
```bash
firebase login:ci
```
- Opens browser for authentication
- Returns a token (starts with `1//`)
- Copy the entire token

#### 2. Add to GitHub Secrets
1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `FIREBASE_TOKEN` (exact, case-sensitive)
4. Value: Paste the token from step 1
5. Click **"Add secret"**

#### 3. Verify
- Check GitHub Actions workflow runs
- Deployment should succeed automatically

---

## Important Notes

### Token Expiration
⚠️ **CI tokens CAN expire** (despite what some documentation says)
- Expiration time varies (weeks to months)
- When expired, you'll see: "Authentication Error: Your credentials are no longer valid"
- **Solution**: Regenerate token with `firebase login:ci` and update GitHub Secret

### Token Regeneration Process
1. Run: `firebase login:ci`
2. Copy new token
3. Go to GitHub Secrets → `FIREBASE_TOKEN` → Update
4. Paste new token → Save

---

## Deployment Process

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/firebase-deploy.yml`
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies
  4. Build project (`npm run build`)
  5. Verify build output
  6. Check for infinite loops (loop breaker)
  7. Verify FIREBASE_TOKEN
  8. Install Firebase CLI
  9. Verify Firebase project access
  10. Deploy to Firebase Hosting

### Manual Deployment
If you need to deploy manually:
```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting --project newtifi-web --token "$FIREBASE_TOKEN"
```

---

## Verification

### Check Deployment Status

#### GitHub Actions
1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions
2. Look for "Deploy to Firebase Hosting" workflow
3. Check latest run status (should be green ✅)

#### Firebase Console
1. Go to: https://console.firebase.google.com/project/newtifi-web/hosting
2. Check "Current release" - should show latest deployment
3. Verify timestamp matches recent GitHub Actions run

#### Live Site
- Visit: https://newtifi.com
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R) to bypass cache
- Check that latest code is visible

---

## Troubleshooting

### Deployment Fails

#### Issue: "Authentication Error: Your credentials are no longer valid"
**Cause**: Token expired  
**Solution**: Regenerate token (see "Token Regeneration Process" above)

#### Issue: "FIREBASE_TOKEN is not set or invalid"
**Cause**: Secret not set or empty  
**Solution**: 
1. Verify secret exists: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
2. Check name is exactly `FIREBASE_TOKEN` (case-sensitive)
3. Regenerate and update token

#### Issue: "Token cannot access newtifi-web project"
**Cause**: Token doesn't have permissions  
**Solution**: 
1. Verify you're logged in with correct account
2. Check Firebase project access: https://console.firebase.google.com/project/newtifi-web
3. Regenerate token with account that has access

#### Issue: Build fails
**Cause**: Code/build issues  
**Solution**: 
1. Check build logs in GitHub Actions
2. Test locally: `npm run build`
3. Fix code issues before pushing

#### Issue: Loop Breaker Activated
**Cause**: Multiple consecutive failures  
**Solution**: 
1. Check error logs in GitHub Actions
2. Fix underlying issue
3. Reset loop breaker: `node scripts/loop-breaker.mjs reset firebase-deploy`
4. Retry deployment

---

## Permanent Solutions (Future)

For a permanent, non-expiring solution, see `docs/FIREBASE_AUTH_ALTERNATIVES.md`:

1. **Service Account JSON** (if org policies allow)
2. **GitHub OIDC with Workload Identity Federation** (most secure)

---

## Files Reference

- **Workflow**: `.github/workflows/firebase-deploy.yml`
- **Firebase Config**: `firebase.json`
- **Project Config**: `.firebaserc`
- **Loop Breaker**: `scripts/loop-breaker.mjs`
- **Diagnostics**: `scripts/diagnose-firebase.mjs`

---

## Quick Commands

```bash
# Generate new CI token
firebase login:ci

# Test token locally
firebase projects:list --token "$FIREBASE_TOKEN" --non-interactive

# Check loop breaker status
node scripts/loop-breaker.mjs status

# Reset loop breaker
node scripts/loop-breaker.mjs reset firebase-deploy

# Run diagnostics
node scripts/diagnose-firebase.mjs
```

---

## Status

✅ **Currently Working** - Deployment successful as of 2026-01-23  
✅ **Authentication**: CI Token (`FIREBASE_TOKEN`)  
✅ **Automatic Deployment**: Enabled on push to `main`  
✅ **Loop Breaker**: Active (prevents infinite retries)
