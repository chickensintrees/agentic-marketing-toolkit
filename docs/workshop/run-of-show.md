# Run of show

60 minutes, 9 November 2026. Slide numbers match `slides.md` and the deck
(17 slides). The talk has two ideas: harnesses steer the agents (slides
6–7), and GitHub is where we build together (slides 8–12). The toolkit on
slide 13 is the worked example of both.

If you run long, cut the Porter discussion on slide 11 first, then shorten
Q&A. Keep slide 8 and the close.

**Screens:** the deck, the live site in a browser tab, and a terminal with
Claude Code already signed in to GitHub. The Slido presenter view goes in
its own tab.

| Time | Slide | What happens | If it goes wrong |
|---|---|---|---|
| 0:00 | 1 Cover | Thank the professor. Name the two ideas. | — |
| 0:01 | 2 Live site | Browser, about 90 s: Five Forces Learn, Analyze (whitewater rafting), Summary (radar chart, Compare). | Site down: run the local build (`npm run preview`). If that fails too, skip. |
| 0:03 | 3 Join in | **Poll 1**, a word cloud: the digital tool they'd want built. Read the top answers. | Slido fails: take five ideas by show of hands and write them down for slide 13. |
| 0:06 | 4 About me | billmoore.ai, GENE. | Site won't load: talk from the notes. |
| 0:10 | 5 How this was built | Spec, split, coordinate, integrate. The build graph. One redirect story. | No graph: talk through the four lines. |
| 0:14 | 6 Harness | **Idea 1.** The etymology, horse and cart. | — |
| 0:17 | 7 The harness in this repo | Spec, rules, skills, checks. | — |
| 0:20 | 8 Connect to GitHub | **Idea 2.** In the terminal, `gh auth status`. The line. | Signed out: show the sign-in screenshot and use the fallback PR for the demo. |
| 0:23 | 9 Vote | **Poll 2**: which industry. Announce the winner. | Show of hands. Tie: Bill picks. |
| 0:24 | 10 The prompt | Paste it into Claude Code, then read and approve the plan. **Agent running by 0:26.** | Agent won't start: open the fallback PR for the winner (`live-demo-script.md` §5). |
| 0:26 | 11 Five Forces: AI coding agents | **Poll 3**, a rating. Enter it as a custom industry, and take two or three views. Check the agent. | Agent still going at 0:33: discuss one more force, until 0:35. |
| 0:33 | 12 From plan to merge | `npm run check` passes. Then on GitHub: the draft PR, CI, and the agent's issue comment. | Stalled or red at 0:36: say so and open the fallback PR. |
| 0:38 | 13 Agentic Marketing Toolkit | Tool 1, the candidates, and the poll 1 answers. The same pattern builds products and businesses. | — |
| 0:45 | 14 Contribute | Hand out the handout. Approvals, and voluntary unless assigned. | No handouts: leave the QR code up longer. |
| 0:47 | 15 What you'll need | Plans, and the web-editor path. | — |
| 0:50 | 16 Questions | Slido Q&A, top-voted first, then hands. | Hands only. |
| 0:57 | 17 Close | The line, the two ideas, the invitation, thanks. | — |
| 1:00 | — | End. | — |

## Hard stops

- **0:26**: the agent is running, or switch to the fallback PR.
- **0:36**: go back to the deck, whatever state the agent is in.
- **0:57**: start the close.

## After the session

- Review the live PR before merging it, or close it and keep the fallback.
  Close the unused fallback PRs.
- Turn the top poll 1 answers into issues labeled as new-tool ideas.
- Post the deck link and the handout where the professor wants them.
