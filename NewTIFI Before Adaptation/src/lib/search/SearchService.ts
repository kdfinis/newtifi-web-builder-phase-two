/**
 * SearchService - Full-text and metadata search for articles and assets
 * Supports search across articles, metadata, and content
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import type { ArticleMetadata } from '../storage/MetadataService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_ROOT = join(__dirname, '../../../data');

export interface SearchQuery {
  q: string;
  journalId?: string;
  author?: string;
  keyword?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  article: ArticleMetadata;
  score: number;
  highlights?: string[];
  matchedFields?: string[];
}

export class SearchService {
  private static instance: SearchService;
  private index: Map<string, ArticleMetadata> = new Map();

  private constructor() {
    this.loadIndex();
  }

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  /**
   * Load search index from metadata files
   */
  private loadIndex(): void {
    try {
      const articlesDir = join(DATA_ROOT, 'articles');
      if (!fs.existsSync(articlesDir)) {
        return;
      }

      // Scan all journal directories
      const journals = fs.readdirSync(articlesDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      journals.forEach(journalId => {
        const journalDir = join(articlesDir, journalId);
        const files = fs.readdirSync(journalDir)
          .filter(f => f.endsWith('.json'));

        files.forEach(file => {
          try {
            const filePath = join(journalDir, file);
            const data = fs.readFileSync(filePath, 'utf-8');
            const metadata: ArticleMetadata = JSON.parse(data);
            this.index.set(`${metadata.journalId}:${metadata.id}`, metadata);
          } catch (error) {
            // Skip invalid files
          }
        });
      });
    } catch (error) {
      // Index loading failed, will rebuild on first search
    }
  }

  /**
   * Rebuild search index
   */
  async rebuildIndex(): Promise<void> {
    this.index.clear();
    this.loadIndex();
  }

  /**
   * Search articles
   */
  async search(query: SearchQuery): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const searchTerms = query.q.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    if (searchTerms.length === 0) {
      return results;
    }

    // Search through all indexed articles
    for (const [key, article] of this.index.entries()) {
      // Apply filters
      if (query.journalId && article.journalId !== query.journalId) {
        continue;
      }

      if (query.author) {
        const authorMatch = article.authors.some(a => 
          a.name.toLowerCase().includes(query.author!.toLowerCase())
        );
        if (!authorMatch) continue;
      }

      if (query.keyword) {
        const keywordMatch = article.keywords.some(k => 
          k.toLowerCase().includes(query.keyword!.toLowerCase())
        );
        if (!keywordMatch) continue;
      }

      if (query.status && article.status !== query.status) {
        continue;
      }

      if (query.dateFrom && article.publishedDate && article.publishedDate < query.dateFrom) {
        continue;
      }

      if (query.dateTo && article.publishedDate && article.publishedDate > query.dateTo) {
        continue;
      }

      // Calculate relevance score
      const score = this.calculateScore(article, searchTerms);
      if (score > 0) {
        const highlights = this.extractHighlights(article, searchTerms);
        const matchedFields = this.getMatchedFields(article, searchTerms);

        results.push({
          article,
          score,
          highlights,
          matchedFields,
        });
      }
    }

    // Sort by score (descending)
    results.sort((a, b) => b.score - a.score);

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    return results.slice(offset, offset + limit);
  }

  /**
   * Calculate relevance score for an article
   */
  private calculateScore(article: ArticleMetadata, searchTerms: string[]): number {
    let score = 0;
    const text = this.getSearchableText(article).toLowerCase();

    searchTerms.forEach(term => {
      // Title matches (highest weight)
      if (article.title.toLowerCase().includes(term)) {
        score += 10;
      }

      // Abstract matches (high weight)
      if (article.abstract.toLowerCase().includes(term)) {
        score += 5;
      }

      // Keyword matches (medium weight)
      if (article.keywords.some(k => k.toLowerCase().includes(term))) {
        score += 3;
      }

      // Author matches (medium weight)
      if (article.authors.some(a => a.name.toLowerCase().includes(term))) {
        score += 3;
      }

      // Full text matches (lower weight)
      if (text.includes(term)) {
        score += 1;
      }
    });

    return score;
  }

  /**
   * Get searchable text from article
   */
  private getSearchableText(article: ArticleMetadata): string {
    const parts = [
      article.title,
      article.abstract,
      article.keywords.join(' '),
      article.authors.map(a => a.name).join(' '),
    ];
    return parts.join(' ');
  }

  /**
   * Extract highlights from article
   */
  private extractHighlights(article: ArticleMetadata, searchTerms: string[]): string[] {
    const highlights: string[] = [];
    const abstract = article.abstract.toLowerCase();
    const title = article.title.toLowerCase();

    searchTerms.forEach(term => {
      // Find context around matches in abstract
      const abstractIndex = abstract.indexOf(term);
      if (abstractIndex !== -1) {
        const start = Math.max(0, abstractIndex - 50);
        const end = Math.min(abstract.length, abstractIndex + term.length + 50);
        highlights.push(article.abstract.substring(start, end));
      }

      // Check title
      if (title.includes(term)) {
        highlights.push(article.title);
      }
    });

    return highlights.slice(0, 3); // Limit to 3 highlights
  }

  /**
   * Get matched fields
   */
  private getMatchedFields(article: ArticleMetadata, searchTerms: string[]): string[] {
    const fields: string[] = [];
    const titleLower = article.title.toLowerCase();
    const abstractLower = article.abstract.toLowerCase();

    searchTerms.forEach(term => {
      if (titleLower.includes(term) && !fields.includes('title')) {
        fields.push('title');
      }
      if (abstractLower.includes(term) && !fields.includes('abstract')) {
        fields.push('abstract');
      }
      if (article.keywords.some(k => k.toLowerCase().includes(term)) && !fields.includes('keywords')) {
        fields.push('keywords');
      }
      if (article.authors.some(a => a.name.toLowerCase().includes(term)) && !fields.includes('authors')) {
        fields.push('authors');
      }
    });

    return fields;
  }

  /**
   * Search by DOI
   */
  async searchByDOI(doi: string): Promise<ArticleMetadata | null> {
    for (const article of this.index.values()) {
      if (article.doi === doi) {
        return article;
      }
    }
    return null;
  }

  /**
   * Search by author
   */
  async searchByAuthor(authorName: string): Promise<ArticleMetadata[]> {
    const results: ArticleMetadata[] = [];
    const nameLower = authorName.toLowerCase();

    for (const article of this.index.values()) {
      if (article.authors.some(a => a.name.toLowerCase().includes(nameLower))) {
        results.push(article);
      }
    }

    return results;
  }

  /**
   * Get article suggestions based on keywords
   */
  async getSuggestions(articleId: string, limit: number = 5): Promise<ArticleMetadata[]> {
    const article = Array.from(this.index.values()).find(a => a.id === articleId);
    if (!article) {
      return [];
    }

    const results: ArticleMetadata[] = [];
    const articleKeywords = new Set(article.keywords.map(k => k.toLowerCase()));

    for (const candidate of this.index.values()) {
      if (candidate.id === articleId) continue;

      const candidateKeywords = new Set(candidate.keywords.map(k => k.toLowerCase()));
      const commonKeywords = Array.from(articleKeywords).filter(k => candidateKeywords.has(k));

      if (commonKeywords.length > 0) {
        results.push(candidate);
      }
    }

    // Sort by number of common keywords
    results.sort((a, b) => {
      const aKeywords = new Set(a.keywords.map(k => k.toLowerCase()));
      const bKeywords = new Set(b.keywords.map(k => k.toLowerCase()));
      const aCommon = Array.from(articleKeywords).filter(k => aKeywords.has(k)).length;
      const bCommon = Array.from(articleKeywords).filter(k => bKeywords.has(k)).length;
      return bCommon - aCommon;
    });

    return results.slice(0, limit);
  }
}

export const searchService = SearchService.getInstance();
