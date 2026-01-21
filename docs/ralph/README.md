# Ralph Loop - Automated Development Workflow

## What is Ralph Loop?

Ralph Loop is an automated iterative development workflow that uses AI (Cursor) to systematically complete development tasks. It works by:

1. **Reading a spec** (`spec.md`) that defines goals and acceptance criteria
2. **Tracking tasks** in a checklist (`checklist.md`)
3. **Logging progress** (`progress.md`) for each iteration
4. **Validating work** using automated tests
5. **Iterating** until all tasks are complete

## Quick Start

### 1. Set Your Goals
Edit `docs/ralph/spec.md` with your specific development goals and acceptance criteria.

### 2. Create Your Checklist
Edit `docs/ralph/checklist.md` with the tasks that need to be completed.

### 3. Run the Loop
```bash
cd /Users/karlodefinis/Projects/NewTIFI/backups/Development/2025-06-10-june10-major-update
./scripts/ralph-loop/run-ralph-loop
```

### 4. Follow the Prompts
The script will:
- Generate prompts for Cursor AI
- Wait for you to run the AI commands
- Validate the results
- Continue until checklist is complete

## Configuration

Set environment variables to customize behavior:

```bash
export RALPH_WORKSPACE="/path/to/project"  # Default: current project
export RALPH_MAX_ITERS=5                    # Default: 5 iterations
export RALPH_MODEL="gpt-4"                 # Default: gpt-4
export RALPH_TEST_CMD="npm run lint"       # Custom validation command
```

## Files Structure

```
docs/ralph/
├── spec.md          # Goals and acceptance criteria
├── checklist.md     # Tasks to complete
├── progress.md      # Iteration history
└── README.md        # This file

scripts/ralph-loop/
├── run-ralph-loop   # Main script
├── validate.sh      # Validation script
└── logs/            # Iteration logs
    ├── prompt-001.txt
    ├── iter-001.txt
    └── ...
```

## How It Works

1. **Reads spec.md** - Defines what needs to be done
2. **Reads checklist.md** - Lists specific tasks
3. **Reads progress.md** - Shows recent work history
4. **Generates prompt** - Combines all info for AI
5. **Waits for execution** - You run the AI command
6. **Validates** - Runs validation script
7. **Checks completion** - Verifies checklist is done
8. **Loops** - Repeats until done or max iterations

## Tips

- **Be specific** in spec.md - Clear goals = better results
- **Break down tasks** in checklist.md - Smaller tasks are easier to complete
- **Update progress** - The AI reads recent progress to understand context
- **Set RALPH_TEST_CMD** - Custom validation ensures quality

## Example Workflow

```bash
# 1. Edit the spec
vim docs/ralph/spec.md

# 2. Edit the checklist
vim docs/ralph/checklist.md

# 3. Set validation command (optional)
export RALPH_TEST_CMD="npm run lint && npm run build"

# 4. Run the loop
./scripts/ralph-loop/run-ralph-loop

# 5. Follow prompts - run AI commands when asked
# 6. Loop continues until checklist is complete
```

## Current Focus

The current spec focuses on fixing LinkedIn OAuth security issues:
- Removing hardcoded secrets
- Restricting CORS
- Adding input validation
- Improving error handling

Edit `spec.md` and `checklist.md` to change the focus.
