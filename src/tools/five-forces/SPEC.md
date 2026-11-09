# Five Forces Explorer — Tool Specification

> Tool #1 of the [Agentic Marketing Toolkit](../../../SPEC.md). **This file is
> the source of truth for this tool**, under INTENT.md (Bill's intent, which outranks every spec); the suite spec (`/SPEC.md`)
> governs everything shared: the shell, routing, the tool contract,
> accessibility and design rules (suite §2.4), quality gates, and deployment.
> Changes flow through this spec before they flow into code. See
> [AGENTS.md](../../../AGENTS.md) for the workflow.
>
> Tool id: `five-forces` · Folder: `src/tools/five-forces/` · Routes:
> `#/five-forces` (the Plate, default) and `#/five-forces/summary`;
> `learn` and `analyze` subpaths open the Plate.

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

The tool is one **plate**: a figure in the manner of a printed strategy text,
where the Five Forces diagram *is* the interface. Explanations appear only on
demand. No default screen shows more than about 40 words.

- Rendered inside the suite shell (suite spec §2), which provides the header
  and footer. The tool's `h1` names the tool ("Five Forces") and the current
  industry (or "Untitled industry").
- Two views: the **Plate** (the analysis canvas) and the **Summary**. A small
  view navigation (links with `aria-current="page"`) switches between them and
  calls `navigate('' | 'summary')`.
- The view comes from the `subpath` prop (suite spec §2.2): `summary` →
  Summary; anything else (`''`, `learn`, `analyze`, unknown) → Plate, so older
  links still open the tool. A presenter can link straight to
  `#/five-forces/summary`.
- The Summary view carries the disclaimer: *"Example ratings are illustrative
  teaching material, not verified market research."*

### 2.2 The Plate (pick, see, select, rate)

1. **Industry picker.** One engraved emblem per preset plus a **Custom
   industry** emblem, as a group of toggle buttons with the industry name as
   the accessible name (and visible tooltip). The selected one is underlined.
2. **The diagram.** Rivalry at the centre, threat of new entrants above,
   supplier power left, buyer power right, threat of substitutes below; each
   outer force is an arrow pressing on rivalry. Each force's rating is drawn,
   never only written: arrow shaft weight and arrowhead size grow with the
   rating, the shaft carries one tally tick per point, the box's engraved
   hatching gets denser, a row of five pips fills in, and rivalry gains one
   nested frame per point. Unrated forces are drawn as a dotted hairline with
   empty pips. Every force is a keyboard-focusable button whose accessible
   name gives its name and rating ("Supplier power, 4 of 5" or "not rated").
   The diagram as a whole has a text label listing all five ratings.
3. **Caption.** "Fig. 1" with one line saying that line weight shows pressure
   on profit, and the **progress**: how many of the five forces are rated.
4. **Side panel** (beside the plate on wide screens, below it on phones).
   It shows one of:
   - **Key** (nothing selected): a line-weight key and the next actions.
   - **Force** (a force selected), see *Force panel* below.
   - **Industry profile:** **name**, **scope** (which product and which
     geography — e.g. "U.S. domestic passenger air travel"), and
     **description/notes**, with one on-demand line on why scope matters.
     Opened by "Edit profile" and automatically when Custom industry is chosen.
   - **Implications:** the two prompts (a) *Which force or forces matter most
     here, and why?* (b) *How could a company respond — position where the
     forces are weakest, reshape a force, or exploit a change?*
5. **About the framework** (on demand, below the plate): what the framework
   is for (industry structure shapes average profitability and therefore
   strategy), that the strongest force or forces matter most, the
   **"Factors, not forces"** note (industry growth rate, technology and
   innovation, government, complementary products act *through* the forces),
   and the **sources**: Porter, M. E. (1979), "How Competitive Forces Shape
   Strategy," *Harvard Business Review*; Porter, M. E. (2008), "The Five
   Competitive Forces That Shape Strategy," *Harvard Business Review* 86(1).
6. Actions under the plate: Implications, Summary, and **Start over**.

### 2.3 Force panel and confirmations

The **force panel** shows the figure number, the force's name and core question, then:

- **Rating** — a radio group (fieldset + legend) on a 1–5 scale of *force
  intensity*: 1 Very low, 2 Low, 3 Moderate, 4 High, 5 Very high, drawn as
  five strokes of increasing weight. For every force a **higher rating means
  more pressure on industry profitability** (e.g. "Threat of new entrants:
  High" means entry is easy); the scale says so on screen.
- **Drivers present** — a checklist of that force's drivers. By default it
  lists the ticked drivers (and, for a preset, the preset's); "N more drivers"
  reveals the rest.
- **Rationale and evidence** (on demand): a text area "Explain your rating",
  and the evidence choice:
  - `illustrative` — shown only for values that came from a preset, labelled
    *"Illustrative example (not verified)"*;
  - `assumption` — *"My judgment / assumption"*;
  - `sourced` — *"Supported by a source"*, which reveals a **source** text
    field (citation or URL).
  The current evidence label is always visible in the panel.
- **About this force** (on demand): the 1–2 sentence summary, every driver
  with its description, *The force is high when…* and *The force is low
  when…*, one illustrative example, and one common misconception.
- **Evidence rules:**
  - Loading a preset sets every assessment's evidence to `illustrative`.
  - When the user changes the rating, rationale, or drivers of an
    `illustrative` assessment, its evidence becomes `assumption`
    automatically, and the UI says so in a live status message.
  - `sourced` with an empty source shows an inline hint and is reported as
    *"Assumption (source missing)"* in the summary and export.

**Confirm before discarding.** Switching industry when the current analysis
has any user input (a rating, a rationale, a ticked driver, or implications
text that differs from a freshly loaded preset/blank), and Start over, ask for
confirmation **on the page** (a short inline bar with "Replace" or "Clear"
and "Keep editing"), not with a browser dialog.

### 2.4 Summary view

- **Industry header:** name, scope, and the evidence summary (e.g.
  "3 illustrative · 1 assumption · 1 sourced").
- **The plate** again, read-only, at a smaller size.
- **Schedule of forces:** a data table with one row per force: name, a
  drawn weight bar, and the rating (or "Not rated").
- **Comparison:** a "Compare with" select listing every preset (and "None").
  When chosen, each row's weight bar gains a second, **dashed** bar for the
  preset (distinguishable without color), with a legend, and the table adds
  the comparison column and the difference.
- **Strongest force(s):** the force(s) with the highest rating (all ties).
  Hidden until at least one force is rated.
- **Overall structure (indicative):** based on the mean rating of *rated*
  forces: mean ≤ 2.0 → "Favorable structure", ≤ 3.4 → "Mixed structure",
  otherwise → "Challenging structure", always with the one-line caveat that
  averages hide what matters — the strongest force(s) usually shape
  profitability most. Hidden until all five forces are rated.
- **Notes by force** (on demand on screen, always printed): rating label,
  ticked drivers, rationale, evidence label, and source, then the two
  Implications answers.
- **Export:** "Copy as Markdown" (clipboard, with a visible success/failure
  status message), "Download .md", and "Print". The print stylesheet prints
  the summary cleanly (no navigation chrome, notes expanded).
- An empty state when nothing has been rated, pointing back to the Plate.

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
_Averages hide what matters: the strongest force or forces usually shape an industry's profitability most._  (always directly under the structure line)

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

Each bold field line is its own paragraph (a blank line follows it) so the
lines don't run together when rendered. Free text is escaped so a line that
looks like Markdown structure (a heading, a rule, a table row) stays text.
A force with input but no rating still shows its evidence and source.

### 2.6 Persistence

- The current analysis and the open side panel (stored as `step`: 0 the
  key, 1–5 a force in standard order, 6 Implications) are saved to
  `localStorage` under the key `agentic-marketing-toolkit:five-forces:v1` on every change.
- Loading must tolerate missing, unavailable (throws), or corrupted storage
  and must validate the stored shape without crashing. Unreadable or
  wrong-shaped data falls back to a fresh blank state. Small, safe problems are
  repaired instead of discarding the student's work: unknown driver ids are
  dropped, an analysis whose preset no longer exists becomes a custom
  industry, and an out-of-range step resets to 0 (the key).
- A **Start over** action (with confirmation) clears the analysis.

### 2.7 Accessibility and design

Suite spec §2.4 applies in full. The tool uses the shared design tokens in
`src/shared/`. The plate's drawing is generated from the ratings (no images,
no chart library). Rating is always carried by line weight, ticks, hatching and
pips together, never by color; the one accent color marks only the selected
or current item. The comparison series is dashed and has a data-table
equivalent.

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
  plate.ts               view from subpath, panel ⇄ step, and the drawing
                         scales (arrow weight, hatching) for §2.2
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
- **Components:** the main journey — load a preset, change a rating, see the
  evidence switch to assumption, see it reflected in Summary; custom industry
  flow with the on-page confirmation; compare select adds a dashed second
  series and the difference column; subpath navigation; persistence across a
  remount.

## 6. Changelog

- **0.3.0** — Redesign as one plate. The Learn / Analyze / Summary
  stepper becomes two views (§2.1–2.4): the Plate, where the Five Forces diagram is the
  interface (pick an industry emblem, select a force on the diagram, rate it,
  tick drivers) and the Summary. Ratings are drawn as line weight, ticks,
  hatching and pips. Learn content moves on demand ("About this force",
  "About the framework"). The radar chart becomes the read-only plate plus a
  schedule table with dashed comparison bars. Confirmations are on the page
  instead of browser dialogs. `learn` and `analyze` subpaths open the Plate.
  The analysis model, evidence rules, export format and storage key are
  unchanged.
- **0.2.1** — Export: the structure caveat is printed under the structure
  line (it was required on screen but missing from the hand-in). Documented
  paragraph spacing, escaping, evidence for unrated forces, and the storage
  repair rules. Spec now sits under INTENT.md.
- **0.2.0** — Moved into the Agentic Marketing Toolkit as tool #1: routes under
  `#/five-forces/…`, shell provides header/footer, storage key namespaced,
  paths relative to the tool folder. Added Porter's fifth rivalry condition
  (firms cannot read each other's signals) and buyer price sensitivity's
  fourth condition (little effect on the buyer's other costs); drivers per
  force are now 4–9; expected retaliation is described as a separate
  consideration from the seven entry barriers.
- **0.1.0** — Initial specification.
