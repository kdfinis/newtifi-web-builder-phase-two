// Configuration Manager - Single source of truth for all configuration
import { FullConfig, SiteConfig, JournalConfig, UIConfig, AuthConfig } from './types';

export class ConfigManager {
  private static instance: ConfigManager;
  private config: FullConfig | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Load all configuration files
      const [siteConfig, journalConfig, uiConfig, authConfig] = await Promise.all([
        import('../../../config/site.json'),
        import('../../../config/journals.json'),
        import('../../../config/ui.json'),
        import('../../../config/auth.json')
      ]);

      this.config = {
        site: siteConfig.default,
        journals: journalConfig.default,
        ui: uiConfig.default,
        auth: authConfig.default
      };

      this.initialized = true;
      console.log('✅ Configuration loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load configuration:', error);
      throw new Error('Configuration initialization failed');
    }
  }

  getConfig(): FullConfig {
    if (!this.config) {
      throw new Error('Configuration not initialized. Call initialize() first.');
    }
    return this.config;
  }

  getSiteConfig(): SiteConfig {
    return this.getConfig().site;
  }

  getJournalConfig(journalId: string): JournalConfig | undefined {
    return this.getConfig().journals.journals.find(j => j.id === journalId);
  }

  getAllJournals(): JournalConfig[] {
    return this.getConfig().journals.journals.filter(j => j.status === 'active');
  }

  getUIConfig(): UIConfig {
    return this.getConfig().ui;
  }

  getAuthConfig(): AuthConfig {
    return this.getConfig().auth;
  }

  getSiteUrl(path: string = ''): string {
    const baseUrl = this.getSiteConfig().urls.base;
    return `${baseUrl}${path}`;
  }

  getLocalUrl(path: string = ''): string {
    const localUrl = this.getSiteConfig().urls.local;
    return `${localUrl}${path}`;
  }

  getApiUrl(endpoint: string = ''): string {
    const apiUrl = this.getSiteConfig().urls.api;
    return `${apiUrl}${endpoint}`;
  }

  getCdnUrl(path: string = ''): string {
    const cdnUrl = this.getSiteConfig().urls.cdn;
    return cdnUrl ? `${cdnUrl}${path}` : this.getSiteUrl(path);
  }

  // Component configuration helpers
  getComponentConfig(componentName: keyof UIConfig['components']): UIConfig['components'][typeof componentName] {
    return this.getUIConfig().components[componentName];
  }

  getLayoutConfig(layoutName: keyof UIConfig['layouts']): UIConfig['layouts'][typeof layoutName] {
    return this.getUIConfig().layouts[layoutName];
  }

  // Environment helpers
  isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  isProduction(): boolean {
    return import.meta.env.PROD;
  }

  getCurrentUrl(): string {
    return this.isDevelopment() ? this.getLocalUrl() : this.getSiteUrl();
  }

  // Feature flags
  isFeatureEnabled(feature: keyof SiteConfig['features']): boolean {
    return this.getSiteConfig().features[feature];
  }

  // Performance settings
  getMaxBundleSize(): number {
    return this.getSiteConfig().performance.maxBundleSize;
  }

  shouldEnableCompression(): boolean {
    return this.getSiteConfig().performance.enableCompression;
  }

  shouldEnableCaching(): boolean {
    return this.getSiteConfig().performance.enableCaching;
  }

  shouldUseLazyLoading(): boolean {
    return this.getSiteConfig().performance.lazyLoading;
  }
}

// Export singleton instance
export const configManager = ConfigManager.getInstance();
