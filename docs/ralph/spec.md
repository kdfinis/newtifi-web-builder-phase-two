# Ralph Loop Spec - Infrastructure Upgrade for Multi-Journal Publishing Platform

## Codebase Notice:
- Primary website codebase is in the root directory
- Backend API server: `simple-admin-server.js` (port 3001)
- Frontend dev server: Vite (port 8080)
- Current storage: `/public/articles/` and `/public/files/` (rudimentary)
- **DO NOT** modify secrets, credentials, or OAuth configurations - leave them as-is

## Goal:
Transform the current rudimentary file-based system into a production-ready infrastructure for a multi-journal academic publishing platform. The system must support:
- Multiple journals with isolated storage
- Version control for all files
- Reusable assets across journals/articles
- Rich metadata management
- Proper file organization and naming
- Standards compliance (JATS, OAI-PMH, DOI)
- Scalable architecture that works with static hosting

## Context:
We are a research institute and academic publisher. We need:
- Professional file management for research articles
- Support for multiple journals (currently 2, will grow)
- Article versioning (drafts, revisions, published versions)
- Asset reuse (figures, images, datasets shared across articles)
- Proper metadata for academic standards
- Search and discovery capabilities
- Editorial workflows
- Long-term archival

## Constraints:
- Do not ask questions. Make reasonable assumptions and proceed.
- **DO NOT touch secrets, credentials, or OAuth configs** - leave them exactly as-is
- Maintain backward compatibility during migration
- Keep it simple and maintainable
- Use free/open-source solutions where possible
- Must work with current hosting (static + simple backend)
- Files must be accessible via web URLs
- Support for academic publishing standards

## Acceptance Criteria:
- [ ] New storage directory structure created (`storage/journals/`, `storage/shared/`, etc.)
- [ ] StorageService implemented with journal-scoped paths
- [ ] AssetRegistry implemented for tracking all assets
- [ ] VersionManager implemented with version control
- [ ] All existing files migrated to new structure
- [ ] Backend server updated to use new storage paths
- [ ] Frontend updated to use new asset URLs
- [ ] Version control working (upload creates new version)
- [ ] Asset reuse functional (shared assets accessible)
- [ ] Multi-journal isolation working
- [ ] Metadata system enhanced
- [ ] File serving works correctly
- [ ] All existing functionality still works
- [ ] No broken links or 404s
- [ ] Migration script created and tested
- [ ] Documentation updated

## Implementation Priorities:

### Phase 1: Foundation (Critical - Do First)
1. Create new storage directory structure
2. Implement StorageService with journal-scoped operations
3. Implement AssetRegistry for asset tracking
4. Implement VersionManager for version control
5. Create migration script to move existing files
6. Update backend server to use new storage
7. Update frontend to use new URLs
8. Test everything works

### Phase 2: Enhanced Features (After Phase 1 Works)
1. Enhanced metadata system
2. File processing pipeline (thumbnails, optimization)
3. Search functionality
4. Asset discovery
5. Standards compliance (JATS, OAI-PMH)

## Technical Requirements:

### Storage Structure:
```
storage/
├── journals/{journal-id}/
│   ├── articles/{article-id}/v{version}/
│   ├── issues/{year}/{volume}/{issue}/
│   ├── covers/
│   └── assets/
├── shared/{type}/{category}/
└── assets/{category}/
```

### Core Services Needed:
1. **StorageService**: Journal-scoped file operations, path generation
2. **AssetRegistry**: Track all assets, usage, relationships
3. **VersionManager**: Version control, rollback, history
4. **JournalStorage**: Journal-specific storage operations
5. **AssetManager**: Asset lifecycle management

### File Naming:
- Articles: `{journal-id}/{article-id}/v{version}/{timestamp}-{article-id}-v{version}.pdf`
- Shared assets: `shared/{type}/{category}/{asset-id}-{checksum}.{ext}`
- Journal assets: `{journal-id}/{category}/{asset-id}.{ext}`

### Metadata:
- Enhanced article metadata with version history
- Asset metadata with usage tracking
- Journal configuration per journal
- Standards-compliant metadata (Dublin Core, JATS-ready)

## What NOT to Touch:
- OAuth credentials and configurations
- Client secrets (leave hardcoded if present)
- Authentication provider settings
- Any secret/credential-related code

## Success Metrics:
- All files organized by journal
- Version control working
- Multi-journal support complete
- Asset reuse functional
- All existing functionality preserved
- No regressions
- Performance maintained or improved
