# Tonight checklist (Bill)

In order. Items marked **decide** need your call.

## 1. Decide

- [x] Title: "How products get built".
- [x] One Slido poll (slide 14): "If you could hire a team of software
      developers to build you a digital tool (dashboard, website, app,
      experience, etc.), what would you have them build?"
- [ ] **decide** The industry for the live demo, so its fallback can be
      built tonight. A suggestion from the room is still possible on the
      day.
- [x] Demo agent: Claude Code, connected through the GitHub CLI with a
      browser sign-in.
- [ ] **decide** Ask the professor whether contributing is assigned or
      voluntary.

## 2. Ship the toolkit

- [ ] Mark PR #2 ready for review and merge it to `main` (until then `main`
      has no AGENTS.md, skills or docs), and enable GitHub Pages. Open
      https://chickensintrees.github.io/agentic-marketing-toolkit/ and
      `#/five-forces` on a laptop and a phone. Check the Plate (pick the
      whitewater rafting emblem, select a force) and the Summary (Compare
      with U.S. passenger airlines).
- [ ] On `main`, confirm that these exist: the `add-industry` skill,
      `npm run check`, the "question" issue template, AGENTS.md (with the
      setup steps the starter prompt relies on), and
      `docs/students/first-issues.md`. If a name differs, fix slide 11,
      `live-demo-script.md` and the handout.
- [ ] Create the labels (`docs/maintainers.md` §2). `accessibility` already
      exists; the commands there use `--force`, so they still run.
- [ ] Seed the twenty first issues (`docs/maintainers.md` §5).
- [ ] Create the issue "Add an industry chosen by the class", unless the
      orchestrator already has, and note its number.

## 3. Connect and rehearse

- [ ] Connect the demo agent to GitHub with a browser sign-in
      (`live-demo-script.md` §1). Take a screenshot of the code-entry
      screen for slide 7.
- [ ] Get the class issue number from the orchestrator ("Add an industry
      chosen by the class"), and put it on slide 11 (`#[ISSUE]`) and in
      the prompt.
- [ ] Run the live prompt end to end once and time it. It needs to finish
      in about 7 minutes (0:30–0:37). If it is much slower, plan to show
      the fallback PR as the main path.
- [ ] Build the fallback branch and draft PR for your chosen industry
      (`live-demo-script.md` §5), and make sure its checks pass.
- [ ] Paste the new setup prompt (slide 15) into a fresh agent once, to
      check that AGENTS.md walks a beginner through it.

## 4. Fill the deck placeholders

- [ ] Slide 2: check that billmoore.ai loads on the venue network.
- [ ] Slide 7: GitHub sign-in screenshot.
- [ ] Slide 8: prepare the BCG demos (`[DEMO: BCG work]`).
- [ ] Slide 10: replace the Summary screenshot, which shows the old radar
      chart, with the redesigned Summary
      (`design/ink-plate/app-shots/summary-1440.png`, or a fresh one from
      the live site).
- [ ] Slide 11: `[INDUSTRY]` (said aloud) and `#[ISSUE]`.
- [ ] Slide 12: the build graph (the orchestrator is sending it).
- [ ] Slide 13: screenshot of a draft PR with passing checks and the
      agent's comment (use the fallback PR).
- [ ] Slides 14 and 18: the Slido code. Slide 14: the Slido QR. Slide 15:
      the repo QR.
- [ ] Handout: the two QR codes.

## 5. Slido

- [ ] Create one event with one word-cloud poll (inactive), and turn on
      Q&A.
- [ ] Join from a phone to test it.

## 6. Print

- [ ] One handout per student, plus spares.

## 7. Morning of

- [ ] Laptop charged, charger, display adapter, phone hotspot.
- [ ] `gh auth status` shows you're signed in. Warm up the agent with a
      throwaway prompt.
- [ ] Tabs open: deck, live toolkit, repo PRs, the class issue, Slido
      presenter.
- [ ] Terminal at 20 pt or larger.
- [ ] Hard stops: 0:32, 0:40, 0:50.
