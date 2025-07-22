// URL Mapping System for Permanent Article URLs
// This ensures URLs never change even if article titles or metadata are modified

export interface ArticleUrlMapping {
  urlId: string;        // Permanent, never-changing URL identifier
  slug: string;         // Human-readable slug (can change)
  id: string;          // Article ID
  title: string;       // Article title (can change)
}

// Permanent URL mappings - these should NEVER change
export const PERMANENT_URL_MAPPINGS: Record<string, ArticleUrlMapping> = {
  'eltifs-2025-001': {
    urlId: 'eltifs-2025-001',
    slug: 'eltifs-compulsory-redemptions',
    id: 'IMJ-2025-001',
    title: 'Closed-Ended Luxembourg ELTIFs Compulsory Redemption Matters and Compartment Termination & Amalgamation Provisions'
  },
  'bafin-2025-002': {
    urlId: 'bafin-2025-002',
    slug: 'bafin-aifm-portfolio-control',
    id: 'IMJ-2025-002',
    title: 'Investor Oversight or Undue Influence? Reassessing BaFin\'s Stance on AIFM Portfolio Control'
  },
  'luxembourg-2025-003': {
    urlId: 'luxembourg-2025-003',
    slug: 'luxembourg-well-informed-investor',
    id: 'IMJ-2025-003',
    title: 'Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion'
  }
};

// URL generation functions
export function getArticleUrl(urlId: string): string {
  return `/article/${urlId}`;
}

export function getArticleByUrlId(urlId: string): ArticleUrlMapping | undefined {
  return PERMANENT_URL_MAPPINGS[urlId];
}

export function getArticleBySlug(slug: string): ArticleUrlMapping | undefined {
  return Object.values(PERMANENT_URL_MAPPINGS).find(mapping => mapping.slug === slug);
}

export function getArticleById(id: string): ArticleUrlMapping | undefined {
  return Object.values(PERMANENT_URL_MAPPINGS).find(mapping => mapping.id === id);
}

// Backward compatibility functions
export function findArticleByAnyIdentifier(identifier: string): ArticleUrlMapping | undefined {
  let mapping = getArticleByUrlId(identifier);
  if (mapping) return mapping;
  
  mapping = Object.values(PERMANENT_URL_MAPPINGS).find(mapping => mapping.slug === identifier);
  if (mapping) return mapping;
  
  mapping = Object.values(PERMANENT_URL_MAPPINGS).find(mapping => mapping.id === identifier);
  if (mapping) return mapping;
  
  return undefined;
}

// URL validation
export function isValidArticleUrl(urlId: string): boolean {
  return urlId in PERMANENT_URL_MAPPINGS;
}

// Get all permanent URLs for sitemap generation
export function getAllPermanentUrls(): string[] {
  return Object.keys(PERMANENT_URL_MAPPINGS).map(urlId => getArticleUrl(urlId));
}

// Get article metadata for SEO
export function getArticleMetadata(urlId: string) {
  const mapping = getArticleByUrlId(urlId);
  if (!mapping) return null;
  
  return {
    title: mapping.title,
    url: getArticleUrl(urlId),
    id: mapping.id,
    slug: mapping.slug
  };
} 