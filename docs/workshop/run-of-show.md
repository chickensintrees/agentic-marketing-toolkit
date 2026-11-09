# Run of show

The talk is 60 minutes on 9 November 2026. Slide numbers match `slides.md`
and the deck (version 55, 18 slides).

- **Introduction:** slides 1–2.
- **Part 1, harnesses:** slides 3–4.
- **Part 2, collaboration on GitHub:** slides 5–7.
- **Examples:** work at BCG (slide 8), then the Agentic Marketing Toolkit
  and the live demonstration (slides 9–13).
- **Your ideas, and how to contribute:** slides 14–16.
- **Summary and questions:** slides 17–18.

There is one Slido poll, on slide 14, and Slido Q&A runs at the end. There
is no audience vote during the demo. Bill chooses the industry, or takes one
suggestion from the room.

If time runs short, cut the talk-through on slide 12 short first (the
agent keeps working), then shorten Q&A. Do not cut slides 5–7, the live
demonstration or the summary.

**Screens:** the deck, the live site and the BCG demos in browser tabs, and
a terminal with Claude Code already signed in to GitHub. The Slido presenter
view goes in its own tab.

| Time | Min | Slide | What happens | If it goes wrong |
|---|---|---|---|---|
| 0:00 | 1 | 1 Cover | Thank the professor. State the two topics. | — |
| 0:01 | 4 | 2 About me | billmoore.ai and background. | Site won't load: speak from the notes. |
| 0:05 | 3 | 3 What a harness does | Etymology. Map power, harness, load and control: horse, harness and reins, cart, driver; then AI agent, spec/rules/skills/tools/checks, the software, you. | — |
| 0:08 | 3 | 4 Components of a harness | Spec, rules, skills, tools, checks. | — |
| 0:11 | 4 | 5 GitHub basics | The terms, then the sequence: fork → clone → branch → commit → push → pull request → review → merge. | — |
| 0:15 | 3 | 6 How a contribution moves | The class repository, forks, pull requests, then review, checks and merge. | — |
| 0:18 | 4 | 7 Connecting an agent to GitHub | In the terminal, run `gh auth status`. | Signed out: show the sign-in screenshot and plan to use the fallback PR. |
| 0:22 | 4 | 8 Work at BCG | Live demos of BCG work (GENE). | Demo won't load: describe it from the notes. |
| 0:26 | 2 | 9 The Agentic Marketing Toolkit | Tool 1 and the proposed tools. | — |
| 0:28 | 2 | 10 Live site | In the browser: the Five Forces Plate (pick the whitewater rafting emblem, select a force), then the Summary (Compare with U.S. passenger airlines). See `live-demo-script.md` §7. | Site down: use the slide's screenshot, or the local build (`npm run preview`). |
| 0:30 | 2 | 11 The prompt | Name the industry (Bill's choice, or one suggestion from the room). Paste the prompt into Claude Code, then read and approve the plan. **The agent should be running by 0:32.** | Agent won't start: open the fallback PR (`live-demo-script.md` §5). |
| 0:32 | 5 | 12 How this was built | Talk through it while the agent works. Check the terminal periodically. | No graph: talk through the four steps. |
| 0:37 | 4 | 13 From change to merge | `npm run check` passes. On GitHub, show the draft PR, the CI status and the agent's issue comment. | Stalled or failing at 0:40: say so and open the fallback PR. |
| 0:41 | 3 | 14 Poll | Word cloud. Read the most common answers as candidate tools. | Slido fails: take five ideas by show of hands. |
| 0:44 | 2 | 15 How to contribute | Read the setup prompt aloud and hand out the handout. Participation is voluntary unless assigned. | No handouts: leave the QR code up longer. |
| 0:46 | 2 | 16 Tools and plans | Plans, and the web-editor path. | — |
| 0:48 | 2 | 17 Summary | Restate the two points. | — |
| 0:50 | 10 | 18 Questions | Slido Q&A, top-voted questions first, then hands. Thank the professor and the class. | Hands only. |
| 1:00 | — | — | End. | — |

## Hard stops

- **0:32:** the agent is running, or switch to the fallback PR.
- **0:40:** return to the deck, whatever state the agent is in.
- **0:50:** the summary is done, and questions begin.

## After the session

- Review the live PR before merging it, or close it and keep the fallback.
  Close any unused fallback PRs.
- Turn the top poll answers into issues labeled as new-tool ideas.
- Post the deck link and the handout where the professor wants them.
