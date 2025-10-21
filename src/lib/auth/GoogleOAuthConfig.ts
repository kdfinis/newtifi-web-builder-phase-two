// Google OAuth Configuration - Easy to switch between hardcoded and dynamic
export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  prompt: string;
  state: string;
}

// HARDCODED CONFIGURATION (Current Working Setup)
const HARDCODED_CONFIG: GoogleOAuthConfig = {
  clientId: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: '', // Will be set dynamically based on environment
  scope: 'profile email',
  prompt: 'select_account',
  state: 'google_auth'
};

// DYNAMIC CONFIGURATION (Alternative setup)
const DYNAMIC_CONFIG: GoogleOAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
  redirectUri: '', // Will be set dynamically based on environment
  scope: 'profile email',
  prompt: 'select_account',
  state: 'google_auth'
};

// Configuration mode - EASILY SWITCHABLE
const USE_HARDCODED = true; // Set to false to use dynamic config

export class GoogleOAuthConfigManager {
  private static instance: GoogleOAuthConfigManager;
  private config: GoogleOAuthConfig;

  private constructor() {
    this.config = USE_HARDCODED ? HARDCODED_CONFIG : DYNAMIC_CONFIG;
    this.config.redirectUri = this.getRedirectUri();
  }

  static getInstance(): GoogleOAuthConfigManager {
    if (!GoogleOAuthConfigManager.instance) {
      GoogleOAuthConfigManager.instance = new GoogleOAuthConfigManager();
    }
    return GoogleOAuthConfigManager.instance;
  }

  private getRedirectUri(): string {
    return window.location.origin + '/auth/google/callback';
  }

  getConfig(): GoogleOAuthConfig {
    return { ...this.config };
  }

  getOAuthUrl(): string {
    const { clientId, redirectUri, scope, prompt, state } = this.config;
    
    return `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${scope}&` +
      `prompt=${prompt}&` +
      `state=${state}`;
  }

  getTokenExchangeParams(code: string): URLSearchParams {
    const { clientId, clientSecret, redirectUri } = this.config;
    
    return new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    });
  }

  // Method to switch between hardcoded and dynamic
  static switchToDynamic(): void {
    console.warn('Switching to dynamic configuration - requires environment variables');
    // This would require a restart to take effect
  }

  static switchToHardcoded(): void {
    console.log('Using hardcoded configuration (current working setup)');
  }

  // Method to update config at runtime (if needed)
  updateConfig(newConfig: Partial<GoogleOAuthConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.config.redirectUri = this.getRedirectUri();
  }
}

// Easy access functions
export const getGoogleOAuthUrl = (): string => {
  return GoogleOAuthConfigManager.getInstance().getOAuthUrl();
};

export const getGoogleTokenExchangeParams = (code: string): URLSearchParams => {
  return GoogleOAuthConfigManager.getInstance().getTokenExchangeParams(code);
};

// Configuration status
export const isUsingHardcodedConfig = (): boolean => {
  return USE_HARDCODED;
};

export const getConfigMode = (): string => {
  return USE_HARDCODED ? 'HARDCODED' : 'DYNAMIC';
};
