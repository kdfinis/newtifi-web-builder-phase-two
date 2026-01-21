# 🔥 Firebase Deployment Troubleshooting Guide

## Common Issues and Solutions

### ❌ Issue 1: Missing FIREBASE_SERVICE_ACCOUNT Secret

**Error Message:**
```
❌ FIREBASE_SERVICE_ACCOUNT secret is missing!
```

**Solution:**

1. **Get Firebase Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: **newtifi-web**
   - Click **Project Settings** (gear icon)
   - Go to **Service Accounts** tab
   - Click **Generate new private key**
   - Download the JSON file (e.g., `newtifi-web-firebase-adminsdk-xxxxx.json`)

2. **Add Secret to GitHub:**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the **entire JSON content** from the downloaded file
   - Click **Add secret**

3. **Verify:**
   - The secret should now appear in your repository secrets
   - Re-run the GitHub Actions workflow

---

### ❌ Issue 2: Invalid Service Account JSON

**Error Message:**
```
❌ FIREBASE_SERVICE_ACCOUNT is not valid JSON!
```

**Solution:**
- Make sure you copied the **entire JSON file content** (including all brackets and quotes)
- Don't add extra quotes or formatting
- The JSON should start with `{` and end with `}`
- Verify the JSON is valid using a JSON validator

---

### ❌ Issue 3: Permission Denied / IAM Roles

**Error Message:**
```
Error: HTTP Error: 403, Permission denied
```

**Solution:**

1. **Check Service Account Permissions:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select project: **newtifi-web**
   - Navigate to **IAM & Admin** → **IAM**
   - Find your service account (usually `firebase-adminsdk-xxxxx@newtifi-web.iam.gserviceaccount.com`)
   - Ensure it has these roles:
     - `Firebase Admin` (or `Firebase Hosting Admin`)
     - `Service Account User`
     - `Cloud Functions Admin` (if using Functions)

2. **Grant Required Roles:**
   - Click **Edit** on the service account
   - Click **Add Another Role**
   - Add the missing roles listed above
   - Save changes

---

### ❌ Issue 4: Project ID Mismatch

**Error Message:**
```
Error: Failed to get Firebase project newtifi-web
```

**Solution:**

1. **Verify Project ID:**
   - Check `.firebaserc` file - should contain `"default": "newtifi-web"`
   - Verify in Firebase Console that the project ID is correct
   - Check `firebase.json` for correct configuration

2. **Update if Needed:**
   ```bash
   firebase use newtifi-web
   ```

---

### ❌ Issue 5: Build Output Directory Mismatch

**Error Message:**
```
Error: Could not find hosting configuration
```

**Solution:**

1. **Check `firebase.json`:**
   ```json
   {
     "hosting": {
       "public": "dist",
       ...
     }
   }
   ```

2. **Verify Build Output:**
   - Run `npm run build`
   - Check that `dist/` directory exists
   - Verify `dist/index.html` exists
   - Ensure `dist/` contains all built assets

---

### ❌ Issue 6: Local Firebase Authentication Expired

**Error Message:**
```
Authentication Error: Your credentials are no longer valid
```

**Solution:**

1. **Re-authenticate:**
   ```bash
   firebase login --reauth
   ```

2. **For CI/CD (Service Account):**
   ```bash
   firebase login:ci
   ```
   - This generates a token for CI environments
   - Store the token as a GitHub secret if needed

---

## ✅ Pre-Deployment Checklist

Before deploying to Firebase, verify:

- [ ] `FIREBASE_SERVICE_ACCOUNT` secret exists in GitHub
- [ ] Service account JSON is valid
- [ ] Service account has required IAM roles
- [ ] Project ID matches (check `.firebaserc`)
- [ ] `firebase.json` has correct `public` directory
- [ ] Build succeeds locally (`npm run build`)
- [ ] `dist/` directory contains all files
- [ ] Firebase CLI is installed (`firebase --version`)

---

## 🧪 Testing Deployment Locally

Before deploying via GitHub Actions, test locally:

```bash
# 1. Build the project
npm run build

# 2. Verify build output
ls -la dist/

# 3. Authenticate with Firebase
firebase login

# 4. Test deployment (dry run)
firebase deploy --only hosting --dry-run

# 5. Deploy
firebase deploy --only hosting
```

---

## 📋 Manual Deployment Steps

If GitHub Actions continue to fail, deploy manually:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Authenticate:**
   ```bash
   firebase login
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

---

## 🔍 Debugging Workflow Failures

1. **Check GitHub Actions Logs:**
   - Go to repository → **Actions** tab
   - Click on the failed workflow run
   - Review each step's output
   - Look for error messages in red

2. **Common Log Locations:**
   - Build step: Check for build errors
   - Authentication step: Check for credential errors
   - Deploy step: Check for Firebase-specific errors

3. **Enable Debug Logging:**
   Add to workflow:
   ```yaml
   - name: Debug
     run: |
       echo "::debug::FIREBASE_SERVICE_ACCOUNT length: ${#FIREBASE_SERVICE_ACCOUNT}"
       firebase --version
       firebase projects:list
   ```

---

## 🆘 Still Having Issues?

1. **Check Firebase Status:**
   - Visit [Firebase Status Dashboard](https://status.firebase.google.com/)
   - Look for known outages

2. **Review Firebase Console:**
   - Check **Hosting** → **Revisions** for deployment history
   - Look for error messages or failed deployments

3. **Check Google Cloud Logs:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **Logging** → **Logs Explorer**
   - Filter by Firebase Hosting errors

4. **Contact Support:**
   - Firebase Support: [Firebase Support](https://firebase.google.com/support)
   - Include error logs and workflow run ID

---

## 📚 Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [GitHub Actions with Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [Firebase IAM Roles](https://firebase.google.com/docs/projects/iam/permissions)

---

## ✅ Quick Fix Summary

**Most Common Fix:**
1. Get service account JSON from Firebase Console
2. Add as `FIREBASE_SERVICE_ACCOUNT` secret in GitHub
3. Re-run workflow

**If that doesn't work:**
1. Check IAM roles for service account
2. Verify project ID matches
3. Test deployment locally first
