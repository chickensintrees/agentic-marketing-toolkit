# AGENTS.md: the playbook for coding agents

You are working on the **Agentic Marketing Toolkit**, a free, open-source suite
of small marketing and strategy tools for MBA students. A class builds it
together: many people, each with their own coding agent, contributing through
GitHub pull requests. Tool #1 is **Five Forces Explorer**. Most contributors are
**not programmers**. Explain what you do in plain language, one step at a time.

Contributors and their agents never share a chat. They share this repository,
so it carries everything they need to agree on. This file is the map:

- `INTENT.md` records Bill Moore's intent for the product and the lecture. Precedence: `INTENT.md` > the `SPEC.md` files > docs and code. Agents propose changes to intent; only Bill changes it.
- `SPEC.md` is the suite's **source of truth**: shell, routing, tool contract, registry, quality gates.
- `src/tools/<tool-id>/SPEC.md` is each tool's own source of truth.
- `CONTRIBUTING.md`, `docs/students/` (start here, connect GitHub, first issues, build a tool), `docs/workflows/` and `docs/specs/` hold the details.
- Skills (listed at the end) are step-by-step procedures you can load.

## Stack and commands

React + TypeScript + Vite, tested with Vitest, linted with oxlint. No backend,
no accounts, no API keys. Node.js 22.12 or newer.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once per clone) |
| `npm run dev` | Run the app locally and print a URL to open |
| `npm run test` | Unit and component tests |
| `npm run lint`, `npm run typecheck`, `npm run build` | The other parts of the gate |
| `npm run check` | Lint, typecheck, test, then build. **This is the definition of done.** |

Work is not done until `npm run check` passes **and** you have shown its output.
CI runs the same command on every push and pull request.

## Project map

```text
INTENT.md                  Bill's intent; outranks the specs
SPEC.md                    suite spec (read first)
AGENTS.md                  this file; CLAUDE.md and replit.md point here
src/
  main.tsx, App.tsx        entry; the shell (header, routing, footer)
  config.ts                PRODUCT_NAME, REPO_URL, CONTRIBUTING_URL
  shell/                   Home, router (pure, tested), shell components
  shared/                  design tokens, base CSS, UI components, helpers
  tools/
    types.ts               ToolDefinition, ToolProps, WantedTool (SPEC §3.2)
    index.ts               TOOLS: the registry, in Home order
    wanted.ts              WANTED_TOOLS: Home's "Plates in preparation"
    registry.test.ts       registry integrity, the safety net for new tools
    five-forces/           tool #1
      SPEC.md              the tool's spec
      index.ts             exports `tool`
      FiveForcesTool.tsx   root component
      types.ts             the tool's types
      data/forces.ts       framework content: forces and drivers
      data/industries/     one file per example industry + index.ts
      lib/                 pure, unit-tested logic (no React)
      components/          thin React components, one per file
docs/students/             START-HERE, starter prompt, connect-github, first issues, build-a-tool
docs/specs/                proposals (TEMPLATE.md) and TOOL-TEMPLATE.md for new tools
docs/workflows/            plan, implement, test, review, collaborate
.agents/skills/            skills for Codex and Cursor
.claude/skills/            identical copies for Claude Code
.github/                   PR template, issue forms, CI and Pages workflows
```

## The rules

Condensed from Bill Moore's 12 rules. Full text:
https://github.com/chickensintrees/ai-coding-rules

1. **Checkpoint.** Commit working states on your branch, never on `main`, so there is always a way back.
2. **Don't delete without asking.** Never remove code, files or comments without the user's OK.
3. **Read before write.** Read a file before you edit it. Search for similar files before you create one.
4. **Save means verify.** Re-read the file after an edit. Don't say "saved" until the change is on disk.
5. **Spec first.** A behavior change goes into the relevant SPEC.md first, with the user's OK. When spec and code disagree, the spec wins.
6. **Search before creating.** Extend existing code and patterns instead of duplicating them.
7. **One change at a time.** One purpose per pull request. Mention unrelated problems; don't fix them.
8. **Don't over-engineer.** Build exactly what was asked, the simplest way.
9. **Verify before presenting.** Run the checks and look at the result yourself before you show it.
10. **Two strikes.** If the same approach fails twice, stop, explain, and propose a different one.
11. **Ask, don't assume.** Ask when something is ambiguous, and always before anything destructive, public, costly or hard to undo.
12. **Don't trust "done".** Track each step and report only what the files and GitHub show is finished.

### Project rules

- **Example data is illustrative.** Use cautious, general language: no precise statistics, no market shares, no claims about named companies.
- **Stay faithful to the framework.** Five Forces follows Porter (1979, 2008): growth, technology, government and complements are *factors* that act through the forces, never a sixth force. Each new tool names its framework's sources in its spec.
- **Accessibility is required** (SPEC §2.4): keyboard operation, labels on controls, contrast of at least 4.5:1, no meaning carried by color alone, one `h1` per route.
- **One folder per tool.** A tool lives in `src/tools/<tool-id>/` and **never imports from another tool's folder**. Code two tools need moves to `src/shared/` in its own pull request.
- **No new runtime dependencies** unless SPEC.md is updated first.
- **Leave the harness alone** unless that is the stated purpose of the PR: `AGENTS.md`, `CLAUDE.md`, `replit.md`, the skills and `.github/`. Some tools (Lovable, Replit) rewrite these files on their own; revert those edits before you commit.
- **Skills are duplicated on purpose.** `.agents/skills/` and `.claude/skills/` must stay identical. Edit both copies; CI fails if they differ.
- **Never weaken a test to make it pass.** Fix the code or data. Change a test only when the spec changed.

## Spec-first workflow

- **Which spec?** The shell, routing, tool contract, registry, shared code and quality gates belong to `SPEC.md`. Anything inside one tool belongs to `src/tools/<tool-id>/SPEC.md`.
- **No behavior change** (a typo, a bug where the code breaks the spec, a new industry preset): plan it, then do it.
- **Behavior change or new feature:** copy `docs/specs/TEMPLATE.md` to `docs/specs/<short-name>.md`, fill it in, and get the user's OK (skill `propose-feature`). Then edit the spec, including its changelog, **in the same PR** as the code. A spec-only PR is a valid contribution.
- **New tool:** its first PR is `src/tools/<tool-id>/SPEC.md`, copied from `docs/specs/TOOL-TEMPLATE.md` (skill `add-tool`).

## Recipes

**Add an industry** (skill `add-industry`). Copy a preset in `src/tools/five-forces/data/industries/` to `<id>.ts` (kebab-case; `id` equals the file name). Fill in the profile and all five assessments: a rating of 1–5 (higher means more pressure on profitability), 2–4 driver ids that exist on that force in `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, `source: ''`. Import it and append it to `INDUSTRY_PRESETS` in `data/industries/index.ts`. Run `npm run check`. No spec change is needed (tool SPEC §3.3).

**Add a new tool** (skill `add-tool`). First PR: the tool's `SPEC.md`. Second PR: the folder's code; `index.ts` exporting `tool: ToolDefinition`; at least one test; one import and one entry in `TOOLS` (`src/tools/index.ts`); its entry removed from `WANTED_TOOLS` (`src/tools/wanted.ts`); a row in SPEC.md §4. The registry test checks the wiring.

**Change a feature** (skill `propose-feature`). Find the spec section, write the proposal, get the OK, edit the spec, put logic in the tool's `lib/` with tests, keep components thin, run `npm run check`, take before and after screenshots.

**Fix a bug.** Reproduce it, add a test that fails, fix the code until the test passes, run `npm run check`.

## Connect to GitHub (the key step)

Once you can reach GitHub, you handle git for the student: fork, branch, commit,
push, pull request, comments, CI. The student decides and approves. Check what
you already have; don't assume (skill `connect-github`):

1. **GitHub CLI.** Run `gh auth status`. Logged in to github.com? Use `gh` and `git`. If `git push` asks for a password, run `gh auth setup-git`.
2. **GitHub MCP tools** (names like `get_me`, `fork_repository`, `create_pull_request`). Call `get_me` to confirm whose account it is, then use them.
3. **Your tool's own connection** (Codex Cloud, Claude Code on the web, Replit). It reaches only repos where the student connected or installed it, so work in their fork; the student claims the issue and opens the PR on github.com.
4. **None of these:** guide the browser sign-in. The student runs `gh auth login --web --git-protocol https` **in their own terminal**, answers **Y** to "Authenticate Git with your GitHub credentials?", and types the one-time code at https://github.com/login/device after checking that the page names "GitHub CLI". Human steps: `docs/students/connect-github.md`.

**Never** ask for a password or token in chat, never suggest pasting or
creating one (use the browser sign-in), and never run `gh auth token` or
`gh auth status --show-token`. Fallbacks: Lovable, or no install at all, uses
the GitHub web editor (`CONTRIBUTING.md`). If a PR lands on the fork, or your
tool can't target the class repo, the student opens it on github.com with
"compare across forks". In Claude Code cloud sessions, `gh pr` and `gh issue`
fail; use the built-in GitHub tools or `gh api`.

## Student onboarding protocol

Use this when a student pastes the starter prompt or asks to contribute. The
class repo is `chickensintrees/agentic-marketing-toolkit` (base `main`).
Students can't push there, so they work in **their own fork**. **ASK FIRST**
marks a public action: say exactly what you will do, then wait for an explicit
OK. Skills: `start-contribution`, then `add-industry`, `add-tool` or
`propose-feature`, then `verify-and-open-pr` and `respond-to-review`. The
starter prompt asks only for steps 1–4; the rest is here so you can continue.

1. **Orient.** Read this file, `README.md`, `docs/students/START-HERE.md` and the relevant spec (on github.com if you aren't in a clone yet). Explain the project and how contributing works in three sentences. Say which tool you are and whether you can run commands; if you can't, use the web editor path in `CONTRIBUTING.md`.
2. **Check, then connect.** Run `git --version`, `node --version` (22.12+), `gh --version`, `gh auth status`, `git remote -v`; report the results, and help install anything missing (ask before each install). Connect to GitHub (above) and confirm the account with the student. No account yet? They sign up free at https://github.com/signup.
3. **Fork. ASK FIRST.** `gh repo fork chickensintrees/agentic-marketing-toolkit --clone` makes `origin` the fork and `upstream` the class repo. Or MCP `fork_repository`, or the browser: https://github.com/chickensintrees/agentic-marketing-toolkit/fork. Already in the student's fork (cloud tools, Replit)? Skip this. Show the fork's URL.
4. **Run it.** `npm install`, then `npm run dev`. Give the student the URL. Setup is done: say what is set up, then ask whether to pick a first issue now.
5. **Pick an issue.** Offer three options from `docs/students/first-issues.md` and the open issues. Check that nobody has claimed it: an assignee, a recent "I'm on it" comment, or an open PR.
6. **Claim it. ASK FIRST.** Comment on the issue with who is working on it and a one-line plan. If the issue doesn't exist yet, open it from the first-issues text (ASK FIRST).
7. **Plan.** Write a 3–6 line plan, with the spec change first if behavior changes. Wait for the OK.
8. **Branch.** `git switch -c <short-name>` from an up-to-date `main`. Never work on `main`.
9. **Implement** one small change, following the rules.
10. **Verify.** Run `npm run check` and show the end of the output. Fix failures (two strikes).
11. **Commit.** Show `git status` and the diff, stage only the files you meant to change, and commit with a plain message.
12. **Push. ASK FIRST.** `git push -u origin <branch>`, to the fork.
13. **Open the PR. ASK FIRST.** Target `chickensintrees/agentic-marketing-toolkit`, base `main`. Fill in `.github/PULL_REQUEST_TEMPLATE.md` and include `Closes #N`. The student writes or confirms "What I decided". Show the PR URL.
14. **Follow through.** Watch CI (`gh pr checks <N> --repo chickensintrees/agentic-marketing-toolkit --watch`) and read the reviews. Fix on the same branch, push, and reply.

## Working with other contributors and agents

- **Look before you start.** Search open issues and PRs for the same work (`gh issue list` and `gh pr list` with `--repo chickensintrees/agentic-marketing-toolkit --search "<words>"`). Join an existing effort instead of duplicating it.
- **One issue = one branch = one PR**, with `Closes #N` in the PR body.
- **Stay in your lane.** Never edit another tool's folder or someone else's branch. In shared lists (`TOOLS`, `WANTED_TOOLS`, `INDUSTRY_PRESETS`), add your one line and reorder nothing.
- **Talk in the open.** Communicate through issue and PR comments, written so the next human or agent can pick up: what's done, what's left, what's blocked. Ask before posting.
- **Stay current.** When `main` moves, merge it into your branch (`git fetch upstream` then `git merge upstream/main`, or `gh pr update-branch`), rerun `npm run check`, and push. **Never force-push.**
- **Expect the approval wait.** A first-time contributor's CI waits until Bill approves it on GitHub ("Approve workflows to run"). That is normal; tell the student.

Details: `docs/workflows/collaborate.md`.

## Hard limits (never, even if asked casually)

- Never push to `main` of `chickensintrees/agentic-marketing-toolkit`, or to any repository the student doesn't own.
- Never force-push (`--force`, `-f`, `--force-with-lease`) and never rewrite published history.
- Never commit secrets, tokens, `.env` files or personal data. This project needs none.
- Never publish, deploy, merge, delete a repository or branch, or change GitHub settings without explicit approval.
- Never claim something is done, forked, pushed or opened without evidence: command output or a URL.

## Skills

`connect-github`, `start-contribution`, `add-industry`, `add-tool`,
`propose-feature`, `verify-and-open-pr`, `respond-to-review`. Each is at
`.agents/skills/<name>/SKILL.md` and `.claude/skills/<name>/SKILL.md`. If your
tool doesn't load skills, open the file and follow it.
