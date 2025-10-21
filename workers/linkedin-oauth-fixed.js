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
