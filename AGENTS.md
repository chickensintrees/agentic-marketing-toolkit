# AGENTS.md: the playbook for coding agents

You are working on **Five Forces Explorer**, a free, open-source, single-page
web app that teaches Porter's Five Forces by having the user analyze a real
industry. It was built for a marketing MBA guest lecture at West Virginia
University. Students extend it through pull requests, and most of them are
**not programmers**. Explain what you do in plain language.

This file is a map. The details live in the files it points to:

- `SPEC.md` is the **single source of truth** for what the app does. Read it before any work.
- `CONTRIBUTING.md` explains how a contribution is reviewed.
- `docs/workflows/` has the plan, implement, test and review procedures.
- The skills (below) are step-by-step procedures you can load.

## Stack and commands

React + TypeScript + Vite, tested with Vitest and linted with oxlint. There is
no backend, no API keys and no accounts. You need Node.js 22.12 or newer.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once, after cloning) |
| `npm run dev` | Start the app locally and print a URL to open |
| `npm run test` | Run the unit and component tests |
| `npm run check` | Lint, typecheck, test, then build. **This is the definition of done.** |

Work is not done until `npm run check` passes **and** you have shown its
output. CI runs the same command on every pull request.

## Project map

```text
SPEC.md                    source of truth (read first)
AGENTS.md                  this file; CLAUDE.md and replit.md point here
src/
  main.tsx                 entry
  App.tsx                  layout, navigation, view switching
  config.ts                REPO_URL and other fork-editable constants
  types.ts                 shared types (SPEC §3.1)
  data/forces.ts           framework content: forces and their drivers
  data/industries/         one file per example industry + index.ts
  lib/                     pure, unit-tested logic (no React)
  components/              React components, one per file
  test/setup.ts            test setup
docs/specs/                feature proposals (copy TEMPLATE.md)
docs/workflows/            plan.md, implement.md, test.md, review.md
docs/students/             START-HERE.md, starter prompt, first issues
.agents/skills/            skills for Codex and Cursor
.claude/skills/            identical copies for Claude Code
.github/                   PR template, issue forms, CI and Pages workflows
```

Business logic goes in `src/lib` as pure functions with tests. Components stay
thin. Add no runtime dependencies unless SPEC.md is updated first.

## The rules

These are a condensed version of Bill Moore's 12 rules. The full text is at
https://github.com/chickensintrees/ai-coding-rules.

1. **Checkpoint.** Commit working states on your branch, never on `main`, so there is always a way back.
2. **Don't delete without asking.** Never remove code, files or comments without the user's confirmation.
3. **Read before write.** Read a file before you edit it. Search for similar files before you create one.
4. **Save means verify.** After an edit, re-read the file to confirm the change landed before you say "saved".
5. **Spec first.** If a change alters behavior, update `SPEC.md` (or write a proposal in `docs/specs/`) first and get the user's OK, then change the code. When spec and code disagree, the spec wins.
6. **Search before creating.** Look for existing code and patterns, then extend them rather than duplicate them.
7. **One change at a time.** One logical change per step and one purpose per pull request. Mention unrelated problems instead of fixing them.
8. **Don't over-engineer.** Build exactly what was asked, the simplest way.
9. **Verify before presenting.** Run the checks and look at the result yourself before you show it.
10. **Two strikes.** If the same approach fails twice, stop, explain what happened and propose a different approach.
11. **Ask, don't assume.** When something is ambiguous, ask. Always ask before anything destructive, public, costly or hard to undo.
12. **Don't trust "done".** Track each step, check it against the real state of files and GitHub, and report what is actually finished.

Project-specific rules:

- **Example ratings are illustrative.** Use cautious, general language: no precise statistics, no market shares, and no claims about named companies.
- **Stay faithful to Porter (1979, 2008).** Growth, technology, government and complements are *factors* that act through the five forces. Never add a sixth force.
- **Accessibility is required**: keyboard operation, labels on controls, contrast, and no information carried by color alone (SPEC §2.7).
- **Leave the harness alone.** Do not change `AGENTS.md`, `CLAUDE.md`, `replit.md`, the skills or `.github/` unless that is the stated purpose of the pull request. Some tools rewrite these files on their own, so revert those edits.
- **Skills are duplicated on purpose.** `.agents/skills/` and `.claude/skills/` must stay identical. Edit both copies; CI fails if they differ. Cursor may list each skill twice.

## Spec-first workflow

1. Read the relevant part of `SPEC.md`.
2. **Small fix with no behavior change** (a typo, a bug where the code breaks the spec, a new industry preset): plan it, then do it.
3. **Behavior change or new feature**: copy `docs/specs/TEMPLATE.md` to `docs/specs/<short-name>.md`, fill it in, and get the user's OK. Then update `SPEC.md` (including the §7 changelog) **in the same pull request** as the code.
4. Implement, run `npm run check`, review the diff, and open the pull request.

## Recipes

**Add an industry preset** (skill: `add-industry`)

1. Choose a kebab-case id, such as `craft-beer`, and confirm it is not already in `src/data/industries/`.
2. Copy an existing preset, such as `src/data/industries/coffee-shops.ts`, to `src/data/industries/<id>.ts`. Set `id` to the file name.
3. Fill in the profile (name; scope = which product and which geography; description) and all five assessments. Each needs a rating from 1 to 5 (higher means more pressure on profitability), 2–4 `driverIds` that exist on that force in `src/data/forces.ts`, a rationale of 2–4 sentences, `evidence: 'illustrative'` and `source: ''`.
4. Register it in `src/data/industries/index.ts`: add the import, then add it to the end of `INDUSTRY_PRESETS`.
5. Run `npm run test` (the data-integrity tests catch bad ids), then `npm run check`. Load it in `npm run dev`.

A new preset needs no change to `SPEC.md`, because SPEC §3.3 already covers presets.

**Change a feature** (skill: `propose-feature`)

1. Find the SPEC.md section that describes the feature, and write a short plan.
2. Write the spec change first (step 3 of the workflow above), and wait for approval.
3. Put logic in `src/lib/` with tests, and keep the component change thin.
4. Run `npm run check` and take screenshots of the UI before and after.

**Fix a bug:** reproduce it, add a test that fails, fix the code until the test passes, then run `npm run check`.

## Student onboarding protocol

Use this protocol when a student pastes this repository's URL into you, or asks
to contribute. Students do **not** have write access to
`chickensintrees/five-forces-explorer`. They work in **their own fork** and
propose changes with a pull request (PR). The skill `start-contribution` has
the full commands. If you cannot run commands (for example Lovable or the
GitHub web editor), use the "No-install path" in `CONTRIBUTING.md`.

1. **Read** this file, `SPEC.md` and `CONTRIBUTING.md`, and summarize the project in three sentences.
2. **Identify your tool.** Say which tool you are and what you can do here: run commands, use Git, reach GitHub. Ask the student if you are unsure. `docs/students/START-HERE.md` has the path for each tool.
3. **Check, don't assume.** Run what you can and report the results plainly: `git --version`, `node --version`, `git remote -v`, and `gh auth status` if `gh` is installed. Never ask for passwords or tokens in chat. Do not install software or sign in on the student's behalf without asking.
4. **Explain fork vs clone.** A *fork* is the student's own copy on GitHub. A *clone* is a copy of that fork on the computer, or in the tool's cloud workspace.
5. **Fork. ASK FIRST.** The easiest way is in the browser: https://github.com/chickensintrees/five-forces-explorer/fork. If you are already inside a clone of `chickensintrees/...`, ask before changing remotes, then point `origin` at the fork.
6. **Clone the fork** if you are working locally, and add `upstream` for the original repository.
7. **Run it.** Run `npm install`, then `npm run dev`, and give the student the URL to open.
8. **Pick a first issue** from `docs/students/first-issues.md` or the issues labeled `good first issue`. Suggest commenting on the issue to claim it.
9. **Plan.** Write a short plan, plus a spec update if behavior changes, and wait for the student's OK.
10. **Branch.** Run `git switch -c <short-name>`. Never work on `main`.
11. **Implement** one small change and follow the rules above.
12. **Verify.** Run `npm run check` and show the end of the output. Fix any failures, keeping the two-strikes rule.
13. **Commit.** Show `git status` and `git diff`, stage only the files you intended, and commit.
14. **Push. ASK FIRST.** Run `git push -u origin <branch>` to the **fork**.
15. **Open the PR. ASK FIRST.** Target `chickensintrees/five-forces-explorer`, base `main`, and fill in `.github/PULL_REQUEST_TEMPLATE.md`. Draft the answers, but the student writes or confirms "what you decided". Tell the student that a first-time contributor's checks wait until the maintainer clicks "Approve and run".

## Hard limits (never, even if asked casually)

- Never push to `main` of `chickensintrees/five-forces-explorer`, and never push to any repository the student does not own.
- Never force-push (`--force`, `-f`) and never rewrite published history.
- Never commit secrets, tokens, `.env` files or personal data. This project needs none.
- Never publish, deploy, merge, or change GitHub settings without explicit approval.
- Never claim something is done, forked, pushed or opened without showing the evidence: command output or a URL.
