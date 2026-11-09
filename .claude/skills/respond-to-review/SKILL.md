---
name: respond-to-review
description: Read the review comments and CI results on an open pull request to the Agentic Marketing Toolkit, fix what they ask for on the same branch, keep the branch current with main, and reply. Use when the user says "Bill commented", "CI failed", "my PR has a conflict", "update my PR", or asks what to do next on a pull request.
---

# Respond to review and CI

Reviews and CI are how many contributors stay pointed the same way. Treat
every comment as a request to consider, not an order to obey blindly: if a
suggestion conflicts with the spec, say so in a reply.

## 1. Find the PR and read everything

```bash
gh pr list --repo chickensintrees/agentic-marketing-toolkit --author "@me"
gh pr view <N> --repo chickensintrees/agentic-marketing-toolkit --comments
gh api repos/chickensintrees/agentic-marketing-toolkit/pulls/<N>/comments   # inline line comments
gh pr checks <N> --repo chickensintrees/agentic-marketing-toolkit
```

`gh pr view --comments` shows the conversation and review summaries but not
comments on specific lines; the `gh api` call returns those. With MCP tools,
use `pull_request_read` (methods `get_comments`, `get_reviews`,
`get_review_comments`, `get_check_runs`).

**Pending checks** on a first-time contributor's PR are waiting for Bill's
approval. Nothing is wrong; tell the student.

## 2. If CI failed

1. `gh pr checks` lists each check with a link. The run id is in the link (`/actions/runs/<run-id>/`).
2. `gh run view <run-id> --repo chickensintrees/agentic-marketing-toolkit --log-failed` shows the failing step.
3. Reproduce locally with `npm run check`. Common causes: a lint warning (warnings are errors), a type error, a data-integrity test (wrong driver id, missing registration), a registry test (tool not in `TOOLS`, or still in `WANTED_TOOLS`), or `.agents/skills` and `.claude/skills` differing.

## 3. Plan the fixes with the student

List each comment and failure with a one-line proposed response: fix it,
discuss it, or decline politely with a reason. Wait for the student's OK.
Spec-first still applies: if a reviewer asks for a behavior change, update the
spec in the same PR.

## 4. Fix on the same branch

```bash
git switch <branch>
# make the changes
npm run check
git add <files>
git commit -m "Address review: <what>"
git push                      # ASK FIRST; the PR updates itself
```

Never force-push, and never open a second PR for the same change.

## 5. Keep the branch current with main

When the PR says the branch is out of date or has conflicts:

- No conflicts: `gh pr update-branch <N> --repo chickensintrees/agentic-marketing-toolkit`, or the **Update branch** button on the PR page. Then `git pull` locally.
- Conflicts:

  ```bash
  git fetch upstream
  git merge --no-edit upstream/main
  # resolve each conflict: keep both sides' lines in shared lists (TOOLS, WANTED_TOOLS, INDUSTRY_PRESETS)
  git add <resolved files>
  npm run check
  git commit --no-edit        # completes the merge
  git push                    # ASK FIRST
  ```

  Explain each conflict to the student before resolving it. If you're unsure which side is right, ask in the PR.

## 6. Reply (ASK FIRST)

Reply so the next person, human or agent, can pick up without asking:

```bash
gh pr comment <N> --repo chickensintrees/agentic-marketing-toolkit \
  --body "Thanks! Changed X in <commit>. Kept Y because <reason, spec section>. npm run check passes."
```

To answer one line comment directly:
`gh api repos/chickensintrees/agentic-marketing-toolkit/pulls/<N>/comments/<comment-id>/replies -f body="..."`.

## 7. After merge

The issue closes automatically if the PR body said `Closes #N`. Before the
next contribution, sync the fork: `gh repo sync <student-login>/agentic-marketing-toolkit`,
then `git switch main` and `git pull`. Ask before deleting the old branch.
