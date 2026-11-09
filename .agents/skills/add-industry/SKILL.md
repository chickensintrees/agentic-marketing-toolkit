---
name: add-industry
description: Add a new illustrative example industry (preset) to Five Forces Explorer, the first tool in the Agentic Marketing Toolkit. Use when the user wants to add an industry, a preset, or an example such as craft beer or ride-hailing, or is working on a "new industry" issue.
---

# Add an industry preset

A preset is **one new file plus one line in an index file**, all inside
`src/tools/five-forces/`. It is the smallest useful contribution. No spec
change is needed, because the tool's SPEC §3.3 already defines presets.

## 1. Read first

- `src/tools/five-forces/SPEC.md` §3.1 (the `IndustryPreset` type) and §3.3 (the preset rules).
- `src/tools/five-forces/data/forces.ts`. Each force lists its drivers; only those driver `id`s are valid for that force.
- One existing preset, for example `src/tools/five-forces/data/industries/coffee-shops.ts`, for its shape and tone.
- `src/tools/five-forces/data/industries/index.ts`, to check the industry isn't already there. Also search open PRs: `gh pr list --repo chickensintrees/agentic-marketing-toolkit --search "<industry>"`.

## 2. Agree on the profile with the student

Ask, and don't invent these on the student's behalf:

- **Name**, for example "Craft beer".
- **Scope**: which product and which geography, for example "Independent craft breweries selling in the U.S.". Explain that a scope that is too broad or too narrow distorts the analysis.
- **Their view of each force**, if they have one. The student's judgment is the point of the exercise. Draft ratings for them to react to, and say they are drafts.

## 3. Write `src/tools/five-forces/data/industries/<id>.ts`

- `<id>` is lowercase kebab-case, such as `craft-beer`, and **equals the file name**.
- Copy the existing file's structure: `import type { IndustryPreset } from '../../types'`, the comment `// Illustrative teaching example, not verified market research.`, a `preset` constant, and `export default preset`.
- `profile`: `name`, `scope`, `description` (one or two sentences).
- `assessments` must include **all five** forces: `rivalry`, `newEntrants`, `supplierPower`, `buyerPower`, `substitutes`. Each has:
  - `rating`: 1–5, where **higher means more pressure on industry profitability**. A high threat of new entrants means entry is easy.
  - `driverIds`: **2–4** ids, each of which exists on **that** force in `forces.ts`.
  - `rationale`: 2–4 sentences explaining the rating.
  - `evidence: 'illustrative'` and `source: ''`.
- **Language rules:** cautious and general. No precise statistics, no market shares, no claims about named companies.
- Porter treats growth, technology, government and complements as factors, not forces. Mention them inside a rationale only as things that shift a force.

## 4. Register it

In `src/tools/five-forces/data/industries/index.ts`, add the import with the
others and add the preset to the **end** of `INDUSTRY_PRESETS`. Change nothing
else in that file; other students are adding lines to it too.

## 5. Verify

```bash
npm run test -- src/tools/five-forces/data   # data-integrity tests: ids, drivers, counts
npm run check                                # the full gate
npm run dev                                  # open #/five-forces/analyze, load the preset, then view Summary
```

If a data-integrity test fails, its message names the preset and the field.
Fix the data; never edit the test to make it pass.

## 6. Finish

Use `verify-and-open-pr`. Add a screenshot of the Summary radar chart for the
new industry to the PR.
