# 🚨 URGENT OAuth Fix Required

## Current Issues:
1. **LinkedIn OAuth on localhost**: Button does nothing when clicked
2. **Google OAuth on newtifi.com**: `redirect_uri_mismatch` error
3. **LinkedIn OAuth on newtifi.com**: "broken cable" error

## Root Cause:
The OAuth provider consoles don't have the correct redirect URIs configured.

## 🔧 IMMEDIATE FIXES REQUIRED:

### 1. Google Console (CRITICAL)
Go to: https://console.cloud.google.com/apis/credentials
- Find your OAuth client: `194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com`
- Click **Edit**
- In **Authorized redirect URIs**, make sure you have:
  ```
  http://localhost:8080/auth/google/callback
  https://newtifi.com/auth/google/callback
  ```
- Click **Save**

### 2. LinkedIn Console (CRITICAL)
Go to: https://www.linkedin.com/developers/
- Find your app: `784sx1yh2lpuxm`
- Go to **Auth** tab
- In **Redirect URLs**, add:
  ```
  http://localhost:8080/auth/linkedin/callback
  https://newtifi.com/auth/linkedin/callback
  ```
- Click **Update**

## 🧪 Test URLs Generated:
- **Google (localhost)**: `http://localhost:8080/auth/google/callback`
- **Google (production)**: `https://newtifi.com/auth/google/callback`
- **LinkedIn (localhost)**: `http://localhost:8080/auth/linkedin/callback`
- **LinkedIn (production)**: `https://newtifi.com/auth/linkedin/callback`

## ✅ Expected Results After Fix:
- **LinkedIn OAuth on localhost**: Should redirect to LinkedIn login
- **Google OAuth on newtifi.com**: Should work without mismatch error
- **LinkedIn OAuth on newtifi.com**: Should work without "broken cable" error

## 🚀 After updating the OAuth consoles:
1. Wait 5-10 minutes for changes to propagate
2. Test both localhost and newtifi.com
3. Both Google and LinkedIn OAuth should work flawlessly
