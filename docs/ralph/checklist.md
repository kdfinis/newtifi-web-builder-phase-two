# Infrastructure Upgrade Checklist

## Phase 1: Foundation & Core Services

### Directory Structure
- [ ] Create `storage/journals/` directory
- [ ] Create `storage/shared/` directory structure
- [ ] Create `storage/assets/` directory structure
- [ ] Create `storage/archives/` directory
- [ ] Create `data/journals/` for journal metadata
- [ ] Create `data/articles/` for article metadata
- [ ] Create `data/assets/` for asset registry
- [ ] Create `data/versions/` for version tracking

### Core Services Implementation
- [ ] Create `src/lib/storage/StorageService.ts`
- [ ] Implement journal-scoped path generation
- [ ] Implement file storage operations
- [ ] Implement file retrieval operations
- [ ] Implement file listing operations
- [ ] Create `src/lib/storage/AssetRegistry.ts`
- [ ] Implement asset registration
- [ ] Implement asset lookup
- [ ] Implement usage tracking
- [ ] Create `src/lib/storage/VersionManager.ts`
- [ ] Implement version creation
- [ ] Implement version listing
- [ ] Implement current version tracking
- [ ] Implement symlink management for "current"
- [ ] Create `src/lib/journals/JournalStorage.ts`
- [ ] Implement journal-scoped storage operations
- [ ] Create `src/lib/assets/AssetManager.ts`
- [ ] Implement asset lifecycle management

### Migration
- [ ] Create `scripts/migrate-to-new-structure.js`
- [ ] Implement file scanning from old structure
- [ ] Implement journal identification logic
- [ ] Implement file migration to new structure
- [ ] Implement version entry creation
- [ ] Implement checksum generation
- [ ] Implement metadata migration
- [ ] Test migration on copy of data
- [ ] Run migration on actual data
- [ ] Verify all files migrated correctly

### Backend Updates
- [ ] Update `simple-admin-server.js` file serving
- [ ] Add new storage API endpoints
- [ ] Add version management endpoints
- [ ] Add asset registry endpoints
- [ ] Update article endpoints to use new paths
- [ ] Add journal-scoped endpoints
- [ ] Update file upload handling
- [ ] Add version creation on upload
- [ ] Test all backend endpoints

### Frontend Updates
- [ ] Update article loading to use new paths
- [ ] Update asset references
- [ ] Update file URLs in components
- [ ] Add version selection UI (if needed)
- [ ] Update journal navigation
- [ ] Test all frontend functionality

### Testing & Verification
- [ ] Test file upload creates new version
- [ ] Test file retrieval works
- [ ] Test version listing works
- [ ] Test journal isolation
- [ ] Test asset reuse
- [ ] Test all existing functionality
- [ ] Verify no broken links
- [ ] Verify no 404 errors
- [ ] Performance testing
- [ ] Test migration rollback if needed

### Documentation
- [ ] Document new storage structure
- [ ] Document API endpoints
- [ ] Document migration process
- [ ] Update README with new structure
- [ ] Create developer guide

## Phase 2: Enhanced Features (Future)

### Metadata System
- [ ] Enhanced metadata schema
- [ ] Metadata extraction from files
- [ ] Metadata API endpoints
- [ ] Metadata editor UI

### File Processing
- [ ] PDF processing pipeline
- [ ] Image optimization
- [ ] Thumbnail generation
- [ ] File validation

### Search & Discovery
- [ ] Full-text search
- [ ] Metadata search
- [ ] Asset discovery
- [ ] Search UI

### Standards Compliance
- [ ] JATS XML support
- [ ] OAI-PMH endpoint
- [ ] DOI integration
- [ ] Dublin Core metadata
