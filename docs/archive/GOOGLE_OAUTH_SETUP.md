# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API (or Google Identity API)

## Step 2: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required details:
   - App Name: "NewTIFI"
   - User Support Email: your-email@newtifi.com
   - Developer Contact Information: your-email@newtifi.com
4. Add scopes: `userinfo.email`, `userinfo.profile`
5. Add test users if in testing mode

## Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Set authorized origins and redirect URIs:
   - **Development**: 
     - Authorized JavaScript origins: `http://localhost:8080`
     - Authorized redirect URIs: `http://localhost:8080/auth/google/callback`
   - **Production**:
     - Authorized JavaScript origins: `https://newtifi.com`
     - Authorized redirect URIs: `https://newtifi.com/auth/google/callback`

## Step 4: Get Credentials
After creating the OAuth client, you'll get:
- **Client ID**: Copy this value
- **Client Secret**: Copy this value

## Step 5: Update Configuration
Update `config/auth.json` with your credentials:
```json
{
  "google": {
    "clientId": "YOUR_ACTUAL_GOOGLE_CLIENT_ID",
    "clientSecret": "YOUR_ACTUAL_GOOGLE_CLIENT_SECRET",
    "redirectUri": {
      "development": "http://localhost:8080/auth/google/callback",
      "production": "https://newtifi.com/auth/google/callback"
    }
  }
}
```

## Step 6: Test Implementation
1. Start the server: `npm run dev`
2. Go to `http://localhost:8080/login`
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify user is created/logged in

## Important Notes
- **DO NOT** modify LinkedIn OAuth configuration
- **DO NOT** change LinkedIn endpoints or scopes
- Google OAuth works alongside LinkedIn OAuth
- Both systems use the same user database
- Users can link both Google and LinkedIn accounts
