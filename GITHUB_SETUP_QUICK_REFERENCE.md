# 🚀 GitHub Setup Quick Reference

## What You Need to Do on GitHub

### 1. Add Firebase Service Account Secret

**Location**: GitHub Repository → Settings → Secrets and variables → Actions

**Steps**:
1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
2. Click "New repository secret"
3. Name: `FIREBASE_SERVICE_ACCOUNT`
4. Value: Paste entire JSON from Firebase Console (Project Settings → Service Accounts → Generate new private key)
5. Click "Add secret"

### 2. Verify Secret Exists

- Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
- You should see `FIREBASE_SERVICE_ACCOUNT` in the list

### 3. Test Deployment

- Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions
- Click "🚀 Auto Deploy to Firebase"
- Click "Run workflow" → "Run workflow"

---

## What You Need to Do on Google Cloud

### 1. Grant IAM Roles

**Location**: Google Cloud Console → IAM & Admin → IAM

**Service Account**: `firebase-adminsdk-xxxxx@newtifi-web.iam.gserviceaccount.com`

**Required Roles**:
- Firebase Admin
- Service Account User
- Logging Writer
- Monitoring Metric Writer

### 2. Enable APIs

**Location**: Google Cloud Console → APIs & Services → Library

**Required APIs**:
- Firebase Management API
- Firebase Hosting API
- Cloud Build API
- Artifact Registry API

---

**For detailed instructions, see**: `docs/GITHUB_SETUP_INSTRUCTIONS.md`
