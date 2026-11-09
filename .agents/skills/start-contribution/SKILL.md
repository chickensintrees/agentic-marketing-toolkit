---
name: start-contribution
description: Onboard a student who wants to contribute to Five Forces Explorer. Use when someone pastes the repository URL, says they want to contribute or make a pull request, or needs help forking, cloning, running the app, or picking a first issue.
---

# Start a contribution

The student is probably not a programmer. Explain every step in one or two
plain sentences. **Ask before you fork, push, or open a pull request.** Never
ask for passwords or tokens in chat.

Upstream: `https://github.com/chickensintrees/five-forces-explorer`.
The student has no write access there. They work in a fork.

## 1. Orient

1. Read `AGENTS.md`, `SPEC.md` and `CONTRIBUTING.md`. Summarize the project in three sentences.
2. Say which tool you are. Say whether you can run shell commands, use Git, and reach GitHub from here. `docs/students/START-HERE.md` has the path for each tool.
3. If you **cannot** run commands (for example Lovable, or the GitHub web editor), stop here. Walk the student through the "No-install path" in `CONTRIBUTING.md`.

## 2. Check the setup (report results; don't assume)

```bash
git --version          # Git installed?
node --version         # need v22.12 or newer
git remote -v          # are we already inside a clone? of which repo?
gh auth status         # only if the GitHub CLI (gh) is installed
```

- No Git or no Node: give the student the official install link (git-scm.com, nodejs.org LTS) and wait. Alternatively, suggest a browser path such as GitHub Codespaces.
- Not signed in to GitHub: explain how this tool connects to GitHub, using its own settings or `gh auth login`, and let the student do it.

## 3. Fork (ask first)

Explain: *A fork is your own copy of the project on GitHub. You can change it
freely, and later ask Bill to pull your changes in.*

- Easiest: the student opens https://github.com/chickensintrees/five-forces-explorer/fork and clicks **Create fork**.
- With `gh` signed in and the student's OK: `gh repo fork chickensintrees/five-forces-explorer --clone=false`
- Confirm the fork exists: ask for its URL, or run `gh repo view <student>/five-forces-explorer`.

## 4. Clone the fork (local tools only)

Explain: *A clone is a copy of your fork on this computer.*

```bash
git clone https://github.com/<student>/five-forces-explorer.git
cd five-forces-explorer
git remote add upstream https://github.com/chickensintrees/five-forces-explorer.git
```

**Already inside a clone of upstream?** `git remote -v` shows `chickensintrees`
as `origin`. Ask the student first, then run:

```bash
git remote rename origin upstream
git remote add origin https://github.com/<student>/five-forces-explorer.git
```

**Cloud tools** (Codex cloud, Claude Code on the web, Replit) should be
pointed at the **fork**, not at upstream, so that pushes work.

## 5. Run the app

```bash
npm install
npm run dev
```

Give the student the URL that Vite prints. If the tool cannot show a preview,
that is fine; `npm run check` still verifies the work.

## 6. Pick a first issue

- Show 3–5 options from `docs/students/first-issues.md`, or from the issues labeled `good first issue`, that suit the student's interest and comfort level.
- Check that nobody else has claimed it. Suggest a short comment on the issue, such as "I'd like to work on this".
- Bring the latest upstream changes into the fork before starting: `git fetch upstream && git merge upstream/main` on `main`, or use the **Sync fork** button on github.com.

## 7. Plan, then branch

1. Write a 3–6 line plan: which files change, what the student will see, and how it will be tested. If behavior changes, include the spec change (see the `propose-feature` skill).
2. Wait for the student's OK.
3. Create a branch: `git switch -c <short-name>`, for example `add-craft-beer`.

Next: use `add-industry` or `propose-feature` to make the change, then
`verify-and-open-pr` to finish.
