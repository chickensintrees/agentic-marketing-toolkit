# Test

One command answers "is this done?":

```bash
npm run check
```

It runs four steps in order and stops at the first failure:

| Step | Command | Catches |
|---|---|---|
| Lint | `npm run lint` | Code problems and style issues (oxlint). Warnings count as errors. |
| Typecheck | `npm run typecheck` | Type errors: a missing field, a wrong id type, a typo in a name (TypeScript, strict). |
| Test | `npm run test` | Broken behavior (Vitest). |
| Build | `npm run build` | Anything that would stop the site from building. |

CI runs the same command on every push and pull request, plus a check that
`.agents/skills` and `.claude/skills` are identical.

## The safety-net tests

These exist so that many students can add things without breaking each other:

- **Registry integrity** (`src/tools/registry.test.ts`): every tool folder with an `index.ts` is registered in `TOOLS`, has a `SPEC.md` and a test file, and has an id equal to its folder name; no wanted tool is already built.
- **Preset integrity** (`src/tools/five-forces/data/industries.test.ts`): every industry file is registered, its id matches its file name, all five forces are rated, and every driver id exists on its force.
- **Framework content** (`src/tools/five-forces/data/forces.test.ts`): five forces in order, 4–9 drivers each.

Their failure messages name the file and the problem. Read the first failure,
fix the cause, rerun.

## Rules

- **Never weaken, skip or delete a test to make it pass.** Fix the code or the data. A test changes only when the spec changed, in the same PR.
- **New logic gets a new test**, next to it in `lib/`.
- **A bug fix starts with a failing test** that reproduces the bug.
- **Run a subset while working**, the full gate before you finish: `npm run test -- src/tools/<tool-id>`.

## Check it by hand too

`npm run dev`, then open the page your change affects (for example
`#/five-forces/summary`). Try it with only the keyboard. For a UI change,
take before and after screenshots for the pull request.

## Show the evidence

Show the human the end of the `npm run check` output: the test summary and the
build result. "It should work" is not evidence (rule 12).

Next: [review.md](review.md).
