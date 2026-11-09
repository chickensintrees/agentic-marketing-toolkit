# Live demo script

This covers slides 7 and 11–13. An agent connected to GitHub carries out the
git steps, and a person approves each public action. Bill chooses one
industry, or takes one suggestion from the room. Claude Code adds it to Five
Forces inside the harness, runs the checks, pushes a branch, opens a draft
pull request against a class issue, and comments on that issue. Bill talks
through slide 12 ("How this was built") while the agent works.

**Why an industry:** it is the contribution the harness is built for. The
`add-industry` skill describes the steps, and the data-integrity tests check
every preset automatically:

- five assessments, each rated 1–5;
- 2–4 valid driver ids;
- a non-empty rationale;
- evidence set to `illustrative`;
- an id that matches its file name and is registered.

Adding an industry needs no spec change, because the Five Forces spec says
"at least" five presets.

> Before rehearsal, confirm these on merged `main`:
>
> - the `add-industry` skill name;
> - where the Five Forces industry files live;
> - that `npm run check` runs lint, typecheck, tests and build;
> - the live URL `#/five-forces`.
>
> If any of these differ, update this script and slide 11.

## 1. Connect the agent to GitHub (tonight, not live)

Do this once tonight on the demo laptop, so that the room sees a working
connection rather than a sign-in over the venue Wi-Fi.

The demo agent is **Claude Code**. It connects through the **GitHub CLI**
(`gh`), which works in every tool that runs terminal commands. The sign-in
happens in the browser, so no token is ever pasted anywhere.

1. Install Git and `gh`.
   - macOS: `xcode-select --install`, then `brew install gh`.
   - Windows: `winget install --id Git.Git -e --source winget` and
     `winget install --id GitHub.cli --source winget`. Then open a **new
     terminal window**; a new tab is not enough.
2. Run `gh auth login --web --git-protocol https`. Answer **Y** to
   "Authenticate Git", copy the one-time code, and authorize "GitHub CLI"
   at https://github.com/login/device.
3. Run `gh auth setup-git`, then `gh auth status` to confirm.
4. Run `claude` in the repo folder and ask: "Check whether you can reach
   GitHub for this repo, without changing anything." Confirm that it
   reports your account.

We don't use GitHub's MCP server for this. In Claude Code it needs a
personal access token, which is exactly what students are told never to
paste.

After sign-in, Claude Code runs the git steps with commands such as
`git push`, `gh pr create`, `gh issue comment` and `gh pr checks --watch`.
Claude Code asks permission before each command that changes something, so
the push and the PR are approved one at a time, on screen.

- Take a screenshot of the browser code-entry screen for slide 7.
- Never paste a token into a chat. AGENTS.md says the same. Say it out loud
  in the room.

## 2. Prepare the class issue (tonight)

The orchestrator is creating the issue **"Add an industry chosen by the
class"** and will send its number. That number replaces `#[ISSUE]` on
slide 11 and in the prompt below. The agent's PR links to the issue, and the
agent comments on it.

## 3. The prompt

Replace `<INDUSTRY>` with the chosen industry and `<N>` with the issue
number. The prompt matches slide 11.

```text
Use the add-industry skill to add an illustrative <INDUSTRY> industry to Five Forces. Follow AGENTS.md and show me your plan first. Then run npm run check, push a branch, open a draft pull request for issue #<N>, and comment on the issue with the link.
```

**Choosing the industry:**

- **Bill's choice (default):** pick it tonight and prepare its fallback
  (§5).
- **A suggestion from the room:** take one, as long as it is a clear
  industry and not already a preset. There is no prepared fallback for a
  room suggestion. If the live run fails, show the fallback PR for Bill's
  planned industry instead.
- The current presets are U.S. airlines, video streaming, coffee shops,
  soft drinks and whitewater rafting. Don't pick any of these.

Bill has write access, so his agent pushes a branch to the repo itself. A
student's agent pushes to the student's fork and opens the PR from there.
Say this in the room, because it is what students will see.

## 4. Sequence while it runs

1. **Prompt pasted.** Claude Code reads AGENTS.md and the skill first.
   Point this out.
2. **Plan shown.** Read it aloud. It should name one new industry file and
   its registration. Approve it.
3. **Agent working.** Go to slide 12, "How this was built", and talk
   through it. Check the terminal every couple of minutes.
4. **`npm run check`.** Show lint, types, tests and build passing. If a
   test fails, read the failure aloud, and let the agent fix it if time
   allows.
5. **Git steps.** Claude Code shows each command (`git push`,
   `gh pr create`, `gh issue comment`) and asks permission before running
   it. AGENTS.md also requires this for public actions. Approve each one.
6. **On GitHub (slide 13).** Show the draft pull request, its description,
   the CI status, and the agent's comment on the issue, which other
   contributors can see and respond to.
7. **End of demo.** The pull request stays a draft until it is reviewed
   after class.

## 5. Fallback: a prepared branch and PR (tonight)

Prepare one for Bill's planned industry:

```bash
git checkout main && git pull
git checkout -b demo/<id>      # e.g. demo/ski-resorts
# In Claude Code: the section 3 prompt for that industry,
# but ending "do not push or open a pull request".
npm run check                  # must pass
git push -u origin demo/<id>
```

Open it as a **draft** PR titled `Demo: add <industry> industry`, and leave
it unmerged. If you use it in the room, explain that it is the same prompt,
run in advance, with the same checks. Afterwards, keep either the live PR
or the fallback, and close the other.

## 6. If something breaks

| Problem | What to do |
|---|---|
| Agent says it can't reach GitHub | Run `gh auth status`. If you're signed out and it takes more than 60 s to fix, use the fallback PR. |
| Agent is slow | Keep talking through slide 12. Hard stop at 0:40. |
| Agent pushes or opens the PR without asking | Stop it, and explain that AGENTS.md forbids this. It is a draft on a branch, so nothing reaches the live site. |
| Agent touches files outside its plan | Decline, and point it back to the plan. |
| `npm run check` fails and can't be fixed in time | A failing check means the harness is working. Open the fallback PR. |
| GitHub is down or slow | Show `git log -1` and the passing check locally, and skip the PR. |
| Wi-Fi is gone | Use the phone hotspot. If that fails too, use the screenshots on slides 7 and 13. |
