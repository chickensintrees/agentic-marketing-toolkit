# Plan

Every change starts with a short plan that the human approves. A plan is
cheap; rebuilding the wrong thing is not.

## Steps

1. **Read the issue** and its comments: `gh issue view <N> --repo chickensintrees/agentic-marketing-toolkit --comments`. Check nobody else is on it (see [collaborate.md](collaborate.md)).
2. **Read the spec section** the change touches. Inside one tool: `src/tools/<tool-id>/SPEC.md`. Shared shell, registry or quality gates: `SPEC.md`.
3. **Find the files.** Search before creating (rule 6). Look at how the same thing is already done, for example an existing industry preset or the Five Forces folder.
4. **Decide the size.**
   - No behavior change (typo, bug where code breaks the spec, new industry preset): plan, then implement.
   - Behavior change or new feature: write a proposal first (`docs/specs/TEMPLATE.md`, skill `propose-feature`).
   - New tool: spec PR first (`docs/specs/TOOL-TEMPLATE.md`, skill `add-tool`).
5. **Write the plan** and show it to the human.
6. **Wait for the OK.** Change the plan, not the code, if they disagree.

## What a plan looks like

Three to six lines:

```text
Goal: add a craft beer preset to Five Forces Explorer (issue #12).
Spec: none needed (Five Forces SPEC §3.3 covers presets).
Files: new src/tools/five-forces/data/industries/craft-beer.ts; one line in data/industries/index.ts.
You'll see: "Craft beer" in the Plate's row of industry emblems and in Summary's "Compare with" list.
Check: npm run check (data-integrity tests), then load it in npm run dev.
Your call: the scope and the five ratings. I'll draft, you decide.
```

## Signs the plan is too big

- More than one purpose ("add the preset and also restyle the emblems").
- It touches another tool's folder, or `src/shared/` alongside a tool change.
- It needs a new dependency.

Split it into separate issues and pull requests, and say so.

Next: [implement.md](implement.md).
