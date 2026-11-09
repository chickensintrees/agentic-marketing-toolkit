# Deck rationale

Guest lecture: Bill Moore, West Virginia University, marketing MBA class.
Monday 9 November 2026, 60 minutes.

> **Revision 3.** Bill's framing, from his comment on the cover: "It's more
> about how we use harnesses to control agents to build tools and how we
> collaborate on building tools, products, even businesses in GitHub." He
> retitled the deck himself: **"How products get built"**, subtitle
> *"Harnesses steer the agents. GitHub is where we build together: tools,
> products, even businesses."* The talk now has two explicit ideas, and the
> toolkit is the worked example of both. Bill also removed the "This didn't
> exist yesterday" slide, so the deck is 16 slides.
>
> **Revision 2.** Rebuilt against Bill's own words: his five messages in the
> ChatGPT planning chat and his five messages tonight (relayed verbatim by
> the orchestrator). Revision 1 made "if you can write a brief, you can
> build software" the thesis. That idea is now a supporting point, not the
> spine.

## What Bill said he wants (the brief, condensed)

- Show his work demos. Get students thinking about building their own
  software and tools with Claude Code, Codex, Cursor, Lovable or Replit.
- Teach the basics of GitHub, **how to connect GitHub to their coding
  agent**, and how to collaborate through it: commit, push, pull, merge,
  pull request. "Your homework is a pull request." It is voluntary unless
  the instructor assigns it, and Bill helps anyone who wants to contribute.
- Several Slido moments (word clouds) that feed the discussion.
- A Porter's Five Forces app as the example, built and shown in class,
  that students can change and extend through pull requests.
- Harness engineering, starting from where the word comes from.
- Tonight: start from first principles; the old title is wrong. **"Teach
  them how to collaborate on a large project via agents … how products are
  built in the new agentic world … work together on a repo through agent
  comms and PRs." "We are building a product together as a class … a suite
  of tooling for their MBA journeys and beyond." "Show the students how to
  connect their coding agents to the GitHub API. This is the key. Then
  their agents can manage git for them."**

## The thesis

Two ideas, in Bill's words:

1. **Harnesses steer the agents.** Rules, specs, skills and checks are how
   we control agents so they build the tools we actually want.
2. **GitHub is where we build together: tools, products, even
   businesses.** People and their agents collaborate on one repo through
   branches, pull requests and comments. Connecting your agent to GitHub is
   the key, because then the agent does the git.

The Agentic Marketing Toolkit is the worked example of both, not the whole
point. The same harness-plus-GitHub pattern builds products and businesses,
well beyond this class.

### The one line they repeat a week later

**"My agent does the git. I make the calls."**

It names the key unlock (an agent connected to GitHub can fork, branch,
commit, push, open pull requests and comment) and the human's role in the
same breath. It is also an honest, safe habit for beginners. The harness
backs it up: AGENTS.md tells agents to ask before anything public, never to
ask for a token in chat, and never to push to `main`.

## Who is in the room

- **Marketing MBA students.** They know Porter (they're studying it now),
  briefs, positioning, and how teams ship campaigns. Few have used a
  terminal, GitHub, or a pull request. Many have used chat assistants. They
  are curious and skeptical in roughly equal measure.
- **The professor.** Wants the session to reinforce the course (Porter),
  and decides whether contributing is assigned.

## Outcomes

| | |
|---|---|
| **Feel** | "I can be part of building a real product, and I'm in control of my agent." |
| **Know** | (1) How products get built now: many people and agents working on one repo, coordinating through a spec, messages, branches and pull requests, with tests and CI as the referee. (2) **Connecting your agent to GitHub is the unlock.** After a browser sign-in, it handles the git and the agent-to-agent comms (PRs and comments), and you approve. (3) A **harness** (spec, AGENTS.md, skills, checks) is how one repo stays coherent with dozens of contributors, the way a harness turns a horse's strength into a cart going where the driver steers. |
| **Be able to do** | Paste the starter prompt into a coding agent, connect it to GitHub with a browser sign-in, and with its help fork, change, and open a pull request against the **Agentic Marketing Toolkit**. Or, with no paid tool, make a one-file change through GitHub's web editor. |

## The arc (60 minutes, 16 slides)

| Act | Min | What happens | Participation |
|---|---|---|---|
| **1. Two ideas, and the room's ideas** | 0–7 | The cover names both ideas. An optional live look at the toolkit. Slido join, then a word cloud on the digital tool they'd want built (Bill is finalizing the wording). | Poll 1: word cloud |
| **2. Bill's work** | 7–11 | GENE and a couple of demos, quickly: proof that someone from media builds with agents. | — |
| **3. How this was built last night** | 11–20 | The real build graph: an orchestrator wrote SPEC.md first, split the work, and ran builder, research, reviewer and fixer agents plus separate sessions (including the one that made this deck). They talked through messages, Bill redirected mid-flight, and everything merged through PRs with CI as referee. Then **idea 1, the harness** (etymology, its parts), which is what kept all those agents aligned. | — |
| **4. Idea 2: GitHub, and the key is connecting your agent** | 20–38 | Show the connection (browser sign-in, `gh auth status`). The class votes on an industry, and Bill gives his agent one prompt. **The agent does the git**: branch, commit, push, draft PR, a comment on the class issue. While it works, the class runs Porter on the AI-coding-agent industry in Five Forces. Then the checks go green, and a human decides. | Poll 2: what to build. Poll 3: rate a force. |
| **5. This class is a product team** | 38–45 | The Agentic Marketing Toolkit is a suite. Five Forces is tool #1, and the word-cloud answers are candidate tools #2–#n. Each tool is a folder with its own SPEC.md, and anyone can extend an existing one. It is the same pattern as last night, at class scale, and the same pattern builds products and businesses. | Word cloud revisited |
| **6. Your turn** | 45–50 | What you need, the starter prompt, what you approve, the no-paid-plan path (web editor), how to get help. Voluntary unless assigned, and Bill's ongoing support. | Handout |
| **7. Questions and close** | 50–60 | Slido Q&A, then the line. | Q&A |

**The supporting idea, "a brief is a spec":** it moves to the speaker notes
on the harness slide. Marketers already write briefs, and SPEC.md is one.
That's why the spec is the part of the harness they'll find most natural.

**Live-demo risk:** Bill's agent is connected to GitHub **tonight**, not
live, so the room sees `gh auth status` and screenshots of the sign-in, not
a fresh login over venue Wi-Fi. A prepared fallback branch and PR exists
per poll option. The Porter exercise fills the agent's wait. Hard stops are
in `run-of-show.md`.

## Title (decided)

**"How products get built"**, with the subtitle *"Harnesses steer the
agents. GitHub is where we build together: tools, products, even
businesses."* Bill chose and wrote it on the cover himself. The line to
repeat stays inside the talk: "My agent does the git. I make the calls."

Earlier shortlist, for the record: How Products Get Built Now (the previous
recommendation) · One Repo, Many Agents · My Agent Does the Git · Building a
Product Together, With Agents · The Class Is the Product Team · Built
Overnight by People and Agents · Harnessing Agents to Build Together.

## What was left out, and why

- **The rent-versus-build framing and the old title.** It turns the talk
  into an argument about buying software. Bill's point is collaborating on
  building one.
- **28 slides.** It would crowd out the live build, the case study, and Q&A.
- **A long biography.** One slide of work demos, because Bill asked for them
  and they buy credibility.
- **Git theory.** No diagrams of commits or merge mechanics. Students see
  what a non-engineer touches: a sign-in, a prompt, a plan, an approval, a
  pull request, a green check. The agent does the rest.
- **Unverified numbers.** No adoption or productivity statistics. Plan
  prices and tool facts come from the orchestrator's check of official docs
  tonight, and are labeled with that date.
