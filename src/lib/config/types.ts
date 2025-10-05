// Configuration types for NewTIFI website
export interface SiteConfig {
  name: string;
  description: string;
  version: string;
  urls: {
    base: string;
    api: string;
    cdn: string;
    local: string;
  };
  features: {
    analytics: boolean;
    serviceWorker: boolean;
    pwa: boolean;
    multiJournal: boolean;
    googleAPIs: boolean;
  };
  ui: {
    theme: string;
    animations: boolean;
    compactMode: boolean;
    fontFamily: string;
  };
  performance: {
    maxBundleSize: number;
    enableCompression: boolean;
    enableCaching: boolean;
    lazyLoading: boolean;
  };
}

export interface JournalConfig {
  id: string;
  name: string;
  slug: string;
  issn: string;
  publisher: string;
  publisherLocation: string;
  frequency: 'monthly' | 'quarterly' | 'bi-annual' | 'annual';
  peerReview: 'single-blind' | 'double-blind' | 'open';
  archiving: string[];
  categories: string[];
  articleTypes: string[];
  submissionGuidelines: string;
  editorialBoard: EditorialBoardMember[];
  status: 'active' | 'inactive' | 'planned' | 'archived';
  launchDate: string;
  lastUpdated: string;
}

export interface EditorialBoardMember {
  name: string;
  role: string;
  affiliation: string;
  email: string;
}

export interface UIConfig {
  visualConsistency: {
    preserveExistingStyles: boolean;
    useCurrentColorPalette: boolean;
    maintainTypographyScale: boolean;
    keepCurrentSpacing: boolean;
    preserveAnimations: boolean;
  };
  components: {
    ArticleCard: ComponentConfig;
    JournalCard: ComponentConfig;
    JournalHeader: ComponentConfig;
    Navigation: ComponentConfig;
  };
  layouts: {
    homepage: LayoutConfig;
    journal: LayoutConfig;
    article: LayoutConfig;
  };
}

export interface ComponentConfig {
  variants?: string[];
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  maxTitleLength?: number;
  maxAbstractLength?: number;
  baseClasses?: string;
  titleClasses?: string;
  abstractClasses?: string;
  descriptionClasses?: string;
  showIssn?: boolean;
  showPublisher?: boolean;
  showFrequency?: boolean;
  showPeerReview?: boolean;
  showSearch?: boolean;
  showUserMenu?: boolean;
  showLanguageSwitcher?: boolean;
  maxMenuItems?: number;
  linkClasses?: string;
}

export interface LayoutConfig {
  heroSection?: boolean;
  featuredArticles?: number;
  latestArticles?: number;
  showCategories?: boolean;
  showEditorialBoard?: boolean;
  showSubmissionGuidelines?: boolean;
  articlesPerPage?: number;
  showFilters?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  showRelatedArticles?: boolean;
}

export interface AuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
  };
  session: {
    timeout: number;
    refreshThreshold: number;
    storageKey: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
}

export interface FullConfig {
  site: SiteConfig;
  journals: { journals: JournalConfig[] };
  ui: UIConfig;
  auth: AuthConfig;
}
