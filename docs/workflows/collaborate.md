# Collaborate: many people, many agents, one repo

Contributors and their agents never share a conversation. They share this
repository. So everything they need to agree on lives in it, and every
conversation happens where the next person, human or agent, can read it.

| What the team needs | Where it lives |
|---|---|
| How every agent behaves | `AGENTS.md` (Claude Code imports it via `CLAUDE.md`; Replit reads `replit.md`) |
| What the product is | `SPEC.md` and each tool's `SPEC.md` |
| A unit of work | An **issue** |
| A workspace | One **branch** per issue, in your fork |
| The conversation | Issue comments, PR comments and review comments |
| The integration point | The **pull request** |
| The referee | CI: `npm run check` on every PR, the same for everyone |
| The decision-maker | A human. Bill merges. |

## 1. Claim before you build

1. **Search** for the same work, open or recently closed:

   ```bash
   gh issue list --repo chickensintrees/agentic-marketing-toolkit --search "<keywords>"
   gh pr list --repo chickensintrees/agentic-marketing-toolkit --search "<keywords>"
   ```

2. **Treat it as taken** if it has an assignee, a recent "I'm on it" comment, or an open PR. Offer to help in a comment instead, or pick something else.
3. **Claim it** with a comment (ask the human first; comments are public):

   ```bash
   gh issue comment <N> --repo chickensintrees/agentic-marketing-toolkit \
     --body "I'd like to work on this. Plan: <one line>."
   ```

   Students can't assign themselves, but Bill can assign anyone who has commented.
4. **Optional:** open a draft PR early (`gh pr create --draft ...`) so others can see the work in progress.

## 2. One issue, one branch, one PR

- Branch from an up-to-date `main` in your fork: `git switch -c <short-name>`.
- Put `Closes #<N>` in the PR description. The issue closes when the PR merges into `main`.
- Keep to one purpose. Found something else? Open a new issue for it.

## 3. Stay in your lane

- Never edit another tool's folder, or someone else's branch.
- Never import from another tool. Shared code goes to `src/shared/` in its own PR, after an issue that says why.
- **Shared lists** are where contributors meet: `TOOLS` in `src/tools/index.ts`, `WANTED_TOOLS` in `src/tools/wanted.ts`, and `INDUSTRY_PRESETS` in `src/tools/five-forces/data/industries/index.ts`. Add your one line at the end, and reorder or reformat nothing. Then merges stay simple.

## 4. Write for the next reader

Every comment should let someone who wasn't there pick up the work. That might
be the student tomorrow, a classmate, Bill, or another agent. A good handoff
note:

```text
Status: preset drafted, npm run check passes.
Done: craft-beer.ts with all five forces; registered in index.ts.
Left: Bill asked for a narrower scope (one state). Waiting on my decision.
Blocked: nothing.
```

When an agent posts, it should say so ("Posted by my coding agent, reviewed by me").

## 5. Keep your PR current

`main` moves as other PRs merge. When GitHub says your branch is out of date or
has conflicts:

- **No conflicts:** click **Update branch** on the PR page, or run `gh pr update-branch <N> --repo chickensintrees/agentic-marketing-toolkit`, then `git pull`.
- **Conflicts:** merge `main` locally, resolve, check, push:

  ```bash
  git fetch upstream
  git merge --no-edit upstream/main
  # resolve: in shared lists, keep both sides' lines
  git add <resolved files>
  npm run check
  git commit --no-edit
  git push
  ```

**Never force-push, and never rebase a branch that has a PR open.** Others may
have commented on its commits, and force-pushing can lose work.

Before you start your next contribution, sync your fork:
`gh repo sync <your-username>/agentic-marketing-toolkit`, then `git switch main`
and `git pull`. Or use **Sync fork** on your fork's GitHub page.

## 6. CI and the first-time approval

- CI runs on the class repo for every pull request: `npm ci`, `npm run check`, and a check that the two skills folders match.
- **First-time contributors:** GitHub holds the checks until a maintainer approves them ("Approve workflows to run"). Most students have new accounts, so expect this on your first PR. With GitHub's default setting, once your first PR merges, later ones run straight away.
- Pull requests from forks run with read-only permissions and no secrets. That's GitHub's safety default, and this project needs no secrets.
- Watch the result: `gh pr checks <N> --repo chickensintrees/agentic-marketing-toolkit --watch`.

## 7. Reviews and merging

- Reviewers comment on the PR. Fix on the same branch and reply (skill `respond-to-review`).
- Only Bill merges. A merge to `main` deploys the site automatically.
- PRs are reviewed where feasible; not every PR is merged. A spec-only PR, an issue with a good idea, or a review comment on someone else's PR are all real contributions.
