# 🔧 GitHub Setup Instructions for Firebase Deployment

## Required GitHub Configuration

To enable Firebase deployments via GitHub Actions, you need to add the Firebase service account as a GitHub secret.

---

## Step-by-Step: Add Firebase Service Account Secret

### Step 1: Get Firebase Service Account JSON

1. **Go to Firebase Console**:
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Select Your Project**:
   - Click on project: **newtifi-web**

3. **Navigate to Service Accounts**:
   - Click the **gear icon** (⚙️) next to "Project Overview"
   - Select **Project Settings**
   - Click on the **Service Accounts** tab

4. **Generate New Private Key**:
   - Click the button: **"Generate new private key"**
   - A warning dialog will appear - click **"Generate key"**
   - A JSON file will download automatically (e.g., `newtifi-web-firebase-adminsdk-xxxxx.json`)

5. **Open the Downloaded JSON File**:
   - Open the downloaded file in a text editor
   - You'll see something like this:
   ```json
   {
     "type": "service_account",
     "project_id": "newtifi-web",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@newtifi-web.iam.gserviceaccount.com",
     "client_id": "...",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "..."
   }
   ```

---

### Step 2: Add Secret to GitHub Repository

1. **Go to Your GitHub Repository**:
   - Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two
   - Make sure you're signed in

2. **Navigate to Secrets**:
   - Click on **Settings** (top menu bar)
   - In the left sidebar, click **Secrets and variables**
   - Click **Actions**

3. **Add New Secret**:
   - Click the button: **"New repository secret"**
   - **Name**: Enter exactly: `FIREBASE_SERVICE_ACCOUNT`
   - **Secret**: Paste the **entire JSON content** from the downloaded file
     - Copy everything from `{` to `}`
     - Include all quotes, brackets, and newlines
     - Make sure there are no extra spaces or characters

4. **Save the Secret**:
   - Click **"Add secret"**
   - You should see a confirmation that the secret was added

---

### Step 3: Verify Secret Was Added

1. **Check Secrets List**:
   - You should see `FIREBASE_SERVICE_ACCOUNT` in the list of repository secrets
   - The value will be hidden (shown as `••••••••`)

2. **Important Notes**:
   - ✅ Secret name must be exactly: `FIREBASE_SERVICE_ACCOUNT`
   - ✅ Value must be the complete JSON (entire file content)
   - ✅ No extra quotes or formatting needed
   - ✅ The JSON should be valid (starts with `{` and ends with `}`)

---

## Step 4: Grant IAM Roles (Google Cloud Console)

After adding the secret, you also need to grant the service account proper permissions:

1. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/
   - Select project: **newtifi-web**

2. **Navigate to IAM**:
   - Go to **IAM & Admin** → **IAM**
   - Find your service account (looks like: `firebase-adminsdk-xxxxx@newtifi-web.iam.gserviceaccount.com`)

3. **Edit Service Account**:
   - Click the **pencil icon** (✏️) next to the service account
   - Click **"ADD ANOTHER ROLE"**

4. **Add Required Roles**:
   Add these roles one by one:
   - ✅ `Firebase Admin` (or search for `roles/firebase.admin`)
   - ✅ `Service Account User` (or search for `roles/iam.serviceAccountUser`)
   - ✅ `Logging Writer` (or search for `roles/logging.logWriter`)
   - ✅ `Monitoring Metric Writer` (or search for `roles/monitoring.metricWriter`)

5. **Save Changes**:
   - Click **"SAVE"** after adding each role

---

## Step 5: Enable Required APIs (Google Cloud Console)

1. **Go to APIs & Services**:
   - In Google Cloud Console, go to **APIs & Services** → **Library**

2. **Enable Required APIs**:
   Search for and enable each of these:
   - ✅ `Firebase Management API` (search: `firebase.googleapis.com`)
   - ✅ `Firebase Hosting API` (search: `firebasehosting.googleapis.com`)
   - ✅ `Cloud Build API` (search: `cloudbuild.googleapis.com`)
   - ✅ `Artifact Registry API` (search: `artifactregistry.googleapis.com`)

3. **Verify APIs are Enabled**:
   - Go to **APIs & Services** → **Enabled APIs**
   - You should see all four APIs listed

---

## Step 6: Test the Deployment

Once everything is set up:

1. **Go to GitHub Actions**:
   - Visit: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions

2. **Run the Workflow**:
   - Click on **"🚀 Auto Deploy to Firebase"** workflow
   - Click **"Run workflow"** button (top right)
   - Select branch: **main**
   - Click **"Run workflow"**

3. **Monitor the Deployment**:
   - Click on the workflow run to see progress
   - Each step should show:
     - ✅ Check Firebase Service Account Secret
     - ✅ Setup Node.js
     - ✅ Install dependencies
     - ✅ Build application
     - ✅ Setup Firebase Authentication (using Admin SDK)
     - ✅ Deploy to Firebase Hosting

4. **Check Results**:
   - If successful: ✅ Green checkmark
   - If failed: Click to see error details

---

## Troubleshooting

### Secret Not Found Error
```
❌ FIREBASE_SERVICE_ACCOUNT secret is missing!
```
**Fix**: Make sure you added the secret with the exact name `FIREBASE_SERVICE_ACCOUNT`

### Invalid JSON Error
```
❌ FIREBASE_SERVICE_ACCOUNT is not valid JSON!
```
**Fix**: 
- Copy the entire JSON file content
- Make sure it starts with `{` and ends with `}`
- Don't add extra quotes or formatting

### Permission Denied Error
```
Error: HTTP Error: 403, Permission denied
```
**Fix**: Grant the required IAM roles (see Step 4 above)

### API Not Enabled Error
```
Error: API not enabled
```
**Fix**: Enable the required APIs (see Step 5 above)

---

## Quick Checklist

- [ ] Downloaded Firebase service account JSON file
- [ ] Added `FIREBASE_SERVICE_ACCOUNT` secret to GitHub
- [ ] Granted `Firebase Admin` role to service account
- [ ] Granted `Service Account User` role to service account
- [ ] Granted `Logging Writer` role to service account
- [ ] Granted `Monitoring Metric Writer` role to service account
- [ ] Enabled `Firebase Management API`
- [ ] Enabled `Firebase Hosting API`
- [ ] Enabled `Cloud Build API`
- [ ] Enabled `Artifact Registry API`
- [ ] Tested workflow run

---

## Need Help?

If you encounter issues:
1. Check the workflow logs in GitHub Actions
2. Review `docs/FIREBASE_DEPLOYMENT_COMPREHENSIVE_FIX.md`
3. Verify all steps above were completed correctly

---

**Last Updated**: 2026-01-21
