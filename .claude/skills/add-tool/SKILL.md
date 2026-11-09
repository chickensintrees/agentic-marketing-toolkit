---
name: add-tool
description: Propose and build a new tool in the Agentic Marketing Toolkit suite (for example SWOT Builder or a break-even calculator), spec first. Use when the user wants to build a tool from the wanted-tools list, propose a new tool, or is working on a "build <tool>" issue.
---

# Add a new tool

A tool is **one folder**, `src/tools/<tool-id>/`, plus one line in the
registry. It is built in **two pull requests**: first its spec, then its code.
Read `SPEC.md` §3 (the tool contract) and §2.4 (accessibility and design)
before you start, and look at `src/tools/five-forces/` as the worked example.

## 1. Choose the tool

- From the wanted list: `src/tools/wanted.ts` (`WANTED_TOOLS`). Use its `id` as the folder name.
- Or the student's own idea: it needs an issue first (the "New tool" issue form), so others can comment. Pick a kebab-case id that isn't in `TOOLS` or `WANTED_TOOLS`.
- Check nobody is already on it: search issues and PRs for the tool's name.

## 2. PR 1: the spec (ASK FIRST before pushing or opening it)

1. Copy `docs/specs/TOOL-TEMPLATE.md` to `src/tools/<tool-id>/SPEC.md`. Add no other files to the folder yet.
2. Interview the student, one question at a time:
   - Which framework does it teach, and what are its sources?
   - Who uses it, and what do they walk away with (an export, a chart, a decision)?
   - What are the views, and what does the user do in each?
   - What is the **smallest version** that would still help a student in class?
3. Fill in every section. Write requirements and tests that can be checked with yes or no. Respect the suite non-goals (SPEC §1): no backend, no accounts, no AI or paid APIs, no chart, router or CSS libraries.
4. Open the PR with the title "Spec: <Tool name>". Use `verify-and-open-pr`. Get feedback from Bill and classmates in the PR or the issue, and revise.

## 3. PR 2: the build (after the spec is merged or approved)

Branch from an up-to-date `main`. Inside `src/tools/<tool-id>/`:

```text
SPEC.md              already there
index.ts             export const tool: ToolDefinition = { id, name, framework?, tagline, Component }
<Name>Tool.tsx       root component; receives { subpath, navigate } (SPEC §3.2)
types.ts             the tool's types
lib/*.ts             pure logic (no React), each with lib/*.test.ts
components/          thin React components, one per file
data/                any illustrative content
```

Rules:

- `id` equals the folder name. Import only from `src/shared/` and this folder, never from another tool.
- Storage key, if the tool saves anything: `agentic-marketing-toolkit:<tool-id>:v1`. Reads must survive missing, throwing or corrupted storage.
- Use the shared design tokens and components in `src/shared/`. No new colors, no new dependencies.
- One `h1` (the tool's name), labels on every control, keyboard operable, no color-only meaning.

Then wire it up, changing **only** your lines:

1. `src/tools/index.ts`: add `import { tool as <camelName> } from './<tool-id>'` and append it to `TOOLS`.
2. `src/tools/wanted.ts`: remove the tool's entry from `WANTED_TOOLS`, in the same PR.
3. `SPEC.md` §4: add a row to the tools table.
4. The tool's `SPEC.md` changelog: add the version you built.

## 4. Verify

```bash
npm run test      # includes src/tools/registry.test.ts, which checks the wiring
npm run check
npm run dev       # open #/<tool-id> and walk through every view with the keyboard
```

The registry test's messages say exactly what's missing (an unregistered folder,
no `SPEC.md`, no test file, or an id still listed in `WANTED_TOOLS`).

## 5. Finish

Use `verify-and-open-pr`, with screenshots of each view. If a later change is
needed in `src/shared/`, open it as its own small PR.
