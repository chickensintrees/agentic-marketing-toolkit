# Review

Every change is reviewed twice: by its author (with their agent) before the
pull request, and by a maintainer after it. Classmates' reviews are welcome too.

## Self-review before opening the PR

Run through this with your agent before you push:

- [ ] `npm run check` passes, and you've seen the output.
- [ ] `git diff` shows only changes for this one purpose. Nothing unrelated, no stray formatting.
- [ ] The harness is untouched unless that's the purpose: `AGENTS.md`, `CLAUDE.md`, `replit.md`, `.agents/`, `.claude/`, `.github/`. Some tools edit these on their own; restore them with `git restore <file>`.
- [ ] If behavior changed, the spec changed in this PR, including its changelog.
- [ ] No secrets, `.env` files, personal data, `dist/` or `node_modules/`.
- [ ] The tool's folder imports nothing from another tool.
- [ ] Example content is cautious and general: no statistics, market shares or named-company claims.
- [ ] It works with only the keyboard, and nothing is shown by color alone.
- [ ] You, the human, can explain what changed and why. The PR template asks.

## The pull request description

Use `.github/PULL_REQUEST_TEMPLATE.md`. It asks four questions:

1. **What changed?**
2. **Why does it help someone in marketing?**
3. **How did you test it?**
4. **What did the agent do, and what did you decide?**

Then the checklist, and `Closes #<issue>`.

## Reviewing someone else's PR

Anyone can comment. Be specific and kind, and say which file and line. Good
review comments:

- point to the spec section the change should match;
- ask a question when something is unclear, rather than guessing;
- separate "must fix" from "suggestion".

Approving or merging is the maintainer's job.

## What the maintainer checks

See [docs/maintainers.md](../maintainers.md). In short: CI is green, the
change matches the spec, it has one purpose, the harness is untouched, and the
description answers the four questions. PRs are reviewed where feasible; not
every PR is merged, and a "not now" comes with a reason.

## Responding to review

Fix on the same branch and push; the PR updates itself. Reply to each comment
so the next person can follow. Your agent's skill is `respond-to-review`.
