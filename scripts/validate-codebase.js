#!/usr/bin/env node

/**
 * Comprehensive codebase validation script
 * Prevents syntax errors, import issues, and ensures stable localhost
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

let errors = [];
let warnings = [];

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Check for import statements in wrong places
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Check for import statements inside functions/components
    if (trimmedLine.startsWith('import ') && !isAtTopLevel(content, index)) {
      errors.push({
        file: filePath,
        line: index + 1,
        message: `Import statement found inside function/component: ${trimmedLine}`,
        type: 'syntax'
      });
    }
    
    // Check for self-assignment
    if (trimmedLine.includes(' = ') && trimmedLine.includes('.')) {
      const parts = trimmedLine.split(' = ');
      if (parts.length === 2 && parts[0].trim() === parts[1].trim()) {
        errors.push({
          file: filePath,
          line: index + 1,
          message: `Self-assignment detected: ${trimmedLine}`,
          type: 'logic'
        });
      }
    }
    
    // Check for malformed imports (but allow multi-line imports and CSS imports)
    if (trimmedLine.startsWith('import ') && !trimmedLine.includes(' from ') && !trimmedLine.includes('{') && !trimmedLine.includes('}') && !trimmedLine.includes('.css') && !trimmedLine.includes('.scss')) {
      errors.push({
        file: filePath,
        line: index + 1,
        message: `Malformed import statement: ${trimmedLine}`,
        type: 'syntax'
      });
    }
  });
}

function isAtTopLevel(content, lineIndex) {
  const lines = content.split('\n');
  const beforeLine = lines.slice(0, lineIndex).join('\n');
  
  // Count opening and closing braces
  const openBraces = (beforeLine.match(/\{/g) || []).length;
  const closeBraces = (beforeLine.match(/\}/g) || []).length;
  
  // If we're inside a function/component, braces won't be balanced
  return openBraces === closeBraces;
}

function checkTypeScriptErrors() {
  try {
    log('🔍 Running TypeScript compiler check...', 'blue');
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
    log('✅ TypeScript check passed', 'green');
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || '';
    const lines = output.split('\n');
    
    lines.forEach(line => {
      if (line.includes('error TS')) {
        const match = line.match(/(.+)\((\d+),(\d+)\): error TS\d+: (.+)/);
        if (match) {
          errors.push({
            file: match[1],
            line: parseInt(match[2]),
            column: parseInt(match[3]),
            message: match[4],
            type: 'typescript'
          });
        }
      }
    });
  }
}

function checkESLintErrors() {
  try {
    log('🔍 Running ESLint check...', 'blue');
    const output = execSync('npx eslint src --ext .ts,.tsx --format=json', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    const results = JSON.parse(output);
    results.forEach(result => {
      result.messages.forEach(message => {
        if (message.severity === 2) { // Error
          errors.push({
            file: result.filePath,
            line: message.line,
            column: message.column,
            message: message.message,
            type: 'eslint'
          });
        } else if (message.severity === 1) { // Warning
          warnings.push({
            file: result.filePath,
            line: message.line,
            column: message.column,
            message: message.message,
            type: 'eslint'
          });
        }
      });
    });
  } catch (error) {
    // ESLint might not be configured, that's okay
    log('⚠️  ESLint not configured or has errors', 'yellow');
  }
}

function checkImportConsistency() {
  log('🔍 Checking import consistency...', 'blue');
  
  const srcDir = path.join(process.cwd(), 'src');
  const files = getAllFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);
  
  files.forEach(file => {
    checkFile(file);
  });
}

function getAllFiles(dir, extensions) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules')) {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  });
  
  return files;
}

function checkIndexHtml() {
  log('🔍 Checking index.html...', 'blue');
  
  const indexPath = path.join(process.cwd(), 'index.html');
  if (!fs.existsSync(indexPath)) {
    errors.push({
      file: 'index.html',
      line: 1,
      message: 'index.html file not found',
      type: 'critical'
    });
    return;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // Check for main script tag
  if (!content.includes('<script type="module" src="/src/main.tsx"></script>')) {
    errors.push({
      file: 'index.html',
      line: 1,
      message: 'Missing main script tag: <script type="module" src="/src/main.tsx"></script>',
      type: 'critical'
    });
  }
  
  // Check for root div
  if (!content.includes('<div id="root"></div>')) {
    errors.push({
      file: 'index.html',
      line: 1,
      message: 'Missing root div: <div id="root"></div>',
      type: 'critical'
    });
  }
}

function generateReport() {
  log('\n' + '='.repeat(60), 'bold');
  log('📊 CODEBASE VALIDATION REPORT', 'bold');
  log('='.repeat(60), 'bold');
  
  if (errors.length === 0) {
    log('✅ No errors found!', 'green');
  } else {
    log(`❌ Found ${errors.length} errors:`, 'red');
    errors.forEach((error, index) => {
      log(`\n${index + 1}. ${error.file}:${error.line}:${error.column || 0}`, 'red');
      log(`   Type: ${error.type}`, 'yellow');
      log(`   Message: ${error.message}`, 'red');
    });
  }
  
  if (warnings.length > 0) {
    log(`\n⚠️  Found ${warnings.length} warnings:`, 'yellow');
    warnings.forEach((warning, index) => {
      log(`\n${index + 1}. ${warning.file}:${warning.line}:${warning.column || 0}`, 'yellow');
      log(`   Message: ${warning.message}`, 'yellow');
    });
  }
  
  log('\n' + '='.repeat(60), 'bold');
  
  if (errors.length > 0) {
    log('❌ Validation failed. Please fix the errors above.', 'red');
    process.exit(1);
  } else {
    log('✅ All validations passed! Your codebase is ready for stable localhost.', 'green');
    process.exit(0);
  }
}

// Main execution
function main() {
  log('🚀 Starting comprehensive codebase validation...', 'bold');
  
  checkIndexHtml();
  checkImportConsistency();
  checkTypeScriptErrors();
  checkESLintErrors();
  
  generateReport();
}

main();
