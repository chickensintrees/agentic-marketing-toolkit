# Five Forces Explorer — Tool Specification

> Tool #1 of the [Agentic Marketing Toolkit](../../../SPEC.md). **This file is
> the single source of truth for this tool**; the suite spec (`/SPEC.md`)
> governs everything shared: the shell, routing, the tool contract,
> accessibility and design rules (suite §2.4), quality gates, and deployment.
> Changes flow through this spec before they flow into code. See
> [AGENTS.md](../../../AGENTS.md) for the workflow.
>
> Tool id: `five-forces` · Folder: `src/tools/five-forces/` · Routes:
> `#/five-forces` (Canvas, default) and `#/five-forces/summary`.

## 1. What this is

Five Forces Explorer teaches **Porter's Five Forces** by having the user
analyze a real industry.

It was built with coding agents the night before a marketing MBA guest
lecture, as the first tool of a suite the class builds together. Students
extend it through pull requests — most simply by adding an industry preset —
and it is the reference example of how a tool in this suite is organized.

### Who it is for

| User | Needs |
|---|---|
| **Student learning the framework** | Clear explanations of each force, its drivers, and what "high" and "low" look like. |
| **Student analyzing an industry** | A guided, step-by-step exercise; a way to explain reasoning; a visual summary; an export to hand in or discuss. |
| **Instructor / presenter** | A reliable demo with credible example industries and no setup, accounts, or API keys. |
| **Student contributor** | A small, well-organized codebase where adding an industry or a feature is a contained change that automated checks can verify. |

### Non-goals (version 1)

The suite's non-goals apply (suite spec §1). In particular: example ratings are
teaching illustrations, not market research.

## 2. Product requirements

### 2.1 Layout and navigation

- Rendered inside the suite shell (suite spec §2), which provides the header
  and footer. The tool shows its `h1` ("Five Forces Explorer") and its own
  view navigation. It does not show a purpose paragraph: the diagram explains
  the tool.
- Two views: the **Canvas**, where the user picks an industry, reads its five
  forces as one diagram and rates each force, and the **Summary**. Navigation
  is a set of links with `aria-current="page"` that works with keyboard alone
  and calls `navigate('' | 'summary')`.
- The view comes from the `subpath` prop (suite spec §2.2): `summary` →
  Summary; `''` and anything else → Canvas. The old subpaths `learn` and
  `analyze` open the Canvas, so existing links keep working. A presenter can
  link straight to a view, e.g. `#/five-forces/summary`.
- **Word budget.** A default screen shows at most about 40 words besides the
  shell. Explanations are on demand (disclosures), one or two lines each.
- The Summary view carries the disclaimer: *"Example ratings are illustrative
  teaching material, not verified market research."*

### 2.2 The force diagram

The diagram is the interface. It follows Porter's layout: **rivalry at the
center**, new entrants above, suppliers to the left, buyers to the right,
substitutes below.

- **Shapes.** Rivalry is a filled disc. The two bargaining powers (suppliers,
  buyers) are squares. The two threats (new entrants, substitutes) are
  triangles pointing inward.
- **Encoding.** A force's rating sets three things together: its distance from
  the center (stronger is closer, read against five dotted rings labelled 1–5),
  its size, and the weight of the line joining it to the center. Rivalry's
  rating sets the disc's size. Every shape also prints its rating, so nothing
  depends on color. An unrated force is drawn as an outline on the outer ring
  and prints "–".
- The screen states that **a higher rating means more pressure on industry
  profitability** (e.g. "Threat of new entrants: High" means entry is easy).
- On the Canvas each force is a button (keyboard focusable, `aria-pressed`,
  accessible name with the force's name and rating). Selecting it opens the
  force panel (§2.3). The Summary's diagram is a single image (`role="img"`)
  with a text description of every rating it shows.
- Changes animate (shapes slide along their axis); `prefers-reduced-motion`
  turns this off.

### 2.3 Canvas view

1. **Industry strip.** One button per preset, in `INDUSTRY_PRESETS` order,
   each with the industry's **mark** (a miniature of its own force diagram,
   drawn from its preset ratings) and its name, plus **Custom industry**.
   The current choice is marked with `aria-pressed` and by inversion, not
   color.
2. **Industry details** (disclosure): **name**, **scope** (which product and
   which geography, e.g. "U.S. domestic passenger air travel"), and
   **description/notes**, with one line on why scope matters (too broad or too
   narrow distorts the analysis). The industry name and scope are shown above
   the diagram.
3. **Progress:** how many of the five forces are rated ("4 / 5 rated").
4. **Force panel** for the selected force (rivalry when nothing has been
   chosen):
   - its name, its core question, and its rating as a large numeral with the
     rating label;
   - **Rating** — a radio group (fieldset + legend) on a 1–5 scale of *force
     intensity*: 1 Very low, 2 Low, 3 Moderate, 4 High, 5 Very high;
   - **Drivers present** — by default only the ticked drivers; "All *n*
     drivers" shows the whole checklist from `data/forces.ts` so the user can
     tick or untick them;
   - **Reasoning and evidence** (disclosure) — **Rationale** ("Explain your
     rating."), and **Evidence**:
     - `illustrative` — shown only for values that came from a preset, labelled
       *"Illustrative example (not verified)"*;
     - `assumption` — *"My judgment / assumption"*;
     - `sourced` — *"Supported by a source"*, which reveals a **source** text
       field (citation or URL);
   - **About this force** (disclosure) — its summary, *The force is high
     when…* and *The force is low when…* lists, one illustrative example, and
     one common misconception.
5. **Evidence rules:**
   - Loading a preset sets every assessment's evidence to `illustrative`.
   - When the user changes the rating, rationale, or drivers of an
     `illustrative` assessment, its evidence becomes `assumption`
     automatically, and the UI says so.
   - `sourced` with an empty source shows an inline hint and is reported as
     *"Assumption (source missing)"* in the summary and export.
6. **About the framework** (disclosure) — what the framework is for (industry
   structure shapes the average profitability of an industry and therefore
   strategy); that the strongest force or forces matter most; **"Factors, not
   forces"**: industry growth rate, technology and innovation, government
   policy, and complementary products act through the five forces rather than
   being forces themselves; and the **sources**: Porter, M. E. (1979), "How
   Competitive Forces Shape Strategy," *Harvard Business Review*; Porter, M.
   E. (2008), "The Five Competitive Forces That Shape Strategy," *Harvard
   Business Review* 86(1).
7. **Start over** (with confirmation) and a link to the Summary.

**Switching industry** when the current analysis has any user input
(a rating, a rationale, a ticked driver, or implications text that differs
from a freshly loaded preset/blank) must ask for confirmation before
discarding it.

### 2.4 Summary view

- **Industry header:** name, scope, and an evidence summary (e.g.
  "3 illustrative · 1 assumption · 1 sourced").
- **Diagram** (§2.2) of the five ratings, as an image with a descriptive
  `aria-label`, and a visible data table carrying the same numbers. Unrated
  forces are listed as not rated.
- **Comparison:** a "Compare with" select listing every preset (and "None").
  When chosen, the diagram overlays the preset's shapes as dashed outlines,
  distinguishable without color, with a legend, and the table adds the
  comparison column and the difference.
- **Strongest force(s):** the force(s) with the highest rating (all ties).
  Hidden until at least one force is rated.
- **Overall structure (indicative):** based on the mean rating of *rated*
  forces: mean ≤ 2.0 → "Favorable structure", ≤ 3.4 → "Mixed structure",
  otherwise → "Challenging structure". Always shown with the caveat that
  averages hide what matters — the strongest force(s) usually shape
  profitability most. Hidden until all five forces are rated.
- **Implications:** two free-text prompts, edited here: (a) *Which force or
  forces matter most here, and why?* (b) *How could a company respond —
  position where the forces are weakest, reshape a force, or exploit a
  change?*
- **Per-force recap** (disclosure): rating label, ticked drivers, rationale,
  evidence label, and source.
- **Export:** "Copy as Markdown" (clipboard, with a visible success/failure
  status message), "Download .md", and "Print". A print stylesheet prints the
  summary cleanly (no navigation chrome).
- An empty state when nothing has been rated, pointing to the Canvas.

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

- The current analysis and the selected force (stored as `step`: 1–5 for the
  forces in standard order, 0 for none) are saved to
  `localStorage` under the key `agentic-marketing-toolkit:five-forces:v1` on every change.
- Loading must tolerate missing, unavailable (throws), or corrupted storage
  and must validate the stored shape; anything invalid falls back to a fresh
  blank state without crashing.
- A **Start over** action (with confirmation) clears the analysis.

### 2.7 Accessibility and design

Suite spec §2.4 applies in full. The tool uses the shared design tokens in
`src/shared/`. The Summary diagram's comparison series must be distinguishable
without color (e.g. dashed outline) and has a data-table equivalent.

## 3. Data

### 3.1 Types (`src/tools/five-forces/types.ts`)

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
  drivers: Driver[]   // 4–9 drivers
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

### 3.2 Framework content (`src/tools/five-forces/data/forces.ts`)

Exports `FORCES: ForceDefinition[]` in the standard order above. Content must
be faithful to Porter (1979, 2008). Driver lists follow Porter's 2008 article,
for example:

- **New entrants** (seven barriers to entry, plus expected retaliation):
  supply-side economies of scale, demand-side benefits of scale (network
  effects), customer switching costs, capital requirements, incumbency
  advantages independent of size, unequal access to distribution channels,
  restrictive government policy; and, as a separate consideration, how
  incumbents are expected to react to a newcomer (expected retaliation).
- **Supplier power:** supplier concentration relative to the industry,
  industry is not an important customer to suppliers, switching costs for
  industry participants, differentiated supplier inputs, no substitutes for
  the supplier's input, credible threat of forward integration.
- **Buyer power:** few buyers or large-volume purchases, standardized
  products, low buyer switching costs, credible threat of backward
  integration, plus price sensitivity (product is a large share of buyer
  costs, buyer earns low profits, product has little effect on the quality of
  the buyer's own product, product has little effect on the buyer's other
  costs).
- **Substitutes:** attractive price–performance trade-off of the substitute,
  low buyer cost of switching to the substitute.
- **Rivalry:** numerous or equally balanced competitors, slow industry growth,
  high exit barriers, rivals committed beyond economic goals, and firms that
  cannot read each other's signals well (unfamiliar with one another, diverse
  approaches to competing, or differing goals); price competition is likeliest
  with undifferentiated products and low switching costs, high fixed and low
  marginal costs, large capacity increments, and perishable products.

### 3.3 Example industries (`src/tools/five-forces/data/industries/`)

- **One preset per file**, `data/industries/<id>.ts` (in this tool's folder),
  default-exporting an `IndustryPreset`, registered in `data/industries/index.ts` (exported as
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

## 4. Architecture (inside `src/tools/five-forces/`)

```text
SPEC.md                  this file
index.ts                 exports `tool: ToolDefinition` (suite spec §3.2)
FiveForcesTool.tsx       the tool's root component: view nav + views
types.ts                 types from §3.1
data/forces.ts           framework content
data/industries/         one file per preset + index.ts
lib/                     pure, unit-tested logic (no React)
  analysis.ts            blank/preset analysis, edits, evidence rules,
                         strongest forces, structure label, completion
  markdown.ts            export (§2.5)
  storage.ts             load/save/validate (§2.6)
components/              React components, one per file
```

Rules: business logic lives in `lib/` as pure functions with unit tests;
components stay thin; shared UI and helpers come from `src/shared/`; nothing
is imported from another tool.

## 5. Required tests

The suite quality gates apply (suite spec §6). This tool's tests must include:

- **Data integrity** (`data/*.test.ts`): five forces in standard order;
  unique ids; every force has 4–9 drivers, non-empty highWhen/lowWhen; every
  preset has all five assessments with a rating 1–5, 2–4 driver ids that exist
  on that force, a non-empty rationale, evidence `illustrative`; preset ids are
  unique kebab-case and match their file names; every preset file is
  registered. *This is the safety net for student pull requests that add
  industries.*
- **Logic** (`lib/*.test.ts`): evidence auto-switch, strongest-force ties,
  structure thresholds (including boundaries 2.0 and 3.4), completion count,
  Markdown export (golden-style assertions on structure and labels), storage
  fallback on corrupt / missing / throwing storage.
- **Components:** the main journey — load a preset, select a force on the
  diagram, change its rating, see the evidence switch to assumption, see it
  reflected in Summary; custom industry flow; compare select overlays a second
  series; subpath navigation; persistence across a remount.

## 6. Changelog

- **0.3.0** — Visual redesign. One Canvas replaces the Learn / Analyze stepper:
  the force diagram (§2.2) is the interface, with rivalry at the center and the
  outer forces' distance, size and line weight encoding their ratings. The
  industry strip gives each preset a mark drawn from its own ratings. Learn
  content moves into on-demand disclosures ("About this force", "About the
  framework"); implications move to the Summary; the Summary's radar chart is
  replaced by the same diagram with a dashed comparison overlay. Word budget of
  about 40 words per default screen. The analysis model, evidence rules,
  export format and storage are unchanged.

- **0.2.0** — Moved into the Agentic Marketing Toolkit as tool #1: routes under
  `#/five-forces/…`, shell provides header/footer, storage key namespaced,
  paths relative to the tool folder. Added Porter's fifth rivalry condition
  (firms cannot read each other's signals) and buyer price sensitivity's
  fourth condition (little effect on the buyer's other costs); drivers per
  force are now 4–9; expected retaliation is described as a separate
  consideration from the seven entry barriers.
- **0.1.0** — Initial specification.
