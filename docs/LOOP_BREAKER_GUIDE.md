# Loop Breaker Guide

## Overview

The Loop Breaker is a mechanism that prevents infinite retry loops in automated workflows. It tracks consecutive failures and automatically stops after a threshold is reached.

## How It Works

1. **Tracks failures**: Records each failure attempt with a timestamp
2. **Detects loops**: If 5 consecutive failures occur within 10 minutes, it triggers
3. **Breaks the loop**: Stops the workflow with a clear error message
4. **Auto-resets**: Resets counters after successful operations or when time window expires

## Usage

### Check if in a loop
```bash
node scripts/loop-breaker.mjs check <identifier>
```
Exits with code 1 if loop detected, 0 otherwise.

### Record a failure
```bash
node scripts/loop-breaker.mjs record <identifier> [error message]
```
Records a failure attempt. Exits with code 1 if max attempts reached.

### Reset loop counter
```bash
node scripts/loop-breaker.mjs reset [identifier]
```
Resets the loop counter. If no identifier, resets all.

### Show status
```bash
node scripts/loop-breaker.mjs status
```
Shows current loop status for all tracked identifiers.

## Configuration

Default settings (in `scripts/loop-breaker.mjs`):
- **MAX_ATTEMPTS**: 5 consecutive failures
- **MAX_TIME_WINDOW**: 10 minutes

## Integration

The loop breaker is automatically integrated into:
- `.github/workflows/firebase-deploy.yml` - Prevents infinite Firebase deployment retries

## Example

```bash
# Check status
node scripts/loop-breaker.mjs status

# Reset after fixing an issue
node scripts/loop-breaker.mjs reset firebase-deploy

# Manually record a failure (for testing)
node scripts/loop-breaker.mjs record test-loop "Test error"
```

## State File

The loop breaker stores state in `.loop-breaker-state.json` (gitignored). This file tracks:
- Loop identifiers
- Attempt counts
- Timestamps
- Last error messages

## Troubleshooting

If the loop breaker triggers incorrectly:
1. Check the actual error in logs
2. Fix the underlying issue
3. Reset: `node scripts/loop-breaker.mjs reset <identifier>`
4. Retry the operation
