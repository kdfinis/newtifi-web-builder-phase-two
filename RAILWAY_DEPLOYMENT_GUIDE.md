# Railway Deployment Guide - OAuth Backend Server

## 🚀 **Deploy Express Server to Railway for OAuth**

### **Step 1: Login to Railway**
```bash
railway login
```
- This will open a browser window
- Login with your GitHub account
- Authorize Railway

### **Step 2: Initialize Railway Project**
```bash
railway init
```
- Choose "Empty Project"
- Name it "newtifi-backend" or similar

### **Step 3: Deploy Express Server**
```bash
railway up
```
- This will deploy the Express server
- Railway will automatically detect it's a Node.js project
- It will install dependencies and start the server

### **Step 4: Get Railway URL**
After deployment, Railway will give you a URL like:
```
https://newtifi-backend-production.up.railway.app
```

### **Step 5: Update OAuth Configuration**
Update `config/auth.json` with Railway URLs:

```json
{
  "google": {
    "clientId": "194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com",
    "clientSecret": "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",
    "redirectUri": {
      "development": "http://localhost:8080/auth/google/callback",
      "production": "https://newtifi-backend-production.up.railway.app/auth/google/callback"
    }
  },
  "linkedin": {
    "clientId": "784sx1yh2lpuxm",
    "clientSecret": "WPL_AP1.ZCdvRZtOo5BgQfzD.pZ9uHQ==",
    "redirectUri": {
      "development": "http://localhost:8080/auth/linkedin/callback",
      "production": "https://newtifi-backend-production.up.railway.app/auth/linkedin/callback"
    }
  }
}
```

### **Step 6: Update Google OAuth Settings**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to "APIs & Services" > "Credentials"
3. Edit your OAuth client
4. Add Railway URL to authorized redirect URIs:
   - `https://newtifi-backend-production.up.railway.app/auth/google/callback`

### **Step 7: Update LinkedIn OAuth Settings**
1. Go to [LinkedIn Developer Console](https://www.linkedin.com/developers/)
2. Edit your LinkedIn app
3. Add Railway URL to authorized redirect URIs:
   - `https://newtifi-backend-production.up.railway.app/auth/linkedin/callback`

### **Step 8: Update Frontend OAuth URLs**
Update the frontend to use Railway backend:

```typescript
// In src/lib/urls/UrlFactory.ts
static getOAuthGoogleUrl(): string {
  const baseUrl = import.meta.env.DEV 
    ? 'http://localhost:3001'  // Local Express server
    : 'https://newtifi-backend-production.up.railway.app';  // Railway server
  return `${baseUrl}/auth/google`;
}
```

### **Step 9: Test OAuth Flow**
1. **Localhost**: Should still work (uses local Express server)
2. **newtifi.com**: Should now work (uses Railway server)

## 🎯 **Expected Result:**
- ✅ **Localhost OAuth**: Works (local Express server)
- ✅ **newtifi.com OAuth**: Works (Railway server)
- ✅ **Both systems**: Working together seamlessly

## 🔧 **Railway Environment Variables:**
Railway will need these environment variables:
- `DATABASE_URL`: Railway will provide a PostgreSQL URL
- `NODE_ENV`: `production`
- `PORT`: Railway will set this automatically

## 📊 **Deployment Status:**
After deployment, both OAuth systems will work on:
- **Development**: localhost:8080 (local Express server)
- **Production**: newtifi.com (Railway server)

**Ready to deploy? Run the commands above!**
