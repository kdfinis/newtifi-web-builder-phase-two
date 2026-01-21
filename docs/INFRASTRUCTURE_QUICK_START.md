# 🚀 Infrastructure Upgrade - Quick Start Guide

## Overview

This guide provides a practical, step-by-step approach to implementing the infrastructure upgrade plan. It focuses on getting a working system quickly while maintaining quality.

## Key Decisions Needed

Before starting implementation, decide:

1. **Storage Location**: 
   - ✅ **Recommended**: Keep on same server initially (`/storage/` directory)
   - Future: Can migrate to cloud storage (S3, etc.) later

2. **Metadata Storage**:
   - ✅ **Recommended**: Enhanced JSON files in `/data/` (fits current architecture)
   - Future: Can add database if needed

3. **Versioning Strategy**:
   - ✅ **Recommended**: Keep last 5 versions, archive older ones
   - Configurable per journal

4. **CDN**:
   - ⏸️ **Later**: Start without CDN, add Cloudflare CDN later
   - Current static hosting can handle initial load

## Phase 1 Implementation Checklist

### Step 1: Create Directory Structure
```bash
mkdir -p storage/journals
mkdir -p storage/shared/{images,figures,datasets,media}
mkdir -p storage/assets/{images,documents,templates,submissions}
mkdir -p storage/archives
mkdir -p data/journals
mkdir -p data/articles
mkdir -p data/assets
mkdir -p data/versions
```

### Step 2: Create Core Services

**Files to Create**:
- `src/lib/storage/StorageService.ts` - Core storage operations
- `src/lib/storage/AssetRegistry.ts` - Asset tracking
- `src/lib/storage/VersionManager.ts` - Version control
- `src/lib/journals/JournalStorage.ts` - Journal-scoped storage
- `src/lib/assets/AssetManager.ts` - Asset management

### Step 3: Migration Script

**File to Create**:
- `scripts/migrate-to-new-structure.js` - Migrate existing files

**Migration Steps**:
1. Scan existing `/public/articles/` directory
2. Identify journal for each article (from metadata)
3. Create new directory structure
4. Move files to new locations
5. Generate version entries
6. Create symlinks for "current" versions
7. Update metadata files

### Step 4: Update Backend Server

**Changes to `simple-admin-server.js`**:
- Add new storage endpoints
- Update file serving to use new paths
- Add version management endpoints
- Add asset registry endpoints

### Step 5: Update Frontend

**Changes Needed**:
- Update article loading to use new paths
- Add version selection UI
- Update asset references
- Add journal-scoped navigation

## Implementation Order

1. **Day 1-2**: Create directory structure + core StorageService
2. **Day 3-4**: Implement AssetRegistry + VersionManager
3. **Day 5-6**: Create migration script + test migration
4. **Day 7-8**: Update backend server endpoints
5. **Day 9-10**: Update frontend + test everything

## Testing Strategy

### Unit Tests
- Test StorageService operations
- Test version management
- Test asset registry
- Test file path generation

### Integration Tests
- Test file upload → storage → retrieval
- Test version creation → rollback
- Test journal isolation
- Test asset sharing

### Migration Tests
- Test migration script on copy of data
- Verify all files accessible
- Verify metadata intact
- Verify URLs work

## Rollback Plan

If issues occur:
1. Keep old system running in parallel
2. Switch back to old paths if needed
3. Files remain in both locations during transition
4. Gradual cutover with monitoring

## Success Criteria

Phase 1 is complete when:
- ✅ New directory structure exists
- ✅ All existing files migrated
- ✅ Files accessible via new paths
- ✅ Versioning working for new uploads
- ✅ Backward compatibility maintained
- ✅ No broken links or 404s

## Next Steps After Phase 1

Once Phase 1 is stable:
1. Add metadata enhancements (Phase 2)
2. Implement multi-journal isolation (Phase 3)
3. Add file processing pipeline (Phase 5)
4. Implement search (Phase 6)

---

**Ready to start?** The plan is comprehensive and production-ready. We can begin Phase 1 implementation immediately.
