---
name: start-contribution
description: Onboard a student who wants to contribute to the Agentic Marketing Toolkit, from connecting to GitHub through forking, running the app, picking and claiming an issue, planning, and creating a branch. Use when someone pastes the starter prompt or the repository URL, says they want to contribute or open a pull request, or needs help forking, cloning, running the app, or choosing a first issue.
---

# Start a contribution

The student is probably not a programmer. Explain every step in one or two
plain sentences. **ASK FIRST** means: say exactly what you will do and wait for
an explicit OK, because it is public. Never ask for passwords or tokens in chat.

Class repo: `https://github.com/chickensintrees/agentic-marketing-toolkit`
(default branch `main`). The student has no write access there. They work in a
**fork**.

## 1. Orient

1. Read `AGENTS.md`, `README.md`, `docs/students/START-HERE.md` and `SPEC.md`. Summarize the project in three sentences: what the toolkit is, who builds it, how contributing works (fork, branch, pull request, review).
2. Say which tool you are and what you can do here: run shell commands, use git, reach GitHub.
3. If you **cannot** run commands (Lovable, a chat-only assistant), say so and walk the student through the GitHub web editor path in `CONTRIBUTING.md`. Stop here.

## 2. Check the setup and connect to GitHub

```bash
git --version
node --version         # needs v22.12 or newer
gh --version
gh auth status
git remote -v          # are we already inside a clone? of which repo?
```

- Missing Node: point to https://nodejs.org (LTS, 22.12 or newer) and wait.
- Not connected to GitHub: use the `connect-github` skill.
- Check the commit identity: `git config user.name` and `git config user.email`. If empty, ask the student which name and email to use (GitHub's private no-reply address is listed at https://github.com/settings/emails), then `git config --global user.name "..."` and `git config --global user.email "..."`.

## 3. Fork and clone (ASK FIRST)

Explain: *A fork is your own copy of the project on GitHub. A clone is a copy
of that fork on this computer. You change your copy, then ask Bill to pull your
changes in.*

```bash
gh repo fork chickensintrees/agentic-marketing-toolkit --clone
cd agentic-marketing-toolkit
git remote -v          # origin = <student>/..., upstream = chickensintrees/...
```

- If the fork already exists, gh says so and reuses it.
- **Already inside a clone of the class repo?** Ask first, then run `gh repo fork --remote` in that folder. It renames the existing `origin` to `upstream` and adds the fork as `origin`.
- With MCP tools: `fork_repository` (owner `chickensintrees`, repo `agentic-marketing-toolkit`), then `git clone https://github.com/<student>/agentic-marketing-toolkit.git` and `git remote add upstream https://github.com/chickensintrees/agentic-marketing-toolkit.git`.
- Cloud tools (Codex Cloud, Claude Code on the web, Replit) must be pointed at the **fork**. The student forks in the browser: https://github.com/chickensintrees/agentic-marketing-toolkit/fork
- Show the fork's URL as evidence.

## 4. Run the app

```bash
npm install
npm run dev
```

Give the student the URL Vite prints and suggest opening Five Forces Explorer
(`#/five-forces`). If the tool can't show a preview, that's fine: `npm run
check` still verifies the work.

## 5. Pick an issue

1. List open work: `gh issue list --repo chickensintrees/agentic-marketing-toolkit --search "no:assignee"`.
2. Offer **three** options that suit the student's interests and comfort, from those issues and `docs/students/first-issues.md`. Give each a one-line "what you'd build" and its difficulty.
3. Before the student commits to one, check it isn't taken: `gh issue view <N> --repo chickensintrees/agentic-marketing-toolkit --comments` (an assignee or a recent "I'm on it" comment) and `gh pr list --repo chickensintrees/agentic-marketing-toolkit --search "<keywords>"`.

## 6. Claim it (ASK FIRST)

Show the comment text, then post it:

```bash
gh issue comment <N> --repo chickensintrees/agentic-marketing-toolkit \
  --body "I'd like to work on this. Plan: <one line>. I'll open a PR from my fork."
```

If the item from `docs/students/first-issues.md` has no GitHub issue yet, ask first, then open
it with its title and body (`gh issue create --repo chickensintrees/agentic-marketing-toolkit --title "..." --body-file <file outside the repo>`). Bill adds labels and can assign it.

## 7. Plan, then branch

1. Bring `main` up to date: `git switch main`, `git pull upstream main`.
2. Write a 3–6 line plan: which files change, what the student will see, how it will be tested. If behavior changes, the spec change comes first (skill `propose-feature`). Wait for the OK.
3. Create a branch: `git switch -c <short-name>`, for example `add-craft-beer`. Never work on `main`.

## Next

- New industry preset: `add-industry`.
- New tool: `add-tool`.
- Change how something works: `propose-feature`.
- Then always: `verify-and-open-pr`, and later `respond-to-review`.
