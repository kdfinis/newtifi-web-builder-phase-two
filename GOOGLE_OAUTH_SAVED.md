# GOOGLE OAUTH - SAVED & HARDCODED - DO NOT TOUCH

## WORKING GOOGLE OAUTH IMPLEMENTATION
**Date Saved:** October 21, 2025
**Status:** WORKING PERFECTLY - DO NOT MODIFY

## HARDCODED CONFIGURATION

### Google Console Settings (DO NOT CHANGE):
- **Client ID:** `194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com`
- **Client Secret:** `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`
- **Authorized JavaScript origins:**
  - `http://localhost:8080`
  - `https://newtifi.com`
- **Authorized redirect URIs:**
  - `http://localhost:8080/auth/google/callback`
  - `https://newtifi.com/auth/google/callback`

## HARDCODED IMPLEMENTATION

### 1. Login Button Handler (src/pages/Login.tsx):
```typescript
const handleGoogleSignIn = async () => {
  try {
    setError('');
    setIsLoading(true);
    
    // Use direct Google OAuth URL instead of SDK
    const clientId = '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com';
    const redirectUri = window.location.origin + '/auth/google/callback';
    
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=profile email&` +
      `prompt=select_account&` +
      `state=google_auth`;
    
    window.location.href = googleUrl;
  } catch (err) {
    console.error('Google sign-in error:', err);
    setError('Google sign-in failed. Please try again.');
    setIsLoading(false);
  }
};
```

### 2. OAuth Callback Handler (src/pages/OAuthCallback.tsx):
```typescript
} else if (provider === 'google') {
  // Handle Google OAuth
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com',
      client_secret: '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',
      code,
      grant_type: 'authorization_code',
      redirect_uri: window.location.origin + '/auth/google/callback'
    })
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Get user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user info');
  }

  const user = await userResponse.json();
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.picture,
    provider: 'google',
    loginTime: new Date().toISOString()
  };

  // Store in localStorage
  localStorage.setItem('newtifi_user', JSON.stringify(userData));
  localStorage.setItem('newtifi_auth', 'true');
}
```

### 3. Immediate Redirect (src/pages/OAuthCallback.tsx):
```typescript
// Redirect immediately to dashboard
console.log('OAuth callback: Redirecting to dashboard...');
navigate('/dashboard?auth=success&provider=' + provider);
```

## WORKING FLOW:
1. User clicks "Continue with Google"
2. Redirects to `accounts.google.com` with proper parameters
3. User enters Google credentials
4. Google redirects back to `/auth/google/callback` with code
5. Callback exchanges code for access token
6. Fetches user profile from Google API
7. Stores user data in localStorage
8. Immediately redirects to dashboard
9. Navbar shows "Hello, {name}" and "Dashboard" button

## CRITICAL RULES:
- ✅ **DO NOT** modify Google OAuth URLs
- ✅ **DO NOT** change client ID or secret
- ✅ **DO NOT** modify redirect URIs
- ✅ **DO NOT** add delays or intermediate steps
- ✅ **DO NOT** change localStorage keys
- ✅ **DO NOT** modify the immediate redirect

## TESTING:
- Works on localhost:8080
- Works on newtifi.com
- No backend server needed
- Pure client-side OAuth

**THIS IMPLEMENTATION IS WORKING PERFECTLY - DO NOT TOUCH!**
