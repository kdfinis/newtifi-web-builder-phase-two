#!/usr/bin/env node
/**
 * Loop Breaker - Detects and prevents infinite loops in automated workflows
 * 
 * Usage:
 *   node scripts/loop-breaker.mjs <action> <identifier>
 * 
 * Actions:
 *   - check: Check if we're in a loop (exits with code 1 if loop detected)
 *   - record: Record a failure attempt
 *   - reset: Reset the loop counter
 *   - status: Show current loop status
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_FILE = path.join(__dirname, '..', '.loop-breaker-state.json');

const MAX_ATTEMPTS = 5; // Maximum consecutive failures before breaking
const MAX_TIME_WINDOW = 10 * 60 * 1000; // 10 minutes

function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return {
      loops: {},
      lastReset: Date.now()
    };
  }
  
  try {
    const content = fs.readFileSync(STATE_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return {
      loops: {},
      lastReset: Date.now()
    };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function checkLoop(identifier) {
  const state = loadState();
  const now = Date.now();
  
  if (!state.loops[identifier]) {
    return { inLoop: false, attempts: 0 };
  }
  
  const loop = state.loops[identifier];
  
  // Reset if too much time has passed
  if (now - loop.firstAttempt > MAX_TIME_WINDOW) {
    delete state.loops[identifier];
    saveState(state);
    return { inLoop: false, attempts: 0 };
  }
  
  // Check if we've exceeded max attempts
  if (loop.attempts >= MAX_ATTEMPTS) {
    return {
      inLoop: true,
      attempts: loop.attempts,
      firstAttempt: loop.firstAttempt,
      lastAttempt: loop.lastAttempt,
      error: loop.lastError
    };
  }
  
  return {
    inLoop: false,
    attempts: loop.attempts,
    firstAttempt: loop.firstAttempt
  };
}

function recordFailure(identifier, error = null) {
  const state = loadState();
  const now = Date.now();
  
  if (!state.loops[identifier]) {
    state.loops[identifier] = {
      firstAttempt: now,
      lastAttempt: now,
      attempts: 1,
      lastError: error
    };
  } else {
    const loop = state.loops[identifier];
    
    // Reset if too much time has passed
    if (now - loop.firstAttempt > MAX_TIME_WINDOW) {
      state.loops[identifier] = {
        firstAttempt: now,
        lastAttempt: now,
        attempts: 1,
        lastError: error
      };
    } else {
      loop.lastAttempt = now;
      loop.attempts++;
      loop.lastError = error;
    }
  }
  
  saveState(state);
  return state.loops[identifier];
}

function resetLoop(identifier) {
  const state = loadState();
  if (identifier) {
    delete state.loops[identifier];
  } else {
    state.loops = {};
    state.lastReset = Date.now();
  }
  saveState(state);
}

function showStatus() {
  const state = loadState();
  console.log('🔍 Loop Breaker Status:');
  console.log('');
  
  if (Object.keys(state.loops).length === 0) {
    console.log('✅ No active loops detected');
    return;
  }
  
  for (const [id, loop] of Object.entries(state.loops)) {
    const attempts = loop.attempts;
    const timeAgo = Math.floor((Date.now() - loop.firstAttempt) / 1000);
    const inLoop = attempts >= MAX_ATTEMPTS;
    
    console.log(`📌 ${id}:`);
    console.log(`   Attempts: ${attempts}/${MAX_ATTEMPTS}`);
    console.log(`   Time window: ${timeAgo}s ago`);
    console.log(`   Status: ${inLoop ? '🔴 LOOP DETECTED' : '🟡 In progress'}`);
    if (loop.lastError) {
      console.log(`   Last error: ${loop.lastError.substring(0, 100)}...`);
    }
    console.log('');
  }
}

// Main execution
const [action, identifier, ...args] = process.argv.slice(2);

if (!action) {
  console.error('Usage: node scripts/loop-breaker.mjs <action> <identifier>');
  console.error('');
  console.error('Actions:');
  console.error('  check <id>    - Check if loop detected (exits 1 if loop)');
  console.error('  record <id>   - Record a failure attempt');
  console.error('  reset [id]    - Reset loop counter (all if no id)');
  console.error('  status        - Show current status');
  process.exit(1);
}

switch (action) {
  case 'check':
    if (!identifier) {
      console.error('Error: identifier required for check action');
      process.exit(1);
    }
    const checkResult = checkLoop(identifier);
    if (checkResult.inLoop) {
      console.error('🔴 LOOP DETECTED!');
      console.error('');
      console.error(`Identifier: ${identifier}`);
      console.error(`Attempts: ${checkResult.attempts}`);
      console.error(`Time window: ${Math.floor((Date.now() - checkResult.firstAttempt) / 1000)}s`);
      if (checkResult.error) {
        console.error(`Last error: ${checkResult.error}`);
      }
      console.error('');
      console.error('Breaking loop to prevent infinite retries.');
      console.error('Fix the underlying issue before retrying.');
      process.exit(1);
    } else {
      console.log(`✅ No loop detected (${checkResult.attempts} attempts)`);
      process.exit(0);
    }
    
  case 'record':
    if (!identifier) {
      console.error('Error: identifier required for record action');
      process.exit(1);
    }
    const error = args.join(' ') || null;
    const record = recordFailure(identifier, error);
    console.log(`📝 Recorded failure: ${identifier} (${record.attempts}/${MAX_ATTEMPTS} attempts)`);
    if (record.attempts >= MAX_ATTEMPTS) {
      console.error('🔴 LOOP DETECTED! Maximum attempts reached.');
      process.exit(1);
    }
    break;
    
  case 'reset':
    resetLoop(identifier);
    if (identifier) {
      console.log(`✅ Reset loop counter for: ${identifier}`);
    } else {
      console.log('✅ Reset all loop counters');
    }
    break;
    
  case 'status':
    showStatus();
    break;
    
  default:
    console.error(`Unknown action: ${action}`);
    process.exit(1);
}
