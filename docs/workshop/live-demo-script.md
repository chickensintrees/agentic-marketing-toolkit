# Live demo script

The live build in Act 4 (slides 8–11). The class votes on one of three
industries, a coding agent adds it as a new illustrative preset inside the
harness, the checks run, and a draft pull request is opened.

**Why an industry preset:** it is the contribution the harness is built for.
The `add-industry` skill describes the steps, and the data-integrity tests in
`SPEC.md` §5 automatically check every preset: five assessments, ratings
1–5, 2–4 valid driver ids, a non-empty rationale, evidence `illustrative`,
and a kebab-case id that matches the file name and is registered.
`SPEC.md` §3.3 says the app ships "at least" five presets, so adding one does
not need a spec change. That is one less step in front of the room.

> Before tonight's rehearsal, confirm on the merged app that the
> `add-industry` skill exists under that name and that `npm run check` runs
> lint, typecheck, tests, and build. If either differs, update the prompt
> below and slide 9 to match.

## 1. Setup (before the talk)

- Laptop with a fresh clone of `main` after the app branch is merged:
  `git clone https://github.com/chickensintrees/five-forces-explorer && cd five-forces-explorer && npm ci && npm run check`.
- Coding agent signed in and tested in that folder (Claude Code or Codex).
  Run one throwaway prompt in it this morning so the session is warm.
- GitHub signed in, so the agent can push a branch and open a draft PR.
- Terminal font at 20 pt or larger, light theme, and a clean prompt.
- Browser tabs: the live app, the repo's pull requests page, `SPEC.md` on
  GitHub.
- A phone hotspot ready in case the venue Wi-Fi fails.

## 2. The prompt

Replace `<INDUSTRY>` with the poll winner. It matches slide 9.

```text
Use the add-industry skill to add an illustrative preset for <INDUSTRY>. Follow AGENTS.md. Show me your plan before you write anything. Then run npm run check and open a draft pull request.
```

The winners and the scopes to suggest if the agent asks:

| Option | `<INDUSTRY>` text | Suggested scope | Fallback branch |
|---|---|---|---|
| A | ski resorts | U.S. ski resorts, day and season visitors | `demo/ski-resorts` |
| B | craft breweries | Independent craft breweries in the U.S. | `demo/craft-breweries` |
| C | food trucks | Food trucks in U.S. cities | `demo/food-trucks` |

## 3. What to say while it runs

1. **Prompt pasted:** "That's it. No code. Watch what it reads first." (It
   should read AGENTS.md and the skill. Point that out: it's reading the
   rules.)
2. **The plan appears:** read it aloud. Check that it names one new file
   under `src/data/industries/` plus the registration in `index.ts`. Say:
   "This is the moment I matter. I'm approving a plan, not reading code."
   Approve it.
3. **It writes the preset:** go to slide 10 and run the Porter exercise. Come
   back every few minutes.
4. **`npm run check`:** show the four stages: lint, types, tests, build. If a
   test fails, read the failure aloud: "the harness caught something." Let
   the agent fix it if there's time.
5. **The draft PR:** open it on GitHub. Show the CI check running or green.
   Say: "It's a draft. I'll review it properly after class before anything
   reaches the live site."

Talk about the rationale the agent wrote: it should use cautious,
general language with no statistics (that's in the spec). Ask: "Would you
change any of these ratings?" That links back to Porter.

## 4. Fallback: prepared branches

Prepare these **tonight**, one per poll option, so any winner can be shown
even if the live agent fails.

For each option:

```bash
git checkout main && git pull
git checkout -b demo/<id>          # e.g. demo/ski-resorts
# In your coding agent, run the section 2 prompt with that industry,
# but say "do not open a pull request" at the end.
npm run check                      # must pass
git push -u origin demo/<id>
```

Then open each as a **draft** PR titled `Demo: add <industry> preset` and
leave it unmerged. In the room, if the live run fails, open the fallback PR
for the winner: "Here's the same thing I ran last night. Same prompt, same
checks."

After the talk, close the two unused fallback PRs. For the winner, keep
either the live PR or the fallback, not both.

## 5. If something breaks

| Problem | Do this |
|---|---|
| Agent asks to sign in or approve access | Approve it if it's quick. If it takes more than 60 s, switch to the fallback. |
| Agent is slow | That's what slide 10 is for. Hard stop at 0:36. |
| Agent wanders (touches files that are not in its plan) | Say "no" in the chat and point it back to the plan. That shows the human in control. |
| `npm run check` fails and the agent can't fix it in time | Show the red check as the harness working. Open the fallback PR. |
| GitHub is down or very slow | Show the local diff (`git diff --stat`) and the passing check, and skip the PR. |
| Wi-Fi gone | Hotspot. If that fails too, use the screenshots on slides 2 and 11 and tell the story. |
