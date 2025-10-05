// LMS Article Service - Additional to existing article system
import { LMSArticle, ArticleStatus, Author } from './types';

class LMSArticleService {
  private static instance: LMSArticleService;
  private articles: LMSArticle[] = [];
  private localStorageKey = 'newtifi_lms_articles';

  private constructor() {
    this.loadArticles();
  }

  public static getInstance(): LMSArticleService {
    if (!LMSArticleService.instance) {
      LMSArticleService.instance = new LMSArticleService();
    }
    return LMSArticleService.instance;
  }

  private loadArticles(): void {
    try {
      const data = localStorage.getItem(this.localStorageKey);
      if (data) {
        this.articles = JSON.parse(data);
      } else {
        // Initialize with some mock data
        this.articles = this.generateMockArticles();
        this.saveArticles();
      }
    } catch (error) {
      console.error('Failed to load LMS articles from localStorage:', error);
      this.articles = this.generateMockArticles();
    }
  }

  private saveArticles(): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.articles));
    } catch (error) {
      console.error('Failed to save LMS articles to localStorage:', error);
    }
  }

  private generateMockArticles(): LMSArticle[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'lms-article-1',
        title: 'The Future of AI in Investment Management',
        slug: 'future-ai-investment-management',
        abstract: 'An in-depth look at how artificial intelligence is transforming the investment landscape...',
        keywords: ['AI', 'Investment', 'FinTech'],
        authors: [{ id: 'prof1', name: 'Dr. Alice Smith', email: 'alice.smith@example.com', isCorresponding: true }],
        journalId: 'investment-management',
        status: ArticleStatus.PUBLISHED,
        submissionDate: '2023-01-15T10:00:00Z',
        publishedDate: '2023-03-01T12:00:00Z',
        lastModifiedDate: now,
        content: {
          pdfUrl: '/assets/sample-article.pdf',
          thumbnailUrl: '/images/tech/fin-tech.jpg',
          fullText: 'This is the full text content of the article about AI in investment management...'
        },
        metadata: {
          category: 'FinTech',
          readingTime: 20,
          featured: true,
          tags: ['AI', 'Machine Learning', 'Finance'],
          views: 1200,
          downloads: 350,
          citations: 15,
          socialShares: { twitter: 50, linkedin: 120 },
        },
      },
    ];
  }

  public getAllArticles(): LMSArticle[] {
    return [...this.articles];
  }

  public getArticleById(id: string): LMSArticle | undefined {
    return this.articles.find(article => article.id === id);
  }

  public getArticleBySlug(slug: string): LMSArticle | undefined {
    return this.articles.find(article => article.slug === slug);
  }

  public getArticlesByAuthor(authorId: string): LMSArticle[] {
    return this.articles.filter(article =>
      article.authors.some(author => author.id === authorId)
    );
  }

  public submitArticle(newArticle: Omit<LMSArticle, 'id' | 'submissionDate' | 'lastModifiedDate' | 'status' | 'metadata'>, authorId: string): LMSArticle {
    const now = new Date().toISOString();
    const article: LMSArticle = {
      ...newArticle,
      id: `lms-article-${Date.now()}`,
      status: ArticleStatus.SUBMITTED,
      submissionDate: now,
      lastModifiedDate: now,
      metadata: {
        category: newArticle.metadata.category,
        readingTime: newArticle.metadata.readingTime || 0,
        featured: false,
        tags: newArticle.metadata.tags || [],
        views: 0,
        downloads: 0,
        citations: 0,
        socialShares: { twitter: 0, linkedin: 0 },
      },
    };
    this.articles.push(article);
    this.saveArticles();
    return article;
  }

  public updateArticle(updatedArticle: LMSArticle): LMSArticle | undefined {
    const index = this.articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = { ...updatedArticle, lastModifiedDate: new Date().toISOString() };
      this.saveArticles();
      return this.articles[index];
    }
    return undefined;
  }

  public deleteArticle(id: string): boolean {
    const initialLength = this.articles.length;
    this.articles = this.articles.filter(article => article.id !== id);
    this.saveArticles();
    return this.articles.length < initialLength;
  }
}

export const lmsArticleService = LMSArticleService.getInstance();
