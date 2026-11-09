# Maintainer guide

For Bill, and anyone given write access later. Students don't need this page.

## One-time setup

### 1. Turn on GitHub Pages

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.**
2. Run the deploy once: **Actions > Deploy to GitHub Pages > Run workflow** (or push to `main`).
3. Check https://chickensintrees.github.io/agentic-marketing-toolkit/ and https://chickensintrees.github.io/agentic-marketing-toolkit/#/five-forces

`vite.config.ts` uses `base: './'`, so the same build also works on a fork's own Pages site.

### 2. Create the labels

The issue forms and [first issues](students/first-issues.md) use these labels.
GitHub creates `bug`, `documentation`, `enhancement`, `good first issue`,
`help wanted` and `question` in every new repository. Create the rest:

| Label | Use |
|---|---|
| `new-industry` | A new Five Forces industry preset |
| `new-tool` | A new tool for the suite |
| `five-forces` | Anything inside Five Forces Explorer |
| `spec` | Needs, or is, a spec change or proposal |
| `accessibility` | Keyboard, screen reader, contrast |
| `needs-triage` | New idea or bug that Bill hasn't looked at yet |

```bash
R=chickensintrees/agentic-marketing-toolkit
gh label create new-industry  --force --repo $R --color 0E8A16 --description "A new Five Forces industry preset"
gh label create new-tool      --force --repo $R --color 1D76DB --description "A new tool for the suite"
gh label create five-forces   --force --repo $R --color 5319E7 --description "Five Forces Explorer"
gh label create spec          --force --repo $R --color FBCA04 --description "Needs or is a spec change or proposal"
gh label create accessibility --force --repo $R --color B60205 --description "Keyboard, screen reader, contrast"
gh label create needs-triage  --force --repo $R --color D4C5F9 --description "Not yet reviewed by a maintainer"
```

Issue forms only apply labels that already exist, so create these first.
`--force` updates a label that already exists (this repository already has
`accessibility`), so the block is safe to run again.

### 3. Fork pull request approval

**Settings > Actions > General > "Approval for running fork pull request
workflows from contributors"** has three options:

- Require approval for first-time contributors who are new to GitHub
- Require approval for first-time contributors (the default)
- Require approval for all external contributors

Keep the default. Most students have new accounts, so expect one approval per
student until their first PR merges; after that their PRs run without one. To
approve: open the PR, find the notice that workflows are awaiting approval,
and click **Approve workflows to run** (older docs call it "Approve and run").

Before approving, glance at the diff. A fork PR runs its own version of the
workflow files with a read-only token and no secrets, but be wary of changes
to `.github/workflows/` or to the `scripts` in `package.json`.

### 4. Protect `main`

Add a branch ruleset for `main` (**Settings > Rules > Rulesets**, or
**Settings > Branches**): require a pull request before merging, require the CI
status check `npm run check` to pass, and block force pushes. This is the
safeguard behind the rule "never push to main".

### 5. Seed the first issues

Create the twenty issues in [docs/students/first-issues.md](students/first-issues.md)
before class, so students can claim them by commenting. Paste each title and
body, and add the listed labels. Students can't assign themselves, but you can
assign anyone who has commented on an issue.

## Reviewing a student pull request

1. **Approve the workflows** if it's a first-time contributor (above).
2. **CI is green.** If red, the failing step's log says why; the student's agent can read it with `gh run view <run-id> --log-failed`.
3. **One purpose,** with `Closes #N` pointing at its issue.
4. **Spec first:** if behavior changed, the relevant `SPEC.md` and its changelog changed in the same PR. A new industry preset needs no spec change.
5. **Harness untouched** unless that's the purpose: `AGENTS.md`, `CLAUDE.md`, `replit.md`, `.agents/`, `.claude/`, `.github/`. Watch for edits made by tools on their own (Lovable can rewrite `AGENTS.md`; Replit may regenerate `replit.md` or add its own configuration files, such as `.replit`).
6. **Tool isolation:** a tool's files stay in its folder, with no imports from another tool. A new tool is registered in `TOOLS`, removed from `WANTED_TOOLS`, and has a row in `SPEC.md` §4. The registry test enforces most of this.
7. **Content:** illustrative and cautious, with no statistics, market shares or named-company claims; Five Forces content stays faithful to Porter.
8. **The description** answers the four template questions, and "what I decided" sounds like the student.
9. **Try it** if it changes the UI: `gh pr checkout <N> --repo chickensintrees/agentic-marketing-toolkit`, then `npm install` and `npm run dev`. Use the keyboard.

Then:

- **Merge** with **Squash and merge**, so `main` has one commit per PR. The deploy workflow publishes the site.
- **Conflicts in shared lists** (`TOOLS`, `WANTED_TOOLS`, `INDUSTRY_PRESETS`) are common when many PRs land at once. GitHub's **Resolve conflicts** button usually suffices: keep both sides' lines. With "Allow edits from maintainers" on, you can fix small things on the student's branch.
- **Declining:** say why, kindly, and suggest the path that would work (a smaller PR, a spec proposal, or an issue). The promise in CONTRIBUTING.md is "reviewed where feasible; not every PR is merged".
