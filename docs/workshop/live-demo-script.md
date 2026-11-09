# Live demo script

The center of the talk (slides 8–12): **an agent connected to GitHub does
the git while a human makes the calls.** The class votes on one of three
industries. Bill's agent adds it to Five Forces inside the harness, runs the
checks, pushes a branch, opens a draft pull request against a class issue,
and comments on that issue. That last step is the "agent comms".

**Why an industry:** it is the contribution the harness is built for. The
`add-industry` skill describes the steps, and the data-integrity tests
automatically check every preset: five assessments, ratings 1–5, 2–4 valid
driver ids, a non-empty rationale, evidence `illustrative`, and an id that
matches its file name and is registered. Adding one needs no spec change,
because the Five Forces spec says "at least" five presets.

> The app is being reorganized into the Agentic Marketing Toolkit, with
> each tool in `src/tools/<id>/`. Before rehearsal, confirm on merged
> `main`: the `add-industry` skill name, where Five Forces industry files
> live, that `npm run check` runs lint, typecheck, tests and build, and the
> live URL `#/five-forces`. Update this script and slide 10 if any differ.

## 1. Connect the agent to GitHub (tonight, not live)

Do this once tonight on the demo laptop, so the room sees a working
connection, not a sign-in over venue Wi-Fi.

The demo agent is **Claude Code**.

- **Primary route, the GitHub CLI:** install `gh`, run `gh auth login`, and
  choose GitHub.com, HTTPS, and *Login with a web browser*. It shows a
  one-time code. Enter it in the browser and approve. Check with
  `gh auth status`. Claude Code then uses `git` and `gh` from its terminal
  to push, open PRs and comment.
- **Alternative route, GitHub's MCP server in Claude Code:**
  [CLAUDE CODE MCP STEPS: from the orchestrator's research]. Use only one
  route on stage, and rehearse with it.
- Run `claude` in the repo folder and ask it: "Check whether you can reach
  GitHub for this repo, without changing anything." Confirm it reports
  your account.
- Take a screenshot of the browser code-entry screen, for slide 8.
- Never paste a token into a chat. The starter prompt and AGENTS.md both
  say so. Say it out loud in the room.

## 2. Prepare the class issue (tonight)

The orchestrator is creating the issue **"Add an industry chosen by the
class"** and will send its number. That number replaces `#[ISSUE]` on slide 10 and in the
prompt below. The agent's PR links to it, and the agent comments on it.

## 3. The prompt

Replace `<INDUSTRY>` with the poll winner and `<N>` with the issue number.
It matches slide 10.

```text
Use the add-industry skill to add an illustrative <INDUSTRY> industry to Five Forces. Follow AGENTS.md and show me your plan first. Then run npm run check, push a branch, open a draft pull request for issue #<N>, and comment on the issue with the link.
```

| Option | `<INDUSTRY>` | Scope to suggest if asked | Fallback branch |
|---|---|---|---|
| A | ski resorts | U.S. ski resorts, day and season visitors | `demo/ski-resorts` |
| B | craft breweries | Independent craft breweries in the U.S. | `demo/craft-breweries` |
| C | food trucks | Food trucks in U.S. cities | `demo/food-trucks` |

Bill has write access, so his agent pushes a branch to the repo itself. A
student's agent pushes to the student's fork instead and opens the PR from
there. Say this in the room, because it's what they'll see.

## 4. What to say while it runs

1. **Pasted:** "No code, no git commands. Watch what it reads first." It
   should read AGENTS.md and the skill. Point it out: it's reading the rules.
2. **The plan appears:** read it aloud. It should name one new industry file
   plus its registration. "This is my job: I approve a plan, not code."
   Approve it.
3. **It works:** go to slide 11 (Porter). Check back every few minutes.
4. **`npm run check`:** show lint, types, tests and build passing. If a
   test fails, read it aloud: "the harness caught something." Let the agent
   fix it if there's time.
5. **The git:** it asks before pushing and before opening the PR, because
   AGENTS.md says to ask before anything public. Say "yes" out loud. "My
   agent does the git. I make the calls."
6. **On GitHub:** the draft PR, its description, CI running or green, and
   the agent's comment on the issue: "That's agent comms. Anyone else on
   this repo, human or agent, can see it and respond."
7. **Wrapping up the demo:** "It's a draft. I'll review it after class
   before anything reaches the live site."

Ask the room about the rationale the agent wrote: "Would you change any of
these ratings?" That links back to Porter.

## 5. Fallback: prepared branches and PRs (tonight)

One per poll option, so any winner can be shown even if the live run fails:

```bash
git checkout main && git pull
git checkout -b demo/<id>      # e.g. demo/ski-resorts
# In the coding agent: the section 3 prompt for that industry,
# but ending "do not push or open a pull request".
npm run check                  # must pass
git push -u origin demo/<id>
```

Open each one as a **draft** PR titled `Demo: add <industry> industry` and
leave it unmerged. In the room: "Here's the same prompt, run last night,
same checks." Afterwards, keep either the live PR or the fallback for the
winner, and close the rest.

## 6. If something breaks

| Problem | Do this |
|---|---|
| Agent says it can't reach GitHub | Run `gh auth status`. If you're signed out and it takes more than 60 s to fix, use the fallback PR. |
| Agent is slow | That's what slide 11 is for. Hard stop at 0:36. |
| Agent pushes or opens the PR without asking | Stop it, and say that's exactly what AGENTS.md forbids. That's a teaching moment, not a disaster: it's a draft on a branch. |
| Agent touches files outside its plan | Say "no" and point it back to the plan. That's the human in control. |
| `npm run check` fails and can't be fixed in time | The red check is the harness working. Open the fallback PR. |
| GitHub down or slow | Show `git log -1` and the passing check locally, and skip the PR. |
| Wi-Fi gone | Phone hotspot. If that fails too, use the screenshots on slides 2, 8 and 12. |
