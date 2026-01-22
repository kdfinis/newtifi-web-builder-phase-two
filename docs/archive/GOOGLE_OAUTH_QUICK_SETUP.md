# Google OAuth Quick Setup - Get It Working Now!

## 🚀 **STEP 1: Get Google OAuth Credentials (5 minutes)**

### Go to Google Cloud Console:
1. **Visit**: https://console.cloud.google.com/
2. **Sign in** with your Google account
3. **Create a new project** or select existing one

### Enable Google+ API:
1. Go to **"APIs & Services"** > **"Library"**
2. Search for **"Google+ API"** or **"Google Identity"**
3. Click **"Enable"**

### Configure OAuth Consent Screen:
1. Go to **"APIs & Services"** > **"OAuth consent screen"**
2. Choose **"External"** user type
3. Fill in:
   - **App Name**: NewTIFI
   - **User Support Email**: your-email@newtifi.com
   - **Developer Contact Information**: your-email@newtifi.com
4. Add scopes: `userinfo.email`, `userinfo.profile`
5. Add test users if in testing mode

### Create OAuth 2.0 Credentials:
1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"OAuth client ID"**
3. Choose **"Web application"**
4. Set authorized origins and redirect URIs:

**For Development:**
- Authorized JavaScript origins: `http://localhost:8080`
- Authorized redirect URIs: `http://localhost:8080/auth/google/callback`

**For Production:**
- Authorized JavaScript origins: `https://newtifi.com`
- Authorized redirect URIs: `https://newtifi.com/auth/google/callback`

### Get Your Credentials:
After creating the OAuth client, you'll get:
- **Client ID**: Copy this value (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
- **Client Secret**: Copy this value (looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)

## 🔧 **STEP 2: Update Configuration**

Once you have your credentials, I'll update the config for you. Just provide me with:
1. **Google Client ID**
2. **Google Client Secret**

## 🚀 **STEP 3: Test Google OAuth**

After I update the config:
1. Restart the server
2. Go to http://localhost:8080/login
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify you're logged in

## 🎯 **Ready to get your Google OAuth credentials?**
Just follow the steps above and provide me with your Client ID and Client Secret, and I'll have Google OAuth working in 2 minutes!
