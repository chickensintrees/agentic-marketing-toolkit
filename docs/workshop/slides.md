# Slides: source text and speaker notes

Plain-text mirror of the deck at
https://claude.ai/artifact/EusQFn1k3P9eZWQpXCXqpZ, synced to version 55.
The deck is the master; when it changes, update this file to match. There
are 18 slides, and the timings match `run-of-show.md`.

## Names

| Token | Value |
|---|---|
| TITLE | How products get built |
| SUBTITLE | Harnesses for AI agents, and collaboration on GitHub |
| PRODUCT | Agentic Marketing Toolkit |
| TOOL_1 | Five Forces Explorer |
| REPO | github.com/chickensintrees/agentic-marketing-toolkit |
| SITE | chickensintrees.github.io/agentic-marketing-toolkit (Five Forces at `#/five-forces`) |
| HARNESS | Spec, rules, skills, tools, checks |

Open placeholders: `[SLIDO CODE]`, `[QR: …]`, `[DEMO: BCG work]`,
`[BUILD GRAPH]`, `[SCREENSHOT: …]`, `[INDUSTRY]`, `#[ISSUE]`.

---

## 1. Cover (0:00)

**How products get built**

Harnesses for AI agents, and collaboration on GitHub

Bill Moore · West Virginia University · 9 November 2026

> **Notes:** Thank the professor. Introduce the two topics: how harnesses
> are used to direct AI agents so they build the tools we want, and how
> people and their agents collaborate on GitHub to build tools, products
> and businesses. During the hour an agent will make a change to a shared
> product, and students will see how to set up their own agent to do the
> same.

## 2. About me (0:01)

**About me**

Bill Moore

billmoore.ai

> **Notes:** Open billmoore.ai. Design technologist, Pittsburgh. Twenty
> years in video and media, eight at BCG designing AI products. GENE is
> BCG's conversational AI. I designed its personality and voice and
> co-hosted 52 podcast episodes with it. It was the first non-human to win
> a Webby for Best Podcast Cohost (2024).

## 3. What a harness does (0:05)

Part 1 · Harnesses

**What a harness does**

| | Horse and cart | AI agent |
|---|---|---|
| Power | Horse | AI agent |
| Harness | Harness and reins | Spec, rules, skills, tools, checks |
| Load | Cart | The software being built |
| Control | Driver | **You** |

Footer: From Old French *harneis*, "equipment"

> **Notes:** Etymology: *harneis* meant equipment, including a
> man-at-arms' gear and the fittings for a draft animal. A harness connects
> a source of power to a load, and the driver steers that power through it.
> With AI agents, the agent is the power, and the spec, rules, skills,
> tools and checks are the harness. The software is the load, and the
> person directing the work is the driver. "Harness engineering" is the
> term for building that structure. For an example source, see Anthropic
> Engineering, "Effective harnesses for long-running agents" (Justin Young,
> 26 November 2025).

## 4. Components of a harness (0:08)

Part 1 · Harnesses

**Components of a harness**

| Component | In this repository | Purpose |
|---|---|---|
| Spec | SPEC.md | What the software must do |
| Rules | AGENTS.md | Instructions every agent follows |
| Skills | add-industry, add-tool | Step-by-step procedures |
| Tools | GitHub, terminal, browser | What the agent can use |
| Checks | Tests and CI | Automated verification of every change |

Footer: Rules: github.com/chickensintrees/ai-coding-rules

> **Notes:** A spec plays the role of a creative brief: objective,
> audience, requirements, non-goals. One non-goal from the project spec is
> no calls to AI or other paid APIs, and no credentials. Rules in AGENTS.md
> include planning first, asking before any public action, and never
> pushing to the main branch. Tools are the GitHub connection, the
> terminal and the browser that the agent is allowed to use. Checks: when
> anyone adds an industry, tests verify the five ratings, drivers,
> rationale and labels. This is what lets many contributors and their
> agents work on one repository without one reviewer reading every line.

## 5. GitHub basics (0:11)

Part 2 · Collaboration on GitHub

**GitHub basics**

| Term | Meaning |
|---|---|
| Repository | A project and its full history |
| Fork | Your own copy of someone else's repository, on GitHub |
| Clone | A copy of a repository on your computer |
| Branch | A separate line of work |
| Commit | A saved snapshot of changes, with a message |
| Push / pull | Send your commits to GitHub / bring others' commits down |
| Pull request | A proposal to merge your changes into the project |
| Review and merge | Discussion, then the change becomes part of the project |

Footer: **Fork → clone → branch → commit → push → pull request → review → merge**

> **Notes:** Cover the vocabulary first, then the sequence along the
> bottom. Students do not need write access to the class repository: they
> fork it, work on a branch in their fork, and open a pull request back to
> the class repository. Once a coding agent is connected to GitHub (slide
> 7), the agent performs these steps and the student approves each one.

## 6. How a contribution moves (0:15)

Part 2 · Collaboration on GitHub

**How a contribution moves**

Diagram, top to bottom:

- **Class repository** (main)
- ↓ fork
- **Your fork**, **Classmate's fork** and **Another fork**, each with
  "branch → commits"
- ↓ pull request
- **Review and checks → merge into main**

> **Notes:** Each contributor works in their own fork, on a branch, without
> needing write access to the class repository. Changes come back as pull
> requests. Automated checks run on every pull request, a person reviews
> it, and the merge adds it to main, which updates the live site. Several
> people and their agents can work at the same time because each change is
> isolated until it is merged.

## 7. Connecting an agent to GitHub (0:18)

Part 2 · Collaboration on GitHub

**Connecting an agent to GitHub**

`gh auth login` → browser sign-in

The agent can then fork, branch, commit, push, open pull requests and
comment.

You approve each action. Never paste a password or token into a chat.

[SCREENSHOT: GitHub browser sign-in / device code screen]

> **Notes:** GitHub is where people and their agents collaborate on tools,
> products and businesses. The connection used here is the GitHub CLI:
> `gh auth login` gives a one-time code, which you approve in the browser.
> It works in any agent that runs terminal commands: Claude Code, Codex,
> Cursor and Replit's Shell. After that, the agent performs the git steps
> and communicates through pull request and issue comments. Claude Code
> asks permission before each command that changes something. Demo: run
> `gh auth status` in the terminal to show "Logged in to github.com". The
> sign-in was done in advance, and the steps are on the handout. Safety:
> sign in through the browser only, never put tokens in chat, approve each
> public action, and revoke access at github.com → Settings → Applications.

## 8. Work at BCG (0:22)

**Work at BCG**

[DEMO: BCG work]

> **Notes:** Live demos of BCG work. GENE is BCG's conversational AI. I
> designed its prompt architecture, personality and voice, and co-hosted 52
> podcast episodes with it. It gave live interviews at Davos, Cannes Lions
> (2024) and WIRED/Condé Nast, and was the first non-human to win a Webby
> for Best Podcast Cohost (2024). Then move on to the Agentic Marketing
> Toolkit.

## 9. The Agentic Marketing Toolkit (0:26)

**The Agentic Marketing Toolkit**

- TOOL 1 · LIVE: Five Forces Explorer
- PROPOSED: SWOT · STP · personas · marketing mix · value proposition ·
  journey map · pricing

Each tool is a separate folder with its own SPEC.md.

> **Notes:** The toolkit is a worked example of both topics. Each tool
> lives in its own folder with its own spec, so one contributor's tool
> can't break another's, and the same checks apply to everyone. The
> proposed tools are not built yet. The smallest contribution is adding an
> industry to Five Forces; the largest is proposing a new tool. The same
> pattern, a harness to direct the agents and GitHub to coordinate the
> work, applies to building products and businesses.

## 10. Live site (0:28)

[Screenshot: the Five Forces Explorer Summary: the U.S. passenger airlines
plate and its schedule of forces, compared with subscription video streaming]

chickensintrees.github.io/agentic-marketing-toolkit

> **Notes:** Switch to the browser for about 90 seconds. In Five Forces,
> pick the whitewater rafting emblem; the plate redraws with its ratings.
> Select one force on the diagram to show its rating and drivers, and open
> "About this force". Then open the Summary: the schedule of forces, then
> Compare with U.S. passenger airlines. If the site won't load, use this
> screenshot, or run the local build with `npm run preview`.

## 11. The prompt (0:30)

**The prompt**

> Use the add-industry skill to add an illustrative **[INDUSTRY]** industry
> to Five Forces. Follow AGENTS.md and show me your plan first. Then run
> npm run check, push a branch, open a draft pull request for issue
> **#[ISSUE]**, and comment on the issue with the link.

> **Notes:** Choose the industry, or take one suggestion from the room.
> Read the prompt aloud. It contains no code and no git commands; the
> harness and the GitHub connection supply the rest. Paste it into Claude
> Code (the exact text is in `live-demo-script.md`). When the plan appears,
> read it and approve it. Move to the next slide and talk through it while
> the agent works.

## 12. How this was built (0:32)

**How this was built**

1. **Spec.** One shared source of truth.
2. **Split.** Builder, research, review and fix agents.
3. **Coordinate.** Agents message each other; a person redirects.
4. **Integrate.** Pull requests into one repo; tests check every change.

[BUILD GRAPH: sessions, agents, messages, PRs, timings]

> **Notes:** Talk through this while the agent from the previous slide
> works. An orchestrator agent took my planning notes, wrote SPEC.md
> first, and split the work. A builder agent wrote the app. A research
> agent checked current tool facts. Four reviewer agents each took one
> lens: Porter accuracy, code against the spec, accessibility, and beginner
> onboarding. Fixer agents addressed their findings, and a verifier checked
> the fixes. Separate sessions handled other chunks, including this deck.
> Point at the graph. One redirect story: I rejected the first deck and
> title, and the agents changed course.

## 13. From change to merge (0:37)

**From change to merge**

Plan → Change → npm run check → Push → Pull request → Comment → Human
review and merge

[SCREENSHOT: the draft pull request with passing checks and the agent's
issue comment]

> **Notes:** In the terminal, `npm run check` passes: lint, types, tests,
> build. On GitHub, show the pull request description the agent wrote, the
> CI status, and its comment on the issue. This is how agents report to
> other contributors. A person approved the plan, the checks verified the
> work, and the merge remains a human decision. If the agent stalled or
> failed, say so and open the prepared fallback pull request. A failing
> check is the harness working as intended.

## 14. Poll (0:41)

Poll

**If you could hire a team of software developers to build you a digital
tool (dashboard, website, app, experience, etc.), what would you have them
build?**

slido.com · #[SLIDO CODE] · [QR: Slido]

> **Notes:** Ask this after everything has been explained. It is a word
> cloud, about 2 minutes. Read the most common answers aloud: these are
> candidate tools for the toolkit, and the next slide shows how to start
> one. If Slido fails, take five ideas by show of hands.

## 15. How to contribute (0:44)

**How to contribute**

With a free GitHub account, paste this into a coding agent:

```text
Help me get set up to contribute to our class project: github.com/chickensintrees/agentic-marketing-toolkit. Read AGENTS.md and follow it. Walk me through connecting you to my GitHub account (browser sign-in only), forking the project, and running it. I'm new to this, so explain each step and ask me before anything public.
```

Participation is voluntary unless assigned by your instructor.

[QR: REPO] · github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** The setup prompt is also on the handout. The agent reads
> AGENTS.md, which carries the detailed steps: connect to GitHub through a
> browser sign-in (never a pasted token), fork, run the app, pick a first
> issue, plan, check, and open a pull request, asking before every public
> action. For questions after class, students open an issue with the
> "question" template. I am available to help anyone who wants to
> contribute. Defer to the professor on whether it is assigned.

## 16. Tools and plans (0:46)

**Tools and plans**

| Tool | Plan required |
|---|---|
| Claude Code | Pro or higher; no free tier |
| Codex | Free and Go: desktop app only. Web, CLI and IDE require Plus |
| Cursor | Free plan available |
| Replit | Free Starter plan, limited agent use; fork the repository first |
| Lovable | Free credits; cannot connect to an existing repository |

Without a paid plan: edit one file in GitHub's web editor, which creates
the fork and pull request.

Footer: Source: vendor documentation, 8 November 2026

> **Notes:** Codex Plus is $20 a month. Lovable offers students 50% off
> Pro. Cursor's student discount closed to new sign-ups on 25 June 2026.
> Verified students get GitHub Copilot free through GitHub Education, but
> verification can take several days. The web-editor path costs nothing:
> open an industry file on GitHub, choose edit, and GitHub creates the fork
> and the pull request.

## 17. Summary (0:48)

**Summary**

1. A harness (spec, rules, skills, tools, checks) directs AI agents.
2. On GitHub, people and their agents collaborate on tools, products and
   businesses.

chickensintrees.github.io/agentic-marketing-toolkit ·
github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Restate the two points. Five Forces Explorer is the first tool
> in the toolkit. Anyone in the class can propose or build the next one,
> and I will continue to help through the repository's issues. Then open
> questions.

## 18. Questions (0:50)

**Questions**

slido.com · #[SLIDO CODE]

> **Notes:** Take the top-voted Slido questions first, then hands. Likely
> topics: effects on marketing jobs; which tool to start with (any on the
> handout, since the starter prompt works in each); code quality (the
> checks, and the code is open source); cost. End on time, and thank the
> professor and the class.
