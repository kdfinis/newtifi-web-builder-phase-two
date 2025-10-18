# LinkedIn OAuth Implementation - Critical Fix Notes

## Problem
LinkedIn OAuth was failing with "broken cable" error due to using deprecated passport strategy.

## Root Cause
- `passport-linkedin-oauth2` package is designed for LinkedIn's **old OAuth v1 API**
- LinkedIn deprecated their old API and moved to **OpenID Connect**
- The passport strategy doesn't support OpenID Connect scopes (`openid`, `profile`, `email`)
- LinkedIn app was configured for new API but code was using old API → rejection

## Solution
**Manual LinkedIn OAuth implementation** using correct OpenID Connect endpoints:

### Correct Endpoints
- **Authorization**: `https://www.linkedin.com/oauth/v2/authorization`
- **Token Exchange**: `https://www.linkedin.com/oauth/v2/accessToken`
- **User Info**: `https://api.linkedin.com/v2/userinfo`

### Correct Scopes
- Use: `openid profile email` (OpenID Connect)
- Avoid: `r_liteprofile r_emailaddress` (deprecated)

### Implementation Pattern
```javascript
// 1. Authorization redirect
app.get('/auth/linkedin', (req, res) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: CALLBACK_URL,
    state: state,
    scope: 'openid profile email'
  });
  res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${params}`);
});

// 2. Callback handler
app.get('/auth/linkedin/callback', async (req, res) => {
  // Exchange code for token
  // Get user info from userinfo endpoint
  // Create/update user in database
  // Log user in
});
```

## Key Points
1. **Never use `passport-linkedin-oauth2`** - it's deprecated
2. **Always match scopes** exactly with LinkedIn app configuration
3. **Use OpenID Connect endpoints** - not old OAuth v1
4. **Implement manually** - no passport strategy supports LinkedIn OpenID Connect
5. **Include state parameter** for CSRF protection

## Why This Works
- Uses LinkedIn's current, supported API
- Matches exact scopes approved in LinkedIn app
- Follows official OpenID Connect specification
- No compatibility issues with deprecated packages

---
*Created: 2025-10-18*
*Status: Working perfectly*
