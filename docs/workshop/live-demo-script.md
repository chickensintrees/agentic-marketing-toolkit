# Live demo script

Slides 7 and 12–15. An agent connected to GitHub carries out the git steps, and a
person approves each public action. The class votes on one of three
industries. Bill's agent adds it to Five Forces inside the harness, runs the
checks, pushes a branch, opens a draft pull request against a class issue,
and comments on that issue.

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
> live URL `#/five-forces`. Update this script and slide 13 if any differ.

## 1. Connect the agent to GitHub (tonight, not live)

Do this once tonight on the demo laptop, so the room sees a working
connection, not a sign-in over venue Wi-Fi.

The demo agent is **Claude Code**.

The route is the **GitHub CLI** (`gh`). It works in every tool that runs
terminal commands, and the sign-in happens in the browser, so no token is
ever pasted anywhere.

1. Install Git and `gh`. On macOS: `xcode-select --install`, then
   `brew install gh`. On Windows: `winget install --id Git.Git -e --source winget`
   and `winget install --id GitHub.cli --source winget`, then open a **new
   terminal window** (a new tab isn't enough).
2. `gh auth login --web --git-protocol https`. Answer **Y** to
   "Authenticate Git", copy the one-time code, and authorize "GitHub CLI"
   at https://github.com/login/device.
3. `gh auth setup-git`, then `gh auth status` to confirm.
4. Run `claude` in the repo folder and ask: "Check whether you can reach
   GitHub for this repo, without changing anything." Confirm it reports
   your account.

**Why not GitHub's MCP server?** In Claude Code it needs a personal access
token, which is exactly what we tell students never to paste. `gh` with a
browser sign-in is the safer path for them, so it's what we demo.

After sign-in, Claude Code does the git with commands like
`gh repo fork … --clone`, `git push`, `gh pr create`, `gh issue comment` and
`gh pr checks --watch`. **Claude Code asks permission before each command
that changes things**, so the push and the PR are approved one at a time,
on screen.

- Take a screenshot of the browser code-entry screen, for slide 7.
- Never paste a token into a chat. The starter prompt and AGENTS.md both
  say so. Say it out loud in the room.

## 2. Prepare the class issue (tonight)

The orchestrator is creating the issue **"Add an industry chosen by the
class"** and will send its number. That number replaces `#[ISSUE]` on slide 13 and in the
prompt below. The agent's PR links to it, and the agent comments on it.

## 3. The prompt

Replace `<INDUSTRY>` with the poll winner and `<N>` with the issue number.
It matches slide 13.

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

## 4. Sequence while it runs

1. **Prompt pasted.** Claude Code reads AGENTS.md and the skill first.
   Point this out.
2. **Plan shown.** Read it aloud. It should name one new industry file and
   its registration. Approve it.
3. **Agent working.** Go to slide 14 (Porter). Check progress every few
   minutes.
4. **`npm run check`.** Show lint, types, tests and build passing. If a
   test fails, read the failure aloud and let the agent fix it if time
   allows.
5. **Git steps.** Claude Code shows each command (`git push`,
   `gh pr create`, `gh issue comment`) and asks permission before running
   it, as AGENTS.md also requires for public actions. Approve each one.
6. **On GitHub.** Show the draft pull request, its description, the CI
   status, and the agent's comment on the issue, which other contributors
   can see and respond to.
7. **End of demo.** The pull request stays a draft until it is reviewed
   after class.

Ask the class whether they would change any of the ratings in the agent's
rationale.

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
leave it unmerged. In the room, explain that it is the same prompt, run in advance, with the
same checks. Afterwards, keep either the live PR or the fallback for the
winner, and close the rest.

## 6. If something breaks

| Problem | Do this |
|---|---|
| Agent says it can't reach GitHub | Run `gh auth status`. If you're signed out and it takes more than 60 s to fix, use the fallback PR. |
| Agent is slow | That's what slide 14 is for. Hard stop at 0:45. |
| Agent pushes or opens the PR without asking | Stop it, and say that's exactly what AGENTS.md forbids. That's a teaching moment, not a disaster: it's a draft on a branch. |
| Agent touches files outside its plan | Say "no" and point it back to the plan. That's the human in control. |
| `npm run check` fails and can't be fixed in time | The red check is the harness working. Open the fallback PR. |
| GitHub down or slow | Show `git log -1` and the passing check locally, and skip the PR. |
| Wi-Fi gone | Phone hotspot. If that fails too, use the screenshots on slides 7 and 15. |
