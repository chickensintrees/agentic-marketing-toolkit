# Deck rationale

Guest lecture: Bill Moore, West Virginia University, marketing MBA class.
Monday 9 November 2026, 60 minutes.

> **Source note.** The ChatGPT planning conversation could not be read from
> this working session. Running the decoder was blocked by the session's
> permission policy, and the share page only serves a JavaScript shell. This
> rationale is built from the orchestrator's brief, which summarizes Bill's
> asks: he rejected the title, wants live participation, wants harness
> engineering starting from the word's origin, a live build of the Five
> Forces app, and the class building a project together. It also uses
> `SPEC.md` on `main`. If Bill's own words change any of this, they win.

## The one sentence

**If you can write a brief, you can build software.**

This is the line we want students repeating a week later. Marketers already
write briefs: objective, audience, mandatories, what success looks like. A
coding agent needs the same thing, written down and checked. The talk proves
the sentence live and then adds the honest condition: *the brief has to be
inside a harness* (rules and automatic checks), because an agent is powerful
and not always right.

## Who is in the room

- **Marketing MBA students.** They know Porter's Five Forces (they are
  studying it in this class), positioning, briefs, and strategy. Most have
  never used a terminal, GitHub, or a pull request, and many have used
  ChatGPT-style chat. They are curious and skeptical in roughly equal
  measure.
- **The professor.** Wants the session to reinforce the course content
  (Porter), not just entertain. They decide whether contributing is
  assigned.
- **What they don't need:** jargon, a code walkthrough, or a sales pitch for
  any one tool.

## Outcomes

| | |
|---|---|
| **Feel** | "I could do this." The distance between having an idea and having working software is now about knowing what you want. |
| **Know** | (1) A coding agent turns a clear written spec into working software. (2) A **harness** (spec, rules, skills, automatic checks) is what makes the agent's power useful and safe, the way a harness turns a horse's strength into a cart that goes where the driver wants. (3) The scarce skill is judgment: knowing what good looks like and separating evidence from assumption. Strategists already train for that. |
| **Be able to do** | Paste one starter prompt into a coding agent and, with its help, fork the class project, run it, make a small change, and open a pull request. This is voluntary unless the instructor assigns it, and Bill offers help. |

## The arc (60 minutes)

The spine is the real app plus one real agent change made in the room.
Everything else serves that.

| Act | Min | What happens | Participation |
|---|---|---|---|
| **1. The thing on the screen** | 0–6 | Open on the live Five Forces Explorer: "This didn't exist yesterday." Then Slido join and a word cloud. | Poll 1: word cloud |
| **2. Who's talking, and why a brief** | 6–12 | Bill in 60 seconds (GENE, media, BCG). The creative brief next to `SPEC.md`: same skeleton. | — |
| **3. The harness** | 12–20 | Etymology: power source → harness → useful load, under a human's control. Horse → cart. Agent → useful work. The four parts in this repo: spec, rules, skills, checks. | — |
| **4. Build it live** | 20–38 | The class votes on what to add. Bill gives the agent the prompt. **While it works**, the class runs Porter on the AI-coding-agent industry itself in the app (custom industry, with ratings from a poll). Then back to the agent: the checks run, a pull request is opened, and a human decides. | Poll 2: what to build. Poll 3: rate one force. |
| **5. What changes for marketers** | 38–44 | The bottleneck moved from *making* to *knowing what good looks like*. The app's evidence labels (illustrative / assumption / sourced) are the lesson in miniature. | — |
| **6. Build it with us** | 44–48 | The contribution path: one prompt, your agent, a pull request. Voluntary unless assigned; Bill helps. | Handout + QR |
| **7. Questions and close** | 48–60 | Slido Q&A, then the one sentence. | Slido Q&A |

**Live-demo risk.** The agent may be slow and the Wi-Fi may be bad. The
Porter exercise in Act 4 is designed to fill the agent's wait time with
course content, so a slow agent is never dead air. Every risky moment has a
prepared fallback: a pre-built branch and PR per poll option, screenshots in
the deck, and a local build of the app (see `run-of-show.md` and
`live-demo-script.md`).

15 slides. Most of the hour is the app, the agent, and the room.

## Title shortlist

| # | Title | Why it could work |
|---|---|---|
| 1 | **If You Can Write a Brief, You Can Build Software** | It is the thesis, it speaks the audience's own craft (the brief), and it makes a claim the talk then proves live. |
| 2 | **Horsepower and Harness** | Memorable and visual, and it carries the harness-engineering idea. It needs the talk to explain it. |
| 3 | **Built Last Night** | Honest, intriguing, and true. The app was built with agents the night before. It says little about the takeaway. |
| 4 | **The Brief Is the Product** | A sharp marketing-world reframe, but it is abstract before you've seen the demo. |
| 5 | **Your Judgment, Written Down** | It names what a harness is, from the human side. It is quieter and less of a hook. |
| 6 | **One Class, One Codebase** | It centers the shared project, but undersells the idea students can take to any job. |
| 7 | **Five Forces, One Agent, Sixty Minutes** | It is concrete and ties to the course. It reads like an agenda, not an idea. |

**Recommendation: #1, "If You Can Write a Brief, You Can Build Software,"**
with the subtitle *"Harness engineering for people who don't code."* It is
the sentence we want them to repeat, so the title does double duty. It
flatters a skill they already have instead of a tool they don't. And it
avoids the "Stop X. Start Y." pattern Bill disliked.

## What was deliberately left out, and why

The old 28-slide deck itself was not available to this session. The
decisions below come from the brief's description of it ("Stop Renting Your
Tools. Start Building Them.", 28 slides):

- **The rent-versus-build framing.** It positions the talk as anti-SaaS. It
  invites a debate about buying software, which isn't the point and is
  arguably the wrong advice for most marketers. The real point is *who
  writes the brief*, whichever tool you use.
- **Length.** 28 slides would crowd out the live build and the Q&A. 15
  slides is enough, because the app and the agent carry the middle of the
  hour.
- **A long autobiography.** It is cut to one slide. The portfolio earns
  credibility (GENE's Webby, Davos, Cannes Lions), and the demo does the
  rest.
- **Tool tours and code.** No slide explains React, Git internals, or
  compares vendors. Students see a prompt, a plan, a check, and a pull
  request: the parts a non-engineer actually touches.
- **Hypothetical futures and statistics.** The talk shows what exists and
  makes no adoption numbers or productivity claims. None were verified, and
  the live demo is better evidence.
