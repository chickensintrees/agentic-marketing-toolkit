# Slides: source text and speaker notes

Plain-text mirror of the deck at
https://claude.ai/artifact/EusQFn1k3P9eZWQpXCXqpZ (synced to version 53).
The deck is the master. When it changes, update this file to match. 19
slides; timings match `run-of-show.md`.

## Names

| Token | Value |
|---|---|
| TITLE | How products get built |
| SUBTITLE | Harnesses for AI agents, and collaboration on GitHub |
| PRODUCT | Agentic Marketing Toolkit |
| TOOL_1 | Five Forces Explorer |
| REPO | github.com/chickensintrees/agentic-marketing-toolkit |
| SITE | chickensintrees.github.io/agentic-marketing-toolkit (Five Forces at `#/five-forces`) |

Open placeholders: `[SLIDO CODE]`, `[QR: …]`, `[BUILD GRAPH]`,
`[SCREENSHOT: …]`, `[DEMO: BCG work]`, `#[ISSUE]`, `[WINNING INDUSTRY]`, `[TOP 3 ANSWERS]`.

---

## 1. Cover (0:00)

**How products get built**

Harnesses for AI agents, and collaboration on GitHub

Bill Moore · West Virginia University · 9 November 2026

> **Notes:** Thank the professor. Two topics: how harnesses are used to
> direct AI agents so they build the tools we want, and how people and
> their agents collaborate on GitHub to build tools, products and
> businesses. During the hour an agent will make a change to a shared
> product, and students will see how to set up their own agent to do the
> same.

## 2. About me (0:01)

**About me**

Bill Moore

billmoore.ai

> **Notes:** Open billmoore.ai. Design technologist, Pittsburgh. Twenty
> years in video and media, eight at BCG designing AI products. GENE: BCG's
> conversational AI; designed its personality and voice, co-hosted 52
> podcast episodes with it; first non-human Webby winner for Best Podcast
> Cohost (2024).

## 3. Poll 1 (0:05)

Poll 1

**If you could hire a team of software developers to build you a digital
tool (dashboard, website, app, experience, etc.), what would you have them
build?**

slido.com · #[SLIDO CODE] · [QR: Slido]

> **Notes:** Word cloud, about 2 minutes. Read the most common answers
> aloud; they return on the toolkit slide. The Slido Q&A tab stays open for
> the hour. If Slido fails, take five ideas by show of hands.

## 4. What a harness does (0:08)

Part 1 · Harnesses

**What a harness does**

| | Horse and cart | AI agent |
|---|---|---|
| Power | Horse | AI agent |
| Harness | Harness and reins | Spec, rules, skills, checks |
| Load | Cart | The software being built |
| Control | Driver | **You** |

Footer: From Old French *harneis*, "equipment"

> **Notes:** Etymology: *harneis* meant equipment, including a
> man-at-arms' gear and the fittings for a draft animal. A harness connects
> a source of power to a load, and the driver steers that power through it.
> With AI agents, the agent is the power, the spec, rules, skills and checks
> are the harness, the software is the load, and the person directing the
> work is the driver. "Harness engineering" is the term for building that
> structure. Source example: Anthropic Engineering, "Effective harnesses for
> long-running agents" (Justin Young, 26 November 2025).

## 5. Components of a harness (0:11)

Part 1 · Harnesses

**Components of a harness**

| Component | In this repository | Purpose |
|---|---|---|
| Spec | SPEC.md | What the software must do |
| Rules | AGENTS.md | Instructions every agent follows |
| Skills | add-industry, add-tool | Step-by-step procedures |
| Checks | Tests and CI | Automated verification of every change |

Footer: Rules: github.com/chickensintrees/ai-coding-rules

> **Notes:** A spec plays the role of a creative brief: objective,
> audience, requirements, non-goals. Example non-goal from the project
> spec: no calls to AI or other paid APIs, and no credentials. Rules in
> AGENTS.md include: plan first, ask before any public action, never push
> to the main branch. Checks: when anyone adds an industry, tests verify
> the five ratings, drivers, rationale and labels. This is what allows many
> contributors and their agents to work on one repository without one
> reviewer reading every line.

## 6. GitHub basics (0:14)

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

> **Notes:** Vocabulary first, then the sequence along the bottom. Students
> do not need write access to the class repository: they fork it, work on
> a branch in their fork, and open a pull request back to the class
> repository. Once a coding agent is connected to GitHub (next slide), the
> agent performs these steps and the student approves each one.

## 7. Connecting an agent to GitHub (0:17)

Part 2 · Collaboration on GitHub

**Connecting an agent to GitHub**

`gh auth login` → browser sign-in

The agent can then fork, branch, commit, push, open pull requests and
comment.

You approve each action. Never paste a password or token into a chat.

[SCREENSHOT: GitHub browser sign-in / device code screen]

> **Notes:** GitHub is where people and their agents collaborate on tools,
> products and businesses. The connection used here is the GitHub CLI:
> `gh auth login`, a one-time code, approved in the browser. It works in
> any agent that runs terminal commands: Claude Code, Codex, Cursor,
> Replit's Shell. After that, the agent performs the git steps and
> communicates through pull request and issue comments. Claude Code asks
> permission before each command that changes something. Demo: run
> `gh auth status` in the terminal to show "Logged in to github.com". The
> sign-in was done in advance; the steps are on the handout. Safety:
> browser sign-in only, no tokens in chat, approve each public action,
> revoke at github.com → Settings → Applications.

## 8. Work at BCG (0:20)

**Work at BCG**

[DEMO: BCG work]

> **Notes:** Live demos of BCG work. GENE: BCG's conversational AI;
> designed its prompt architecture, personality and voice; co-hosted 52
> podcast episodes with it; live interviews at Davos, Cannes Lions (2024)
> and WIRED/Condé Nast; first non-human Webby winner for Best Podcast
> Cohost (2024). Then move to the Agentic Marketing Toolkit.

## 9. The Agentic Marketing Toolkit (0:24)

**The Agentic Marketing Toolkit**

- TOOL 1 · LIVE: Five Forces Explorer
- PROPOSED: SWOT · STP · personas · marketing mix · value proposition ·
  journey map · pricing
- FROM POLL 1: [TOP 3 ANSWERS]

Each tool is a separate folder with its own SPEC.md.

> **Notes:** The toolkit is a worked example of both topics. Show the poll
> 1 answers. The repository is structured so each tool lives in its own
> folder with its own spec, which keeps one contributor's tool from
> breaking another's, and the same checks apply to everyone. The proposed
> tools are not built yet. The smallest contribution is adding an industry
> to Five Forces; the largest is proposing a new tool. The same pattern, a
> harness to direct the agents and GitHub to coordinate the work, applies
> to building products and businesses.

## 10. Live site (0:27)

[Screenshot: Five Forces Explorer Summary view, U.S. passenger airlines
compared with subscription video streaming on the radar chart]

chickensintrees.github.io/agentic-marketing-toolkit

> **Notes:** Switch to the browser, about 90 seconds. Five Forces: Learn
> (open one force card), Analyze (load the whitewater rafting preset),
> Summary (radar chart, then Compare with U.S. airlines). If the site won't
> load, use this screenshot, or run the local build with `npm run preview`.

## 11. How this was built (0:29)

**How this was built**

1. **Spec.** One shared source of truth.
2. **Split.** Builder, research, review and fix agents.
3. **Coordinate.** Agents message each other; a person redirects.
4. **Integrate.** Pull requests into one repo; tests check every change.

[BUILD GRAPH: sessions, agents, messages, PRs, timings]

> **Notes:** An orchestrator agent took my planning notes, wrote SPEC.md
> first, and split the work. A builder agent wrote the app. A research
> agent checked current tool facts. Four reviewer agents each took one
> lens: Porter accuracy, code against the spec, accessibility, and beginner
> onboarding. Fixer agents addressed their findings, and a verifier checked
> the fixes. Separate sessions handled other chunks, including this deck.
> Point at the graph. One redirect story: I rejected the first deck and
> title, and the agents changed course.

## 12. Poll 2 (0:32)

Poll 2 · slido.com · #[SLIDO CODE]

**Which industry should we add to Five Forces?**

A. Ski resorts · B. Craft breweries · C. Food trucks

> **Notes:** Multiple choice, about 60 seconds. Announce the result. Each
> option has a prepared fallback branch and pull request
> (`live-demo-script.md`). If Slido is unavailable, use a show of hands.

## 13. The prompt (0:33)

**The prompt**

> Use the add-industry skill to add an illustrative **[WINNING INDUSTRY]**
> industry to Five Forces. Follow AGENTS.md and show me your plan first.
> Then run npm run check, push a branch, open a draft pull request for
> issue **#[ISSUE]**, and comment on the issue with the link.

> **Notes:** Read the prompt aloud. It contains no code and no git
> commands; the harness and the GitHub connection supply the rest. Paste it
> into Claude Code (exact text in `live-demo-script.md`). When the plan
> appears, read it and approve it. Move to the next slide while the agent
> works.

## 14. Five Forces: the AI coding agent industry (0:35)

Poll 3 · slido.com · #[SLIDO CODE]

**Five Forces: the AI coding agent industry**

Threat of new entrants. How easy is it for a new competitor to enter?
1 Very low · 2 Low · 3 Moderate · 4 High · 5 Very high

Footer: Higher rating = more pressure on industry profitability

> **Notes:** Rating poll, 1 to 5. In the app: Analyze, then Custom
> industry. Name: "AI coding agents". Scope: "AI coding assistants for
> software teams and individuals, worldwide". Enter the most common rating
> for threat of new entrants, tick the drivers students cite, and record a
> one-line rationale. Ask two or three students to justify their ratings.
> The evidence label reads "My judgment / assumption" because a class poll
> is not a source. Cover rivalry and buyer power by discussion if time
> allows. Check the agent's progress periodically.

## 15. From change to merge (0:42)

**From change to merge**

Plan → Change → npm run check → Push → Pull request → Comment → Human
review and merge

[SCREENSHOT: the draft pull request with passing checks and the agent's
issue comment]

> **Notes:** In the terminal, `npm run check` passes: lint, types, tests,
> build. On GitHub, show the pull request description the agent wrote, the
> CI status, and its comment on the issue; this is how agents report to
> other contributors. The plan was approved by a person, the checks
> verified the work, and the merge remains a human decision. If the agent
> stalled or failed, say so and open the prepared fallback pull request. A
> failing check is the harness working as intended.

## 16. How to contribute (0:46)

**How to contribute**

1. Create a free GitHub account.
2. Open a coding agent and paste the starter prompt from the handout.
3. The agent connects to GitHub, forks the repository and guides your
   first contribution.

You approve every fork, push and pull request. Participation is voluntary
unless assigned by your instructor.

[QR: REPO] · github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Distribute the handout; it has the starter prompt verbatim.
> The prompt asks the agent to connect through a browser sign-in, never a
> pasted token, and to wait for approval before any public action.
> Questions after class: open an issue with the "question" template. I am
> available to help anyone who wants to contribute. Defer to the professor
> on whether it is assigned.

## 17. Tools and plans (0:48)

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

## 18. Summary (0:50)

**Summary**

1. A harness (spec, rules, skills, checks) directs AI agents.
2. On GitHub, people and their agents collaborate on tools, products and
   businesses.

chickensintrees.github.io/agentic-marketing-toolkit ·
github.com/chickensintrees/agentic-marketing-toolkit

> **Notes:** Restate the two points. Five Forces Explorer is the first tool
> in the toolkit; anyone in the class can propose or build the next one,
> and I will continue to help through the repository's issues. Then open
> questions.

## 19. Questions (0:52)

**Questions**

slido.com · #[SLIDO CODE]

> **Notes:** Take the top-voted Slido questions first, then hands. Likely
> topics: effects on marketing jobs; which tool to start with (any on the
> handout; the starter prompt works in each); code quality (the checks, and
> the code is open source); cost. End on time; thank the professor and the
> class.
