# 🏗️ Infrastructure Upgrade Plan: Multi-Journal Academic Publishing Platform

## Executive Summary

This plan upgrades the current rudimentary file-based system to a production-ready infrastructure supporting multiple journals, proper file management, versioning, and scalable asset handling. The design prioritizes simplicity, maintainability, and compatibility with static hosting while following academic publishing best practices.

---

## Current State Analysis

### Existing Infrastructure
- **Storage**: Flat file structure in `/public/articles/` and `/public/files/`
- **Metadata**: JSON files in `/data/` directory
- **Serving**: Direct file system access via Node.js server
- **Journals**: 2 journals defined (1 active, 1 planned)
- **Articles**: 3 published articles, basic PDF serving
- **No versioning**: Files can be overwritten
- **No organization**: Files mixed in single directories
- **Limited metadata**: Basic article info only

### Pain Points
1. Files not organized by journal
2. No version control for articles
3. Difficult to manage multiple journals
4. No asset reuse across contexts
5. Manual file management required
6. No proper file naming conventions
7. Limited metadata capture
8. No search/indexing for files
9. No access control per journal
10. Difficult to track file usage

---

## Target Architecture

### Core Principles
1. **Journal-Centric Organization**: All assets organized by journal
2. **Version Control**: Track all file versions
3. **Metadata-Driven**: Rich metadata for all assets
4. **Reusable Assets**: Assets can be shared across articles/journals
5. **Scalable Structure**: Easy to add new journals
6. **Standards Compliance**: Follow academic publishing standards
7. **Hosting Compatible**: Works with static hosting + simple backend

---

## Proposed File Structure

```
/
├── storage/                          # New: Centralized storage
│   ├── journals/                    # Journal-specific assets
│   │   ├── {journal-id}/
│   │   │   ├── articles/           # Article PDFs
│   │   │   │   ├── {article-id}/
│   │   │   │   │   ├── v1/         # Versioned files
│   │   │   │   │   │   ├── article.pdf
│   │   │   │   │   │   ├── metadata.json
│   │   │   │   │   │   └── checksum.txt
│   │   │   │   │   ├── v2/
│   │   │   │   │   └── current -> v2/  # Symlink to latest
│   │   │   │   │   └── versions.json
│   │   │   ├── issues/             # Journal issues/volumes
│   │   │   │   ├── {year}/
│   │   │   │   │   ├── {volume}/
│   │   │   │   │   │   └── {issue}/
│   │   │   ├── covers/             # Journal cover images
│   │   │   ├── logos/              # Journal branding
│   │   │   └── templates/          # Journal-specific templates
│   │   ├── shared/                 # Shared across journals
│   │   │   ├── images/             # Reusable images
│   │   │   ├── figures/            # Reusable figures
│   │   │   ├── datasets/          # Shared datasets
│   │   │   └── media/             # Video, audio
│   ├── assets/                     # Global assets
│   │   ├── images/                # Site-wide images
│   │   ├── documents/             # Non-article documents
│   │   ├── templates/             # Global templates
│   │   └── submissions/           # User submissions
│   │       └── {submission-id}/
│   └── archives/                   # Archived/old versions
│       └── {journal-id}/
│           └── {year}/
│
├── data/                            # Enhanced metadata
│   ├── journals/
│   │   ├── {journal-id}.json      # Journal config
│   │   └── index.json              # Journal registry
│   ├── articles/
│   │   ├── {journal-id}/
│   │   │   └── {article-id}.json  # Article metadata
│   │   └── index.json             # Article registry
│   ├── assets/
│   │   └── registry.json           # Asset registry
│   └── versions/
│       └── {article-id}-versions.json
│
└── public/                          # Public-facing (symlinks/static)
    ├── journals/                   # Public journal assets
    │   └── {journal-id}/
    └── assets/                     # Public assets
```

---

## Component Architecture

### 1. Storage Service Layer

**Purpose**: Abstract file operations, handle versioning, provide unified API

**Key Features**:
- Journal-scoped storage paths
- Automatic versioning
- Checksum validation
- File metadata extraction
- Symlink management for "current" versions
- Archive old versions

**Implementation**:
```typescript
// src/lib/storage/StorageService.ts
class StorageService {
  // Journal-scoped paths
  getJournalPath(journalId: string): string
  getArticlePath(journalId: string, articleId: string): string
  getVersionPath(journalId: string, articleId: string, version: string): string
  
  // File operations
  storeFile(journalId: string, articleId: string, file: File, metadata: Metadata): Promise<StorageResult>
  getFile(journalId: string, articleId: string, version?: string): Promise<FileStream>
  listVersions(journalId: string, articleId: string): Promise<Version[]>
  archiveVersion(journalId: string, articleId: string, version: string): Promise<void>
  
  // Asset management
  storeSharedAsset(type: string, file: File, metadata: Metadata): Promise<AssetReference>
  linkAssetToArticle(assetId: string, journalId: string, articleId: string): Promise<void>
  getAssetUsage(assetId: string): Promise<Usage[]>
}
```

### 2. Metadata Management System

**Purpose**: Rich metadata for all assets, standards compliance

**Metadata Schema**:
```typescript
interface ArticleMetadata {
  // Core
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
  
  // Standards
  jatsXml?: string;  // JATS format for interoperability
  oaiMetadata?: OAIEntry;  // OAI-PMH support
}
```

### 3. Journal Management System

**Purpose**: Multi-journal support with isolation and shared resources

**Features**:
- Journal-specific namespaces
- Shared asset library
- Journal configuration per journal
- Editorial workflows per journal
- Statistics per journal

**Implementation**:
```typescript
// src/lib/journals/JournalManager.ts
class JournalManager {
  // Journal operations
  createJournal(config: JournalConfig): Promise<Journal>
  getJournal(journalId: string): Promise<Journal>
  listJournals(): Promise<Journal[]>
  
  // Journal-scoped operations
  getJournalArticles(journalId: string): Promise<Article[]>
  getJournalAssets(journalId: string): Promise<Asset[]>
  getJournalStats(journalId: string): Promise<JournalStats>
  
  // Shared assets
  getSharedAssets(): Promise<Asset[]>
  shareAsset(assetId: string, journalIds: string[]): Promise<void>
}
```

### 4. Asset Registry System

**Purpose**: Track all assets, their usage, and relationships

**Features**:
- Central registry of all files
- Usage tracking (which articles use which assets)
- Duplicate detection
- Asset relationships
- Search and discovery

**Implementation**:
```typescript
// src/lib/assets/AssetRegistry.ts
class AssetRegistry {
  registerAsset(asset: Asset): Promise<string>
  getAsset(assetId: string): Promise<Asset>
  findAssets(query: AssetQuery): Promise<Asset[]>
  getAssetUsage(assetId: string): Promise<Usage[]>
  linkAsset(assetId: string, context: AssetContext): Promise<void>
  detectDuplicates(file: File): Promise<Asset[]>
}
```

### 5. Version Control System

**Purpose**: Track file versions, enable rollback, maintain history

**Features**:
- Automatic versioning on upload
- Version metadata (who, when, why)
- Rollback capability
- Version comparison
- Archive old versions

**Implementation**:
```typescript
// src/lib/versioning/VersionManager.ts
class VersionManager {
  createVersion(journalId: string, articleId: string, file: File, metadata: VersionMetadata): Promise<Version>
  getVersion(journalId: string, articleId: string, version: string): Promise<Version>
  listVersions(journalId: string, articleId: string): Promise<Version[]>
  setCurrentVersion(journalId: string, articleId: string, version: string): Promise<void>
  rollback(journalId: string, articleId: string, targetVersion: string): Promise<void>
  archiveVersion(journalId: string, articleId: string, version: string): Promise<void>
}
```

### 6. File Processing Pipeline

**Purpose**: Process uploads, generate derivatives, extract metadata

**Features**:
- PDF processing (extract text, metadata)
- Image optimization (thumbnails, multiple sizes)
- File validation (type, size, integrity)
- Virus scanning (optional)
- Metadata extraction
- Checksum generation

**Implementation**:
```typescript
// src/lib/processing/FileProcessor.ts
class FileProcessor {
  processPDF(file: File): Promise<PDFMetadata>
  processImage(file: File): Promise<ImageVariants>
  extractMetadata(file: File): Promise<FileMetadata>
  validateFile(file: File): Promise<ValidationResult>
  generateChecksum(file: File): Promise<string>
  generateThumbnail(file: File): Promise<File>
}
```

### 7. URL & Routing System

**Purpose**: Clean, permanent URLs for all assets

**URL Structure**:
```
/journals/{journal-slug}/articles/{article-slug}
/journals/{journal-slug}/articles/{article-slug}/v/{version}
/journals/{journal-slug}/issues/{year}/{volume}/{issue}
/assets/{asset-id}
/files/{category}/{filename}
```

**Implementation**:
```typescript
// src/lib/urls/AssetUrlFactory.ts
class AssetUrlFactory {
  getArticleUrl(journalSlug: string, articleSlug: string, version?: string): string
  getJournalUrl(journalSlug: string): string
  getIssueUrl(journalSlug: string, year: number, volume: number, issue: number): string
  getAssetUrl(assetId: string): string
  getFileUrl(category: string, filename: string): string
}
```

---

## Implementation Phases

### Phase 1: Foundation & Structure (Week 1-2)

**Goals**: Set up new directory structure, create core services

**Tasks**:
1. Create new `storage/` directory structure
2. Implement `StorageService` with journal-scoped paths
3. Create `AssetRegistry` for tracking
4. Implement basic versioning system
5. Migrate existing files to new structure
6. Update file serving to use new paths

**Deliverables**:
- New directory structure in place
- Core storage service functional
- Existing files migrated
- Backward compatibility maintained

### Phase 2: Metadata & Standards (Week 2-3)

**Goals**: Rich metadata system, standards compliance

**Tasks**:
1. Design comprehensive metadata schema
2. Implement metadata storage (JSON + database-like structure)
3. Add JATS XML support (optional but recommended)
4. Implement metadata extraction from files
5. Create metadata API endpoints
6. Build metadata editor UI

**Deliverables**:
- Metadata schema defined
- Metadata extraction working
- API endpoints for metadata
- Admin UI for metadata editing

### Phase 3: Multi-Journal Support (Week 3-4)

**Goals**: Full multi-journal isolation and management

**Tasks**:
1. Enhance `JournalManager` with full isolation
2. Implement journal-specific asset namespaces
3. Create shared asset library
4. Build journal configuration system
5. Implement journal-scoped permissions
6. Create journal management UI

**Deliverables**:
- Multiple journals fully supported
- Journal isolation working
- Shared assets functional
- Admin UI for journal management

### Phase 4: Version Control & History (Week 4-5)

**Goals**: Complete versioning system with rollback

**Tasks**:
1. Implement full versioning system
2. Add version metadata tracking
3. Build version comparison tools
4. Implement rollback functionality
5. Create version history UI
6. Add archive management

**Deliverables**:
- Versioning fully functional
- Rollback capability
- Version history visible
- Archive system working

### Phase 5: File Processing & Optimization (Week 5-6)

**Goals**: Automated processing, optimization, derivatives

**Tasks**:
1. Implement PDF processing (text extraction, metadata)
2. Add image optimization pipeline
3. Generate thumbnails automatically
4. Implement file validation
5. Add checksum generation
6. Create processing status tracking

**Deliverables**:
- Files automatically processed
- Thumbnails generated
- Validation working
- Processing status visible

### Phase 6: Search & Discovery (Week 6-7)

**Goals**: Search functionality, asset discovery

**Tasks**:
1. Implement full-text search for articles
2. Add metadata search
3. Build asset discovery system
4. Create search API
5. Implement search UI
6. Add filters and facets

**Deliverables**:
- Search functional
- Asset discovery working
- Search UI complete
- Filters and facets available

### Phase 7: Access Control & Permissions (Week 7-8)

**Goals**: Role-based access, journal-scoped permissions

**Tasks**:
1. Implement role-based access control
2. Add journal-scoped permissions
3. Create permission management UI
4. Implement draft/private content handling
5. Add embargo support
6. Create access audit logs

**Deliverables**:
- RBAC implemented
- Journal permissions working
- Access control UI
- Audit logging functional

### Phase 8: Performance & Optimization (Week 8-9)

**Goals**: Optimize performance, caching, CDN-ready

**Tasks**:
1. Implement caching strategy
2. Add ETag support
3. Optimize file serving
4. Implement lazy loading
5. Add CDN configuration
6. Performance monitoring

**Deliverables**:
- Caching implemented
- Performance optimized
- CDN-ready
- Monitoring in place

### Phase 9: Migration & Testing (Week 9-10)

**Goals**: Complete migration, comprehensive testing

**Tasks**:
1. Migrate all existing content
2. Verify data integrity
3. Test all functionality
4. Performance testing
5. Security audit
6. Documentation

**Deliverables**:
- All content migrated
- All tests passing
- Documentation complete
- Production-ready

---

## Technical Specifications

### File Naming Conventions

**Articles**:
```
{journal-id}/{article-id}/v{version}/{timestamp}-{article-id}-v{version}.pdf
Example: investment-management/IMJ-2025-001/v1/20250628-IMJ-2025-001-v1.pdf
```

**Shared Assets**:
```
shared/{type}/{category}/{asset-id}-{checksum}.{ext}
Example: shared/images/figures/fig-001-a3f2b1c4.jpg
```

**Journal Assets**:
```
{journal-id}/{category}/{asset-id}.{ext}
Example: investment-management/covers/2025-q1-cover.jpg
```

### Metadata File Structure

**Article Metadata** (`data/articles/{journal-id}/{article-id}.json`):
```json
{
  "id": "IMJ-2025-001",
  "journalId": "investment-management",
  "title": "...",
  "versions": {
    "v1": {
      "version": "1",
      "file": "storage/journals/investment-management/articles/IMJ-2025-001/v1/article.pdf",
      "checksum": "sha256:...",
      "createdAt": "2025-06-28T10:00:00Z",
      "createdBy": "user-id",
      "metadata": {...}
    }
  },
  "currentVersion": "v1",
  "status": "published",
  ...
}
```

### API Endpoints

**Storage API**:
```
POST   /api/storage/journals/{journalId}/articles/{articleId}/upload
GET    /api/storage/journals/{journalId}/articles/{articleId}
GET    /api/storage/journals/{journalId}/articles/{articleId}/versions
GET    /api/storage/journals/{journalId}/articles/{articleId}/v/{version}
POST   /api/storage/journals/{journalId}/articles/{articleId}/rollback
POST   /api/storage/shared/assets
GET    /api/storage/assets/{assetId}
```

**Metadata API**:
```
GET    /api/metadata/articles/{journalId}/{articleId}
PUT    /api/metadata/articles/{journalId}/{articleId}
GET    /api/metadata/assets/{assetId}
PUT    /api/metadata/assets/{assetId}
GET    /api/metadata/search?q={query}&journal={journalId}
```

**Journal API**:
```
GET    /api/journals
GET    /api/journals/{journalId}
GET    /api/journals/{journalId}/articles
GET    /api/journals/{journalId}/assets
GET    /api/journals/{journalId}/stats
```

---

## Migration Strategy

### Step 1: Parallel System
- Keep existing system running
- Build new system alongside
- Migrate files gradually

### Step 2: Data Migration
1. Scan existing `/public/articles/` directory
2. Extract metadata from existing JSON files
3. Organize by journal (map to journal IDs)
4. Create version entries for existing files
5. Generate checksums for all files
6. Move files to new structure

### Step 3: URL Mapping
- Create URL mapping table for old → new URLs
- Implement redirects for old URLs
- Update all internal links

### Step 4: Cutover
- Switch serving to new system
- Verify all files accessible
- Monitor for issues
- Keep old system as backup for 30 days

---

## Standards Compliance

### JATS (Journal Article Tag Suite)
- Generate JATS XML for articles
- Support JATS import/export
- Enable interoperability

### OAI-PMH (Open Archives Initiative)
- Implement OAI-PMH endpoint
- Enable metadata harvesting
- Support external indexing

### DOI Integration
- Support DOI assignment
- Link DOIs to articles
- Enable DOI resolution

### Dublin Core Metadata
- Support Dublin Core fields
- Enable metadata export
- Support standard schemas

---

## Security & Access Control

### File Access
- Private storage (not directly web-accessible)
- Serve via API with authentication
- Role-based access control
- Journal-scoped permissions

### Upload Security
- File type validation
- Size limits
- Virus scanning (optional)
- Content validation

### Audit Logging
- Track all file operations
- Log access attempts
- Monitor changes
- Generate reports

---

## Performance Considerations

### Caching Strategy
- Cache metadata (Redis or in-memory)
- Cache file listings
- CDN for public assets
- ETags for conditional requests

### Optimization
- Lazy loading for large files
- Streaming for PDFs
- Image optimization
- Compression for text files

### Monitoring
- File access metrics
- Storage usage tracking
- Performance monitoring
- Error tracking

---

## Cost & Hosting Considerations

### Storage
- Current: ~1-2 GB (minimal cost)
- Projected: ~10-50 GB (still minimal)
- Use efficient storage (compression, archiving)

### Bandwidth
- CDN for public assets (reduces origin load)
- Caching to reduce bandwidth
- Compression to reduce transfer

### Hosting Options
1. **Static Hosting + Backend API** (Current approach)
   - GitHub Pages / Cloudflare Pages for frontend
   - Simple Node.js server for API
   - File storage on same server or external

2. **Cloud Storage** (Future upgrade)
   - AWS S3 / Google Cloud Storage
   - CloudFront / Cloudflare CDN
   - Still use simple backend API

3. **Hybrid** (Recommended)
   - Static hosting for frontend
   - Backend API on VPS/cloud
   - Files on same server (upgrade to cloud storage later)

---

## Success Metrics

### Functionality
- ✅ All files organized by journal
- ✅ Version control working
- ✅ Multi-journal support complete
- ✅ Asset reuse functional
- ✅ Search working
- ✅ Metadata comprehensive

### Performance
- File serving < 200ms
- Search results < 500ms
- Upload processing < 5s
- Page load times maintained

### Reliability
- Zero data loss
- 99.9% uptime
- All files accessible
- Backups working

---

## Next Steps

1. **Review & Approve Plan** - Confirm approach and priorities
2. **Start Phase 1** - Begin foundation work
3. **Iterative Development** - Build and test incrementally
4. **Migration Planning** - Plan data migration carefully
5. **Testing** - Comprehensive testing at each phase
6. **Documentation** - Document all systems and processes

---

## Questions to Consider

1. **Storage Location**: Keep on same server or move to cloud storage?
2. **Database**: Add database for metadata or keep JSON files?
3. **CDN**: Implement CDN now or later?
4. **Standards**: How important is JATS/OAI-PMH compliance?
5. **Versioning**: How many versions to keep? Archive policy?
6. **Access Control**: How granular should permissions be?
7. **Search**: Full-text search or metadata-only?
8. **Backup**: Backup strategy and frequency?

---

This plan provides a roadmap from the current rudimentary system to a production-ready, scalable infrastructure for multi-journal academic publishing. Each phase builds on the previous one, allowing for iterative development and testing.
