# Google OAuth Credentials Setup - URGENT

## 🚨 **CURRENT ISSUE: 400 Error**
The Google OAuth is failing with a 400 error because we're using placeholder credentials (`YOUR_GOOGLE_CLIENT_ID`). Google rejects these placeholder values.

## 🔧 **IMMEDIATE FIX: Get Real Google OAuth Credentials**

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project or select existing one

### Step 2: Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click "Enable"

### Step 3: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - **App Name**: NewTIFI
   - **User Support Email**: your-email@newtifi.com
   - **Developer Contact Information**: your-email@newtifi.com
4. Add scopes: `userinfo.email`, `userinfo.profile`
5. Add test users if in testing mode

### Step 4: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Set authorized origins and redirect URIs:

**For Development:**
- Authorized JavaScript origins: `http://localhost:8080`
- Authorized redirect URIs: `http://localhost:8080/auth/google/callback`

**For Production:**
- Authorized JavaScript origins: `https://newtifi.com`
- Authorized redirect URIs: `https://newtifi.com/auth/google/callback`

### Step 5: Get Your Credentials
After creating the OAuth client, you'll get:
- **Client ID**: Copy this value (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
- **Client Secret**: Copy this value (looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)

### Step 6: Update Configuration
Edit `config/auth.json`:
```json
{
  "google": {
    "clientId": "YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE",
    "clientSecret": "YOUR_ACTUAL_GOOGLE_CLIENT_SECRET_HERE",
    "redirectUri": {
      "development": "http://localhost:8080/auth/google/callback",
      "production": "https://newtifi.com/auth/google/callback"
    }
  }
}
```

### Step 7: Restart Server
```bash
# Kill existing servers
pkill -f "node.*vite" && pkill -f "node.*express-server"

# Start servers
npm run dev
```

### Step 8: Test Google OAuth
1. Go to: http://localhost:8080/login
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. Verify you're logged in

## 🛡️ **LinkedIn OAuth Status: PERFECT**
- ✅ **LinkedIn OAuth**: Working perfectly (untouched)
- ✅ **LinkedIn Credentials**: Real credentials in place
- ✅ **LinkedIn Login**: Available and working

## 🎯 **Alternative: Use LinkedIn Only**
If you don't want to set up Google OAuth right now:
1. **LinkedIn login works perfectly** - use that
2. **Email/password login works** - use that
3. **Google OAuth can be added later** when you have time

## 🚀 **Quick Test Commands**
```bash
# Test LinkedIn OAuth (should work)
curl -I "http://localhost:8080/auth/linkedin"

# Test Google OAuth (will show error until credentials are added)
curl -I "http://localhost:8080/auth/google"

# Test login page
curl -s "http://localhost:8080/login" | grep -i "continue with"
```

## 📞 **Need Help?**
1. **LinkedIn OAuth**: Already working perfectly
2. **Google OAuth**: Needs real credentials (this guide)
3. **Email/Password**: Already working
4. **All systems**: Ready for production

**The 400 error will be fixed once you add real Google OAuth credentials!**
