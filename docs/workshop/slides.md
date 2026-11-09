# Slides: source text and speaker notes

Plain-text source for the deck. The Claude Slides artifact is built from this
file, so keep the two in agreement. Timings match `run-of-show.md`.

## Names used throughout (change here first)

| Token | Value |
|---|---|
| PRODUCT | Agentic Marketing Toolkit |
| TOOL_1 | Five Forces Explorer |
| REPO | github.com/chickensintrees/agentic-marketing-toolkit |
| SITE | chickensintrees.github.io/agentic-marketing-toolkit |
| TOOL_1_URL | SITE + `#/five-forces` |
| TITLE | How Products Get Built Now |
| SUBTITLE | Many people, many agents, one repo |
| LINE | My agent does the git. I make the calls. |

If any of these change, search this folder for the old value and replace it
everywhere (the deck, the handout, the scripts).

Placeholders in brackets: `[SLIDO CODE]`, `[SCREENSHOT: …]`, `[QR: …]`,
`[BUILD GRAPH]`, `#[ISSUE]`. Each one is listed in
`tonight-checklist.md`.

---

## 1. Cover (0:00)

**How Products Get Built Now**

Many people, many agents, one repo

Bill Moore · West Virginia University · 9 November 2026

> **Notes:** Say hello and thank the professor. Then make the promise: "By
> the end of this hour you'll have watched an AI agent make a real change to
> a product this room is going to build together, and you'll know how to
> make your own agent do the same."

---

## 2. This didn't exist yesterday (0:01)

**This didn't exist yesterday.**

Agentic Marketing Toolkit · tool #1: Five Forces Explorer

[SCREENSHOT: Five Forces Explorer, Summary view with radar chart]

chickensintrees.github.io/agentic-marketing-toolkit

> **Notes:** Switch to the live site and spend about 90 seconds there. Open
> Five Forces: Learn (one force card), Analyze (load whitewater rafting, a
> nod to the New River Gorge), Summary (the radar chart, then Compare with
> U.S. airlines). Say: "People and agents built this last night, for this
> class, because you're studying Porter. It's tool number one of a product
> you're going to help build." If the site won't load, run the local build
> or stay on this screenshot.

---

## 3. Join in (0:03)

**What tool do you wish you had for your MBA work?**

slido.com · #[SLIDO CODE] · [QR: Slido]

> **Notes:** Poll 1, a word cloud. Allow two or three words per person.
> Give it about 2 minutes, and read the biggest answers aloud. Say: "Hold
> on to this. These might be tools number two, three and four." This word
> cloud comes back on slide 13. Tell them the Q&A tab is open all hour. If
> Slido fails, take five ideas by show of hands and write them down.

---

## 4. Who's talking (0:06)

**Twenty years in video and media. Eight at BCG designing AI products.**

- **GENE:** BCG's conversational AI. I designed its personality and voice,
  then co-hosted 52 podcast episodes with it. It was the first non-human to
  win a Webby for Best Podcast Cohost (2024).
- **Building since 2019:** interactive fiction with a hidden director,
  a deck-to-video pipeline, a product vision and prototype in an 8-day
  sprint.

[DEMO: one short GENE clip or screen, Bill's choice]

> **Notes:** About four minutes, including one short demo. GENE did live
> interviews at Davos, Cannes Lions and WIRED/Condé Nast, and was covered by
> Forbes, WIRED, the BBC and The Sunday Times. The point: "I come from
> storytelling and media, not computer science. Everything I build now, I
> build with agents." Bridge: "Here's how last night went."

---

## 5. How this was built last night (0:11)

**Last night, people and agents built this together.**

[BUILD GRAPH: sessions, agents, messages, PRs, timings, sent by the orchestrator]

1. Spec first: one SPEC.md as the shared truth.
2. Split the work: builder, research, reviewer and fixer agents, plus separate sessions.
3. Talk: agents messaged each other, and I redirected them mid-flight.
4. Integrate: branches and pull requests into one repo, with tests and CI as the referee.

> **Notes:** This is the case study, and it's real. An orchestrator agent
> took my planning notes, wrote SPEC.md first, and split the work. A
> builder agent wrote the app. A research agent checked current tool
> facts. Four reviewer agents each looked through a different lens (Porter
> accuracy, code against the spec, accessibility, beginner onboarding),
> fixer agents addressed what they found, and a verifier checked the
> fixes. Separate sessions handled other chunks, including the one that
> made this deck. Point at the graph. Tell one true redirect story: I
> rejected the first deck and title, and the agents changed course. Then:
> "That's how products get built now. And it's the same pattern you'll use."

---

## 6. What a harness is (0:15)

**A harness connects power to useful work, under a human's control.**

Horse → harness → cart and driver

AI agent → harness → useful work, with you deciding

*From Old French* harneis, *"equipment"*

> **Notes:** The word first. Harneis meant equipment: a man-at-arms' gear,
> and the fittings for a draft animal. A harness connects a source of power
> to a load so a person can steer it. A horse with no harness is strong and
> goes where it wants. An agent is the same. "Harness engineering" is
> building that gear. It's a term the AI labs use. Anthropic's engineering
> blog, for example, has a post called "Effective harnesses for long-running
> agents" (Justin Young, 26 November 2025). Pause here.

---

## 7. The harness in this repo (0:17)

**Four parts keep every agent pointed the same way.**

| Part | In this repo | What it does |
|---|---|---|
| **Spec** | SPEC.md | What good looks like: the shared truth |
| **Rules** | AGENTS.md | The shared contract: plan first, ask before anything public, never push to main |
| **Skills** | add-industry, propose-feature… | Repeatable recipes |
| **Checks** | Tests and CI | An automatic "no" when something breaks |

> **Notes:** The marketing hook: a SPEC.md is a creative brief. It has an
> objective, an audience, mandatories and non-goals. Read one non-goal from
> the real spec: "No calls to AI or other paid APIs, and no credentials of
> any kind." Then Checks: when anyone adds an industry, tests automatically
> check all five ratings, the drivers, the rationale and the labels. "That's
> how 40 people and 40 agents can work on one repo without one person
> reading every line." My reusable rules are public at
> github.com/chickensintrees/ai-coding-rules.

---

## 8. The key (0:20)

**Connect your agent to GitHub. Then it does the git.**

You decide → your agent → GitHub: fork · branch · commit · push · pull request · comment

One browser sign-in. Never paste a password or token into a chat.

[SCREENSHOT: GitHub browser sign-in / device code screen]

In Claude Code: `gh auth login` → browser → done

> **Notes:** This is the most important slide of the talk. I'm demoing with
> Claude Code. The connection is the GitHub CLI: `gh auth login`, a
> one-time code, and you approve it in the browser. That works in any agent
> that runs terminal commands: Claude Code, Codex, Cursor, Replit's Shell.
> After that, the agent can do every git step for you (fork, branch,
> commit, push, pull request) and talk to other people and agents through
> PR and issue comments. You stay the decision-maker: Claude Code asks
> permission before each command that changes something. Switch to the
> terminal and run `gh auth status` so they see "Logged in to
> github.com". Say: "I did the sign-in last night. It took a minute, in a
> browser." The steps are on the handout. Safety: sign in only through the
> browser, never paste a token into chat, approve each public action, and
> revoke access anytime at github.com → Settings → Applications. Say it out
> loud: "My agent does the git. I make the calls."

---

## 9. You choose what we build (0:23)

**Which industry should Five Forces add, right now?**

A. Ski resorts · B. Craft breweries · C. Food trucks

> **Notes:** Poll 2, multiple choice. About 60 seconds. Announce the
> winner. Every option has a prepared fallback branch and PR
> (`live-demo-script.md`). If Slido is down, take a show of hands.

---

## 10. The whole instruction (0:24)

**This is everything I'll tell the agent.**

> Use the add-industry skill to add an illustrative **[WINNING INDUSTRY]**
> industry to Five Forces. Follow AGENTS.md and show me your plan first.
> Then run npm run check, push a branch, open a draft pull request for issue
> **#[ISSUE]**, and comment on the issue with the link.

> **Notes:** Read it aloud. There's no code and no git commands in it. The
> harness and the GitHub connection supply the rest. Paste it into the
> agent (exact text in `live-demo-script.md`). When the plan appears, read
> it aloud and approve it. Approving is my job. Then go to the next slide
> while the agent works.

---

## 11. While it works: Porter on the agents themselves (0:26)

**Let's run Five Forces on the AI coding agent industry.**

*Threat of new entrants: how easy is it for a new competitor to enter? (1 = very low … 5 = very high)*

> **Notes:** Poll 3, a rating from 1 to 5. In the app, start a custom
> industry: "AI coding agents", scope "AI coding assistants for software
> teams and individuals, worldwide". Enter the class's most common rating
> for Threat of new entrants, tick the drivers people argue for, and type a
> one-line rationale from the room. Ask two people at the extremes to
> defend their rating. Point out the evidence label: "My judgment /
> assumption", because a class poll isn't a source. Check on the agent
> every few minutes. This exercise exists so a slow agent is never dead air.

---

## 12. The harness says yes or no (0:33)

**The agent proposes. The checks test. A human decides.**

Plan → change → npm run check → push → pull request → comment → human merges

[SCREENSHOT: the draft PR with green checks and the agent's issue comment]

> **Notes:** Back to the terminal: `npm run check` passes (lint, types,
> tests, build). Open the PR on GitHub: the description the agent wrote, CI
> running or green, and its comment on the issue. "That's agent comms: my
> agent just reported back to everyone working on this repo." Say: "I
> didn't read every line. I approved the plan, and the harness checked the
> work. The merge button is still mine." If the agent stalled or failed,
> say so honestly and open the fallback PR. A red check is the harness
> doing its job.

---

## 13. This class is a product team (0:38)

**This class is a product team.**

Agentic Marketing Toolkit

- **Tool #1:** Five Forces Explorer (live)
- **Next, maybe:** SWOT · STP · personas · marketing mix · value proposition · journey map · pricing
- **Your word cloud:** [TOP 3 ANSWERS FROM POLL 1]

Each tool is its own folder with its own SPEC.md. Extend a tool, or start one.

> **Notes:** Bring back the word cloud. "These are product ideas, and the
> repo is set up for exactly this. Every tool lives in its own folder with
> its own spec, so one student's tool can't break another's, and the same
> checks referee everyone." Say plainly that the next tools are ideas, not
> built yet: that's the point. The smallest real contribution is adding an
> industry to Five Forces. The biggest is proposing a whole new tool. "It's
> what you saw last night, at class scale: you plus your agent are one more
> contributor, working one issue, proposing it as a pull request."

---

## 14. Your turn (0:45)

**Your turn: one prompt, your agent, a pull request.**

1. Make a free GitHub account.
2. Open a coding agent and paste the starter prompt from your handout.
3. It connects to GitHub, forks, and walks you through your first contribution.

You approve every fork, push and pull request. Voluntary unless your
instructor assigns it, and I'll help anyone who wants to try.

[QR: REPO]

> **Notes:** Hand out the handout now. The starter prompt is on it, word for
> word. It asks the agent to connect with a browser sign-in, never a pasted
> token, and to wait for your OK before anything public. Stuck? Open an
> issue with the "question" template and I'll answer. Defer to the
> professor on whether it's assigned.

---

## 15. What you'll need (0:47)

**What you'll need**

| Tool | Plan you need |
|---|---|
| Claude Code | Pro or higher (no free tier) |
| Codex | Free/Go: desktop app only. Web, CLI and IDE need Plus |
| Cursor | Has a free plan |
| Replit | Free Starter, limited agent use. Fork first |
| Lovable | Free credits, but can't attach to an existing repo. Use the web editor path |

**No paid plan?** Edit one file in GitHub's web editor. It forks and opens
the pull request for you.

*Footer: Checked against official docs, 8 November 2026. Plans change, so check before you buy.*

> **Notes:** Be honest that the strongest agents cost money. Codex on Plus is
> $20 a month. Lovable gives students 50% off Pro, and Cursor's student
> discount closed to new sign-ups on 25 June 2026. Verified students get
> Copilot free through GitHub Education, but verification can take days, so
> that's for homework, not for today. The zero-cost path is real: open an
> industry file in the browser, click edit, and GitHub forks and opens the
> pull request. That's a perfectly good first contribution.

---

## 16. Questions (0:50)

**Questions**

slido.com · #[SLIDO CODE]

> **Notes:** Top-voted Slido questions first, then hands. Likely questions:
> "Is it safe to let an agent push for me?" (it pushes to your fork, asks
> first, and nothing reaches the live product without review and green
> checks). "Will this take marketing jobs?" (it changes which part of the
> job matters: deciding what good looks like grows). "Which tool should I
> start with?" (whichever you can get; the prompt works in all of them).
> Leave three minutes for the close.

---

## 17. Close (0:57)

**My agent does the git. I make the calls.**

Let's build the Agentic Marketing Toolkit together. I'll help.

chickensintrees.github.io/agentic-marketing-toolkit · github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Say the line. Then the invitation: "This is a product we're
> building together, for your MBA and beyond. Five Forces is just the
> first tool. I'll keep helping anyone who wants to build the next one.
> Find me in the repo's issues." Thank the professor and the class, and
> end on time.
