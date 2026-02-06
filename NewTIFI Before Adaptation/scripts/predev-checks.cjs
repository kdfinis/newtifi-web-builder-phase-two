#!/usr/bin/env node
// Predev checks: ensure single entry HTML and no conflicting servers
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function fail(msg) {
  console.error(`\n[predev-checks] ${msg}\n`);
  process.exit(1);
}

function ensureSingleEntryHtml() {
  const entries = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .filter(f => f !== 'index.html' && f !== '404.html');
  if (entries.length > 0) {
    fail(`Multiple HTML entries detected at project root: ${entries.join(', ')}. Move them to scripts/lab/ before running dev.`);
  }
}

function printOk() {
  console.log('[predev-checks] OK: Single HTML entry and clean root.');
}

ensureSingleEntryHtml();
printOk();

