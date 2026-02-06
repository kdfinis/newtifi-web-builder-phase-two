// Environment Configuration
// Centralized environment variable management

export const ENV = {
  // Environment
  NODE_ENV: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // URLs
  VITE_FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  VITE_ARCHITECTURE_URL: import.meta.env.VITE_ARCHITECTURE_URL,
  
  // API Configuration
  VITE_API_BASE: import.meta.env.VITE_API_BASE,
  VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || '30000',
  
  // Authentication
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  VITE_LINKEDIN_CLIENT_ID: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
  
  // Features
  VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  VITE_ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
} as const;

// Validation function
export const validateEnvironment = () => {
  const errors: string[] = [];
  
  if (ENV.DEV) {
    // Development environment checks
    if (!ENV.VITE_FRONTEND_URL) {
      errors.push('VITE_FRONTEND_URL is required in development');
    }
    if (!ENV.VITE_BACKEND_URL) {
      errors.push('VITE_BACKEND_URL is required in development');
    }
  }
  
  if (ENV.PROD) {
    // Production environment checks
    if (!ENV.VITE_GOOGLE_CLIENT_ID) {
      errors.push('VITE_GOOGLE_CLIENT_ID is required in production');
    }
  }
  
  if (errors.length > 0) {
    // Environment validation failed
    throw new Error(`Environment validation failed: ${errors.join(', ')}`);
  }
  
  // Environment validation passed
  return true;
};
