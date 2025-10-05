// Centralized URL Configuration
// This prevents hardcoded URLs throughout the application

export const URLS = {
  // Development URLs
  DEV: {
    FRONTEND: process.env.VITE_FRONTEND_URL || 'http://localhost:8080',
    BACKEND: process.env.VITE_BACKEND_URL || 'http://localhost:3001',
    ARCHITECTURE: process.env.VITE_ARCHITECTURE_URL || 'http://localhost:3000',
  },
  
  // Production URLs
  PROD: {
    FRONTEND: process.env.VITE_PROD_FRONTEND_URL || 'https://newtifi.com',
    BACKEND: process.env.VITE_PROD_BACKEND_URL || 'https://api.newtifi.com',
    ARCHITECTURE: process.env.VITE_PROD_ARCHITECTURE_URL || 'https://arch.newtifi.com',
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
  },
  
  // File Paths
  ASSETS: {
    IMAGES: '/assets/images',
    PDFS: '/assets/pdfs',
    DOCUMENTS: '/assets/documents',
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
  return `${urls.BACKEND}${URLS.API.BASE}${endpoint}`;
};

// Helper function to build asset URLs
export const buildAssetUrl = (path: string) => {
  const urls = getCurrentUrls();
  return `${urls.FRONTEND}${path}`;
};
