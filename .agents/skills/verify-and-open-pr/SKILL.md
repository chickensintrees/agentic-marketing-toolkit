---
name: verify-and-open-pr
description: Finish a contribution to the Agentic Marketing Toolkit - run npm run check, review the diff, commit, push to the student's fork, and open a pull request against chickensintrees/agentic-marketing-toolkit using the PR template, then watch CI. Use when a change is ready, or when the user says "open a PR", "submit this", "push it", or "I'm done".
---

# Verify and open a pull request

Nothing is done until `npm run check` passes and you have shown its output.
Pushing and opening a PR are public: **ASK FIRST** for each one.

## 1. Verify

```bash
npm run check
```

- Show the student the last lines of the output: the test summary and the build result.
- If it fails, read the first error, fix the cause, and rerun. Two failed attempts with the same approach: stop, explain, and propose another (rule 10).
- Never weaken or delete a test to make it pass.
- For UI changes, run `npm run dev`, check the change yourself (keyboard too), and take screenshots for the PR.

## 2. Review the diff

```bash
git status
git diff
```

- Every changed file should belong to this one purpose. Remove anything else (ask before discarding work).
- **Harness files** (`AGENTS.md`, `CLAUDE.md`, `replit.md`, `.agents/`, `.claude/`, `.github/`) must be unchanged unless the PR is about them. Some tools edit them on their own; restore them with `git restore <file>` after telling the student.
- No secrets, `.env` files, personal data, build output (`dist/`) or `node_modules/`.
- If behavior changed, the spec changed in this PR too.

## 3. Commit

Stage only the intended files by name (not `git add -A` unless you just
checked the list), then commit with a plain message:

```bash
git add <file> <file>
git commit -m "Add craft beer industry preset (closes #12)"
```

## 4. Push to the fork (ASK FIRST)

```bash
git remote -v                     # origin must be the student's fork
git push -u origin <branch>
```

If `origin` points at `chickensintrees`, stop: the push will be refused, and
pushing there is a hard limit. Fix the remotes first (see `start-contribution`).

## 5. Open the pull request (ASK FIRST)

1. Draft the body from `.github/PULL_REQUEST_TEMPLATE.md`. Answer its four questions in plain language:
   - **What changed**: one or two sentences.
   - **Why it helps someone in marketing**: who benefits and how.
   - **How I tested it**: `npm run check` result, what you clicked through, screenshots.
   - **What the agent did vs. what I decided**: draft the agent part; the **student** writes or confirms their decisions.
   Tick the checklist honestly, and include `Closes #<issue>`.
2. Show the full title and body to the student and wait for the OK.
3. Write the body to a file **outside** the repository, then:

   ```bash
   gh pr create --repo chickensintrees/agentic-marketing-toolkit --base main \
     --head <student-login>:<branch> --title "<title>" --body-file <path-to-body.md>
   ```

   Use `--draft` for work in progress. `gh api user --jq .login` prints the student's login.
4. With MCP tools: `create_pull_request` with owner `chickensintrees`, repo `agentic-marketing-toolkit`, base `main`, head `<student-login>:<branch>`.
5. If your tool can only open the PR on the fork, have the student open it in the browser: https://github.com/chickensintrees/agentic-marketing-toolkit/compare, **compare across forks**, head = their fork and branch. Leave "Allow edits from maintainers" on.
6. Show the PR URL as evidence.

## 6. Watch CI

```bash
gh pr checks <N> --repo chickensintrees/agentic-marketing-toolkit --watch
```

- **First-time contributors:** checks wait until Bill approves them on GitHub ("Approve workflows to run"). Tell the student this is normal, and don't keep polling; check back later.
- Green: tell the student the PR is waiting for review.
- Red: use `respond-to-review`.
