# Slides: source text and speaker notes

Plain-text source for the deck *If You Can Write a Brief, You Can Build
Software*. The Claude Slides artifact is built from this file, so keep the two
in agreement. Bracketed items like `[SLIDO CODE]` are placeholders to fill
tonight (see `tonight-checklist.md`).

Fifteen slides. Timings match `run-of-show.md`.

---

## 1. Cover (0:00)

**If You Can Write a Brief, You Can Build Software**

Harness engineering for people who don't code

Bill Moore · West Virginia University · 9 November 2026

> **Notes:** Don't read the title. Say hello, thank the professor, and say:
> "In the next hour you'll watch a piece of software get changed by an AI
> agent, live, because this room asked for it. And I'll try to convince you
> the hardest part of that is something you already know how to do." Then
> go to the app.

---

## 2. This didn't exist yesterday (0:01)

**This didn't exist yesterday.**

[SCREENSHOT: Five Forces Explorer, Learn view]

chickensintrees.github.io/five-forces-explorer

> **Notes:** Switch to the live site in the browser. Click through for about
> 90 seconds: Learn (open one force card), then Analyze (load the
> whitewater-rafting preset, a nod to the New River Gorge), then Summary
> (the radar chart, then Compare with U.S. airlines). Say: "I built this with
> coding agents last night, for you, because you're studying Porter. It's
> free and open source, and by the end of today you'll know how to change
> it." Don't explain the code. If the site won't load, use the local build
> (`npm run preview`) or stay on this screenshot.

---

## 3. Join in (0:03)

**slido.com · #[SLIDO CODE]**

[QR: Slido event]

*One word: how do you feel about AI building software?*

> **Notes:** Poll 1, a word cloud. Give it about 90 seconds. Read three or
> four words aloud, and name the mixed feelings honestly, because skeptical
> words are welcome. Say: "Keep that word in mind. I'll ask whether it
> changed at the end." Tell them the Q&A tab is open all session. If Slido
> fails, ask for a show of hands: excited, worried, both.

---

## 4. Who's talking (0:06)

**Twenty years in video and media. Eight at BCG designing AI products.**

- **GENE:** BCG's conversational AI. I designed its personality and voice,
  then co-hosted 52 podcast episodes with it. It was the first non-human to
  win a Webby for Best Podcast Cohost (2024).
- **Building since 2019:** generative AI for interactive fiction, a
  deck-to-video pipeline, and product prototypes made in days.

> **Notes:** Keep this to 60 seconds. The point isn't the résumé. It's that
> I come from storytelling and media, not computer science. GENE did live
> interviews at Davos, Cannes Lions and WIRED/Condé Nast, and was covered by
> Forbes, WIRED, the BBC and The Sunday Times. Mention one if the room seems
> interested. Bridge: "Every one of those projects started the same way:
> with a brief."

---

## 5. You already write specs (0:08)

**A creative brief and a software spec have the same skeleton.**

| Creative brief | SPEC.md for this app |
|---|---|
| Objective | What this is |
| Target audience | Who it is for |
| Mandatories | Product requirements |
| What we won't do | Non-goals |
| How we'll judge it | Quality gates (definition of done) |

> **Notes:** These are the real section headings of `SPEC.md` in the
> repository. Open it in a browser tab and scroll for 20 seconds so they see
> it's prose, not code. Read one non-goal aloud: "No calls to AI or other
> paid APIs, and no credentials of any kind." Say: "That sentence is a
> mandatory. The agent read it and obeyed it." Key line: "The spec is the
> single source of truth. If the code and the spec disagree, the spec wins."
> That is a brief with teeth.

---

## 6. What a harness is (0:12)

**A harness connects power to useful work, under a human's control.**

Horse → harness → cart and driver

AI agent → harness → useful work, with you deciding

> **Notes:** Start with the word. A harness is the gear that connects a
> source of power (a horse) to a load (the cart) so a driver can steer it. A
> horse with no harness is strong and goes wherever it wants. A coding agent
> is the same: lots of power, no judgment about your goals. "Harness
> engineering" is the work of building that gear: the written expectations,
> the rules, and the checks that keep the power pointed where you want. No
> slide needs code for this. Pause here.

---

## 7. The harness in this project (0:15)

**The harness in this project has four parts.**

| Part | In this repo | What it does |
|---|---|---|
| **Spec** | `SPEC.md` | What good looks like |
| **Rules** | `AGENTS.md` | How the agent must work: plan first, ask before acting |
| **Skills** | add-industry, propose-feature… | Repeatable recipes for common jobs |
| **Checks** | Tests and CI | Automatic "no" when something breaks |

> **Notes:** Spend most of the time on Checks. Say: "When a student adds an
> industry, tests automatically check it: all five forces rated 1 to 5,
> drivers that actually exist, a rationale, and the right labels. If
> anything's off, the pull request goes red before a human ever looks." That
> is how an instructor can let 40 people contribute without reading every
> line. Bill's reusable rules are public at
> github.com/chickensintrees/ai-coding-rules.

---

## 8. You choose what we build (0:20)

**Which industry should the app add, right now?**

A. Ski resorts · B. Craft breweries · C. Food trucks

> **Notes:** Poll 2, multiple choice. Give it about 60 seconds. Announce the
> winner. Every option has a prepared fallback branch (see
> `live-demo-script.md`), so whichever wins, the demo can finish. If Slido is
> down, take a show of hands.

---

## 9. The whole instruction (0:22)

**This is everything I'll tell the agent.**

> Use the add-industry skill to add an illustrative preset for
> **[WINNING INDUSTRY]**. Follow AGENTS.md. Show me your plan before you
> write anything. Then run `npm run check` and open a draft pull request.

No code, no file names. The harness supplies the rest.

> **Notes:** Read it aloud. Point out what's missing: no code, no file
> names, no React. The harness supplies the rest, because the skill knows
> where industry files go and the tests know what a valid one looks like.
> Switch to the terminal and paste the prompt (exact text in
> `live-demo-script.md`). When the agent shows its plan, read it aloud and
> approve it. Approving is the human's job. Then come back to the next slide
> while it works.

---

## 10. While it works: Porter on the agents themselves (0:25)

**Let's run Five Forces on the AI coding agent industry.**

*Threat of new entrants: how easy is it for a new competitor to enter? (1 = very low … 5 = very high)*

> **Notes:** Poll 3, a rating from 1 to 5. In the app: Analyze → Custom
> industry. Name it "AI coding agents". Scope: "AI coding assistants for
> software teams and individuals, worldwide". Go to Threat of new entrants,
> enter the class's most common answer, tick the drivers people argue for,
> and type a one-line rationale from the room. Ask two or three people to
> defend a rating, because disagreement is the point. Note the evidence
> label: it says "My judgment / assumption", because a class poll isn't a
> source. Do rivalry and buyer power by discussion if there's time. Check on
> the agent every few minutes. This exercise exists so a slow agent is never
> dead air.

---

## 11. The harness says yes or no (0:33)

**The agent proposes. The checks test. A human decides.**

Plan → change → `npm run check` → pull request → human review → merge

[SCREENSHOT: the pull request with green checks]

> **Notes:** Back in the terminal, show `npm run check` passing: lint, types,
> tests, build. Then open the pull request on GitHub and show the CI check.
> Say: "Notice what I didn't do. I didn't read the code line by line. I
> checked the plan, and the harness checked the work. The merge button is
> still mine." If the agent stalled or failed, say so, because that's
> honest and useful, and switch to the prepared fallback PR for the winning
> option. A failure the checks catch proves the harness works.

---

## 12. What actually got scarce (0:38)

**Making got cheap. Knowing what good looks like didn't.**

The app labels every rating:

- *Illustrative example (not verified)*
- *My judgment / assumption*
- *Supported by a source*

> **Notes:** This is the "so what" for marketers. When an agent can build
> anything you describe, the value moves to the description: who it's for,
> what it must and must not do, how you'll know it's right. Those are
> strategy and marketing skills. The evidence labels are the same lesson in
> miniature. The agent can fill in a rationale for you, but only you can
> say whether it's evidence or a guess. Tie it back to Porter: an analysis is
> only as good as the evidence behind the ratings.

---

## 13. Build it with us (0:44)

**This is a class project. You can change it.**

1. Open a coding agent: Codex, Claude Code, Cursor, Replit or Lovable.
2. Paste the starter prompt from your handout.
3. It walks you through it: fork, run, change, pull request.

You approve every fork, push and pull request. Voluntary unless your
instructor assigns it, and I'll help anyone who wants to try.

[QR: github.com/chickensintrees/five-forces-explorer]

> **Notes:** Hand out the one-page handout now. The starter prompt is on it,
> word for word. Stress three things. (1) The agent asks before it forks,
> pushes or opens a pull request: you stay in control. (2) Good first
> contributions are listed in `docs/students/first-issues.md`, and adding
> an industry is a great one. (3) Stuck? Open an issue with the "question"
> template and I'll answer. Defer to the professor on whether it's assigned.

---

## 14. Questions (0:48)

**Questions**

slido.com · #[SLIDO CODE]

> **Notes:** Take the top-voted Slido questions first, then hands. Likely
> questions: "Will this take marketing jobs?" (be honest: it changes which
> part of the job matters most, and the judgment part grows). "Which tool
> should I start with?" (any of the five on the handout; the starter prompt
> works in all of them). "Is the code any good?" (the checks are the answer,
> and it's open source, so look). "What did it cost?" (answer only with what
> you actually know). Leave four minutes for the close.

---

## 15. Close (0:56)

**If you can write a brief, you can build software.**

Bring the brief. The harness keeps it honest.

chickensintrees.github.io/five-forces-explorer · github.com/chickensintrees/five-forces-explorer

> **Notes:** Go back to the word cloud from the start and ask, "Did your word
> change?" Then say the sentence, and let it sit. Thank the professor and the
> class, and remind them that the handout has everything and that the
> issues page is where to find you. End on time.
