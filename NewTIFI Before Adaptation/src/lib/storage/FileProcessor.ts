/**
 * FileProcessor - Process uploaded files, extract metadata, generate derivatives
 * Handles PDF processing, image optimization, thumbnail generation
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import type { FileMetadata } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ProcessingResult {
  success: boolean;
  metadata?: FileMetadata;
  thumbnailPath?: string;
  extractedText?: string;
  error?: string;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modificationDate?: string;
  pageCount?: number;
}

export class FileProcessor {
  private static instance: FileProcessor;

  private constructor() {}

  static getInstance(): FileProcessor {
    if (!FileProcessor.instance) {
      FileProcessor.instance = new FileProcessor();
    }
    return FileProcessor.instance;
  }

  /**
   * Process a PDF file
   */
  async processPDF(filePath: string): Promise<ProcessingResult> {
    try {
      // Get file stats
      const stats = fs.statSync(filePath);
      const ext = filePath.split('.').pop()?.toLowerCase() || 'pdf';
      
      // Generate checksum
      const checksum = await this.generateChecksum(filePath);

      // Extract basic metadata (simplified - in production, use pdf-lib or pdf-parse)
      const metadata: FileMetadata = {
        filename: filePath.split('/').pop() || 'file.pdf',
        originalName: filePath.split('/').pop() || 'file.pdf',
        mimeType: 'application/pdf',
        size: stats.size,
        checksum: `sha256:${checksum}`,
        uploadedAt: stats.mtime.toISOString(),
      };

      // Try to extract PDF metadata (basic implementation)
      const pdfMetadata = await this.extractPDFMetadata(filePath);

      return {
        success: true,
        metadata: {
          ...metadata,
          ...pdfMetadata,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Extract metadata from PDF (simplified - would use pdf-lib or pdf-parse in production)
   */
  private async extractPDFMetadata(filePath: string): Promise<Partial<PDFMetadata>> {
    // Basic implementation - in production, use a proper PDF library
    // For now, return basic info
    try {
      // Read first few KB to check if it's a valid PDF
      const buffer = fs.readFileSync(filePath, { start: 0, end: 1024 });
      const header = buffer.toString('utf-8', 0, 8);
      
      if (!header.startsWith('%PDF')) {
        throw new Error('Invalid PDF file');
      }

      // Extract basic info from PDF structure (simplified)
      // In production, use pdf-lib or pdf-parse to extract full metadata
      return {
        pageCount: await this.estimatePageCount(filePath),
      };
    } catch (error) {
      return {};
    }
  }

  /**
   * Estimate page count (simplified - counts /Page objects)
   */
  private async estimatePageCount(filePath: string): Promise<number | undefined> {
    try {
      // Read file in chunks and count /Page occurrences
      const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
      let pageCount = 0;
      let buffer = '';

      return new Promise((resolve) => {
        stream.on('data', (chunk) => {
          buffer += chunk;
          const matches = buffer.match(/\/Page\b/g);
          if (matches) {
            pageCount = Math.max(pageCount, matches.length);
          }
          // Limit reading to first 1MB for performance
          if (buffer.length > 1024 * 1024) {
            stream.destroy();
            resolve(pageCount || undefined);
          }
        });

        stream.on('end', () => {
          resolve(pageCount || undefined);
        });

        stream.on('error', () => {
          resolve(undefined);
        });
      });
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Process an image file
   */
  async processImage(filePath: string): Promise<ProcessingResult> {
    try {
      const stats = fs.statSync(filePath);
      const ext = filePath.split('.').pop()?.toLowerCase() || '';
      const checksum = await this.generateChecksum(filePath);

      const metadata: FileMetadata = {
        filename: filePath.split('/').pop() || 'image',
        originalName: filePath.split('/').pop() || 'image',
        mimeType: this.getImageMimeType(ext),
        size: stats.size,
        checksum: `sha256:${checksum}`,
        uploadedAt: stats.mtime.toISOString(),
      };

      // Generate thumbnail (simplified - in production, use sharp or imagemagick)
      const thumbnailPath = await this.generateThumbnail(filePath);

      return {
        success: true,
        metadata,
        thumbnailPath,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate thumbnail for image (simplified - placeholder)
   */
  private async generateThumbnail(filePath: string): Promise<string | undefined> {
    // In production, use sharp or imagemagick to generate actual thumbnails
    // For now, return undefined (thumbnail generation deferred)
    return undefined;
  }

  /**
   * Extract metadata from any file
   */
  async extractMetadata(filePath: string): Promise<FileMetadata> {
    const stats = fs.statSync(filePath);
    const ext = filePath.split('.').pop()?.toLowerCase() || '';
    const checksum = await this.generateChecksum(filePath);

    return {
      filename: filePath.split('/').pop() || 'file',
      originalName: filePath.split('/').pop() || 'file',
      mimeType: this.getMimeType(ext),
      size: stats.size,
      checksum: `sha256:${checksum}`,
      uploadedAt: stats.mtime.toISOString(),
    };
  }

  /**
   * Validate file
   */
  async validateFile(filePath: string, allowedTypes: string[] = []): Promise<{ valid: boolean; error?: string }> {
    try {
      if (!fs.existsSync(filePath)) {
        return { valid: false, error: 'File does not exist' };
      }

      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        return { valid: false, error: 'Path is not a file' };
      }

      // Check file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (stats.size > maxSize) {
        return { valid: false, error: 'File too large (max 50MB)' };
      }

      // Check file type
      if (allowedTypes.length > 0) {
        const ext = filePath.split('.').pop()?.toLowerCase() || '';
        if (!allowedTypes.includes(ext)) {
          return { valid: false, error: `File type .${ext} not allowed` };
        }
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Validation failed' };
    }
  }

  /**
   * Generate checksum
   */
  private async generateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);
      
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Get MIME type from extension
   */
  private getMimeType(ext: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
      csv: 'text/csv',
      json: 'application/json',
      xml: 'application/xml',
    };
    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
  }

  /**
   * Get image MIME type
   */
  private getImageMimeType(ext: string): string {
    const imageTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
    };
    return imageTypes[ext.toLowerCase()] || 'image/jpeg';
  }
}

export const fileProcessor = FileProcessor.getInstance();
