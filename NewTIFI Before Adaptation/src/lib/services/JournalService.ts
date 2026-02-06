// Journal Service - Single source of truth for all journal data
import { configManager } from '../config/ConfigManager';
import { urlFactory } from '../urls/UrlFactory';
import { articleService, Article } from './ArticleService';

export interface Journal {
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

export interface JournalWithStats extends Journal {
  stats: {
    totalArticles: number;
    featuredArticles: number;
    latestArticle: Article | null;
    categories: string[];
    averageReadingTime: number;
  };
}

export class JournalService {
  private static instance: JournalService;
  private journals: Journal[] = [];
  private loaded = false;

  private constructor() {}

  static getInstance(): JournalService {
    if (!JournalService.instance) {
      JournalService.instance = new JournalService();
    }
    return JournalService.instance;
  }

  async initialize(): Promise<void> {
    if (this.loaded) return;

    try {
      // Load journals from configuration
      const journalConfig = configManager.getJournalConfig('investment-management');
      if (journalConfig) {
        this.journals = [journalConfig];
      }
      
      // Load additional journals from config
      const allJournals = configManager.getAllJournals();
      this.journals = allJournals;
      
      this.loaded = true;
      console.log(`✅ Loaded ${this.journals.length} journals`);
    } catch (error) {
      console.error('❌ Failed to load journals:', error);
      throw new Error('Journal service initialization failed');
    }
  }

  private async ensureLoaded(): Promise<void> {
    if (!this.loaded) {
      await this.initialize();
    }
  }

  // Get all journals
  async getAllJournals(): Promise<Journal[]> {
    await this.ensureLoaded();
    return this.journals;
  }

  // Get active journals only
  async getActiveJournals(): Promise<Journal[]> {
    const journals = await this.getAllJournals();
    return journals.filter(journal => journal.status === 'active');
  }

  // Get journal by ID
  async getJournal(id: string): Promise<Journal | null> {
    const journals = await this.getAllJournals();
    return journals.find(journal => journal.id === id) || null;
  }

  // Get journal by slug
  async getJournalBySlug(slug: string): Promise<Journal | null> {
    const journals = await this.getAllJournals();
    return journals.find(journal => journal.slug === slug) || null;
  }

  // Get journal with statistics
  async getJournalWithStats(id: string): Promise<JournalWithStats | null> {
    const journal = await this.getJournal(id);
    if (!journal) return null;

    const stats = await articleService.getJournalStats(id);
    
    return {
      ...journal,
      stats
    };
  }

  // Get journal by slug with statistics
  async getJournalBySlugWithStats(slug: string): Promise<JournalWithStats | null> {
    const journal = await this.getJournalBySlug(slug);
    if (!journal) return null;

    const stats = await articleService.getJournalStats(journal.id);
    
    return {
      ...journal,
      stats
    };
  }

  // Get articles for a journal
  async getJournalArticles(journalId: string, limit?: number): Promise<Article[]> {
    const articles = await articleService.getJournalArticles(journalId);
    return limit ? articles.slice(0, limit) : articles;
  }

  // Get featured articles for a journal
  async getJournalFeaturedArticles(journalId: string, limit?: number): Promise<Article[]> {
    const articles = await articleService.getJournalArticles(journalId, { featured: true });
    return limit ? articles.slice(0, limit) : articles;
  }

  // Get latest articles for a journal
  async getJournalLatestArticles(journalId: string, limit: number = 10): Promise<Article[]> {
    const articles = await articleService.getJournalArticles(journalId);
    return articles
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, limit);
  }

  // Search articles within a journal
  async searchJournalArticles(journalId: string, query: string): Promise<Article[]> {
    return articleService.searchArticles(query, journalId);
  }

  // Get journal categories
  async getJournalCategories(journalId: string): Promise<string[]> {
    const articles = await articleService.getJournalArticles(journalId);
    return [...new Set(articles.map(a => a.metadata.category))];
  }

  // Get journal tags
  async getJournalTags(journalId: string): Promise<string[]> {
    const articles = await articleService.getJournalArticles(journalId);
    const allTags = articles.flatMap(a => a.metadata.tags);
    return [...new Set(allTags)];
  }

  // Generate journal URL
  getJournalUrl(journal: Journal): string {
    return urlFactory.getJournalUrl(journal.slug);
  }

  // Generate journal articles URL
  getJournalArticlesUrl(journal: Journal): string {
    return urlFactory.getJournalArticlesUrl(journal.slug);
  }

  // Get submission guidelines URL
  getSubmissionGuidelinesUrl(journal: Journal): string {
    return urlFactory.getFileUrl(journal.submissionGuidelines);
  }

  // Check if journal is active
  isJournalActive(journal: Journal): boolean {
    return journal.status === 'active';
  }

  // Check if journal is planned
  isJournalPlanned(journal: Journal): boolean {
    return journal.status === 'planned';
  }

  // Get journal frequency display text
  getFrequencyDisplay(frequency: Journal['frequency']): string {
    const frequencyMap = {
      'monthly': 'Monthly',
      'quarterly': 'Quarterly',
      'bi-annual': 'Bi-annual',
      'annual': 'Annual'
    };
    return frequencyMap[frequency] || frequency;
  }

  // Get peer review display text
  getPeerReviewDisplay(peerReview: Journal['peerReview']): string {
    const peerReviewMap = {
      'single-blind': 'Single-blind peer review',
      'double-blind': 'Double-blind peer review',
      'open': 'Open peer review'
    };
    return peerReviewMap[peerReview] || peerReview;
  }

  // Get journal status display text
  getStatusDisplay(status: Journal['status']): string {
    const statusMap = {
      'active': 'Active',
      'inactive': 'Inactive',
      'planned': 'Planned',
      'archived': 'Archived'
    };
    return statusMap[status] || status;
  }

  // Get editorial board members by role
  getEditorialBoardByRole(journal: Journal, role: string): EditorialBoardMember[] {
    return journal.editorialBoard.filter(member => 
      member.role.toLowerCase().includes(role.toLowerCase())
    );
  }

  // Get editor-in-chief
  getEditorInChief(journal: Journal): EditorialBoardMember | null {
    const editors = this.getEditorialBoardByRole(journal, 'editor-in-chief');
    return editors.length > 0 ? editors[0] : null;
  }

  // Get all editors
  getEditors(journal: Journal): EditorialBoardMember[] {
    return this.getEditorialBoardByRole(journal, 'editor');
  }

  // Get associate editors
  getAssociateEditors(journal: Journal): EditorialBoardMember[] {
    return this.getEditorialBoardByRole(journal, 'associate');
  }

  // Get advisory board
  getAdvisoryBoard(journal: Journal): EditorialBoardMember[] {
    return this.getEditorialBoardByRole(journal, 'advisory');
  }
}

// Export singleton instance
export const journalService = JournalService.getInstance();
