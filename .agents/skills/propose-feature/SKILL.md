---
name: propose-feature
description: Turn an idea for Five Forces Explorer into a written feature spec before any code is written. Use when the user wants a new feature, wants to change how the app behaves, or asks "can we add X". A spec-only pull request is a valid contribution.
---

# Propose a feature (spec first)

`SPEC.md` describes what the app does **today**. A feature spec in
`docs/specs/` describes a proposed change. The code changes only after the spec
is agreed.

## 1. Check the idea against the spec

- Read `SPEC.md` in full, especially §1 (who the app is for, and the **non-goals**) and §4 (architecture).
- Check `docs/specs/` and the open issues for a similar proposal. If one exists, extend it instead of writing a second.
- If the idea conflicts with a non-goal, such as a backend, accounts, AI or paid APIs, a chart library, or tracking, say so plainly. Offer a version that fits, or a spec-only proposal that argues for changing the non-goal.

## 2. Interview the student (one question at a time)

- What problem does this solve, and for which user in SPEC §1?
- What will they see and do? Ask for the smallest version that would still be useful.
- How will we know it works? This becomes the acceptance criteria.

## 3. Write the spec

1. Copy `docs/specs/TEMPLATE.md` to `docs/specs/<short-name>.md`, using a kebab-case name such as `quiz-mode.md`.
2. Fill in every section. Keep it to about one page.
3. Write acceptance criteria that can be checked with a yes or no.
4. List exactly which `SPEC.md` sections would change, and how.
5. Show the spec to the student and revise it until they approve.

## 4. Choose the pull request shape

- **Spec-only PR**: contains just `docs/specs/<short-name>.md`. Good for big or uncertain ideas, and for students who don't want to write code.
- **Spec + implementation PR**: contains the feature spec, the `SPEC.md` edits (including a line in the §7 changelog) and the code, all in **one** PR, so that spec and code never drift apart.

## 5. Implementation rules

- Put logic in `src/lib/` as pure functions with tests in `src/lib/*.test.ts`. Keep components thin.
- Add no new runtime dependencies unless the spec says so.
- Meet SPEC §2.7 accessibility: keyboard use, labels, contrast, and no color-only meaning.
- Follow `docs/workflows/implement.md`, then finish with the `verify-and-open-pr` skill.
