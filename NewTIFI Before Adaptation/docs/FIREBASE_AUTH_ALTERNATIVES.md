# Firebase Authentication Alternatives for GitHub Actions

## Problem
CI tokens (`firebase login:ci`) can expire, requiring manual regeneration. This breaks automatic deployments.

---

## ✅ Option 1: Service Account JSON Key (MOST STABLE)

### Overview
**Stability**: ⭐⭐⭐⭐⭐ (Never expires unless revoked)  
**Setup Complexity**: Medium  
**Maintenance**: None (permanent)  
**Hosted By**: Google Cloud Console (cloud.google.com)  
**Where Keys Stored**: GitHub Secrets (github.com)

### How It Works
1. Google Cloud hosts your Firebase project and service accounts
2. You create a service account specifically for CI/CD
3. Download a JSON key file (contains credentials)
4. Store the entire JSON content in GitHub Secrets
5. GitHub Actions workflow uses the JSON via `GOOGLE_APPLICATION_CREDENTIALS` environment variable
6. Firebase CLI automatically uses these credentials (no token needed)

### Detailed Setup Steps

#### Step 1: Access Google Cloud Console
**Where**: https://console.cloud.google.com  
**Who**: You (must be logged in with Firebase project owner/admin access)

1. Open: https://console.cloud.google.com
2. Select project: `newtifi-web` (top dropdown)
3. If you don't see it, you may need to:
   - Go to Firebase Console: https://console.firebase.google.com
   - Select project `newtifi-web`
   - Click gear icon → Project Settings
   - Note the "Project ID" (should be `newtifi-web`)

#### Step 2: Navigate to Service Accounts
**Where**: https://console.cloud.google.com/iam-admin/serviceaccounts?project=newtifi-web  
**Direct Link**: Click this URL (must be logged in)

Alternative path:
1. Go to: https://console.cloud.google.com
2. Click hamburger menu (☰) → "IAM & Admin" → "Service Accounts"
3. Make sure project `newtifi-web` is selected

#### Step 3: Create Service Account
**Where**: Same page (Service Accounts list)

1. Click **"+ CREATE SERVICE ACCOUNT"** (top of page)
2. **Service account name**: `github-actions-deploy` (or any name)
3. **Service account ID**: Auto-filled (leave as is)
4. **Description**: "Service account for GitHub Actions Firebase deployments"
5. Click **"CREATE AND CONTINUE"**

#### Step 4: Grant Permissions
**Where**: Same wizard (after creating account)

1. **Grant this service account access to project**
2. Click **"ADD ANOTHER ROLE"**
3. Search for and select: **"Firebase Hosting Admin"**
4. Click **"ADD ANOTHER ROLE"** again
5. Search for and select: **"Firebase Admin"** (for full access)
6. Click **"CONTINUE"**

#### Step 5: Create JSON Key
**Where**: Service account details page

1. Click **"DONE"** (finishes wizard)
2. You'll see the service account in the list
3. Click on the service account name (e.g., `github-actions-deploy@newtifi-web.iam.gserviceaccount.com`)
4. Go to **"KEYS"** tab (top navigation)
5. Click **"ADD KEY"** → **"Create new key"**
6. Select **"JSON"** format
7. Click **"CREATE"**
8. **JSON file downloads automatically** (save it securely!)

#### Step 6: Extract JSON Content
**Where**: Your local computer (downloaded file)

1. Open the downloaded JSON file (e.g., `newtifi-web-xxxxx.json`)
2. **Copy the ENTIRE contents** (should look like):
   ```json
   {
     "type": "service_account",
     "project_id": "newtifi-web",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "github-actions-deploy@newtifi-web.iam.gserviceaccount.com",
     "client_id": "...",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     ...
   }
   ```
3. **Important**: Copy everything, including all the `\n` characters in the private_key

#### Step 7: Add to GitHub Secrets
**Where**: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions  
**Who**: You (must have admin access to the repository)

1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
2. Click **"New repository secret"** (top right)
3. **Name**: `FIREBASE_SERVICE_ACCOUNT` (exact name, case-sensitive)
4. **Secret**: Paste the ENTIRE JSON content (from Step 6)
5. Click **"Add secret"**

#### Step 8: Verify Setup
**Where**: GitHub Secrets page

1. You should see `FIREBASE_SERVICE_ACCOUNT` in the secrets list
2. The value should show as `••••••••` (hidden for security)

### Pros
- ✅ Never expires (unless manually revoked)
- ✅ Most stable for CI/CD
- ✅ No manual intervention needed
- ✅ Works indefinitely
- ✅ Simple to use once set up

### Cons
- ❌ Requires Google Cloud Console access
- ❌ If blocked by org policies, can't use this
- ❌ JSON key is sensitive (must be kept secret)

### What Happens After Setup
- Workflow automatically uses the service account
- No tokens to regenerate
- Deployments work automatically on every push
- No expiration issues

---

## ✅ Option 2: GitHub OIDC with Workload Identity Federation (MODERN)

### Overview
**Stability**: ⭐⭐⭐⭐⭐ (Automatic token generation, no expiration)  
**Setup Complexity**: High (one-time setup)  
**Maintenance**: None (permanent)  
**Hosted By**: Google Cloud Console (Workload Identity Federation)  
**Where Configured**: Google Cloud Console + GitHub Actions workflow

### How It Works
1. Google Cloud hosts "Workload Identity Federation" (trusts GitHub)
2. You configure Google Cloud to trust GitHub Actions as an identity provider
3. GitHub Actions automatically generates short-lived OIDC tokens
4. Google Cloud validates the token and grants access
5. No keys stored anywhere - tokens generated on-demand
6. Tokens automatically rotate (short-lived, but auto-renewed)

### Detailed Setup Steps

#### Step 1: Enable Required APIs
**Where**: https://console.cloud.google.com/apis/library?project=newtifi-web

1. Go to: https://console.cloud.google.com/apis/library?project=newtifi-web
2. Search for: **"IAM Service Account Credentials API"**
3. Click on it → **"ENABLE"**
4. Search for: **"Service Usage API"**
5. Click on it → **"ENABLE"**

#### Step 2: Create Workload Identity Pool
**Where**: https://console.cloud.google.com/iam-admin/workload-identity-pools?project=newtifi-web

1. Go to: https://console.cloud.google.com/iam-admin/workload-identity-pools?project=newtifi-web
2. Click **"CREATE POOL"** (top)
3. **Pool name**: `github-actions-pool`
4. **Pool ID**: Auto-filled (leave as is)
5. **Description**: "Workload Identity Pool for GitHub Actions"
6. Click **"CONTINUE"**

#### Step 3: Add GitHub OIDC Provider
**Where**: Same wizard (after creating pool)

1. **Add a provider to this pool**
2. **Provider type**: Select **"OpenID Connect (OIDC)"**
3. **Provider name**: `github-oidc`
4. **Provider ID**: Auto-filled
5. **Issuer URL**: `https://token.actions.githubusercontent.com`
6. Click **"CONTINUE"**

#### Step 4: Configure Provider Attributes
**Where**: Same wizard

1. **Attribute mapping**:
   - **Google attribute**: `attribute.actor`
   - **OIDC claim**: `actor`
   - Click **"ADD MAPPING"**
   - **Google attribute**: `attribute.repository`
   - **OIDC claim**: `repository`
   - Click **"ADD MAPPING"**
2. **Attribute condition** (optional but recommended):
   - `repository == "kdfinis/newtifi-web-builder-phase-two"`
   - This restricts access to only your repository
3. Click **"SAVE"**

#### Step 5: Create or Select Service Account
**Where**: https://console.cloud.google.com/iam-admin/serviceaccounts?project=newtifi-web

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=newtifi-web
2. Either:
   - **Option A**: Use existing service account (if you have one)
   - **Option B**: Create new one (follow Option 1, Steps 3-4, but skip key creation)
3. Note the service account email (e.g., `github-actions@newtifi-web.iam.gserviceaccount.com`)

#### Step 6: Grant Service Account Access
**Where**: Service account details page

1. Click on the service account name
2. Go to **"PERMISSIONS"** tab
3. Click **"GRANT ACCESS"**
4. **New principals**: 
   - Format: `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/kdfinis/newtifi-web-builder-phase-two`
   - Replace `PROJECT_NUMBER` with your project number (find it in Project Settings)
5. **Role**: Select **"Service Account User"**
6. Click **"SAVE"**

#### Step 7: Allow Impersonation
**Where**: Service account details page

1. Still on service account page
2. Go to **"PERMISSIONS"** tab
3. Find the workload identity pool principal you just added
4. Click **"EDIT"** (pencil icon)
5. Add role: **"Service Account Token Creator"**
6. Click **"SAVE"**

#### Step 8: Get Project Number
**Where**: https://console.cloud.google.com/iam-admin/settings?project=newtifi-web

1. Go to: https://console.cloud.google.com/iam-admin/settings?project=newtifi-web
2. Note the **"Project number"** (numeric, e.g., `123456789012`)
3. You'll need this for the workflow

#### Step 9: Get Workload Identity Pool ID
**Where**: https://console.cloud.google.com/iam-admin/workload-identity-pools?project=newtifi-web

1. Go to: https://console.cloud.google.com/iam-admin/workload-identity-pools?project=newtifi-web
2. Click on pool: `github-actions-pool`
3. Note the **"Pool ID"** (shown at top, e.g., `github-actions-pool`)
4. Note the **"Provider ID"** (e.g., `github-oidc`)

#### Step 10: Update GitHub Actions Workflow
**Where**: `.github/workflows/firebase-deploy.yml` (in your repository)

The workflow will be updated to use:
```yaml
- uses: google-github-actions/auth@v1
  with:
    workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions-pool/providers/github-oidc'
    service_account: 'github-actions@newtifi-web.iam.gserviceaccount.com'
```

### Pros
- ✅ Most secure (no stored keys)
- ✅ Automatic token rotation
- ✅ Never expires (tokens auto-generated)
- ✅ Google's recommended approach
- ✅ No keys to manage or rotate

### Cons
- ❌ Requires Google Cloud Console setup
- ❌ More complex initial configuration
- ❌ Requires understanding of OIDC concepts

### What Happens After Setup
- GitHub Actions automatically authenticates via OIDC
- Tokens generated on-demand (short-lived, auto-renewed)
- No keys stored in GitHub Secrets
- Deployments work automatically

---

## ⚠️ Option 3: Use Existing Service Account

### Overview
**Stability**: ⭐⭐⭐⭐⭐  
**Setup Complexity**: Low  
**Maintenance**: None  
**Hosted By**: Google Cloud Console  
**Where Keys Stored**: GitHub Secrets (if you have the key)

### How It Works
1. If you already have a service account with Firebase access
2. Use its existing JSON key (if you have it downloaded)
3. Store it in GitHub Secrets (same as Option 1)
4. Workflow uses it the same way

### Detailed Setup Steps

#### Step 1: Check for Existing Service Account
**Where**: https://console.cloud.google.com/iam-admin/serviceaccounts?project=newtifi-web

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=newtifi-web
2. Look for existing service accounts
3. Check if any have:
   - **"Firebase Hosting Admin"** role
   - **"Firebase Admin"** role
   - Or **"Owner"** role

#### Step 2: Check if You Have the Key
**Where**: Your local computer / secure storage

1. Look for any `.json` files related to Firebase/Google Cloud
2. Check if you have the key saved somewhere
3. If you have it, proceed to Step 4
4. If not, proceed to Step 3

#### Step 3: Create New Key (if needed)
**Where**: Service account details page

1. Go to service account (from Step 1)
2. Click on service account name
3. Go to **"KEYS"** tab
4. Click **"ADD KEY"** → **"Create new key"**
5. Select **"JSON"**
6. Click **"CREATE"**
7. **Note**: If you see "Key creation is not allowed", you can't use this option

#### Step 4: Add to GitHub Secrets
**Where**: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions

1. Follow **Option 1, Steps 6-7** (same process)
2. Use the existing service account's JSON key

### Pros
- ✅ Quick if account already exists
- ✅ No new setup needed
- ✅ Same stability as Option 1

### Cons
- ❌ Only works if service account already exists
- ❌ Need access to the key
- ❌ May be blocked by org policies

---

## Comparison Table

| Feature | Option 1: Service Account JSON | Option 2: OIDC | Option 3: Existing Account |
|---------|-------------------------------|----------------|---------------------------|
| **Stability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Setup Time** | 10-15 minutes | 30-45 minutes | 5 minutes (if exists) |
| **Expiration** | Never | Never (auto-renewed) | Never |
| **Security** | High (key stored) | Highest (no keys) | High (key stored) |
| **Complexity** | Medium | High | Low |
| **Org Policy Blocked?** | Maybe | No | Maybe |
| **Maintenance** | None | None | None |

---

## Recommendation

**Best Choice: Option 1 (Service Account JSON)** if you can create service accounts.
- Most straightforward
- Most commonly used
- Easiest to troubleshoot

**Alternative: Option 2 (OIDC)** if:
- You want the most secure approach
- You're comfortable with Google Cloud setup
- You want Google's recommended method

**Quick Fix: Option 3** if:
- You already have a service account
- You have the JSON key
- You want the fastest setup

---

## Current Status

Currently using: **CI Token** (`FIREBASE_TOKEN`) - ✅ **Working as of 2026-01-23**

**Note**: CI tokens can expire (weeks to months). When expired, regenerate with `firebase login:ci` and update GitHub Secret.

**For Permanent Solution**: Choose one of the options above (Option 1 or Option 2 recommended).
