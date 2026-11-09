# Run of show

60 minutes, 9 November 2026. Slide numbers refer to `slides.md` and the deck.
Times are from the start of the session. The schedule has about 4 minutes of
slack in Q&A. If you run long, cut the extra Porter forces in Act 4 first,
then shorten Q&A. Never cut the close.

**Screens:** the deck in one browser window, the live app in a second
browser tab, the terminal with the coding agent in a third window. Slido runs
on its own presenter tab. Practice the switching tonight.

| Time | Slide | What happens | If it goes wrong |
|---|---|---|---|
| 0:00 | 1 Cover | Hello, thank the professor, one-line promise. | — |
| 0:01 | 2 Yesterday | Live app tour, about 90 s: Learn, then Analyze with whitewater rafting, then Summary with the radar chart and Compare with U.S. airlines. | Site down: use the local build (`npm run preview`, open the URL it prints). Both down: talk over the screenshot. |
| 0:03 | 3 Join in | Slido join, then **poll 1** (word cloud). Read three or four words aloud. | Slido fails or Wi-Fi is weak: show of hands (excited / worried / both). Skip the "did your word change" callback at the close. |
| 0:06 | 4 Who's talking | 60 seconds. GENE, media background, "everything starts with a brief". | — |
| 0:08 | 5 Brief = spec | Open `SPEC.md` on GitHub, scroll 20 s, read one non-goal. | GitHub slow: the slide table is enough. |
| 0:12 | 6 Harness | The etymology. Pause. | — |
| 0:15 | 7 Four parts | Spend the time on Checks. | — |
| 0:20 | 8 Vote | **Poll 2**: which industry to add. Announce the winner. | Show of hands. Tie: Bill picks. |
| 0:22 | 9 Prompt | Read the prompt aloud, switch to the terminal, paste it, read and approve the agent's plan. **Start the agent by 0:24.** | Agent won't start (auth, network): switch to the prepared fallback branch at once (`live-demo-script.md` §4) and narrate it as a recording of "what this looks like". |
| 0:25 | 10 Porter | **Poll 3** (threat of new entrants, 1–5). Enter "AI coding agents" as a custom industry in the app, take the class rating, discuss two or three opinions. Glance at the agent every few minutes. | Running long: stop after one force. Agent still going at 0:33: do rivalry by discussion, up to 0:36. |
| 0:33 | 11 Checks | Back to the terminal: `npm run check` passes, then show the draft PR and its CI. | Agent failed or is still running at 0:36: say so plainly and open the fallback PR for the winning option. A red check is a teaching moment: "the harness just said no". |
| 0:38 | 12 Scarce | The "so what" for marketers. The evidence labels. | — |
| 0:44 | 13 Build with us | Hand out the handout. Starter prompt, approvals, voluntary/assigned (defer to the professor), how to get help. | Handouts missing: leave this slide up longer; the repo QR leads to `docs/students/START-HERE.md`. |
| 0:48 | 14 Questions | Slido Q&A top-voted first, then hands. | No Slido: hands only. |
| 0:56 | 15 Close | "Did your word change?" Then the sentence. Thank-yous. | — |
| 1:00 | — | End. | — |

## Hard stops

- **0:24**: the agent must be running, or switch to the fallback.
- **0:36**: return to the deck whatever state the agent is in.
- **0:56**: start the close whatever is happening in Q&A.

## After the session

- Merge the live PR only after reviewing it properly (it's a real change to
  the class project), or close it and thank the room.
- Post the deck link and the handout where the professor wants them.
