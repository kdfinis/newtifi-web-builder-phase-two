// Article Service - Single source of truth for all article data
import { configManager } from '../config/ConfigManager';
import { urlFactory } from '../urls/UrlFactory';

export interface Article {
  id: string;
  slug: string;
  title: string;
  author: {
    name: string;
    email: string;
    affiliation: string;
    orcid: string;
  };
  publishedDate: string;
  content: {
    abstract: string;
    body: string | null;
    pdfUrl: string;
    supplementaryFiles: string[];
  };
  journal: {
    id: string;
    slug: string;
    volume: string;
    issue: string;
    pageNumbers: string;
  };
  metadata: {
    category: 'research' | 'commentary' | 'case-study' | 'review';
    tags: string[];
    featured: boolean;
    readingTime: number;
    wordCount: number;
    doi: string;
  };
  seo: {
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
  status: 'published' | 'draft' | 'archived';
  views: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleFilters {
  journalId?: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface JournalStats {
  totalArticles: number;
  featuredArticles: number;
  latestArticle: Article | null;
  categories: string[];
  averageReadingTime: number;
}

export class ArticleService {
  private static instance: ArticleService;
  private articles: Article[] = [];
  private loaded = false;

  private constructor() {}

  static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  async initialize(): Promise<void> {
    if (this.loaded) return;

    try {
      // Load articles from content directory
      const response = await fetch('/content/articles/index.json');
      if (!response.ok) {
        throw new Error(`Failed to load articles: ${response.status}`);
      }
      
      this.articles = await response.json();
      this.loaded = true;
      
      console.log(`✅ Loaded ${this.articles.length} articles`);
    } catch (error) {
      console.error('❌ Failed to load articles:', error);
      throw new Error('Article service initialization failed');
    }
  }

  private async ensureLoaded(): Promise<void> {
    if (!this.loaded) {
      await this.initialize();
    }
  }

  // Get all articles across all journals
  async getAllArticles(filters?: ArticleFilters): Promise<Article[]> {
    await this.ensureLoaded();
    return this.filterArticles(this.articles, filters);
  }

  // Get articles for specific journal
  async getJournalArticles(journalId: string, filters?: ArticleFilters): Promise<Article[]> {
    const allArticles = await this.getAllArticles(filters);
    return allArticles.filter(article => article.journal.id === journalId);
  }

  // Get article by slug (works across all journals)
  async getArticle(slug: string): Promise<Article | null> {
    const articles = await this.getAllArticles();
    return articles.find(article => article.slug === slug) || null;
  }

  // Get article by ID
  async getArticleById(id: string): Promise<Article | null> {
    const articles = await this.getAllArticles();
    return articles.find(article => article.id === id) || null;
  }

  // Get articles by category across all journals
  async getArticlesByCategory(category: string, journalId?: string): Promise<Article[]> {
    const articles = await this.getAllArticles();
    let filtered = articles.filter(article => 
      article.metadata.category === category
    );
    
    if (journalId) {
      filtered = filtered.filter(article => article.journal.id === journalId);
    }
    
    return filtered;
  }

  // Get featured articles across all journals
  async getFeaturedArticles(limit?: number): Promise<Article[]> {
    const articles = await this.getAllArticles();
    const featured = articles.filter(article => article.metadata.featured);
    return limit ? featured.slice(0, limit) : featured;
  }

  // Get latest articles across all journals
  async getLatestArticles(limit: number = 10): Promise<Article[]> {
    const articles = await this.getAllArticles();
    return articles
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, limit);
  }

  // Search articles across all journals
  async searchArticles(query: string, journalId?: string): Promise<Article[]> {
    const articles = await this.getAllArticles();
    let filtered = articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.abstract.toLowerCase().includes(query.toLowerCase()) ||
      article.metadata.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    if (journalId) {
      filtered = filtered.filter(article => article.journal.id === journalId);
    }
    
    return filtered;
  }

  // Get journal statistics
  async getJournalStats(journalId: string): Promise<JournalStats> {
    const articles = await this.getJournalArticles(journalId);
    
    return {
      totalArticles: articles.length,
      featuredArticles: articles.filter(a => a.metadata.featured).length,
      latestArticle: articles.sort((a, b) => 
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      )[0] || null,
      categories: [...new Set(articles.map(a => a.metadata.category))],
      averageReadingTime: articles.reduce((sum, a) => sum + a.metadata.readingTime, 0) / articles.length || 0
    };
  }

  // Generate article URL
  getArticleUrl(article: Article): string {
    return urlFactory.getArticleUrl(article.slug);
  }

  // Generate journal-specific article URL
  getJournalArticleUrl(article: Article): string {
    return urlFactory.getJournalArticleUrl(article.journal.slug, article.slug);
  }

  // Generate PDF URL
  getPdfUrl(article: Article): string {
    return urlFactory.getArticlePdfUrl(article.slug);
  }

  // Get all unique categories
  async getCategories(): Promise<string[]> {
    const articles = await this.getAllArticles();
    return [...new Set(articles.map(a => a.metadata.category))];
  }

  // Get all unique tags
  async getTags(): Promise<string[]> {
    const articles = await this.getAllArticles();
    const allTags = articles.flatMap(a => a.metadata.tags);
    return [...new Set(allTags)];
  }

  // Get articles by date range
  async getArticlesByDateRange(startDate: string, endDate: string): Promise<Article[]> {
    const articles = await this.getAllArticles();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return articles.filter(article => {
      const articleDate = new Date(article.publishedDate);
      return articleDate >= start && articleDate <= end;
    });
  }

  // Increment view count
  async incrementViews(articleId: string): Promise<void> {
    const article = await this.getArticleById(articleId);
    if (article) {
      article.views++;
      // In a real implementation, this would update the backend
      console.log(`Views incremented for article ${articleId}: ${article.views}`);
    }
  }

  // Increment download count
  async incrementDownloads(articleId: string): Promise<void> {
    const article = await this.getArticleById(articleId);
    if (article) {
      article.downloads++;
      // In a real implementation, this would update the backend
      console.log(`Downloads incremented for article ${articleId}: ${article.downloads}`);
    }
  }

  private filterArticles(articles: Article[], filters?: ArticleFilters): Article[] {
    if (!filters) return articles;
    
    return articles.filter(article => {
      if (filters.journalId && article.journal.id !== filters.journalId) return false;
      if (filters.category && article.metadata.category !== filters.category) return false;
      if (filters.featured !== undefined && article.metadata.featured !== filters.featured) return false;
      if (filters.tags && !filters.tags.every(tag => article.metadata.tags.includes(tag))) return false;
      if (filters.dateFrom && new Date(article.publishedDate) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(article.publishedDate) > new Date(filters.dateTo)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesAbstract = article.content.abstract.toLowerCase().includes(searchLower);
        const matchesTags = article.metadata.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesTitle && !matchesAbstract && !matchesTags) return false;
      }
      
      return true;
    });
  }
}

// Export singleton instance
export const articleService = ArticleService.getInstance();
