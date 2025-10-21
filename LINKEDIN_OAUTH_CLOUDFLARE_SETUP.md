# LinkedIn OAuth Cloudflare Workers Setup Guide

This guide will help you deploy a Cloudflare Worker to handle LinkedIn OAuth token exchange and user info fetching, bypassing CORS restrictions.

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Node.js installed on your machine
- Access to your LinkedIn Developer Console

## Step 1: Sign Up for Cloudflare Workers

1. Go to [Cloudflare Workers](https://workers.cloudflare.com/)
2. Sign up for a free account if you don't have one
3. The free tier includes 100,000 requests per day (more than enough for OAuth)

## Step 2: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 3: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate with Cloudflare.

## Step 4: Deploy the Worker

From your project root directory, run:

```bash
wrangler deploy
```

This will:
- Deploy the worker to Cloudflare
- Give you a URL like: `https://linkedin-oauth-proxy.YOURSUBDOMAIN.workers.dev`
- Copy this URL - you'll need it in the next step

## Step 5: Update Configuration

1. Open `src/lib/auth/LinkedInOAuthConfig.ts`
2. Replace `YOURSUBDOMAIN` in the `workerUrl` with your actual Cloudflare Workers subdomain:

```typescript
export const LINKEDIN_CONFIG = {
  clientId: '784sx1yh2lpuxm',
  workerUrl: 'https://linkedin-oauth-proxy.YOURACTUALSUBDOMAIN.workers.dev', // Update this
  scopes: ['openid', 'profile', 'email']
};
```

## Step 6: Test the Setup

### Localhost Testing
1. Start your development server: `npm run dev`
2. Go to `http://localhost:8080/login`
3. Click "Continue with LinkedIn"
4. Complete the LinkedIn OAuth flow
5. You should be redirected to the dashboard with your LinkedIn profile

### Production Testing
1. Build and deploy your site to `newtifi.com`
2. Go to `https://newtifi.com/login`
3. Click "Continue with LinkedIn"
4. Complete the LinkedIn OAuth flow
5. You should be redirected to the dashboard with your LinkedIn profile

## Troubleshooting

### Worker Not Deploying
- Make sure you're logged in: `wrangler whoami`
- Check that `wrangler.toml` is in your project root
- Verify the worker file exists at `workers/linkedin-oauth.js`

### CORS Errors
- The worker includes CORS headers for both localhost and production
- If you still get CORS errors, check that the worker URL is correct in `LinkedInOAuthConfig.ts`

### LinkedIn OAuth Errors
- Verify your LinkedIn app settings in the LinkedIn Developer Console:
  - Authorized redirect URIs should include:
    - `http://localhost:8080/auth/linkedin/callback`
    - `https://newtifi.com/auth/linkedin/callback`
- Check that your LinkedIn app is approved for the scopes you're requesting

### Worker URL Issues
- The worker URL should be accessible: `https://linkedin-oauth-proxy.YOURSUBDOMAIN.workers.dev`
- Test the endpoints:
  - `GET https://linkedin-oauth-proxy.YOURSUBDOMAIN.workers.dev/userinfo?access_token=test` (should return an error, but not a 404)

## Benefits

- ✅ Zero cost (Cloudflare Workers free tier)
- ✅ Same methodology for localhost and production
- ✅ No persistent server to manage
- ✅ Deploy via simple CLI command
- ✅ Code stored in your GitHub repo
- ✅ Google OAuth remains untouched and client-side

## Security Notes

- The worker contains your LinkedIn client secret
- This is acceptable for OAuth proxy services
- The worker only handles OAuth flows, not user data storage
- All user data is stored client-side in localStorage

## Next Steps

Once everything is working:

1. Commit your changes to Git
2. Deploy to production
3. Test both Google and LinkedIn OAuth on production
4. Monitor the Cloudflare Workers dashboard for usage

The setup is now complete and LinkedIn OAuth should work without CORS errors on both localhost and production!
