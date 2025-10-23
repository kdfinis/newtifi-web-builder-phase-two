# 🔒 HARDCODED OAUTH CONFIGURATION - DO NOT CHANGE

This file contains the hardcoded OAuth configurations that are working on newtifi.com.
**DO NOT MODIFY THESE VALUES** - They are intentionally hardcoded to prevent future failures.

## Google OAuth Configuration
- **Client ID**: `194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com`
- **Client Secret**: `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`
- **Redirect URI**: `${window.location.origin}/auth/callback`

## LinkedIn OAuth Configuration
- **Client ID**: `784sx1yh2lpuxm`
- **Worker URL**: `https://still-shadow-0fbb.karlodefinis.workers.dev`
- **Scopes**: `['openid', 'profile', 'email']`

## Files Modified for Hardcoding
1. `src/lib/auth/GoogleAuthService.ts` - Hardcoded Google OAuth values
2. `src/lib/auth/LinkedInOAuthConfig.ts` - Hardcoded LinkedIn OAuth values
3. `src/lib/auth/GoogleOAuthConfig.ts` - Already has hardcoded configuration

## Status
✅ **WORKING ON NEWTIFI.COM** - All OAuth functionality is hardcoded and stable.

## Last Updated
December 10, 2025 - Major update with hardcoded OAuth configurations
