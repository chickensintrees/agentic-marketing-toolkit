# Run of show

60 minutes, 9 November 2026. Slide numbers match `slides.md` and the deck
(version 50, 17 slides).

- **Introduction:** slides 1–3.
- **Part 1, harnesses:** slides 4–5.
- **Part 2, collaboration on GitHub, and how this project was built:**
  slides 6–7.
- **The Agentic Marketing Toolkit and the live demonstration:** slides
  8–13.
- **How to contribute:** slides 14–15.
- **Summary and questions:** slides 16–17.

If time runs short, shorten the Porter discussion on slide 12 first, then
Q&A. Do not cut slide 6 or the summary.

**Screens:** the deck, the live site in a browser tab, and a terminal with
Claude Code already signed in to GitHub. The Slido presenter view goes in
its own tab.

| Time | Min | Slide | What happens | If it goes wrong |
|---|---|---|---|---|
| 0:00 | 1 | 1 Cover | Thank the professor. State the two topics. | — |
| 0:01 | 4 | 2 About me | billmoore.ai; background and GENE. | Site won't load: speak from the notes. |
| 0:05 | 3 | 3 Poll 1 | Word cloud. Read the most common answers. | Slido fails: take five ideas by show of hands and note them for slide 8. |
| 0:08 | 3 | 4 What a harness does | Etymology; horse, harness, cart. | — |
| 0:11 | 3 | 5 Components of a harness | Spec, rules, skills, checks. | — |
| 0:14 | 4 | 6 Connecting an agent to GitHub | In the terminal, run `gh auth status`. | Signed out: show the sign-in screenshot and plan to use the fallback PR. |
| 0:18 | 4 | 7 How this was built | Spec, split, coordinate, integrate; the build graph. | No graph: talk through the four steps. |
| 0:22 | 3 | 8 The Agentic Marketing Toolkit | Tool 1, proposed tools, the poll 1 answers. | — |
| 0:25 | 2 | 9 Live site | Browser: Five Forces Learn, Analyze (whitewater rafting), Summary (radar chart, Compare). | Site down: run the local build (`npm run preview`), or skip. |
| 0:27 | 1 | 10 Poll 2 | Which industry to add. Announce the result. | Show of hands. Tie: Bill chooses. |
| 0:28 | 2 | 11 The prompt | Paste it into Claude Code, then read and approve the plan. **The agent should be running by 0:30.** | Agent won't start: open the fallback PR for the winning option (`live-demo-script.md` §5). |
| 0:30 | 7 | 12 Five Forces: the AI coding agent industry | Poll 3, a rating. Enter it in a custom industry and take two or three views. Check the agent periodically. | Agent is slow: discuss rivalry and buyer power until 0:37. |
| 0:37 | 4 | 13 From change to merge | `npm run check` passes. On GitHub, show the draft PR, the CI status and the agent's issue comment. | Stalled or failing at 0:40: say so and open the fallback PR. |
| 0:41 | 3 | 14 How to contribute | Hand out the handout. Approvals; voluntary unless assigned. | No handouts: leave the QR code up longer. |
| 0:44 | 2 | 15 Tools and plans | Plans, and the web-editor path. | — |
| 0:46 | 2 | 16 Summary | Restate the two points. | — |
| 0:48 | 12 | 17 Questions | Slido Q&A, top-voted first, then hands. Thank the professor and the class. | Hands only. |
| 1:00 | — | — | End. | — |

## Hard stops

- **0:30:** the agent is running, or switch to the fallback PR.
- **0:40:** return to the deck, whatever state the agent is in.
- **0:48:** the summary is done, and questions begin.

## After the session

- Review the live PR before merging it, or close it and keep the fallback.
  Close the unused fallback PRs.
- Turn the top poll 1 answers into issues labeled as new-tool ideas.
- Post the deck link and the handout where the professor wants them.
