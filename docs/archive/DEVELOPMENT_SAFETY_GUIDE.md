# 🛡️ Development Safety Guide

## What Happened & How to Prevent It

### ❌ What Went Wrong
1. **Git Reset**: Used `git reset --hard` which completely reverted the codebase
2. **Missing Files**: Many files were deleted during the reset
3. **Import Errors**: Broken imports caused build failures
4. **Hardcoded URLs**: URLs were scattered throughout the codebase

### ✅ What We Fixed
1. **Restored Original Website**: Your main site is back to working state
2. **Added LMS as Additional Features**: LMS doesn't replace your existing site
3. **Created Safeguards**: Multiple safety scripts to prevent future issues
4. **Centralized URL Management**: All URLs now use environment variables

## 🛡️ Safety Scripts

### 1. Pre-Change Backup
```bash
./scripts/backup-before-major-changes.sh
```
- Creates timestamped backup before major changes
- Backs up source code, config files, and assets
- Creates restore script for easy recovery

### 2. Import Validation
```bash
./scripts/check-imports.sh
```
- Validates all @/ imports exist
- Prevents build failures from missing files
- Shows detailed import status

### 3. Pre-Deployment Safety Check
```bash
./scripts/pre-deployment-safety-check.sh
```
- Checks git status
- Validates critical files exist
- Tests build process
- Detects hardcoded URLs

## 🔧 URL Management

### Environment Variables
All URLs now use environment variables:

```bash
# Copy template
cp env.example .env.local

# Edit with your values
VITE_FRONTEND_URL=http://localhost:8080
VITE_BACKEND_URL=http://localhost:3001
VITE_ARCHITECTURE_URL=http://localhost:3000
```

### Centralized Configuration
```typescript
import { URLS, getCurrentUrls, buildApiUrl } from '@/lib/config/urls';

// Use centralized URLs
const apiUrl = buildApiUrl('/articles');
const assetUrl = buildAssetUrl('/images/logo.png');
```

## 🚨 Emergency Recovery

### If Something Goes Wrong Again:

1. **Check Git Status**
   ```bash
   git status
   git log --oneline -5
   ```

2. **Use Backup**
   ```bash
   cd backups/pre-change-backup-TIMESTAMP
   ./restore.sh
   ```

3. **Reset to Working State**
   ```bash
   git reset --hard HEAD~1  # Go back one commit
   # OR
   git reset --hard COMMIT_HASH  # Go to specific commit
   ```

4. **Run Safety Checks**
   ```bash
   ./scripts/pre-deployment-safety-check.sh
   ```

## 📋 Development Workflow

### Before Making Changes:
1. Run backup script
2. Check current git status
3. Create feature branch

### During Development:
1. Use environment variables for URLs
2. Test imports regularly
3. Run safety checks

### Before Deployment:
1. Run all safety scripts
2. Test build process
3. Validate all imports
4. Check for hardcoded URLs

## 🔍 Monitoring

### Check for Issues:
```bash
# Check imports
./scripts/check-imports.sh

# Check for hardcoded URLs
grep -r "localhost:" src/ --include="*.ts" --include="*.tsx"

# Check build
npm run build
```

### Common Issues:
- **Import Errors**: Use `@/` imports, check file paths
- **Hardcoded URLs**: Use environment variables
- **Missing Files**: Run import check script
- **Build Failures**: Check all dependencies

## 🎯 Best Practices

1. **Always backup before major changes**
2. **Use environment variables for URLs**
3. **Test imports before committing**
4. **Run safety checks before deployment**
5. **Keep LMS features separate from main site**
6. **Use centralized configuration**

## 📞 Emergency Contacts

If you need help:
1. Check this guide first
2. Run the safety scripts
3. Use git to revert changes
4. Restore from backup if needed

Remember: **Your main website is preserved and working!** The LMS is just an additional feature.
