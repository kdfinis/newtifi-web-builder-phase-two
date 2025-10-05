#!/usr/bin/env node
// Scan for hardcoded localhost URLs and legacy publishing paths
const { execSync } = require('child_process');

function grep(pattern) {
  try {
    const out = execSync(`rg -n --no-ignore-vcs -S "${pattern}" src || true`, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
    return out.trim();
  } catch (e) {
    return '';
  }
}

const offenders = [];

const localhostHits = grep('http://localhost:');
if (localhostHits) offenders.push(['localhost URLs', localhostHits]);

const journalsHits = grep('/publishing/journals/');
if (journalsHits) offenders.push(['legacy journals path', journalsHits]);

if (offenders.length) {
  console.error('\n[scan-hardcoded-urls] Found hardcoded URL issues:');
  for (const [label, text] of offenders) {
    console.error(`\n- ${label}:\n${text}`);
  }
  process.exit(2);
} else {
  console.log('[scan-hardcoded-urls] OK: No hardcoded localhost or legacy journals paths found.');
}

