---
name: propose-feature
description: Turn an idea for the Agentic Marketing Toolkit or one of its tools into a written spec change before any code is written. Use when the user wants a new feature, wants to change how the app or a tool behaves, or asks "can we add X". A spec-only pull request is a valid contribution.
---

# Propose a feature (spec first)

The specs describe what the app does **today**. A proposal in `docs/specs/`
describes a change. Code changes only after the proposal is agreed, and the
spec and the code then change **in the same pull request**.

## 1. Find the right spec

- Inside one tool (its views, data, export): `src/tools/<tool-id>/SPEC.md`.
- Shared by the suite (shell, Home, routing, tool contract, registry, shared components, quality gates): `SPEC.md`.
- Read that spec in full, especially who it is for and the **non-goals**.

## 2. Check for overlap and conflicts

- Look in `docs/specs/` and the open issues and PRs for a similar idea. If one exists, add to it instead of writing a second.
- If the idea conflicts with a non-goal (a backend, accounts, AI or paid APIs, tracking, a chart or router library), say so plainly. Offer a version that fits, or a spec-only proposal that argues for changing the non-goal.
- If the idea is really a new tool, use `add-tool` instead.

## 3. Interview the student (one question at a time)

- What problem does this solve, and for which user in the spec?
- What will they see and do? Ask for the smallest version that would still be useful.
- How will we know it works? This becomes the acceptance criteria.

## 4. Write the proposal

1. Copy `docs/specs/TEMPLATE.md` to `docs/specs/<short-name>.md` (kebab-case, for example `plate-svg-download.md`).
2. Fill in every section; keep it to about a page.
3. Write acceptance criteria that can be checked with yes or no.
4. List exactly which spec sections change, and how.
5. Show it to the student and revise until they approve.

## 5. Choose the pull request shape

- **Spec-only PR:** just `docs/specs/<short-name>.md`. Good for big or uncertain ideas, and for students who don't want to write code. Title it "Proposal: <idea>".
- **Spec + implementation PR:** the proposal, the spec edits (including a changelog line: suite `SPEC.md` §8 or the tool's changelog section) and the code, all in **one** PR, so spec and code never drift apart.

## 6. Implementation rules

- Logic goes in the tool's `lib/` as pure functions with tests next to them. Components stay thin.
- Shared code goes in `src/shared/`, in its own PR. Never import across tools.
- No new runtime dependencies unless the spec says so.
- Meet SPEC §2.4: keyboard use, labels, contrast, no color-only meaning.
- Follow `docs/workflows/implement.md`, then finish with `verify-and-open-pr`.
