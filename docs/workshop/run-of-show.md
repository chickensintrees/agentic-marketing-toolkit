# Run of show

60 minutes, 9 November 2026. Slide numbers match `slides.md` and the deck
(version 53, 19 slides).

- **Introduction:** slides 1–3.
- **Part 1, harnesses:** slides 4–5.
- **Part 2, collaboration on GitHub:** slides 6–7.
- **Examples:** work at BCG (slide 8), then the Agentic Marketing Toolkit,
  how it was built, and the live demonstration (slides 9–15).
- **How to contribute:** slides 16–17.
- **Summary and questions:** slides 18–19.

If time runs short, shorten the Porter discussion on slide 14 first, then
Q&A. Do not cut slides 6–7, the live demonstration or the summary.

**Screens:** the deck, the live site and the BCG demos in browser tabs, and
a terminal with Claude Code already signed in to GitHub. The Slido presenter
view goes in its own tab.

| Time | Min | Slide | What happens | If it goes wrong |
|---|---|---|---|---|
| 0:00 | 1 | 1 Cover | Thank the professor. State the two topics. | — |
| 0:01 | 4 | 2 About me | billmoore.ai; background. | Site won't load: speak from the notes. |
| 0:05 | 3 | 3 Poll 1 | Word cloud. Read the most common answers. | Slido fails: take five ideas by show of hands and note them for slide 9. |
| 0:08 | 3 | 4 What a harness does | Etymology. Power, harness, load, control: horse, harness and reins, cart, driver; AI agent, spec/rules/skills/checks, the software, you. | — |
| 0:11 | 3 | 5 Components of a harness | Spec, rules, skills, checks. | — |
| 0:14 | 3 | 6 GitHub basics | The terms, then the sequence: fork → clone → branch → commit → push → pull request → review → merge. | — |
| 0:17 | 3 | 7 Connecting an agent to GitHub | In the terminal, run `gh auth status`. | Signed out: show the sign-in screenshot and plan to use the fallback PR. |
| 0:20 | 4 | 8 Work at BCG | Live demos of BCG work (GENE). | Demo won't load: describe it from the notes. |
| 0:24 | 3 | 9 The Agentic Marketing Toolkit | Tool 1, proposed tools, the poll 1 answers. | — |
| 0:27 | 2 | 10 Live site | Browser: Five Forces Learn, Analyze (whitewater rafting), Summary (radar chart, Compare). | Site down: use the slide's screenshot, or the local build (`npm run preview`). |
| 0:29 | 3 | 11 How this was built | Spec, split, coordinate, integrate; the build graph. | No graph: talk through the four steps. |
| 0:32 | 1 | 12 Poll 2 | Which industry to add. Announce the result. | Show of hands. Tie: Bill chooses. |
| 0:33 | 2 | 13 The prompt | Paste it into Claude Code, then read and approve the plan. **The agent should be running by 0:35.** | Agent won't start: open the fallback PR for the winning option (`live-demo-script.md` §5). |
| 0:35 | 7 | 14 Five Forces: the AI coding agent industry | Poll 3, a rating. Enter it in a custom industry and take two or three views. Check the agent periodically. | Agent is slow: discuss rivalry and buyer power until 0:42. |
| 0:42 | 4 | 15 From change to merge | `npm run check` passes. On GitHub, show the draft PR, the CI status and the agent's issue comment. | Stalled or failing at 0:45: say so and open the fallback PR. |
| 0:46 | 2 | 16 How to contribute | Hand out the handout. Approvals; voluntary unless assigned. | No handouts: leave the QR code up longer. |
| 0:48 | 2 | 17 Tools and plans | Plans, and the web-editor path. | — |
| 0:50 | 2 | 18 Summary | Restate the two points. | — |
| 0:52 | 8 | 19 Questions | Slido Q&A, top-voted first, then hands. Thank the professor and the class. | Hands only. |
| 1:00 | — | — | End. | — |

## Hard stops

- **0:35:** the agent is running, or switch to the fallback PR.
- **0:45:** return to the deck, whatever state the agent is in.
- **0:52:** the summary is done, and questions begin.

## After the session

- Review the live PR before merging it, or close it and keep the fallback.
  Close the unused fallback PRs.
- Turn the top poll 1 answers into issues labeled as new-tool ideas.
- Post the deck link and the handout where the professor wants them.
