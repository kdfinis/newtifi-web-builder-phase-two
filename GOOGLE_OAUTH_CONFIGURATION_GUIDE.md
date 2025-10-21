# Google OAuth Configuration Guide

## Current Status: HARDCODED (Working Perfectly)

The Google OAuth is currently using hardcoded values that are working perfectly. This guide shows how to easily switch between hardcoded and dynamic configuration.

## How to Switch Configuration

### Option 1: Keep Hardcoded (Current - Recommended)
**File:** `src/lib/auth/GoogleOAuthConfig.ts`
**Line 15:** `const USE_HARDCODED = true;`

**Status:** ✅ Currently active and working

### Option 2: Switch to Dynamic Configuration
**File:** `src/lib/auth/GoogleOAuthConfig.ts`
**Line 15:** Change to `const USE_HARDCODED = false;`

**Required Environment Variables:**
```bash
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_GOOGLE_CLIENT_SECRET=your_client_secret
```

## Configuration Files

### 1. Main Configuration: `src/lib/auth/GoogleOAuthConfig.ts`
- **USE_HARDCODED**: Controls which config to use
- **HARDCODED_CONFIG**: Current working values (DO NOT CHANGE)
- **DYNAMIC_CONFIG**: Alternative values from environment

### 2. Login Page: `src/pages/Login.tsx`
- Uses `getGoogleOAuthUrl()` function
- Automatically uses correct configuration

### 3. OAuth Callback: `src/pages/OAuthCallback.tsx`
- Uses `getGoogleTokenExchangeParams()` function
- Automatically uses correct configuration

## Easy Switching Steps

### To Switch to Dynamic:
1. Open `src/lib/auth/GoogleOAuthConfig.ts`
2. Change line 15: `const USE_HARDCODED = false;`
3. Set environment variables
4. Restart dev server

### To Switch Back to Hardcoded:
1. Open `src/lib/auth/GoogleOAuthConfig.ts`
2. Change line 15: `const USE_HARDCODED = true;`
3. Restart dev server

## Current Hardcoded Values (DO NOT CHANGE)
```typescript
clientId: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com'
clientSecret: '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'
redirectUri: 'http://localhost:8080/auth/google/callback' (dev)
redirectUri: 'https://newtifi.com/auth/google/callback' (prod)
scope: 'profile email'
prompt: 'select_account'
state: 'google_auth'
```

## Benefits of This System

✅ **Easy Switching**: One line change to switch modes
✅ **Hardcoded Protection**: Current working values are preserved
✅ **Dynamic Flexibility**: Can use environment variables when needed
✅ **No Code Changes**: Login and callback pages don't need modification
✅ **Backward Compatible**: Can always switch back to hardcoded

## Testing

- **Hardcoded Mode**: Works immediately, no setup needed
- **Dynamic Mode**: Requires environment variables to be set

**Current Status: HARDCODED MODE ACTIVE - WORKING PERFECTLY** ✅
