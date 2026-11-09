# Five Forces Explorer — Tool Specification

> Tool #1 of the [Agentic Marketing Toolkit](../../../SPEC.md). **This file is
> the single source of truth for this tool**; the suite spec (`/SPEC.md`)
> governs everything shared: the shell, routing, the tool contract,
> accessibility and design rules (suite §2.4), quality gates, and deployment.
> Changes flow through this spec before they flow into code. See
> [AGENTS.md](../../../AGENTS.md) for the workflow.
>
> Tool id: `five-forces` · Folder: `src/tools/five-forces/` · Routes:
> `#/five-forces` (the board; `learn` and `analyze` are aliases),
> `#/five-forces/summary`.

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

The tool is **one board** (a whiteboard sketch of Porter's diagram) plus a
**Summary**. There is no stepper. The diagram is the interface.

- Rendered inside the suite shell (suite spec §2), which provides the header
  and footer. The tool shows its `h1` ("Five Forces Explorer").
- Views: **Board** and **Summary**. The board links to the Summary and the
  Summary links back to the board, both with `navigate()`.
- The view comes from the `subpath` prop (suite spec §2.2): `''`, `learn` or
  `analyze` → Board (the last two are kept so old links still work),
  `summary` → Summary, and any other subpath → Board. A presenter can link
  straight to `#/five-forces/summary`.
- **Word budget:** a default screen shows at most about 40 words. Everything
  longer (explanations, rationale, evidence, framework notes) sits behind a
  labelled disclosure and appears only on demand.
- The Summary carries the disclaimer: *"Example ratings are illustrative
  teaching material, not verified market research."*

### 2.2 The board

1. **Industry picker.** A radio group with one hand-drawn doodle per preset,
   in `INDUSTRY_PRESETS` order, plus **Custom**. A preset with no doodle of
   its own gets a generic doodle with its initial, so a new preset needs no
   design work. Switching industry follows §2.3 *Switching industry*.
2. **The diagram.** Rivalry at the center; new entrants above, substitutes
   below, supplier power left, buyer power right, each with an arrow pressing
   in on rivalry. Each force is a button (keyboard focusable, with an
   accessible name such as "Buyer power: 4 of 5, High") that selects the force.
   Intensity is drawn, never only colored:
   - the force's tally marks (|||| = 4, a crossed gate = 5) and its numeral;
   - arrow stroke weight grows with the rating, and strong forces (4–5) get
     extra marker passes;
   - rivalry gets one scribbled loop per rating point;
   - an unrated force shows a dashed box and "?";
   - strong forces are also drawn in the pressure color (redundant with weight).
   A one-line legend reads "thicker, red = more pressure". The selected force
   is circled in the accent color, and the progress line reads "N of 5 rated".
3. **Notes column.** With no force selected, it shows a short prompt and two
   disclosures: **Industry details** (name, scope, description, and why
   scope matters) and **About the framework** (what the framework is for, the
   five forces with rivalry at the center, that the strongest force or forces
   matter most, the *Factors, not forces* callout, and the sources:
   Porter 1979, "How Competitive Forces Shape Strategy," *HBR*; Porter 2008,
   "The Five Competitive Forces That Shape Strategy," *HBR* 86(1)). With a
   force selected, it shows the force's name, its core question, and the
   rating, drivers and evidence controls of §2.3.
4. **Actions:** "Summary →" and **Start over** (§2.6).

### 2.3 Rating a force

- **Rating:** a radio group (fieldset + legend) on a 1–5 scale of *force
  intensity*: 1 Very low, 2 Low, 3 Moderate, 4 High, 5 Very high, drawn as
  tally marks with numerals. The legend states that **a higher rating means
  more pressure on industry profitability**. Each radio's accessible name is
  the number and label (e.g. "4 High").
- **Drivers present:** a checklist. By default only the ticked drivers show,
  with a "+ N more drivers" toggle that reveals all of them.
- **Rationale and evidence** (a disclosure): the rationale text area
  ("Explain your rating.") and the evidence choice:
  - `illustrative`, offered only for values that came from a preset, labelled
    *"Illustrative example (not verified)"*;
  - `assumption`, *"My judgment / assumption"*;
  - `sourced`, *"Supported by a source"*, which reveals a **source** field
    (citation or URL).
- **About this force** (a disclosure): the 1–2 sentence summary, the drivers
  with their descriptions, *The force is high when…* and *The force is low
  when…*, one short example, and one common misconception.
- **Evidence rules:**
  - Loading a preset sets every assessment's evidence to `illustrative`.
  - When the user changes the rating, rationale or drivers of an
    `illustrative` assessment, its evidence becomes `assumption`
    automatically, and a status message says so.
  - `sourced` with an empty source shows an inline hint and is reported as
    *"Assumption (source missing)"* in the summary and export.

**Switching industry** when the current analysis has any user input (a
rating, a rationale, a ticked driver, or implications text that differs from
a freshly loaded preset or blank) asks for confirmation in the page before
discarding it. The question names what will be lost and offers "Switch" and
"Keep my work". The app never uses `window.confirm`.

### 2.4 Summary view

- **Industry header:** the industry's doodle, name and scope, and a plain-text
  evidence summary (e.g. "3 illustrative · 1 assumption · 1 sourced").
- **Pressure chart:** a visible table, one row per force in the standard
  order. Each row has the force name, a hand-drawn hatched bar whose length is
  the rating on a 0–5 scale (unrated forces show "Not rated" and no bar), and
  the rating numeral. The bars are drawn in SVG by hand, with no chart
  library.
- **Comparison:** a "Compare with" select listing every preset (and "None").
  When chosen, each row adds a second, **dashed, unfilled** bar for the
  preset (distinguishable without color) and the table adds the comparison
  column and the difference. A legend names both series.
- **Strongest force(s):** the force(s) with the highest rating (all ties),
  circled on the chart and named in a "Strongest force" line. Hidden until at
  least one force is rated.
- **Overall structure (indicative):** based on the mean rating of *rated*
  forces: mean ≤ 2.0 → "Favorable structure", ≤ 3.4 → "Mixed structure",
  otherwise → "Challenging structure". It shows the mean ("Mean rating 3.8 of
  5") and the caveat that averages hide what matters, because the strongest
  force or forces usually shape profitability most. Until all five forces are
  rated, it says to rate all five to see an indicative label.
- **Implications:** two text areas: (a) *Which force or forces matter most
  here, and why?* (b) *How could a company respond: position where the forces
  are weakest, reshape a force, or exploit a change?*
- **Per-force notes** (a disclosure, expanded when printing): for each force,
  the rating label, ticked drivers, rationale, evidence label and source.
- **Export:** "Copy as Markdown" (clipboard, with a visible success or failure
  status message), "Download .md", and "Print". A print stylesheet prints the
  summary cleanly, without navigation chrome.
- An empty state when nothing has been rated, with a button back to the board.

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

- The current analysis and the selected force (stored as the `step` field:
  0 = none, 1–5 = the forces in standard order) are saved to
  `localStorage` under the key `agentic-marketing-toolkit:five-forces:v1` on every change.
- Loading must tolerate missing, unavailable (throws), or corrupted storage
  and must validate the stored shape; anything invalid falls back to a fresh
  blank state without crashing.
- A **Start over** action (with confirmation) clears the analysis.

### 2.7 Accessibility and design

Suite spec §2.4 applies in full. The tool uses the shared design tokens and
the shared sketch helpers in `src/shared/`. The comparison series must be
distinguishable without color (dashed, unfilled bars) and the chart is itself
a data table.

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
  reflected in Summary; custom industry flow with the in-page confirmation;
  compare select adds a second, dashed series; subpath navigation; persistence
  across a remount; Start over.

## 6. Changelog

- **0.3.0** — Visual redesign (whiteboard sketch). The Learn / Analyze /
  Summary stepper becomes one board: the hand-drawn Porter diagram is the
  interface, intensity is drawn as tally marks, arrow weight and loops, and
  learning content moves into on-demand disclosures. The radar chart becomes
  a hatched-bar pressure table with dashed comparison bars. Confirmations
  happen in the page instead of `window.confirm`. Implications move to the
  Summary. The analysis model, evidence rules, structure thresholds, export
  format and storage key are unchanged.
- **0.2.0** — Moved into the Agentic Marketing Toolkit as tool #1: routes under
  `#/five-forces/…`, shell provides header/footer, storage key namespaced,
  paths relative to the tool folder. Added Porter's fifth rivalry condition
  (firms cannot read each other's signals) and buyer price sensitivity's
  fourth condition (little effect on the buyer's other costs); drivers per
  force are now 4–9; expected retaliation is described as a separate
  consideration from the seven entry barriers.
- **0.1.0** — Initial specification.
