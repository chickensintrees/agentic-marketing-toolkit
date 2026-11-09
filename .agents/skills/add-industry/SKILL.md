---
name: add-industry
description: Add a new illustrative example industry (preset) to Five Forces Explorer. Use when the user wants to add an industry, a preset, or an example such as craft beer or ride-hailing, or is working on a "new industry" issue.
---

# Add an industry preset

A preset is **one new file plus one line in an index file**. It is the
smallest useful contribution. No change to `SPEC.md` is needed, because
SPEC §3.3 already defines presets.

## 1. Read first

- `SPEC.md` §3.1 (the `IndustryPreset` type) and §3.3 (the preset rules).
- `src/data/forces.ts`. Each force lists its drivers. Only these driver `id`s are valid.
- One existing preset, for example `src/data/industries/coffee-shops.ts`, to copy its shape and tone.
- `src/data/industries/index.ts`, to check the industry isn't already there.

## 2. Agree on the profile with the student

Ask the student, and do not invent these on their behalf:

- **Name**, for example "Craft beer".
- **Scope**: which product and which geography, for example "Independent craft breweries selling in the U.S.". Explain that a scope that is too broad or too narrow distorts the analysis.
- **Their view of each force**, if they have one. The student's judgment is the point of the exercise.

## 3. Write `src/data/industries/<id>.ts`

- `<id>` is lowercase kebab-case, such as `craft-beer`, and **equals the file name**.
- Start the file with the comment `// Illustrative teaching example, not verified market research.` and default-export the preset, as the existing files do.
- `profile`: `name`, `scope`, `description` (one or two sentences).
- `assessments` must include **all five** forces: `rivalry`, `newEntrants`, `supplierPower`, `buyerPower`, `substitutes`. Each one has:
  - `rating`: 1–5, where **higher means more pressure on industry profitability**. For example, a high threat of new entrants means entry is easy.
  - `driverIds`: **2–4** ids, each of which exists on **that** force in `forces.ts`.
  - `rationale`: 2–4 sentences that explain the rating.
  - `evidence: 'illustrative'` and `source: ''`.
- **Language rules:** be cautious and general. Use no precise statistics, no market shares, and no claims about named companies.
- Porter treats growth, technology, government and complements as factors, not forces. You can mention them inside a rationale when they shift a force.

## 4. Register it

In `src/data/industries/index.ts`, add the import in alphabetical order with
the others, and add the preset to the **end** of `INDUSTRY_PRESETS`, unless the
student asks for a different position.

## 5. Verify

```bash
npm run test -- src/data   # data-integrity tests: ids, driver ids, counts
npm run check              # the full gate
npm run dev                # load the preset in Analyze; view it in Summary
```

If a data-integrity test fails, read the failure message to find which preset
and which field are wrong. Fix the data, and never edit the test to make it
pass.

## 6. Finish

Use the `verify-and-open-pr` skill. Include a screenshot of the Summary radar
chart for the new industry in the PR.
