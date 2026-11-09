# Job Fit Ranker — Tool Specification

> A tool in the [Agentic Marketing Toolkit](../../../SPEC.md). **This file is
> the single source of truth for this tool**; the suite spec (`/SPEC.md`)
> governs everything shared: the shell, routing, the tool contract,
> accessibility and design rules (suite §2.4), quality gates, and deployment.
> Changes flow through this spec before they flow into code. See
> [AGENTS.md](../../../AGENTS.md) for the workflow.
>
> Tool id: `job-fit-ranker` · Folder: `src/tools/job-fit-ranker/` · Routes:
> `#/job-fit-ranker` (Ranking, the default view), `#/job-fit-ranker/criteria`,
> `#/job-fit-ranker/jobs`.
>
> Status: **draft for Bill's review.** A static, clickable mockup is at
> [`design/job-fit-ranker/index.html`](../../../design/job-fit-ranker/index.html).
> Open questions are in §7.

## 1. What this is

Job Fit Ranker teaches **weighted multi-criteria decision analysis** (the
weighted additive scoring model) by having the user list the jobs open to them
in their area, set the criteria that matter to them and how much each one
matters, rate each job against each criterion, and see the jobs ranked on an
interactive chart that re-sorts as the weights change.

It also teaches the difference between **compensatory** rules (a strong score
on one criterion can make up for a weak one) and **non-compensatory** rules (a
minimum the job must meet, whatever else it offers), through optional
must-have minimums.

**Sources** (to be checked against the originals before this spec is merged):

- Keeney, R. L., & Raiffa, H. (1976). *Decisions with Multiple Objectives: Preferences and Value Tradeoffs.* Wiley.
- Hammond, J. S., Keeney, R. L., & Raiffa, H. (1998). Even swaps: A rational method for making trade-offs. *Harvard Business Review*, 76(2), 137–149.

### Who it is for

| User | Needs |
|---|---|
| **Student learning the framework** | To see how weights turn several ratings into one score, and how changing one weight changes the order. |
| **Student applying it** | To compare the real jobs they are considering against their own criteria, and leave with a ranked list they can export and explain. |
| **Instructor / presenter** | A reliable demo with illustrative example jobs and no setup, accounts, or API keys. |
| **Student contributor** | A small, well-organized folder where improvements are contained changes that automated checks can verify. |

### Non-goals (version 1)

The suite's non-goals apply (suite spec §1): no backend, accounts, tracking,
AI or paid APIs, and no chart, router or CSS libraries. Example content is
illustrative teaching material, not market research.

This tool's own non-goals:

- **No live job listings.** The tool does not search, fetch or scrape job boards or any other source. "Jobs in the area" are the jobs the user enters. The example set is fictional.
- No automatic conversion of raw values (salary in dollars, commute in minutes) into scores. The user rates every criterion on the same 1–5 scale; the commute time is used only for the area filter (§2.4).
- No sharing between users, no import from files, no more than 20 jobs or 8 criteria.

## 2. Product requirements

### 2.1 Layout and navigation

- Rendered inside the suite shell (suite spec §2). The tool shows its `h1` ("Job Fit Ranker"), a one-line purpose, and its view navigation.
- Views, in order: **Ranking**, **Criteria**, **Jobs**. Navigation works with keyboard alone and calls `navigate('')`, `navigate('criteria')` or `navigate('jobs')`. The current view is marked with `aria-current="page"`.
- The view comes from the `subpath` prop (suite spec §2.2): `''` → Ranking; `'criteria'` → Criteria; `'jobs'` → Jobs; any other subpath → Ranking.
- While the example jobs are loaded, the Ranking and Jobs views show: *"Example jobs are fictional and illustrative, not real listings."*

### 2.2 Criteria

1. A first visit starts with five default criteria: **Pay**, **Commute**, **Growth**, **Team and culture**, **Flexibility**. Each has a weight of 3.
2. Each criterion row has: a name (text field, 1–40 characters), a **weight** (slider and number, 0–5 in steps of 1, labelled "How much it matters"), and an optional **must-have minimum** (none, or 1–5).
3. The user can add a criterion (up to 8) and remove one (at least 1 must remain; removing asks for confirmation if any job has a rating for it).
4. Below the list, a line shows each criterion's share of the total weight as a percentage, so the user sees what "weight 3 of 15" means.
5. If every weight is 0, the Ranking view shows a message asking the user to give at least one criterion a weight above 0, not a chart.

### 2.3 Jobs

1. Empty state: two actions, **Add a job** and **Load example jobs** (six fictional jobs, §3.2).
2. Each job has: title (required), employer (required, free text), location (free text), commute in minutes (optional, 0–240), a link (optional, must start with `https://`), notes (optional), and a **rating of 1–5 for each criterion** (unrated is allowed; see §2.5).
3. The user can edit, add (up to 20) and remove a job (removing asks for confirmation).
4. Ratings are entered as a row of five labelled radio buttons per criterion (1 = poor, 5 = excellent), so they work with the keyboard and a screen reader.

### 2.4 Ranking (the chart)

1. **The chart:** one horizontal bar per job, sorted from highest to lowest overall score. Each bar is divided into segments, one per criterion, whose length is that criterion's weighted contribution to the score (§2.5). Segments are told apart by **pattern and a text label**, not by color: solid, hatched, cross-hatched, dotted, ruled, and so on, with a legend.
2. **Live weights:** beside the chart (below it on narrow screens), a compact weight slider for each criterion. Moving a slider re-scores and re-sorts the chart immediately. When the order changes, bars slide to their new place, unless `prefers-reduced-motion` is set.
3. **Focus a criterion:** choosing a criterion in the legend highlights its segment in every bar and dims the rest; choosing it again clears the highlight.
4. **Inspect a job:** hovering, focusing or choosing a bar shows that job's breakdown: rating, weight and contribution per criterion, and the overall score. Each bar is a button with an accessible name such as "Product Marketing Associate, Riverbend Software: score 3.9 of 5, rank 1 of 6".
5. **Must-haves:** a job that rates below any must-have minimum is marked **"Misses a must-have: <criterion>"** in text and is listed after every job that meets them, whatever its score.
6. **Area filter:** an optional "Within ___ minutes" field hides jobs whose commute is longer. Jobs with no commute entered are kept. The chart says how many jobs are hidden.
7. **Sort:** by overall score (the default) or by any single criterion's rating, using a labelled select.
8. **Data table:** below the chart, a table with the same numbers (rank, job, each criterion's rating, score, must-have status) for screen readers and for print.
9. The chart is an inline SVG drawn in code with `role="img"` and an `aria-label` that summarizes the top three jobs. The bars themselves are HTML buttons or SVG elements with button semantics.

### 2.5 Scoring (pure logic in `lib/`)

- Weighted score of a job: `score = Σ (weightᵢ × ratingᵢ) / Σ weightᵢ`, over the criteria with a weight above 0 and a rating. The result is on the 1–5 scale, shown to one decimal place.
- Contribution of criterion *i* (the segment length): `(weightᵢ × ratingᵢ) / Σ weightᵢ`, so the segments of a bar add up to its score.
- An unrated criterion is left out of that job's sum, and the job is marked **"Not fully rated"**.
- A job with no rated, weighted criterion has no score and is listed last, marked **"Not rated yet"**.
- Ties are broken by the rating on the criterion with the highest weight, then by title (A–Z), so the order is stable.
- A must-have is met when the rating is at least the minimum. An unrated must-have criterion counts as not met.

### 2.6 Export

- **Copy as Markdown** and **Download .md** (shared helpers in `src/shared/`): the criteria with weights and must-haves, then the ranking as a table (rank, job, employer, score, must-have status), then each job's notes.
- The export includes the disclaimer line if the example jobs are loaded.

### 2.7 Persistence

- Saved to `localStorage` under the key `agentic-marketing-toolkit:job-fit-ranker:v1` on every change.
- Loading tolerates missing, unavailable (throws), or corrupted storage and validates the stored shape; anything invalid falls back to a fresh state without crashing.
- **Start over** (with confirmation) clears the jobs and restores the default criteria.

### 2.8 Accessibility and design

Suite spec §2.4 applies in full: semantic landmarks, one `h1`, labels on every
control, keyboard operable, visible focus, contrast of at least 4.5:1, nothing
carried by color alone, `prefers-reduced-motion` respected, 320 px to desktop
with no horizontal scrolling. The tool uses the shared design tokens and
components in `src/shared/`.

- The chart has a visible data table with the same numbers (§2.4.8).
- Criterion segments are distinguished by pattern and label. The accent color means one thing: the selected job.
- Re-sorting announces the new top job in a polite live region ("Now first: …").

## 3. Data

### 3.1 Types (`src/tools/job-fit-ranker/types.ts`)

```ts
export type Rating = 1 | 2 | 3 | 4 | 5

export interface Criterion {
  id: string            // stable, e.g. 'pay' or a generated id
  name: string          // 1–40 characters
  weight: number        // integer 0–5
  mustHave: Rating | null
}

export interface Job {
  id: string
  title: string
  employer: string
  location: string
  commuteMinutes: number | null
  url: string           // '' or https://…
  notes: string
  ratings: Record<string, Rating>   // criterion id → rating; missing = unrated
}

export interface JobFitState {
  criteria: Criterion[]
  jobs: Job[]
  exampleLoaded: boolean
  maxCommute: number | null
  sortBy: 'score' | string          // 'score' or a criterion id
}

export interface RankedJob {
  job: Job
  rank: number
  score: number | null
  contributions: Record<string, number>
  missedMustHaves: string[]          // criterion ids
  fullyRated: boolean
}
```

### 3.2 Content (`src/tools/job-fit-ranker/data/`)

- `defaultCriteria.ts`: the five default criteria (§2.2.1).
- `exampleJobs.ts`: six **fictional** jobs a marketing MBA graduate might weigh, at fictional employers with invented names (for example "Riverbend Software" or "Northfield Health"). Their ratings are spread out, so that changing one weight visibly changes the order. No real companies, no salary figures, no statistics.

## 4. Architecture (inside `src/tools/job-fit-ranker/`)

```text
SPEC.md                  this file
index.ts                 exports `tool: ToolDefinition` (suite spec §3.2)
JobFitRankerTool.tsx     root component: view nav + views
types.ts                 types from §3.1
data/
  defaultCriteria.ts
  exampleJobs.ts
lib/
  scoring.ts             score, contributions, must-haves, ranking, ties (§2.5)
  filter.ts              area filter and sort (§2.4.6–7)
  storage.ts             load/save with validation (§2.7)
  exportMarkdown.ts      Markdown export (§2.6)
components/
  ViewNav.tsx
  CriteriaView.tsx
  JobsView.tsx
  JobForm.tsx
  RankingView.tsx
  RankingChart.tsx       the SVG chart
  WeightSliders.tsx
  ChartLegend.tsx
  RankingTable.tsx
```

Rules: business logic lives in `lib/` as pure functions with unit tests;
components stay thin; shared UI and helpers come from `src/shared/`; nothing
is imported from another tool.

Registry: `tool` is appended to `TOOLS` in `src/tools/index.ts`. Job Fit Ranker
is not on `WANTED_TOOLS`, so nothing is removed there. A row is added to suite
SPEC.md §4.

## 5. Required tests

The suite quality gates apply (suite spec §6), including registry integrity.
This tool's tests must include:

- **Scoring** (`lib/scoring.test.ts`): the weighted score for a known case; contributions add up to the score; weight 0 drops a criterion; all weights 0 gives no scores; an unrated criterion is skipped and the job is marked not fully rated; a job with no ratings is last; must-have met at exactly the minimum, missed below it, and missed when unrated; jobs that miss a must-have sort after jobs that meet them; ties break by the top-weighted criterion, then title.
- **Filter and sort** (`lib/filter.test.ts`): jobs over the commute limit are hidden; jobs with no commute are kept; sorting by one criterion.
- **Storage** (`lib/storage.test.ts`): round trip; missing, throwing and corrupted storage fall back to the default state.
- **Export** (`lib/exportMarkdown.test.ts`): the table matches the ranking; the disclaimer appears only with example jobs.
- **Data integrity** (`data/data.test.ts`): unique ids; every example job rates every default criterion; example employer names are on a fictional-names list.
- **Components:** load the example jobs, see six bars in score order; raise one weight and see the order change; set a must-have and see a job marked and moved down; the data table matches the chart; subpaths `''`, `criteria`, `jobs` and an unknown one; the state survives a remount.

## 6. Changelog

- **0.1.0** — Initial specification (draft for review), with a static mockup in `design/job-fit-ranker/`.

## 7. Open questions for Bill

1. **Live listings.** "Available jobs in the area" can't be fetched without a backend or an API, which the suite rules out (suite §1). This draft has the user enter jobs and offers a fictional example set. Is that right for version 1?
2. **Fit with the suite.** The suite is "marketing and strategy tools". This is a decision tool for the students' own job search. Should it be on Home with the marketing tools, or in a separate "For your career" group?
3. **Name.** "Job Fit Ranker" (`job-fit-ranker`), or something else?
