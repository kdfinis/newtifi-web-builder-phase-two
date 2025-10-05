// URL Factory - Dynamic URL generation with zero hardcoding
import { configManager } from '../config/ConfigManager';
import { URLS } from '../urls';

export class UrlFactory {
  private static getConfig() {
    return configManager.getConfig();
  }

  // Article URLs
  static getArticleUrl(slug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing/articles/${slug}`;
  }

  static getArticlePdfUrl(slug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/articles/${slug}.pdf`;
  }

  static getArticlePreviewUrl(slug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing/articles/${slug}/preview`;
  }

  // Journal URLs
  static getJournalUrl(journalSlug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing/journals/${journalSlug}`;
  }

  static getJournalArticlesUrl(journalSlug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing/journals/${journalSlug}/articles`;
  }

  static getJournalArticleUrl(journalSlug: string, articleSlug: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing/journals/${journalSlug}/articles/${articleSlug}`;
  }

  // Main page URLs
  static getHomeUrl(): string {
    return configManager.getCurrentUrl();
  }

  static getPublishingUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/publishing`;
  }

  static getContactUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/contact`;
  }

  static getMembershipUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/membership`;
  }

  static getLoginUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/login`;
  }

  static getSignupUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/signup`;
  }

  static getWhoWeAreUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/who-we-are`;
  }

  static getTermsUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/terms`;
  }

  static getPrivacyUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/privacy`;
  }

  static getCookiesUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/cookies`;
  }

  static getAdminUrl(): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/admin`;
  }

  // Person URLs
  static getPersonUrl(name: string): string {
    const baseUrl = configManager.getCurrentUrl();
    return `${baseUrl}/person/${name}`;
  }

  // API URLs
  static getApiUrl(endpoint: string): string {
    return configManager.getApiUrl(endpoint);
  }

  static getApiArticlesUrl(): string {
    return this.getApiUrl('/api/articles');
  }

  static getApiJournalsUrl(): string {
    return this.getApiUrl('/api/journals');
  }

  static getApiAdminUrl(endpoint: string): string {
    return this.getApiUrl(`/api/admin${endpoint}`);
  }

  // Asset URLs
  static getAssetUrl(path: string): string {
    return configManager.getCdnUrl(path);
  }

  static getImageUrl(path: string): string {
    return this.getAssetUrl(`/images${path}`);
  }

  static getPdfUrl(path: string): string {
    return this.getAssetUrl(`/articles${path}`);
  }

  static getFileUrl(path: string): string {
    return this.getAssetUrl(`/files${path}`);
  }

  // External URLs
  static getExternalUrl(service: string, params?: Record<string, string>): string {
    const externalUrls: Record<string, (value: string) => string> = {
      linkedin: (profile: string) => `${URLS.EXTERNAL.LINKEDIN_AUTH}/in/${profile}`,
      email: (address: string) => `mailto:${address}`,
      whatsapp: (number: string) => `https://wa.me/${number}`,
      maps: (address: string) => `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      googleMaps: (address: string) => `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.8684700480477!2d6.127777315490051!3d49.611979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954a1c0c0c0c0c%3A0x0!2s14%20Rue%20Jean-Pierre%20Biermann%2C%201268%20Luxembourg!5e0!3m2!1sen!2slu!4v1677890257135!5m2!1sen!2slu&zoom=10`,
      openStreetMap: (address: string) => `https://www.openstreetmap.org/?mlat=49.61650&mlon=6.16000#map=16/49.61650/6.16000`,
      openStreetMapEmbed: (address: string) => `https://www.openstreetmap.org/export/embed.html?bbox=6.15200%2C49.61200%2C6.17000%2C49.62000&layer=mapnik&marker=49.61650%2C6.16000&scrollwheel=false&zoomControl=true&dragPan=false&touchZoom=false&doubleClickZoom=false&keyboard=false`
    };

    const urlGenerator = externalUrls[service];
    if (!urlGenerator) {
      throw new Error(`Unknown external service: ${service}`);
    }

    const value = params?.value || '';
    return urlGenerator(value);
  }

  // Specific external URLs
  static getLinkedInUrl(profile: string): string {
    return this.getExternalUrl('linkedin', { value: profile });
  }

  static getEmailUrl(address: string): string {
    return this.getExternalUrl('email', { value: address });
  }

  static getWhatsAppUrl(number: string): string {
    return this.getExternalUrl('whatsapp', { value: number });
  }

  static getMapsUrl(address: string): string {
    return this.getExternalUrl('maps', { value: address });
  }

  static getGoogleMapsEmbedUrl(): string {
    return this.getExternalUrl('googleMaps', { value: '' });
  }

  static getOpenStreetMapUrl(): string {
    return this.getExternalUrl('openStreetMap', { value: '' });
  }

  static getOpenStreetMapEmbedUrl(): string {
    return this.getExternalUrl('openStreetMapEmbed', { value: '' });
  }

  // Validation helpers
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static sanitizeUrl(url: string): string {
    return url.replace(/[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g, '');
  }
}

// Export singleton instance
export const urlFactory = UrlFactory;
