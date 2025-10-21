// LinkedIn OAuth Configuration for Cloudflare Workers
// Centralized configuration for LinkedIn OAuth with Cloudflare Worker proxy

export const LINKEDIN_CONFIG = {
  clientId: '784sx1yh2lpuxm',
  workerUrl: 'https://still-shadow-0fbb.karlodefinis.workers.dev', // Your deployed Cloudflare Worker URL
  scopes: ['openid', 'profile', 'email']
};

// Temporary: Use a CORS proxy for testing (not for production)
export const LINKEDIN_TEMP_CONFIG = {
  clientId: '784sx1yh2lpuxm',
  workerUrl: 'https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken', // Temporary CORS proxy
  scopes: ['openid', 'profile', 'email']
};

// Temporary fallback for testing (will show CORS error until worker is deployed)
export const LINKEDIN_FALLBACK_CONFIG = {
  clientId: '784sx1yh2lpuxm',
  workerUrl: 'https://linkedin-oauth-proxy.YOURSUBDOMAIN.workers.dev', // This will cause CORS error until deployed
  scopes: ['openid', 'profile', 'email']
};

export function getLinkedInAuthUrl(redirectUri: string, state: string): string {
  return `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${LINKEDIN_CONFIG.clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${LINKEDIN_CONFIG.scopes.join(' ')}&` +
    `state=${state}`;
}
