# Implement

Build what the approved plan says, in small verified steps.

## Before the first edit

1. Make sure the work is on its own branch, created from an up-to-date `main`:

   ```bash
   git switch main
   git pull upstream main
   git switch -c <short-name>
   ```

2. If the change alters behavior, edit the spec first, in this same branch.

## While you work

- **Read before write** (rule 3). Read each file before editing it, even if you edited it earlier.
- **One step at a time** (rule 7). Make one change, check it, then the next.
- **Save means verify** (rule 4). Re-read the file after editing.
- **Checkpoint** (rule 1). Commit on your branch when something works: `git add <files>` then `git commit -m "<what>"`.
- **Two strikes** (rule 10). If the same fix fails twice, stop and rethink with the human.

## Where code goes

| What | Where |
|---|---|
| A tool's logic (calculations, rules, export) | `src/tools/<tool-id>/lib/*.ts`, pure functions, each with a `*.test.ts` next to it |
| A tool's screens | `src/tools/<tool-id>/components/`, one component per file, kept thin |
| A tool's content and examples | `src/tools/<tool-id>/data/` |
| Something two tools need | `src/shared/`, in its **own** pull request |
| Shell, Home, routing | `src/shell/`, `src/App.tsx`, under suite `SPEC.md` |

Rules that keep many contributors out of each other's way:

- Never import from another tool's folder.
- Use the shared design tokens and components in `src/shared/`. No new colors or fonts in a tool.
- No new runtime dependencies unless `SPEC.md` is updated first.
- In shared lists (`TOOLS`, `WANTED_TOOLS`, `INDUSTRY_PRESETS`), add your one line and change nothing else.
- Don't touch the harness (`AGENTS.md`, `CLAUDE.md`, `replit.md`, skills, `.github/`) unless that is the purpose of the PR.

## Accessibility as you build

Check as you go, not at the end: every control has a visible label, everything
works with Tab, Enter, Space and the arrow keys, focus is visible, and nothing
is shown by color alone (suite SPEC §2.4).

Next: [test.md](test.md).
