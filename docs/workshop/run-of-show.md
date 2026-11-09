# Run of show

60 minutes, 9 November 2026. Slide numbers match `slides.md` and the deck
(17 slides). Times are from the start of the session. There are about 3
minutes of slack in Q&A. If you run long, cut the Porter discussion on
slide 11 first, then shorten Q&A. Never cut slide 8 (the key) or the close.

**Screens:** the deck in one window, the live toolkit in a browser tab, and
the terminal with the coding agent in another window, already signed in to
GitHub. The Slido presenter view goes in its own tab. Practice the switching
tonight.

| Time | Slide | What happens | If it goes wrong |
|---|---|---|---|
| 0:00 | 1 Cover | Hello, thank the professor, the promise. | — |
| 0:01 | 2 Yesterday | Live toolkit tour, about 90 s: Five Forces Learn, then Analyze with whitewater rafting, then Summary with the radar chart and Compare. | Site down: run the local build (`npm run preview`). Both down: talk over the screenshot. |
| 0:03 | 3 Join in | **Poll 1** word cloud: tools they wish they had. Read the top answers aloud. | Slido fails: take five ideas by show of hands and write them on the board, for slide 13. |
| 0:06 | 4 Who's talking | GENE and one short demo, about 4 min. | Demo clip won't play: describe it, move on. |
| 0:11 | 5 Last night | The build graph: spec first, split, talk, integrate. One redirect story. | Graph missing: talk through the four numbered steps. |
| 0:15 | 6 Harness | Etymology, horse and cart, pause. | — |
| 0:17 | 7 Four parts | A SPEC.md is a brief, AGENTS.md is the shared contract, and the checks are the referee. | — |
| 0:20 | 8 **The key** | Connect your agent to GitHub. Terminal: `gh auth status`. Say the line. | `gh` missing or signed out: show the sign-in screenshot and switch to the fallback PR for the live demo. |
| 0:23 | 9 Vote | **Poll 2**: which industry. Announce the winner. | Show of hands. Tie: Bill picks. |
| 0:24 | 10 Prompt | Read the prompt aloud, paste it, read and approve the plan. **Agent running by 0:26.** | Agent won't start: open the fallback PR for the winner right away and narrate it (`live-demo-script.md` §5). |
| 0:26 | 11 Porter | **Poll 3**: threat of new entrants for AI coding agents. Enter it into a custom industry in Five Forces, and take two opinions. Glance at the agent. | Agent still going at 0:33: one more force by discussion, until 0:35. |
| 0:33 | 12 Checks | Terminal: `npm run check` green. GitHub: the draft PR, CI, and the agent's comment on the issue. | Agent stalled or red at 0:36: say so plainly and open the fallback PR. A red check is "the harness said no". |
| 0:38 | 13 Product team | The suite, tool #1, word cloud results as candidate tools. | — |
| 0:45 | 14 Your turn | Hand out the handout. Starter prompt, approvals, voluntary/assigned (defer to the professor). | No handouts: leave the QR up longer. |
| 0:47 | 15 What you'll need | Plans, honestly, and the free web-editor path. | — |
| 0:50 | 16 Questions | Slido Q&A, top-voted first, then hands. | Hands only. |
| 0:57 | 17 Close | The line, the invitation, thanks. | — |
| 1:00 | — | End. | — |

## Hard stops

- **0:26**: the agent must be running, or switch to the fallback PR.
- **0:36**: back to the deck, whatever state the agent is in.
- **0:57**: start the close, whatever is happening in Q&A.

## After the session

- Review the live PR properly before merging it (it's a real change), or
  close it and keep the fallback. Close the unused fallback PRs.
- Turn the top word-cloud answers into issues labeled as new-tool ideas,
  so students have something to pick up.
- Post the deck link and the handout where the professor wants them.
