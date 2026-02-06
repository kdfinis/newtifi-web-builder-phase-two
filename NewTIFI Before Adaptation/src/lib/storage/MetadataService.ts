/**
 * MetadataService - Enhanced metadata management for academic publishing
 * Supports rich metadata, standards compliance (JATS, Dublin Core, OAI-PMH)
 */

import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import type { FileMetadata } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_ROOT = join(__dirname, '../../../data');

export interface ArticleMetadata {
  // Core identification
  id: string;
  journalId: string;
  version: string;
  
  // Content
  title: string;
  abstract: string;
  authors: Author[];
  keywords: string[];
  doi?: string;
  
  // Publication
  status: 'draft' | 'submitted' | 'review' | 'accepted' | 'published' | 'archived';
  publishedDate?: string;
  submittedDate?: string;
  acceptedDate?: string;
  issue?: IssueReference;
  
  // Files
  files: {
    main: FileReference;
    supplementary?: FileReference[];
    figures?: FileReference[];
    datasets?: FileReference[];
  };
  
  // Versioning
  versionHistory: VersionEntry[];
  currentVersion: string;
  
  // Relationships
  relatedArticles?: string[];
  sharedAssets?: string[];
  citations?: Citation[];
  
  // Academic metadata
  subjectAreas?: string[];
  researchMethods?: string[];
  peerReviewed?: boolean;
  reviewStatus?: string;
  license?: string;
  rights?: string;
  
  // SEO & Discovery
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface Author {
  name: string;
  affiliation?: string;
  email?: string;
  orcid?: string;
  order: number;
  corresponding?: boolean;
}

export interface IssueReference {
  journalId: string;
  volume: string;
  issue: string;
  year: number;
}

export interface FileReference {
  path: string;
  url: string;
  type: string;
  size: number;
  mimeType: string;
  checksum: string;
}

export interface VersionEntry {
  version: string;
  createdAt: string;
  createdBy?: string;
  reason?: string;
  changes?: string;
  isCurrent: boolean;
}

export interface Citation {
  type: 'article' | 'book' | 'website' | 'other';
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  doi?: string;
  url?: string;
}

export class MetadataService {
  private static instance: MetadataService;

  private constructor() {
    this.ensureDirectories();
  }

  static getInstance(): MetadataService {
    if (!MetadataService.instance) {
      MetadataService.instance = new MetadataService();
    }
    return MetadataService.instance;
  }

  private ensureDirectories(): void {
    const dirs = [
      join(DATA_ROOT, 'articles'),
      join(DATA_ROOT, 'metadata'),
    ];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Get metadata file path for an article
   */
  private getMetadataPath(journalId: string, articleId: string): string {
    return join(DATA_ROOT, 'articles', journalId, `${articleId}.json`);
  }

  /**
   * Load article metadata
   */
  async loadMetadata(journalId: string, articleId: string): Promise<ArticleMetadata | null> {
    try {
      const metadataPath = this.getMetadataPath(journalId, articleId);
      if (!fs.existsSync(metadataPath)) {
        return null;
      }

      const data = fs.readFileSync(metadataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Save article metadata
   */
  async saveMetadata(metadata: ArticleMetadata): Promise<void> {
    try {
      const metadataPath = this.getMetadataPath(metadata.journalId, metadata.id);
      const dir = dirname(metadataPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    } catch (error) {
      throw new Error(`Failed to save metadata: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update metadata fields
   */
  async updateMetadata(
    journalId: string,
    articleId: string,
    updates: Partial<ArticleMetadata>
  ): Promise<ArticleMetadata> {
    const existing = await this.loadMetadata(journalId, articleId);
    if (!existing) {
      throw new Error(`Article ${articleId} not found`);
    }

    const updated = { ...existing, ...updates, lastUpdated: new Date().toISOString() };
    await this.saveMetadata(updated);
    return updated;
  }

  /**
   * Generate JATS XML for an article
   */
  generateJATS(metadata: ArticleMetadata): string {
    const authors = metadata.authors.map(author => `
    <contrib contrib-type="author">
      <name>
        <surname>${this.escapeXml(author.name.split(' ').slice(-1)[0])}</surname>
        <given-names>${this.escapeXml(author.name.split(' ').slice(0, -1).join(' '))}</given-names>
      </name>
      ${author.affiliation ? `<aff>${this.escapeXml(author.affiliation)}</aff>` : ''}
      ${author.email ? `<email>${this.escapeXml(author.email)}</email>` : ''}
      ${author.orcid ? `<contrib-id contrib-id-type="orcid">${this.escapeXml(author.orcid)}</contrib-id>` : ''}
    </contrib>`).join('\n');

    const keywords = metadata.keywords.map(kw => 
      `<kwd>${this.escapeXml(kw)}</kwd>`
    ).join('\n      ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Publishing DTD v1.2 20190208//EN" "https://jats.nlm.nih.gov/publishing/1.2/JATS-journalpublishing1.dtd">
<article xmlns:xlink="http://www.w3.org/1999/xlink" article-type="research-article">
  <front>
    <article-meta>
      <article-id pub-id-type="doi">${metadata.doi || ''}</article-id>
      <article-id pub-id-type="publisher-id">${metadata.id}</article-id>
      <title-group>
        <article-title>${this.escapeXml(metadata.title)}</article-title>
      </title-group>
      <contrib-group>
${authors}
      </contrib-group>
      <pub-date pub-type="pub">
        <year>${metadata.publishedDate ? new Date(metadata.publishedDate).getFullYear() : ''}</year>
        <month>${metadata.publishedDate ? new Date(metadata.publishedDate).getMonth() + 1 : ''}</month>
        <day>${metadata.publishedDate ? new Date(metadata.publishedDate).getDate() : ''}</day>
      </pub-date>
      <abstract>
        <p>${this.escapeXml(metadata.abstract)}</p>
      </abstract>
      <kwd-group kwd-group-type="author">
        ${keywords}
      </kwd-group>
    </article-meta>
  </front>
  <body>
    <!-- Article body content would go here -->
  </body>
</article>`;
  }

  /**
   * Generate Dublin Core metadata
   */
  generateDublinCore(metadata: ArticleMetadata): Record<string, string | string[]> {
    return {
      'dc:title': metadata.title,
      'dc:creator': metadata.authors.map(a => a.name),
      'dc:subject': metadata.keywords,
      'dc:description': metadata.abstract,
      'dc:publisher': 'New Technologies & Investment Funds Institute',
      'dc:date': metadata.publishedDate || '',
      'dc:type': 'Text',
      'dc:format': 'application/pdf',
      'dc:identifier': metadata.doi || metadata.id,
      'dc:language': 'en',
      'dc:rights': metadata.rights || metadata.license || '',
    };
  }

  /**
   * Generate OAI-PMH metadata record
   */
  generateOAIRecord(metadata: ArticleMetadata): any {
    return {
      header: {
        identifier: `oai:newtifi.com:${metadata.id}`,
        datestamp: metadata.publishedDate || new Date().toISOString(),
        setSpec: metadata.journalId,
      },
      metadata: {
        'oai_dc:dc': {
          '@xmlns:oai_dc': 'http://www.openarchives.org/OAI/2.0/oai_dc/',
          '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
          ...this.generateDublinCore(metadata),
        },
      },
    };
  }

  /**
   * Extract metadata from existing article data
   */
  async enrichFromExisting(journalId: string, articleId: string, existingData: any): Promise<ArticleMetadata> {
    const existing = await this.loadMetadata(journalId, articleId);
    
    const metadata: ArticleMetadata = existing || {
      id: articleId,
      journalId,
      version: 'v1',
      title: existingData.title || '',
      abstract: existingData.abstract || '',
      authors: this.parseAuthors(existingData.author || existingData.authors),
      keywords: existingData.keywords || [],
      doi: existingData.doi,
      status: existingData.status || 'published',
      publishedDate: existingData.date || existingData.publishedDate,
      files: {
        main: {
          path: existingData.pdfUrl || existingData.url || '',
          url: existingData.pdfUrl || existingData.url || '',
          type: 'pdf',
          size: 0,
          mimeType: 'application/pdf',
          checksum: '',
        },
      },
      versionHistory: [],
      currentVersion: 'v1',
    };

    // Enrich with additional data
    if (existingData.journal) {
      metadata.journalId = this.getJournalIdFromName(existingData.journal);
    }

    return metadata;
  }

  /**
   * Parse authors from string or array
   */
  private parseAuthors(authorData: string | string[] | Author[]): Author[] {
    if (Array.isArray(authorData)) {
      if (authorData.length > 0 && typeof authorData[0] === 'object') {
        return authorData as Author[];
      }
      return authorData.map((name, index) => ({
        name: String(name),
        order: index + 1,
        corresponding: index === 0,
      }));
    }
    
    if (typeof authorData === 'string') {
      return [{
        name: authorData,
        order: 1,
        corresponding: true,
      }];
    }

    return [];
  }

  /**
   * Get journal ID from journal name
   */
  private getJournalIdFromName(journalName: string): string {
    const journalMap: Record<string, string> = {
      'NewTiFi Investment Management Journal': 'investment-management',
      'Investment Management Journal': 'investment-management',
      'FinTech Innovation Journal': 'fintech-innovation',
    };
    return journalMap[journalName] || 'investment-management';
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(str: string): string {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

export const metadataService = MetadataService.getInstance();
