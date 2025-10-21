// Article Management Service

import { 
  Article, 
  ArticleFormData, 
  ArticleFilters, 
  ArticleSearchParams,
  ArticleStatus,
  ArticleType,
  Author,
  ArticleFile,
  Review,
  ReviewFormData,
  ArticleKPI
} from './types';

class ArticleService {
  private static instance: ArticleService;
  private articles: Article[] = [];

  private constructor() {
    this.initializeArticles();
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  private initializeArticles(): void {
    try {
      // Load articles from localStorage or create sample data
      const stored = localStorage.getItem('newtifi_articles');
      if (stored) {
        this.articles = JSON.parse(stored);
        console.log('✅ Articles loaded from storage:', this.articles.length);
      } else {
        this.createSampleArticles();
        console.log('✅ Sample articles created');
      }
    } catch (error) {
      console.error('❌ Error initializing articles:', error);
      this.createSampleArticles();
    }
  }

  private createSampleArticles(): void {
    const sampleArticles: Article[] = [
      {
        id: 'eltifs-compulsory-redemptions',
        title: 'Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions',
        abstract: 'This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs. Focusing on the interplay between EU law, Luxembourg product regimes, and CSSF practice, it analyses how these mechanisms enhance capital efficiency, support fund liquidity management, and ensure investor protection.',
        content: 'Full article content here...',
        authors: [
          {
            id: 'author-001',
            name: 'Ezechiel Havrenne',
            email: 'ezechiel.havrenne@newtifi.com',
            institution: 'Luxembourg School of Business',
            isCorresponding: true
          }
        ],
        status: ArticleStatus.PUBLISHED,
        type: ArticleType.RESEARCH,
        journal: 'investment-management',
        metadata: {
          keywords: ['LUXEMBOURG CLOSED-ENDED ELTIFs', 'COMPULSORY REDEMPTION', 'INVESTOR PROTECTION', 'DISTRIBUTION MECHANISMS', 'FUND LIQUIDITY MANAGEMENT'],
          subjectAreas: ['Finance', 'Regulation'],
          language: 'English',
          pageCount: 15,
          wordCount: 5000,
          references: []
        },
        files: [],
        reviews: [],
        kpis: {
          views: 1250,
          downloads: 89,
          citations: 12,
          socialShares: 45,
          reviewScore: 8.5,
          publicationTime: 30,
          lastUpdated: new Date()
        },
        createdAt: new Date('2025-06-28'),
        updatedAt: new Date('2025-06-28'),
        publishedAt: new Date('2025-06-28')
      },
      {
        id: 'bafin-portfolio-control',
        title: 'Investor Oversight or Undue Influence? Reassessing BaFin\'s Stance on AIFM Portfolio Control',
        abstract: 'This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions. While reaffirming the AIFM\'s exclusive mandate under the AIFMD, BaFin\'s strict stance on veto rights, LPAC involvement, and investor oversight diverges from more pragmatic regulatory approaches in other EU jurisdictions.',
        content: 'Full article content here...',
        authors: [
          {
            id: 'author-002',
            name: 'Ezechiel Havrenne',
            email: 'ezechiel.havrenne@newtifi.com',
            institution: 'Luxembourg School of Business',
            isCorresponding: true
          }
        ],
        status: ArticleStatus.PUBLISHED,
        type: ArticleType.RESEARCH,
        journal: 'investment-management',
        metadata: {
          keywords: ['AIFM DIRECTIVE', 'REGULATORY DIVERGENCE', 'AIFM DISCRETION', 'INVESTOR INFLUENCE', 'INVESTOR PROTECTION'],
          subjectAreas: ['Finance', 'Regulation'],
          language: 'English',
          pageCount: 12,
          wordCount: 4200,
          references: []
        },
        files: [],
        reviews: [],
        kpis: {
          views: 2100,
          downloads: 156,
          citations: 23,
          socialShares: 78,
          reviewScore: 9.2,
          publicationTime: 25,
          lastUpdated: new Date()
        },
        createdAt: new Date('2025-06-28'),
        updatedAt: new Date('2025-06-28'),
        publishedAt: new Date('2025-06-28')
      },
      {
        id: 'luxembourg-well-informed-investor',
        title: 'Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion',
        abstract: 'This article provides a comprehensive analysis of Luxembourg\'s "Well-Informed Investor" regime as applied to SICARs, SIFs, and RAIFs, tracing its legislative and regulatory evolution over the past two decades. It examines the classification criteria for eligible investors, including institutional, professional, and opt-in categories, and assesses the legal and operational implications of miscategorisation.',
        content: 'Full article content here...',
        authors: [
          {
            id: 'author-003',
            name: 'Ezechiel Havrenne',
            email: 'ezechiel.havrenne@newtifi.com',
            institution: 'Luxembourg School of Business',
            isCorresponding: true
          }
        ],
        status: ArticleStatus.PUBLISHED,
        type: ArticleType.RESEARCH,
        journal: 'investment-management',
        metadata: {
          keywords: ['SICAR', 'SIF', 'RAIF', 'WELL-INFORMED INVESTOR', 'INVESTOR CATEGORISATION', 'INSTITUTIONAL INVESTORS'],
          subjectAreas: ['Finance', 'Regulation'],
          language: 'English',
          pageCount: 18,
          wordCount: 6500,
          references: []
        },
        files: [],
        reviews: [],
        kpis: {
          views: 1800,
          downloads: 134,
          citations: 18,
          socialShares: 62,
          reviewScore: 8.8,
          publicationTime: 28,
          lastUpdated: new Date()
        },
        createdAt: new Date('2025-06-28'),
        updatedAt: new Date('2025-06-28'),
        publishedAt: new Date('2025-06-28')
      }
    ];

    this.articles = sampleArticles;
    this.saveArticles();
  }

  async createArticle(formData: ArticleFormData, userId: string): Promise<Article> {
    try {
      console.log('📝 Creating new article:', formData.title);
      
      const newArticle: Article = {
        id: `article-${Date.now()}`,
        title: formData.title,
        abstract: formData.abstract,
        content: formData.content,
        authors: formData.authors,
        status: ArticleStatus.DRAFT,
        type: formData.type,
        journal: formData.journal,
        metadata: {
          keywords: formData.keywords,
          subjectAreas: [],
          language: 'English',
          pageCount: 0,
          wordCount: formData.content.length,
          references: []
        },
        files: formData.files,
        reviews: [],
        kpis: {
          views: 0,
          downloads: 0,
          citations: 0,
          socialShares: 0,
          reviewScore: 0,
          publicationTime: 0,
          lastUpdated: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.articles.push(newArticle);
      this.saveArticles();
      
      console.log('✅ Article created successfully:', newArticle.id);
      return newArticle;
    } catch (error) {
      console.error('❌ Error creating article:', error);
      throw new Error('Failed to create article');
    }
  }

  async updateArticle(articleId: string, updates: Partial<Article>): Promise<Article> {
    try {
      console.log('📝 Updating article:', articleId);
      
      const articleIndex = this.articles.findIndex(a => a.id === articleId);
      if (articleIndex === -1) {
        throw new Error('Article not found');
      }

      this.articles[articleIndex] = {
        ...this.articles[articleIndex],
        ...updates,
        updatedAt: new Date()
      };

      this.saveArticles();
      
      console.log('✅ Article updated successfully:', articleId);
      return this.articles[articleIndex];
    } catch (error) {
      console.error('❌ Error updating article:', error);
      throw new Error('Failed to update article');
    }
  }

  async deleteArticle(articleId: string): Promise<void> {
    try {
      console.log('🗑️ Deleting article:', articleId);
      
      const articleIndex = this.articles.findIndex(a => a.id === articleId);
      if (articleIndex === -1) {
        throw new Error('Article not found');
      }

      this.articles.splice(articleIndex, 1);
      this.saveArticles();
      
      console.log('✅ Article deleted successfully:', articleId);
    } catch (error) {
      console.error('❌ Error deleting article:', error);
      throw new Error('Failed to delete article');
    }
  }

  async getArticle(articleId: string): Promise<Article | null> {
    try {
      const article = this.articles.find(a => a.id === articleId);
      return article || null;
    } catch (error) {
      console.error('❌ Error getting article:', error);
      return null;
    }
  }

  async getArticles(filters?: ArticleFilters): Promise<Article[]> {
    try {
      let filteredArticles = [...this.articles];

      if (filters) {
        if (filters.status && filters.status.length > 0) {
          filteredArticles = filteredArticles.filter(a => filters.status!.includes(a.status));
        }
        if (filters.type && filters.type.length > 0) {
          filteredArticles = filteredArticles.filter(a => filters.type!.includes(a.type));
        }
        if (filters.journal && filters.journal.length > 0) {
          filteredArticles = filteredArticles.filter(a => filters.journal!.includes(a.journal));
        }
        if (filters.author) {
          filteredArticles = filteredArticles.filter(a => 
            a.authors.some(author => 
              author.name.toLowerCase().includes(filters.author!.toLowerCase())
            )
          );
        }
        if (filters.dateRange) {
          filteredArticles = filteredArticles.filter(a => 
            a.createdAt >= filters.dateRange!.start && 
            a.createdAt <= filters.dateRange!.end
          );
        }
      }

      return filteredArticles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('❌ Error getting articles:', error);
      return [];
    }
  }

  async searchArticles(params: ArticleSearchParams): Promise<{ articles: Article[]; total: number }> {
    try {
      let results = await this.getArticles(params.filters);

      if (params.query) {
        const query = params.query.toLowerCase();
        results = results.filter(article => 
          article.title.toLowerCase().includes(query) ||
          article.abstract.toLowerCase().includes(query) ||
          article.authors.some(author => author.name.toLowerCase().includes(query))
        );
      }

      // Sort results
      if (params.sortBy) {
        results.sort((a, b) => {
          let aValue: any, bValue: any;
          
          switch (params.sortBy) {
            case 'title':
              aValue = a.title;
              bValue = b.title;
              break;
            case 'createdAt':
              aValue = a.createdAt;
              bValue = b.createdAt;
              break;
            case 'publishedAt':
              aValue = a.publishedAt || new Date(0);
              bValue = b.publishedAt || new Date(0);
              break;
            case 'status':
              aValue = a.status;
              bValue = b.status;
              break;
            default:
              return 0;
          }

          if (params.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      const total = results.length;
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      results = results.slice(startIndex, endIndex);

      return { articles: results, total };
    } catch (error) {
      console.error('❌ Error searching articles:', error);
      return { articles: [], total: 0 };
    }
  }

  async submitArticle(articleId: string): Promise<Article> {
    try {
      console.log('📤 Submitting article:', articleId);
      
      const article = await this.getArticle(articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      const updatedArticle = await this.updateArticle(articleId, {
        status: ArticleStatus.SUBMITTED,
        submittedAt: new Date()
      });

      console.log('✅ Article submitted successfully:', articleId);
      return updatedArticle;
    } catch (error) {
      console.error('❌ Error submitting article:', error);
      throw new Error('Failed to submit article');
    }
  }

  async publishArticle(articleId: string): Promise<Article> {
    try {
      console.log('📢 Publishing article:', articleId);
      
      const article = await this.getArticle(articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      const updatedArticle = await this.updateArticle(articleId, {
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date()
      });

      console.log('✅ Article published successfully:', articleId);
      return updatedArticle;
    } catch (error) {
      console.error('❌ Error publishing article:', error);
      throw new Error('Failed to publish article');
    }
  }

  async addReview(articleId: string, reviewData: ReviewFormData, reviewerId: string, reviewerName: string): Promise<Review> {
    try {
      console.log('📝 Adding review for article:', articleId);
      
      const article = await this.getArticle(articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      const newReview: Review = {
        id: `review-${Date.now()}`,
        reviewerId,
        reviewerName,
        score: reviewData.score,
        comments: reviewData.comments,
        recommendations: reviewData.recommendations,
        status: 'completed' as any,
        submittedAt: new Date(),
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        createdAt: new Date()
      };

      article.reviews.push(newReview);
      await this.updateArticle(articleId, { reviews: article.reviews });

      console.log('✅ Review added successfully:', newReview.id);
      return newReview;
    } catch (error) {
      console.error('❌ Error adding review:', error);
      throw new Error('Failed to add review');
    }
  }

  async updateArticleKPI(articleId: string, kpiUpdates: Partial<ArticleKPI>): Promise<void> {
    try {
      const article = await this.getArticle(articleId);
      if (!article) {
        throw new Error('Article not found');
      }

      const updatedKpis = {
        ...article.kpis,
        ...kpiUpdates,
        lastUpdated: new Date()
      };

      await this.updateArticle(articleId, { kpis: updatedKpis });
      console.log('✅ Article KPI updated:', articleId);
    } catch (error) {
      console.error('❌ Error updating article KPI:', error);
      throw new Error('Failed to update article KPI');
    }
  }

  private saveArticles(): void {
    try {
      localStorage.setItem('newtifi_articles', JSON.stringify(this.articles));
    } catch (error) {
      console.error('❌ Error saving articles:', error);
    }
  }
}

export const articleService = ArticleService.getInstance();
