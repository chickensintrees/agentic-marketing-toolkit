# Five Forces Explorer — Specification

> **This file is the single source of truth.** Changes flow through this spec
> before they flow into code. If the code and this spec disagree, the spec wins
> and the code is fixed (or the spec is deliberately updated first, in the same
> pull request). See [AGENTS.md](AGENTS.md) for the workflow.

## 1. What this is

Five Forces Explorer is a free, open-source, single-page web app that teaches
**Porter's Five Forces** by having the user analyze a real industry.

It was built live with coding agents for a marketing MBA guest lecture, and it
is designed to be **extended by students through pull requests**. Its second
purpose is to be a clean, worked example of *harness engineering*: the
repository carries the rules, specs, skills, and automated checks that let a
coding agent work on it safely.

### Who it is for

| User | Needs |
|---|---|
| **Student learning the framework** | Clear explanations of each force, its drivers, and what "high" and "low" look like. |
| **Student analyzing an industry** | A guided, step-by-step exercise; a way to explain reasoning; a visual summary; an export to hand in or discuss. |
| **Instructor / presenter** | A reliable demo with credible example industries and no setup, accounts, or API keys. |
| **Student contributor** | A small, well-organized codebase where adding an industry or a feature is a contained change that automated checks can verify. |

### Non-goals (version 1)

- No backend, accounts, database, analytics, or tracking.
- No calls to AI or other paid APIs, and no credentials of any kind.
- No router library, chart library, or CSS framework. Plain React + CSS.
- Not market research. Example ratings are teaching illustrations.

## 2. Product requirements

### 2.1 Layout and navigation

- One page with a header (app name, one-line purpose), three primary views,
  and a footer.
- Primary views, in order: **Learn**, **Analyze**, **Summary**. Navigation is
  a set of buttons with `aria-current="page"` (or an ARIA tabs pattern) that
  works with keyboard alone.
- The selected view is reflected in the URL hash (`#learn`, `#analyze`,
  `#summary`) so a presenter can link straight to a view. Unknown or missing
  hash → Learn.
- Footer: link to the GitHub repository (from `src/config.ts`, so a fork can
  change one constant), "Contribute" link to `CONTRIBUTING.md` on GitHub, and
  the disclaimer: *"Example ratings are illustrative teaching material, not
  verified market research."*

### 2.2 Learn view

1. **Framework overview.** What the framework is for (industry structure
   shapes the average profitability of an industry and therefore strategy),
   the five forces with rivalry at the center, and a short reminder that the
   strongest force or forces matter most.
2. **Five force cards.** One card per force showing its name and its core
   question. Selecting a card reveals that force's full detail (expandable
   card, disclosure, or detail panel — keyboard accessible either way).
3. **Force detail** contains:
   - a 1–2 sentence summary,
   - the **drivers** that make the force stronger (from `src/data/forces.ts`),
   - *The force is high when…* and *The force is low when…* bullet lists,
   - one short illustrative example,
   - one common misconception.
4. **"Factors, not forces."** A callout explaining that industry growth rate,
   technology and innovation, government policy, and complementary products
   are *factors* that act through the five forces rather than forces
   themselves.
5. **Sources.** Porter, M. E. (1979), "How Competitive Forces Shape
   Strategy," *Harvard Business Review*; Porter, M. E. (2008), "The Five
   Competitive Forces That Shape Strategy," *Harvard Business Review* 86(1).
6. A call to action that moves the user to Analyze.

### 2.3 Analyze view (the guided exercise)

A stepper with these steps. The user can move Back/Next and also jump to any
step from a step list that shows completion state.

| Step | Content |
|---|---|
| 0. **Industry** | Choose a preset industry or "Custom industry". Edit the profile: **name**, **scope** (which product and which geography — e.g. "U.S. domestic passenger air travel"), and **description/notes**. Explain why defining scope matters (too broad or too narrow distorts the analysis). |
| 1–5. **One step per force**, in this order: rivalry, threat of new entrants, supplier power, buyer power, threat of substitutes | See *Force step* below. |
| 6. **Implications** | Two free-text prompts: (a) *Which force or forces matter most here, and why?* (b) *How could a company respond — position where the forces are weakest, reshape a force, or exploit a change?* Then a button to view the Summary. |

**Force step** shows the force's question and a link/disclosure to its Learn
detail, then:

- **Rating** — a radio group (fieldset + legend) on a 1–5 scale of *force
  intensity*: 1 Very low, 2 Low, 3 Moderate, 4 High, 5 Very high. For every
  force, a **higher rating means more pressure on industry profitability**
  (e.g. "Threat of new entrants: High" means entry is easy). This must be
  stated on screen.
- **Drivers present** — a checklist of that force's drivers; the user ticks
  the ones that apply.
- **Rationale** — a text area: "Explain your rating."
- **Evidence** — a choice of:
  - `illustrative` — shown only for values that came from a preset, labelled
    *"Illustrative example (not verified)"*;
  - `assumption` — *"My judgment / assumption"*;
  - `sourced` — *"Supported by a source"*, which reveals a **source** text
    field (citation or URL).
- **Evidence rules:**
  - Loading a preset sets every assessment's evidence to `illustrative`.
  - When the user changes the rating, rationale, or drivers of an
    `illustrative` assessment, its evidence becomes `assumption`
    automatically, and the UI says so.
  - `sourced` with an empty source shows an inline hint and is reported as
    *"Assumption (source missing)"* in the summary and export.

**Progress** — the view shows how many of the five forces are rated.

**Switching industry** when the current analysis has any user input
(a rating, a rationale, a ticked driver, or implications text that differs
from a freshly loaded preset/blank) must ask for confirmation before
discarding it.

### 2.4 Summary view

- **Industry header:** name, scope, and an evidence badge summary (e.g.
  "3 illustrative · 1 assumption · 1 sourced").
- **Radar chart** (pentagon, SVG, hand-written — no chart library) of the five
  ratings on a 0–5 scale. Unrated forces plot at 0 and are listed as unrated.
  The chart has `role="img"` and a descriptive `aria-label`, and a visible data
  table carries the same numbers.
- **Comparison:** a "Compare with" select listing every preset (and "None").
  When chosen, the chart overlays the preset as a second series that is
  distinguishable without color (e.g. dashed outline), with a legend, and the
  table adds the comparison column and the difference.
- **Strongest force(s):** the force(s) with the highest rating (all ties).
  Hidden until at least one force is rated.
- **Overall structure (indicative):** based on the mean rating of *rated*
  forces: mean ≤ 2.0 → "Favorable structure", ≤ 3.4 → "Mixed structure",
  otherwise → "Challenging structure". Always shown with the caveat that
  averages hide what matters — the strongest force(s) usually shape
  profitability most. Hidden until all five forces are rated.
- **Per-force recap:** rating label, ticked drivers, rationale, evidence label,
  and source.
- **Implications:** the two Implications answers.
- **Export:** "Copy as Markdown" (clipboard, with a visible success/failure
  status message) and "Download .md". Also a print stylesheet that prints the
  summary cleanly (no navigation chrome).
- An empty state when nothing has been rated, pointing to Analyze.

### 2.5 Markdown export format

```markdown
# Five Forces Analysis: <industry name>

**Scope:** <scope>
**Prepared:** <YYYY-MM-DD>

<description, if any>

| Force | Rating | Evidence |
|---|---|---|
| Competitive rivalry | 4 – High | Illustrative example (not verified) |
| ... five rows, unrated forces show "Not rated" ... |

**Strongest force(s):** <names>  (omitted if nothing rated)
**Overall structure (indicative):** <label>  (omitted unless all five rated)

## Competitive rivalry
**Rating:** 4 – High
**Drivers present:** <comma-separated labels or "None selected">
**Rationale:** <text or "—">
**Evidence:** <label>[ — Source: <source>]

... one section per force, in the standard order ...

## Implications
**Which forces matter most:** <text or "—">
**How a company could respond:** <text or "—">

---
_Generated with Five Forces Explorer. Ratings marked "Illustrative" are
teaching examples, not verified market research._
```

### 2.6 Persistence

- The current analysis and the current Analyze step are saved to
  `localStorage` under the key `five-forces-explorer:v1` on every change.
- Loading must tolerate missing, unavailable (throws), or corrupted storage
  and must validate the stored shape; anything invalid falls back to a fresh
  blank state without crashing.
- A **Start over** action (with confirmation) clears the analysis.

### 2.7 Accessibility and design

- WCAG 2.1 AA intent: semantic landmarks (`header`, `nav`, `main`, `footer`),
  one `h1`, logical heading order, labels on every control, visible focus
  styles, color contrast ≥ 4.5:1 for text, no information conveyed by color
  alone, `prefers-reduced-motion` respected.
- Fully keyboard operable.
- Responsive from 320 px wide phones to desktop with no horizontal scrolling.
- Light and dark themes via `prefers-color-scheme`, defined as CSS custom
  properties on `:root`.
- Calm, professional visual style suitable for projecting in a lecture hall:
  generous type size, high contrast, one accent color.

## 3. Data

### 3.1 Types (`src/types.ts`)

```ts
export type ForceId =
  | 'rivalry'
  | 'newEntrants'
  | 'supplierPower'
  | 'buyerPower'
  | 'substitutes'

export type Rating = 1 | 2 | 3 | 4 | 5
export type EvidenceStatus = 'illustrative' | 'assumption' | 'sourced'

export interface Driver {
  id: string          // kebab-case, unique within its force
  label: string       // short, e.g. "High switching costs for buyers"
  description: string // one sentence: why this strengthens the force
}

export interface ForceDefinition {
  id: ForceId
  name: string        // "Threat of new entrants"
  question: string    // "How easy is it for new competitors to enter?"
  summary: string
  drivers: Driver[]   // 4–8 drivers
  highWhen: string[]
  lowWhen: string[]
  example: string
  misconception: string
}

export interface ForceAssessment {
  rating: Rating | null
  driverIds: string[]
  rationale: string
  evidence: EvidenceStatus
  source: string
}

export interface IndustryProfile {
  name: string
  scope: string
  description: string
}

export interface IndustryPreset {
  id: string                 // kebab-case, unique, equals the file name
  profile: IndustryProfile
  assessments: Record<ForceId, ForceAssessment> // evidence: 'illustrative'
}

export interface Analysis {
  presetId: string | null    // null = custom industry
  profile: IndustryProfile
  assessments: Record<ForceId, ForceAssessment>
  implications: { keyForces: string; response: string }
}
```

### 3.2 Framework content (`src/data/forces.ts`)

Exports `FORCES: ForceDefinition[]` in the standard order above. Content must
be faithful to Porter (1979, 2008). Driver lists follow Porter's 2008 article,
for example:

- **New entrants** (barriers to entry): supply-side economies of scale,
  demand-side benefits of scale (network effects), customer switching costs,
  capital requirements, incumbency advantages independent of size, unequal
  access to distribution channels, restrictive government policy, expected
  retaliation from incumbents.
- **Supplier power:** supplier concentration relative to the industry,
  industry is not an important customer to suppliers, switching costs for
  industry participants, differentiated supplier inputs, no substitutes for
  the supplier's input, credible threat of forward integration.
- **Buyer power:** few buyers or large-volume purchases, standardized
  products, low buyer switching costs, credible threat of backward
  integration, plus price sensitivity (product is a large share of buyer
  costs, buyer earns low profits, product has little effect on the quality of
  the buyer's own product).
- **Substitutes:** attractive price–performance trade-off of the substitute,
  low buyer cost of switching to the substitute.
- **Rivalry:** numerous or equally balanced competitors, slow industry growth,
  high exit barriers, rivals committed beyond economic goals; price
  competition is likeliest with undifferentiated products and low switching
  costs, high fixed and low marginal costs, large capacity increments, and
  perishable products.

### 3.3 Example industries (`src/data/industries/`)

- **One preset per file**, `src/data/industries/<id>.ts`, default-exporting an
  `IndustryPreset`, registered in `src/data/industries/index.ts` (exported as
  `INDUSTRY_PRESETS`, displayed in that order).
- Version 1 ships at least these five illustrative presets:
  1. `us-airlines` — U.S. passenger airlines
  2. `video-streaming` — subscription video streaming
  3. `coffee-shops` — independent and chain coffee shops
  4. `soft-drinks` — carbonated soft drinks
  5. `whitewater-rafting` — commercial whitewater rafting outfitters (a nod
     to West Virginia's New River Gorge)
- Each preset gives all five assessments: a rating, 2–4 valid driver ids, a
  2–4 sentence rationale, evidence `illustrative`, empty source.
- Rationales use cautious, general language. No precise statistics, market
  shares, or named-company claims that would need a citation.

## 4. Architecture

```text
src/
  main.tsx                 entry
  App.tsx                  layout, navigation, view switching
  config.ts                REPO_URL and other fork-editable constants
  types.ts                 types from §3.1
  data/forces.ts           framework content
  data/industries/         one file per preset + index.ts
  lib/                     pure, unit-tested logic (no React)
    analysis.ts            blank/preset analysis, edits, evidence rules,
                           strongest forces, structure label, completion
    markdown.ts            export (§2.5)
    storage.ts             load/save/validate (§2.6)
  components/              React components, one per file
  styles/ or *.css         plain CSS with custom properties
  test/setup.ts
```

Rules: business logic lives in `src/lib` as pure functions with unit tests;
components stay thin. No new runtime dependencies without updating this spec.

## 5. Quality gates (definition of done)

`npm run check` must pass. It runs, in order:

1. `npm run lint` — oxlint, warnings are errors
2. `npm run typecheck` — TypeScript, strict
3. `npm run test` — Vitest
4. `npm run build` — production build

The test suite must include at least:

- **Data integrity** (`src/data/*.test.ts`): five forces in standard order;
  unique ids; every force has 4–8 drivers, non-empty highWhen/lowWhen; every
  preset has all five assessments with a rating 1–5, 2–4 driver ids that exist
  on that force, a non-empty rationale, evidence `illustrative`; preset ids are
  unique kebab-case and match their file names; every preset is registered.
  *This is the safety net for student pull requests that add industries.*
- **Logic** (`src/lib/*.test.ts`): evidence auto-switch, strongest-force ties,
  structure thresholds (including boundaries 2.0 and 3.4), completion count,
  Markdown export (golden-style assertions on structure and labels), storage
  fallback on corrupt / missing / throwing storage.
- **Components:** the main journey — load a preset, change a rating, see the
  evidence switch to assumption, see it reflected in Summary; custom industry
  flow; compare select overlays a second series; hash navigation; persistence
  across a remount.

## 6. Deployment

- GitHub Actions: `ci.yml` runs `npm ci && npm run check` on pushes and pull
  requests; `deploy.yml` publishes `dist/` to GitHub Pages on pushes to `main`.
- The Vite `base` is `./` so the build works on any static host and at any
  path, including a fork's own Pages site.

## 7. Changelog

- **0.1.0** — Initial specification.
