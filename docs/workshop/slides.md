# Slides: source text and speaker notes

This file is the plain-text mirror of the deck at
https://claude.ai/artifact/EusQFn1k3P9eZWQpXCXqpZ. The deck is the master:
Bill edits it directly. When it changes, update this file to match.
There are 17 slides. Timings match `run-of-show.md`.

## Names used throughout

| Token | Value |
|---|---|
| TITLE | How products get built |
| SUBTITLE | Harnesses steer the agents. GitHub is where we build together: tools, products, even businesses. |
| PRODUCT | Agentic Marketing Toolkit |
| TOOL_1 | Five Forces Explorer |
| REPO | github.com/chickensintrees/agentic-marketing-toolkit |
| SITE | chickensintrees.github.io/agentic-marketing-toolkit (Five Forces at `#/five-forces`) |
| LINE | My agent does the git. I make the calls. |

Placeholders still open: `[SLIDO CODE]`, `[QR: …]`, `[BUILD GRAPH]`,
`[SCREENSHOT: …]`, `#[ISSUE]` and `[TOP 3 ANSWERS FROM POLL 1]`. They are
listed in `tonight-checklist.md`.

**On-screen rule (Bill's):** only titles plus the minimum facts, labels,
prompts, commands or URLs. Commentary belongs in the speaker notes.

---

## 1. Cover (0:00)

**How products get built**

Harnesses steer the agents. GitHub is where we build together: tools,
products, even businesses.

Bill Moore · West Virginia University · 9 November 2026

> **Notes:** Thank the professor. The two ideas: harnesses are how we
> control AI agents so they build the tools we want; GitHub is where people
> and their agents build tools, products, even businesses together. In this
> session: a live agent change to a shared product, and how to connect your
> own agent to GitHub.

## 2. Live site (0:01)

[LIVE SITE: chickensintrees.github.io/agentic-marketing-toolkit]

> **Notes:** Switch to the browser, about 90 seconds. Five Forces: Learn
> (open one force card), Analyze (load the whitewater rafting preset),
> Summary (radar chart, then Compare with U.S. airlines). If the site won't
> load, run the local build (`npm run preview`).

## 3. Join in (0:03)

JOIN IN

**If you could hire a team of software developers to build you a digital
tool (dashboard, website, app, experience, etc.), what would you build?**

slido.com · #[SLIDO CODE] · [QR: Slido]

> **Notes:** Poll 1, a word cloud, two or three entries per person, about
> 2 minutes. Read the top answers aloud. They come back on slide 13 as
> candidate tools. The Q&A tab is open all session. If Slido fails, take
> five ideas by show of hands and write them down.

## 4. About me (0:06)

**About me**

Bill Moore

billmoore.ai

> **Notes (Bill's):** Open billmoore.ai. Design technologist, Pittsburgh.
> Twenty years in video and media, eight at BCG designing AI products.
> GENE: BCG's conversational AI. He designed its personality and voice and
> co-hosted 52 podcast episodes with it. It was the first non-human Webby
> winner for Best Podcast Cohost (2024).

## 5. How this was built (0:10)

**How this was built**

1. **Spec.** One shared source of truth.
2. **Split.** Builder, research, review and fix agents.
3. **Coordinate.** Agents message each other; a person redirects.
4. **Integrate.** Pull requests into one repo; tests check every change.

[BUILD GRAPH: sessions, agents, messages, PRs, timings]

> **Notes:** An orchestrator agent took the planning notes, wrote SPEC.md
> first, and split the work. A builder agent wrote the app. A research
> agent checked current tool facts. Four reviewer agents each took one
> lens: Porter accuracy, code against the spec, accessibility, and beginner
> onboarding. Fixer agents addressed their findings, and a verifier checked
> the fixes. Separate sessions handled other chunks, including this deck.
> Point at the graph. One redirect story: Bill rejected the first deck and
> title, and the agents changed course.

## 6. Harness (0:14)

IDEA 1 · HARNESSES

**A harness connects power to work, under human control.**

| Power | Harness | Work |
|---|---|---|
| Horse | Harness | Cart and driver |
| AI agent | Spec, rules, skills, checks | Tools and products |

*Footer:* From Old French *harneis*, "equipment"

> **Notes:** Idea 1. *Harneis* meant equipment: a man-at-arms' gear, and
> the fittings for a draft animal. A harness connects a source of power to
> a load so a person can steer it. An agent, like a horse, has power but no
> sense of where you want to go. Harness engineering is building that gear
> for agents: the specs, rules, skills and checks that make them build what
> you want. Reference: Anthropic Engineering, "Effective harnesses for
> long-running agents" (Justin Young, 26 November 2025).

## 7. The harness in this repo (0:17)

IDEA 1 · HARNESSES

**The harness in this repo**

| Part | File | |
|---|---|---|
| Spec | SPEC.md | What the product must do |
| Rules | AGENTS.md | Plan first. Ask before anything public. Never push to main. |
| Skills | add-industry, propose-feature… | Step-by-step recipes |
| Checks | Tests and CI | Run on every change |

*Footer:* github.com/chickensintrees/ai-coding-rules

> **Notes:** A SPEC.md works like a creative brief: objective, audience,
> mandatories, non-goals. Example non-goal from the real spec: "No calls to
> AI or other paid APIs, and no credentials of any kind." AGENTS.md is the
> shared contract every agent reads first. Checks: when anyone adds an
> industry, tests check all five ratings, the drivers, the rationale and
> the evidence labels. That lets many contributors work in one repo without
> one person reading every line. Bill's reusable rules are at
> github.com/chickensintrees/ai-coding-rules.

## 8. Connect your agent to GitHub (0:20)

IDEA 2 · GITHUB

**Connect your agent to GitHub. Then it does the git.**

You decide → your agent → GitHub

fork · branch · commit · push · pull request · comment

Browser sign-in only. Never paste a token into chat.

Claude Code: `gh auth login --web`

[SCREENSHOT: GitHub device-code sign-in]

> **Notes:** Idea 2: GitHub is where people and their agents build
> together: tools, products, even businesses. The demo agent is Claude
> Code, and the connection is the GitHub CLI. `gh auth login --web` gives a
> one-time code, which you approve in the browser. This works in any agent
> that runs terminal commands: Claude Code, Codex, Cursor, Replit's Shell.
> After that, the agent does the fork, branch, commit, push and pull
> request, and posts PR and issue comments. Claude Code asks permission
> before each command that changes something. Show `gh auth status` in the
> terminal ("Logged in to github.com"); the sign-in was done in advance.
> The steps are on the handout. Safety: browser sign-in only, no tokens in
> chat, approve each public action, and revoke at github.com → Settings →
> Applications. The line: "My agent does the git. I make the calls."

## 9. Vote (0:23)

slido.com · #[SLIDO CODE]

**Which industry should Five Forces add?**

A. Ski resorts · B. Craft breweries · C. Food trucks

> **Notes:** Poll 2, multiple choice, about 60 seconds. Announce the
> winner. Each option has a prepared fallback branch and PR
> (`live-demo-script.md`). If Slido is down, take a show of hands.

## 10. The prompt (0:24)

**The prompt**

> Use the add-industry skill to add an illustrative **[WINNING INDUSTRY]**
> industry to Five Forces. Follow AGENTS.md and show me your plan first.
> Then run npm run check, push a branch, open a draft pull request for
> issue **#[ISSUE]**, and comment on the issue with the link.

> **Notes:** Read it aloud. It contains no code and no git commands; the
> skill, AGENTS.md and the GitHub connection cover the rest. Paste it into
> Claude Code (exact text in `live-demo-script.md`). When the plan appears,
> read it aloud and approve it. Then move to the next slide while the agent
> works.

## 11. Five Forces: AI coding agents (0:26)

slido.com · #[SLIDO CODE]

**Five Forces: AI coding agents**

Threat of new entrants. How easy is it for a new competitor to enter?
1 Very low · 2 Low · 3 Moderate · 4 High · 5 Very high

*Footer:* Higher rating = more pressure on industry profitability

> **Notes:** Poll 3, a rating from 1 to 5, while the agent works. In the
> app: Analyze, then Custom industry. Name: "AI coding agents". Scope: "AI
> coding assistants for software teams and individuals, worldwide". On
> Threat of new entrants, enter the most common rating, tick the drivers
> people cite, and type a one-line rationale from the room. Ask two or
> three people to explain their rating. The evidence label shows "My
> judgment / assumption", because a class poll is not a source. If time
> allows, discuss rivalry and buyer power. Check the agent every few
> minutes.

## 12. From plan to merge (0:33)

**From plan to merge**

Plan → Change → npm run check → Push → Pull request → Comment → Human merges

[SCREENSHOT: draft PR with green checks and the agent's issue comment]

> **Notes:** In the terminal, `npm run check` passes (lint, types, tests,
> build). On GitHub, show the PR description the agent wrote, the CI status,
> and its comment on the issue, which everyone working on the repo can see.
> Bill approved the plan, the checks tested the work, and the merge is a
> human decision. If the agent stalled or failed, say so and open the
> fallback PR. A red check means the harness caught a problem.

## 13. Agentic Marketing Toolkit (0:38)

**Agentic Marketing Toolkit**

- TOOL 1 · LIVE: Five Forces Explorer
- CANDIDATES: SWOT · STP · personas · marketing mix · value proposition · journey map · pricing
- FROM THE POLL: [TOP 3 ANSWERS FROM POLL 1]

One folder and one SPEC.md per tool

> **Notes:** The toolkit is the worked example of both ideas. Bring back
> the poll 1 answers as candidate tools. Each tool lives in its own folder
> (`src/tools/<id>/`) with its own spec, so one tool can't break another,
> and the same checks run on every change. The candidates are ideas, not
> built yet. The smallest contribution is adding an industry to Five
> Forces; the largest is proposing a new tool. Each contributor works one
> issue with their agent and proposes it as a pull request. The same
> harness-and-GitHub pattern is how teams build products and how businesses
> get started.

## 14. Contribute (0:45)

**Contribute**

1. Make a free GitHub account.
2. Open a coding agent and paste the starter prompt from the handout.
3. It connects to GitHub, forks, and walks you through a first contribution.

You approve every fork, push and pull request. Voluntary unless your
instructor assigns it.

[QR: REPO] · github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Hand out the handout. It has the starter prompt word for word.
> The prompt asks the agent for a browser sign-in (never a pasted token)
> and to wait for approval before anything public. For help, students open
> an issue with the "question" template, and Bill answers. Bill offers help
> to anyone who wants to contribute. Whether it's assigned is the
> professor's call.

## 15. What you'll need (0:47)

**What you'll need**

| Tool | Plan |
|---|---|
| Claude Code | Pro or higher |
| Codex | Free/Go: desktop app only. Web, CLI, IDE: Plus |
| Cursor | Free plan available |
| Replit | Free Starter, limited agent use. Fork first |
| Lovable | Can't attach to an existing repo. Use the web editor |

**No paid plan:** GitHub's web editor forks and opens the pull request for you.

*Footer:* Checked against official docs, 8 November 2026

> **Notes:** Codex Plus is $20 a month. Lovable Free gives 30 build credits
> a month, and students get 50% off Pro. Cursor's student discount closed
> to new sign-ups on 25 June 2026. GitHub Education gives verified students
> Copilot free, but verification can take days. The web editor path: open a
> file on github.com and click the pencil icon. GitHub forks the repo and
> offers to open a pull request. That's enough to add one industry.

## 16. Questions (0:50)

**Questions**

slido.com · #[SLIDO CODE]

> **Notes:** Top-voted Slido questions first, then hands. Likely questions:
> - Is it safe to let an agent push for me? It pushes to your fork, asks
>   first, and nothing reaches the live product without review and passing
>   checks.
> - Will this change marketing jobs?
> - Which tool should I start with? Any of the five; the starter prompt
>   works in all of them.
> - Is the code any good? The checks show it, and it's open source.
>
> Answer cost questions only with known facts. Leave three minutes for the
> close.

## 17. Close (0:57)

**My agent does the git. I make the calls.**

Harnesses steer the agents. GitHub is where we build together: tools,
products, even businesses.

chickensintrees.github.io/agentic-marketing-toolkit ·
github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Say the line, then the two ideas once more. The invitation:
> the class is building the Agentic Marketing Toolkit together, Five Forces
> is the first tool, and Bill will help anyone who wants to build the next
> one, through the repo's issues. Thank the professor and the class. End
> on time.
