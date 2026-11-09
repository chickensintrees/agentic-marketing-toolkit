# Proposed additions (drafts, not published)

Draft slide text and notes for the items in `INTENT.md` §7 that are marked
**missing** or **partial** and need Bill's decision (§8). Nothing here is in
the deck. The orchestrator reviews these drafts, and Bill chooses which ones
to publish.

All drafts follow INTENT.md §5:

- minimal on-screen text and visual-first layouts (P1–P3, P5);
- plain university register (P6);
- no slogans (P7), no "MBA" (P8) and no time framing (P9);
- consistent styling (P10).

Every factual claim is checked against the repository branch
`claude/hopeful-knuth-mp3jzi`, and the source is noted. Slide positions
refer to deck version 53 (19 slides).

| Draft | INTENT item | §8 question | Suggested position | Time cost |
|---|---|---|---|---|
| A. Tooling in the harness | 27 | Q3 | Edit slide 5 | 0 min |
| B. Two repositories | 28 | Q4 | After slide 5 | 2 min |
| C. Directing software | 4 | Q1 | After slide 3 | 2 min |
| D. From idea to specification | 6 | Q1 | After slide 5 or B | 2 min |
| E. Quality | 17 | Q1 | After slide 15 | 2 min |
| F. Five forces, five questions | 25 | Q1 | Before slide 10 | 2 min |
| G. Opening question | 2 | Q1 | Notes on slide 3 only | 0 min |
| H. Build it from the spec | 15 | Q5 | After slide 16 | 1 min |
| I. Alternative polls | 20, 23, 24 | Q2 | Swap only | 0 min |

**Time budget.** Questions currently have 8 minutes (0:52–1:00). Each slide
added costs about 2 minutes. Taking more than 4 minutes from Q&A needs
another cut. Shortening the Porter discussion on slide 14 is the documented
first cut.

---

## A. Tooling in the harness (item 27, M4)

**Change:** add a fifth card, Tools, to slide 5, "Components of a harness".
Bill listed "rules, … skills, … tooling" (M4). All five cards use the same
style (P10).

| Component | In this repository | Purpose |
|---|---|---|
| Spec | SPEC.md | What the software must do |
| Rules | AGENTS.md | Instructions every agent follows |
| Skills | add-industry, add-tool | Step-by-step procedures |
| **Tools** | **Git, GitHub CLI, npm scripts** | **What the agent uses to act** |
| Checks | Tests and CI | Automated verification of every change |

> **Notes:** Tools are the commands the agent runs. In this repository
> these are `git`; the GitHub CLI (`gh`), for forks, pull requests and
> comments; and the npm scripts. `npm run check` runs lint, type checks,
> tests and the build. The checks are tools too, run automatically by CI on
> every pull request.

*Source:* `package.json` scripts on the app branch (dev, build, typecheck,
lint, test, preview, check); `.github/workflows/ci.yml`; the
`connect-github` skill.

*Layout note:* five cards fit at 1664 px wide, about 300 px each. Card text
must stay at 28 px or more, so "Git, GitHub CLI, npm scripts" may wrap to
two lines.

---

## B. Two repositories (item 28, M4)

**New slide**, Part 1 · Harnesses.

**Title:** Two repositories

| | The harness | The application |
|---|---|---|
| Repository | github.com/chickensintrees/ai-coding-rules | github.com/chickensintrees/agentic-marketing-toolkit |
| Contains | Rules and a spec-driven development framework | The toolkit, its specs, its AGENTS.md and its checks |
| Reused | Across projects | In this project |

*Visual option (P1–P2):* two repository cards side by side, with an arrow
from the harness to the application labeled "AGENTS.md".

> **Notes:** One of the repositories shared today is a harness. It holds
> Bill's AI coding rules and spec-driven development framework, and it can
> be reused on any project. The application repository applies that harness:
> its AGENTS.md carries a condensed version of the rules, the spec-first
> workflow and the fork protocol, and links back to ai-coding-rules.

*Source:* INTENT.md §4 and item 13.

---

## C. Directing software (item 4)

**New slide**, at the start of Part 1, or after Poll 1 as a bridge.

**Title:** What this requires

| Not required | Required |
|---|---|
| Writing code by hand | Specifying what the software must do |
| | Testing whether it does it |
| | Deciding what to change |

> **Notes:** Students do not need to become software engineers. The work
> that remains with the person is strategy, specification and judgment:
> deciding what to build, describing it precisely, checking the result, and
> directing the next change. These are skills marketing students already
> use when they write a brief and evaluate creative work.

*Source:* INTENT.md item 4. The wording is paraphrased into the plain
register, not quoted from ChatGPT.

---

## D. From idea to specification (item 6)

**New slide**, Part 1, after "Components of a harness" (or after B).

**Title:** From idea to specification

Define → Build → Verify → Share

| Step | In this repository |
|---|---|
| Define | Update SPEC.md before code changes |
| Build | The agent implements the plan you approved |
| Verify | `npm run check` and CI |
| Share | A pull request for review |

> **Notes:** An idea is not yet a specification. A specification says who
> the tool is for, what it must do, what it will not do, and how we will
> know it works. In this repository the spec is updated first, the agent
> builds against it, the checks verify it, and a pull request shares it for
> review. Slide 15, "From change to merge", shows the same sequence live.

*Overlap:* this partly repeats slide 15. If time is short, merge the
"Define" step into the notes of slide 5 instead of adding a slide.

*Source:* the starter prompt step 6 ("update the relevant SPEC.md first");
`docs/workflows/` (plan, implement, test, review).

---

## E. Quality (item 17)

**New slide**, after slide 15, "From change to merge".

**Title:** Quality requirements in this project

| | Requirement | Where it is enforced |
|---|---|---|
| Privacy | No accounts, tracking or analytics | Spec non-goals |
| Accuracy | Every rating is labeled illustrative, assumption or sourced | The app's evidence labels |
| Security | No credentials or paid APIs; browser sign-in only | Spec non-goals; AGENTS.md |
| Accessibility | Keyboard use, contrast, screen-reader labels | Spec; review |

> **Notes:** Working code is the start, not the finish. A person stays
> responsible for what is merged. Changes are kept small so they can be
> reviewed. The four requirements here are written into the spec, so agents
> and reviewers check against them.

*Verify before publishing:* the suite SPEC.md and the Five Forces
`src/tools/five-forces/SPEC.md` on the merged branch still state these
non-goals and accessibility requirements. Version 0.1.0 of the spec stated
all four: §1 non-goals, §2.3 evidence rules, §2.7 accessibility.

---

## F. Five forces, five questions (item 25, M4)

**New slide**, before the live site (slide 10), so students see all five
dimensions before the app.

**Title:** Five forces, five questions

| Force | Question |
|---|---|
| Competitive rivalry | How intensely do existing competitors fight, and on what basis? |
| Threat of new entrants | How easy is it for new competitors to enter? |
| Supplier power | How much leverage do suppliers have over the industry? |
| Buyer power | How much leverage do customers have over the industry? |
| Threat of substitutes | How easily can buyers meet the same need another way? |

*Visual option (P1–P2):* the five-force diagram, with rivalry at the
center and the other four around it, in place of the table. The questions
appear as labels.

> **Notes:** These are the five questions the app asks, word for word. In
> the app, a higher rating always means more pressure on industry
> profitability. Source: Porter, "How Competitive Forces Shape Strategy"
> (HBR, 1979) and "The Five Competitive Forces That Shape Strategy" (HBR,
> 2008).

*Source:* `src/tools/five-forces/data/forces.ts` on the app branch (the
questions are copied exactly); SPEC §2.2 sources.

---

## G. Opening question (item 2)

**No new slide.** Poll 1 already asks what students would have developers
build, so a separate provocation slide would repeat it. Add this to the
slide 3 notes instead:

> After the word cloud: the tools named here do not have to wait for a
> development team. The rest of the hour shows how a person directs agents
> to build them.

If Bill wants a slide, the plain version is a single question on screen:
**What if the tool you need does not exist yet?**

---

## H. Build it from the spec (item 15, M4)

Bill: "give your coding agent this prompt … it'll build this for you."

**New slide**, after "How to contribute" (slide 16), or a handout section
only.

**Title:** Build your own copy from the spec

> Read src/tools/five-forces/SPEC.md in
> https://github.com/chickensintrees/agentic-marketing-toolkit. Build that
> app from scratch in a new project on my computer, following the spec
> exactly. Explain each step in plain language, show me a plan first, and
> run the tests before you finish.

> **Notes:** The spec is detailed enough for an agent to rebuild the app.
> This is a way to see spec-driven development end to end, separate from
> contributing to the class repository.

*Must verify before publishing:* run this prompt once in a clean folder with
Claude Code and with Codex, and check that the result works. **It has not
been tested.** If it doesn't produce a working app, keep only the
contributor starter prompt.

---

## I. Alternative polls (items 20, 23, 24, M3)

The free plan allows 3 polls plus 1 quiz per Slido event. A second event can
hold more. The current polls are: 1, what students would have developers
build; 2, which industry to add; 3, rate one force.

| Candidate | Type | Exact question | Replaces | Feeds |
|---|---|---|---|---|
| Item 20 | Word cloud | What slows down your marketing work? | Poll 1, or a second event | The toolkit slide: candidate tools |
| Item 23 | Multiple choice | What would help you contribute? A. A walkthrough session · B. Written step-by-step guide · C. Office hours · D. A partner | None; use as the Slido quiz or a second event | Bill's follow-up support plan |
| Item 24 | Open text | What should the toolkit teach next? | Poll 3, if the Porter rating is cut | The "first issues" list after class |

*Recommendation:* keep the current three, because each one feeds a live
step. Add item 23 at the end of "How to contribute" through a second Slido
event, so Bill learns what support students want.
