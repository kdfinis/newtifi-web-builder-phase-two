import { toast } from 'sonner';

export interface OAuthCallbackResult {
  success: boolean;
  provider?: string;
  error?: string;
  redirectTo?: string;
}

/**
 * Parse OAuth callback from URL query parameters
 */
export function parseOAuthCallback(): OAuthCallbackResult {
  const params = new URLSearchParams(window.location.search);
  
  const auth = params.get('auth');
  const provider = params.get('provider');
  const error = params.get('error');
  
  if (auth === 'success' && provider) {
    return {
      success: true,
      provider,
      redirectTo: sessionStorage.getItem('auth_redirect') || '/dashboard'
    };
  }
  
  if (error) {
    return {
      success: false,
      error: error.replace(/_/g, ' ')
    };
  }
  
  return { success: false };
}

/**
 * Handle OAuth callback and show appropriate notifications
 */
export function handleOAuthCallback(): OAuthCallbackResult {
  const result = parseOAuthCallback();
  
  if (result.success && result.provider) {
    const providerName = result.provider === 'google' ? 'Google' : 'LinkedIn';
    toast.success(`Successfully signed in with ${providerName}!`);
    
    // Clear stored redirect
    sessionStorage.removeItem('auth_redirect');
    
    // Clean URL
    window.history.replaceState({}, document.title, result.redirectTo || window.location.pathname);
  } else if (result.error) {
    toast.error(`Authentication failed: ${result.error}`);
    
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
  return result;
}

/**
 * Check if current page is an OAuth callback
 */
export function isOAuthCallback(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has('auth') || params.has('error');
}
