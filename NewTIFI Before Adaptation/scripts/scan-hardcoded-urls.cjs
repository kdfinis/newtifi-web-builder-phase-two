#!/usr/bin/env node
// Scan for hardcoded localhost URLs and legacy publishing paths
// Pure Node.js implementation - no external dependencies
const fs = require('fs');
const path = require('path');

// Recursively get all source files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      // Skip ignored directories/files
      if (file === 'node_modules' || file.startsWith('.') || file === 'dist') {
        continue;
      }
      
      const filePath = path.join(dir, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          getAllFiles(filePath, fileList);
        } else if (/\.(ts|tsx|js|jsx|css|scss|json)$/.test(file)) {
          fileList.push(filePath);
        }
      } catch (e) {
        // Skip files we can't access
      }
    }
  } catch (e) {
    // Skip directories we can't access
  }
  
  return fileList;
}

// Search for pattern in files (output format: file:line:content)
// Ignores intentional patterns: conditional localhost (DEV mode) and backward-compat routes
function searchPattern(pattern) {
  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    return '';
  }
  
  const files = getAllFiles(srcDir);
  const results = [];
  const patternLower = pattern.toLowerCase();
  
  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const relativePath = path.relative(process.cwd(), filePath);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineLower = line.toLowerCase();
        
        // Skip intentional patterns:
        // 1. Conditional localhost URLs (DEV mode checks)
        if (patternLower.includes('localhost') && 
            (line.includes('import.meta.env.DEV') || 
             line.includes('process.env.NODE_ENV') ||
             line.includes('?') && line.includes(':'))) {
          continue;
        }
        
        // 2. Backward-compat routes (intentional redirects)
        if (patternLower.includes('publishing/journals') &&
            (line.includes('OldArticleRedirect') ||
             line.includes('Backward-compat') ||
             line.includes('backward-compat'))) {
          continue;
        }
        
        // 3. Skip file import paths (not URL paths)
        if (patternLower.includes('publishing/journals') &&
            (line.includes('import(') || 
             line.includes('from ') ||
             line.includes('require(') ||
             line.startsWith('const ') && line.includes('= React.lazy'))) {
          continue;
        }
        
        // Case-insensitive search
        if (lineLower.includes(patternLower)) {
          results.push(`${relativePath}:${i + 1}:${line.trim()}`);
        }
      }
    } catch (e) {
      // Skip files that can't be read
    }
  }
  
  return results.join('\n');
}

// Main execution
const offenders = [];

const localhostHits = searchPattern('http://localhost:');
if (localhostHits) {
  offenders.push(['localhost URLs', localhostHits]);
}

const journalsHits = searchPattern('/publishing/journals/');
if (journalsHits) {
  offenders.push(['legacy journals path', journalsHits]);
}

if (offenders.length) {
  console.error('\n[scan-hardcoded-urls] Found hardcoded URL issues:');
  for (const [label, text] of offenders) {
    console.error(`\n- ${label}:\n${text}`);
  }
  process.exit(2);
} else {
  console.log('[scan-hardcoded-urls] OK: No hardcoded localhost or legacy journals paths found.');
}
