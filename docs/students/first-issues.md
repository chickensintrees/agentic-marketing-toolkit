# First issues

Twenty ready-made contributions, from a 30-minute industry preset to a whole
new tool. Each one has a title, labels, a difficulty, and a body you can paste
straight into a GitHub issue.

**How to use this list**

1. **Search first.** Bill may already have opened these as issues: [open issues](https://github.com/chickensintrees/agentic-marketing-toolkit/issues). If it exists, claim it with a comment such as "I'd like to work on this." If someone else already claimed it, pick another or offer to help.
2. **If it doesn't exist yet,** open it: use the matching [issue form](https://github.com/chickensintrees/agentic-marketing-toolkit/issues/new/choose), or ask your agent to create it with the title and body below. Bill adds the labels.
3. **One issue, one branch, one pull request.** Put `Closes #<number>` in the PR description.

**Difficulty:** *Beginner* = one or two files, no spec change, works with the
[no-install path](../../CONTRIBUTING.md#no-install-path-the-github-web-editor).
*Intermediate* = a spec change plus code. *Project* = a new tool, built over two
pull requests.

No install? For the screenshots, choose the **Custom industry** emblem on the
live site's Plate, enter the same name, scope and five ratings, then
screenshot the Plate and the Summary.

## Industry presets for Five Forces Explorer

Each preset is one new file in `src/tools/five-forces/data/industries/` plus one
line in that folder's `index.ts`. Your agent's skill for this is `add-industry`.
The point is **your** judgment: decide the scope and the ratings, and let the
agent handle the file.

### 1. Add industry preset: Athletic footwear

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for athletic footwear.

Suggested id: `athletic-footwear`. Suggested scope: "Branded athletic and sneaker footwear sold to consumers in the U.S." (the contributor decides the final scope).

Things to think about: who holds power, the brands or the retailers that stock them? How easily do shoppers switch brands?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/athletic-footwear.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 2. Add industry preset: Ride-hailing

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for app-based ride-hailing.

Suggested id: `ride-hailing`. Suggested scope: "App-based ride-hailing in large U.S. cities" (the contributor decides the final scope).

Things to think about: are drivers suppliers here, and how easily can they switch apps? What are riders' substitutes?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/ride-hailing.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 3. Add industry preset: Fast fashion

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for fast-fashion apparel retail.

Suggested id: `fast-fashion`. Suggested scope: "Fast-fashion apparel retail, in stores and online, in the U.S." (the contributor decides the final scope).

Things to think about: how hard is it to start selling clothes online? How much do shoppers care about price versus newness?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/fast-fashion.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 4. Add industry preset: College textbooks

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for college textbooks and course materials.

Suggested id: `college-textbooks`. Suggested scope: "New and used college textbooks and digital course materials in the U.S." (the contributor decides the final scope).

Things to think about: who is the buyer, the student who pays or the instructor who chooses the book? What substitutes do students reach for?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/college-textbooks.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 5. Add industry preset: Craft beer

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for craft beer.

Suggested id: `craft-beer`. Suggested scope: "Independent craft breweries selling in one U.S. state" (the contributor decides the final scope).

Things to think about: how much power do distributors and retailers have? How crowded is the shelf, and how easy is it to open a brewery?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/craft-beer.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 6. Add industry preset: Smartphones

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for smartphones.

Suggested id: `smartphones`. Suggested scope: "Smartphone makers selling to consumers in the U.S." (the contributor decides the final scope).

Things to think about: what do switching costs look like for someone moving their apps, photos and accessories? How much do component suppliers matter?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/smartphones.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

### 7. Add industry preset: Beauty and cosmetics

- **Labels:** `new-industry`, `five-forces`, `good first issue`
- **Difficulty:** Beginner

```markdown
Add an illustrative Five Forces preset for beauty and cosmetics.

Suggested id: `beauty-cosmetics`. Suggested scope: "Mass-market beauty and cosmetics products sold to consumers in the U.S." (the contributor decides the final scope).

Things to think about: how much has selling online changed the threat of new entrants? Who has the power, brands or the retailers that stock them?

Acceptance criteria
- [ ] New file `src/tools/five-forces/data/industries/beauty-cosmetics.ts`, default-exporting a preset whose `id` equals the file name
- [ ] Registered at the end of `INDUSTRY_PRESETS` in `data/industries/index.ts`
- [ ] All five forces: a rating 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy), 2–4 valid driver ids from `data/forces.ts`, a 2–4 sentence rationale, `evidence: 'illustrative'`, empty source
- [ ] Cautious, general language: no statistics, market shares or claims about named companies
- [ ] `npm run check` passes; the PR includes screenshots of the new preset on the Plate and in the Summary
```

## New tools for the suite

One issue per tool on the wanted list (`src/tools/wanted.ts`, shown on the
app's Home page). Each is built **spec first** over two pull requests. Your
agent's skill is `add-tool`; the human guide is [build a tool](build-a-tool.md).
The "ideas to consider" are prompts for the spec, not requirements.

The acceptance criteria are the same for every tool:

- **PR 1, spec:** `src/tools/<id>/SPEC.md`, copied from `docs/specs/TOOL-TEMPLATE.md` with every section filled in (framework and sources, users, views, data, required tests, smallest useful version), respecting the suite's non-goals and accessibility rules, and approved in review.
- **PR 2, build:** the folder with `index.ts` exporting `tool` (id `<id>`) and at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; a row in `SPEC.md` §4; every requirement in the tool's spec met; keyboard operable; `npm run check` passes; screenshots of each view.

### 8. Build a new tool: SWOT Builder (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the SWOT Builder: list a company's strengths, weaknesses, opportunities, and threats, then turn them into strategic options.

Tool id and folder: `swot-builder` (`src/tools/swot-builder/`).

Ideas to consider in the spec: a four-quadrant view; separating internal factors (strengths, weaknesses) from external ones (opportunities, threats); pairing them into strategic options; a Markdown export like Five Forces Explorer's.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/swot-builder/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `swot-builder`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 9. Build a new tool: STP Planner (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the STP Planner: segment a market, decide which segments to target, and write a positioning statement for them.

Tool id and folder: `stp-planner` (`src/tools/stp-planner/`).

Ideas to consider in the spec: describing segments and the basis for each; simple criteria for choosing targets; a guided positioning statement; an export.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/stp-planner/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `stp-planner`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 10. Build a new tool: Customer Persona Builder (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Customer Persona Builder: turn customer research into a persona with goals, pain points, and buying triggers a team can design for.

Tool id and folder: `persona-builder` (`src/tools/persona-builder/`).

Ideas to consider in the spec: which fields a persona needs; marking each point as research-based or assumed (like Five Forces Explorer's evidence labels); a printable one-page persona.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/persona-builder/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `persona-builder`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 11. Build a new tool: Marketing Mix (4Ps) Planner (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Marketing Mix (4Ps) Planner: plan product, price, place, and promotion for an offer, and check that the four support each other.

Tool id and folder: `marketing-mix-planner` (`src/tools/marketing-mix-planner/`).

Ideas to consider in the spec: one step per P; a consistency check that asks whether the four fit the target customer; an export.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/marketing-mix-planner/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `marketing-mix-planner`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 12. Build a new tool: Value Proposition Mapper (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Value Proposition Mapper: match customer jobs, pains, and gains against what an offer provides, and see where the fit is weak.

Tool id and folder: `value-proposition-mapper` (`src/tools/value-proposition-mapper/`).

Ideas to consider in the spec: a customer side and an offer side; linking each pain or gain to what addresses it; highlighting the ones nothing addresses.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/value-proposition-mapper/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `value-proposition-mapper`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 13. Build a new tool: Customer Journey Map (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Customer Journey Map: lay out each stage from awareness to loyalty, with touchpoints, feelings, and the moments worth fixing.

Tool id and folder: `customer-journey-map` (`src/tools/customer-journey-map/`).

Ideas to consider in the spec: editable stages; touchpoints and a feeling rating per stage (shown with text, not only color); flagging the moments worth fixing; an export.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/customer-journey-map/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `customer-journey-map`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 14. Build a new tool: Perceptual Map (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Perceptual Map: plot brands on two attributes customers care about to spot crowded positions and open gaps.

Tool id and folder: `perceptual-map` (`src/tools/perceptual-map/`).

Ideas to consider in the spec: choosing the two axes; placing brands with keyboard-accessible controls; a hand-written SVG chart (no chart library) with a data-table equivalent, like Five Forces Explorer's plate and its schedule of forces.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/perceptual-map/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `perceptual-map`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 15. Build a new tool: PESTEL Scanner (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the PESTEL Scanner: scan political, economic, social, technological, environmental, and legal trends and judge which ones matter.

Tool id and folder: `pestel-scanner` (`src/tools/pestel-scanner/`).

Ideas to consider in the spec: one step per category; rating each trend's impact and likelihood; a ranked summary of the trends that matter most; an export.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/pestel-scanner/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `pestel-scanner`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 16. Build a new tool: Break-even & Pricing Calculator (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Break-even & Pricing Calculator: find the sales volume needed to break even at a given price, and see how profit changes as price moves.

Tool id and folder: `break-even-pricing` (`src/tools/break-even-pricing/`).

Ideas to consider in the spec: inputs for fixed cost, variable cost per unit and price; the break-even formula as a tested pure function; how to handle a price at or below variable cost; a simple table of profit at several prices.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/break-even-pricing/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `break-even-pricing`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

### 17. Build a new tool: Customer Lifetime Value Calculator (spec first)

- **Labels:** `new-tool`, `spec`, `help wanted`
- **Difficulty:** Project

```markdown
Build the Customer Lifetime Value Calculator: estimate what a customer is worth over time from margin and retention, and compare it with the cost to acquire one.

Tool id and folder: `customer-lifetime-value` (`src/tools/customer-lifetime-value/`).

Ideas to consider in the spec: which CLV formula to teach (state it and cite it in the spec); inputs for margin, retention and acquisition cost; tests for edge cases such as 0% and 100% retention.

Acceptance criteria
- [ ] PR 1 (spec): `src/tools/customer-lifetime-value/SPEC.md` from `docs/specs/TOOL-TEMPLATE.md`, every section filled in, framework sources named, approved in review
- [ ] PR 2 (build): `index.ts` exports `tool` with id `customer-lifetime-value`; at least one test; registered in `TOOLS`; removed from `WANTED_TOOLS`; row added to `SPEC.md` §4
- [ ] Every requirement in the tool's spec is met; keyboard operable; no new dependencies
- [ ] `npm run check` passes; screenshots of each view in the PR
```

## Improve Five Forces Explorer

### 18. Five Forces: download the plate as an SVG image

- **Labels:** `enhancement`, `five-forces`, `spec`
- **Difficulty:** Intermediate

```markdown
Students want to put their Five Forces plate into slides. Add a "Download plate (.svg)" action to the Summary view's export section.

This changes behavior, so the spec comes first: propose it with `docs/specs/TEMPLATE.md`, then update `src/tools/five-forces/SPEC.md` §2.4 and its changelog in the same PR as the code. The plate is already drawn as SVG from the ratings, so no chart library is needed.

Acceptance criteria
- [ ] Proposal in `docs/specs/` and the tool spec updated (§2.4, changelog)
- [ ] Summary has a labeled "Download plate (.svg)" button next to the existing export buttons
- [ ] The downloaded file opens in a browser and shows the plate as the Summary draws it, with a title naming the industry
- [ ] The SVG is produced by a pure function in `lib/` with unit tests
- [ ] Keyboard operable, with a visible success or failure status message like "Copy as Markdown" has
- [ ] `npm run check` passes; screenshot in the PR
```

### 19. Five Forces: keyboard and screen-reader review

- **Labels:** `accessibility`, `five-forces`, `good first issue`
- **Difficulty:** Beginner (no code needed to start)

```markdown
Check that Five Forces Explorer works for people who use a keyboard or a screen reader (suite SPEC §2.4). No coding needed for the review itself.

How: use only the keyboard (Tab, Shift+Tab, Enter, Space, arrow keys) to go through the Plate (choose an industry, select each force, rate it, tick its drivers, open the on-demand sections) and the Summary (Compare with, the export buttons). Then try a built-in screen reader (VoiceOver on a Mac, Narrator on Windows).

Acceptance criteria
- [ ] A comment on this issue listing each problem found: which view, what you did, what happened, what you expected
- [ ] A separate issue opened for each real problem (or a note that none were found)
- [ ] Optional: one small pull request that fixes one problem, with `Closes #<that issue>`
```

### 20. Docs: add screenshots to "Connect your agent to GitHub"

- **Labels:** `documentation`, `good first issue`
- **Difficulty:** Beginner

```markdown
`docs/students/connect-github.md` describes the GitHub CLI sign-in in words only. Add screenshots of the steps on one operating system (Mac or Windows): the terminal prompt, the one-time code, the github.com/login/device page, and the authorize page.

Acceptance criteria
- [ ] Images saved in `docs/students/images/` as small PNG files with descriptive names
- [ ] Each image is referenced in `connect-github.md` next to the step it shows, with alt text that describes it
- [ ] No personal details visible: blur or crop usernames, email addresses and the one-time code
- [ ] Says which operating system the screenshots are from
```
