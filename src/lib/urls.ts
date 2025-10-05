// Centralized URL Configuration
// This prevents hardcoded URLs throughout the application

export const URLS = {
  // Development URLs
  DEV: {
    FRONTEND: process.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
    BACKEND: process.env.VITE_BACKEND_URL || '',
    ARCHITECTURE: process.env.VITE_ARCHITECTURE_URL || '',
  },
  
  // Production URLs
  PROD: {
    FRONTEND: process.env.VITE_PROD_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
    BACKEND: process.env.VITE_PROD_BACKEND_URL || '',
    ARCHITECTURE: process.env.VITE_PROD_ARCHITECTURE_URL || '',
  },
  
  // API Endpoints
  API: {
    BASE: process.env.VITE_API_BASE || '/api',
    ARTICLES: '/api/articles',
    JOURNALS: '/api/journals',
    AUTH: '/api/auth',
    ADMIN: '/api/admin',
  },
  
  // External Services
  EXTERNAL: {
    GOOGLE_AUTH: process.env.VITE_GOOGLE_AUTH_URL || 'https://accounts.google.com',
    LINKEDIN_AUTH: process.env.VITE_LINKEDIN_AUTH_URL || 'https://www.linkedin.com',
    GOOGLE_OAUTH: 'https://oauth2.googleapis.com',
    GOOGLE_APIS: 'https://www.googleapis.com',
    DOI_BASE: 'https://doi.org',
  },
  
  // File Paths
  ASSETS: {
    IMAGES: '/assets/images',
    PDFS: '/assets/pdfs',
    DOCUMENTS: '/assets/documents',
    GRID_PATTERN: '/assets/images/grid-pattern.svg',
  },
} as const;

// Helper function to get current environment URLs
export const getCurrentUrls = () => {
  const isDev = import.meta.env.DEV;
  return isDev ? URLS.DEV : URLS.PROD;
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string) => {
  const urls = getCurrentUrls();
  const base = urls.BACKEND ? `${urls.BACKEND}${URLS.API.BASE}` : `${URLS.API.BASE}`;
  return `${base}${endpoint}`;
};

// Helper function to build asset URLs
export const buildAssetUrl = (path: string) => {
  const urls = getCurrentUrls();
  return urls.FRONTEND ? `${urls.FRONTEND}${path}` : `${path}`;
};

// Helper function to build external URLs
export const buildExternalUrl = (service: keyof typeof URLS.EXTERNAL, path?: string) => {
  const baseUrl = URLS.EXTERNAL[service];
  return path ? `${baseUrl}${path}` : baseUrl;
};