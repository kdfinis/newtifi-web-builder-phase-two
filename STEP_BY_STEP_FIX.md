# 🔧 STEP-BY-STEP CLOUDFLARE WORKER FIX

## The Problem
Your worker is deployed but has CORS issues. The OPTIONS request returns 405 instead of 200 with proper CORS headers.

## Exact Steps to Fix (5 minutes)

### Step 1: Open Your Cloudflare Worker
1. Go to: https://dash.cloudflare.com/
2. Click on "Workers & Pages" in the left sidebar
3. Find and click on "linkedin-oauth-proxy"
4. You should see the worker editor

### Step 2: Delete ALL Existing Code
1. In the code editor, select ALL the text (Cmd+A on Mac, Ctrl+A on Windows)
2. Delete everything (press Delete or Backspace)
3. The editor should be completely empty

### Step 3: Copy This EXACT Code
Copy this entire code block and paste it into the empty editor:

```javascript
// Cloudflare Worker for LinkedIn OAuth Proxy - Fixed Version
// Handles token exchange and user info fetching to bypass CORS restrictions

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200,
        headers: corsHeaders 
      });
    }
    
    try {
      // Token exchange endpoint
      if (url.pathname === '/token' && request.method === 'POST') {
        const { code, redirect_uri } = await request.json();
        
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: '784sx1yh2lpuxm',
            client_secret: 'WPL_AP1.ZCdvRZtOo5BgQfzD.pZ9uHQ==',
            redirect_uri
          })
        });
        
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // User info endpoint
      if (url.pathname === '/userinfo' && request.method === 'GET') {
        const access_token = url.searchParams.get('access_token');
        
        if (!access_token) {
          return new Response(JSON.stringify({ error: 'access_token parameter required' }), {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json'
            }
          });
        }
        
        const response = await fetch('https://api.linkedin.com/v2/userinfo', {
          headers: { 'Authorization': `Bearer ${access_token}` }
        });
        
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Health check endpoint
      if (url.pathname === '/' || url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          message: 'LinkedIn OAuth Proxy is running',
          endpoints: ['/token', '/userinfo']
        }), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Default response for unknown endpoints
      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
      
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
```

### Step 4: Save and Deploy
1. Click the "Save and Deploy" button (usually blue button in top right)
2. Wait for the deployment to complete
3. You should see a success message

### Step 5: Test the Fix
1. Open a new browser tab
2. Go to: `https://linkedin-oauth-proxy.pages.dev/`
3. You should see: `{"status":"ok","message":"LinkedIn OAuth Proxy is running","endpoints":["/token","/userinfo"]}`

### Step 6: Test LinkedIn OAuth
1. Go to: `http://localhost:8080/login`
2. Click "Continue with LinkedIn"
3. Complete the OAuth flow
4. You should be redirected to the dashboard!

## ✅ Success Indicators
- Worker health check shows JSON response
- No more CORS errors in browser console
- LinkedIn OAuth completes successfully

## 🚨 If It Still Doesn't Work
- Make sure you copied the ENTIRE code block above
- Make sure you deleted ALL the old code first
- Make sure you clicked "Save and Deploy"
- Wait 1-2 minutes for the changes to propagate

The key difference in this fixed code is the proper CORS handling for OPTIONS requests!
