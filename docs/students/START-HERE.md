# Start here

Welcome. This class is building a real product together: the
[Agentic Marketing Toolkit](https://github.com/chickensintrees/agentic-marketing-toolkit),
a suite of free marketing and strategy tools. You'll contribute the way
products are built now. You and your coding agent work in your own copy, and
your change reaches the class project through a pull request that Bill reviews.

The one thing that makes this work: **connect your agent to GitHub.** Then it
handles git for you (fork, branch, commit, push, pull request) while you make
the decisions and approve each public step. You never have to type a git
command yourself.

New to the vocabulary? Read [GitHub basics](../github-basics.md) first (five minutes).

## What you need

1. **A GitHub account.** Free: https://github.com/signup
2. **A coding agent.** Any of these works. Costs as of November 2026:

   | Tool | What it costs to use here |
   |---|---|
   | **Codex** | The Free and Go plans include Codex in the ChatGPT desktop app (OpenAI says "subject to rollout"), which is all you need. The Codex CLI, IDE extension and Codex Cloud need ChatGPT Plus ($20/month) or higher. |
   | **Claude Code** | Needs a paid Claude plan (Pro or higher). There is no free tier. |
   | **Cursor** | The Free plan includes Agent with limited usage. The student discount is closed to new sign-ups, but master's students can request credits through the form on Cursor's student-discount help page. |
   | **Replit** | The free Starter plan has limited Agent use. Replit's GitHub workflow is early access and may not be available on every account. |
   | **Lovable** | The Free plan has 30 build credits a month; students get 50% off Pro for 12 months. Lovable can't connect to this project's repository, so use the no-install path below. |
   | **No agent** | GitHub's web editor is free and needs no install. Good for adding one file. |

3. **For tools that run on your computer** (Codex desktop app, Claude Code, Cursor): Git, the GitHub CLI (`gh`) and Node.js 22.12 or newer. Your agent can help install them; read and approve each command.

> **GitHub Education.** Verified students get GitHub Copilot Student free, plus
> more free Codespaces hours (a cloud computer in your browser). Verification
> and activation can take several days, so apply now for later, not for today:
> [GitHub Education for students](https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students).

## Step 1: Connect your agent to GitHub

Follow [Connect your agent to GitHub](connect-github.md) for your tool. For the
tools that run on your computer, it comes down to one command that **you** run
in your own terminal window (Terminal on a Mac, PowerShell on Windows):

```bash
gh auth login --web --git-protocol https
```

Answer **Y** when it asks to authenticate Git, then sign in in your browser
with the one-time code it shows. You never paste a password or token anywhere.

## Step 2: Paste the starter prompt

Paste this into your agent as your first message
(also in [starter-prompt.md](starter-prompt.md)):

```text
I'd like to contribute to an open-source class project, the Agentic Marketing Toolkit:
https://github.com/chickensintrees/agentic-marketing-toolkit

I'm new to coding, so explain each step in plain language as we go.

1. Read the project's README.md, AGENTS.md, and docs/students/START-HERE.md, and follow AGENTS.md.
2. Tell me what the project does and how contributing works.
3. Help me connect you to GitHub so you can handle git for me. Check what access you already have; don't assume. Use a browser sign-in, and never ask me to paste a password or token into this chat.
4. Fork the project to my GitHub account and get my copy running. Tell me before you do anything public (fork, push, open a pull request) and wait for my OK.
5. Suggest three small first contributions from docs/students/first-issues.md and let me pick one.
6. Before writing code, show me a short plan, and update the relevant SPEC.md first if the change alters how the app behaves.
7. Run npm run check and show me the result, then commit, push to my fork, and open the pull request once I approve.
```

The project's `AGENTS.md` tells your agent the rest: the rules, the commands,
and the step-by-step onboarding protocol.

## Step 3: Your tool's path

### Codex (ChatGPT desktop app, any plan)

1. Install Git and `gh`, and sign in (Step 1).
2. Open the ChatGPT desktop app, choose **Codex**, start a new chat, and open or create a folder for the class, for example `Documents/mba-class`.
3. Paste the starter prompt. Codex keeps the network off by default, so it asks before commands like `gh repo fork`, `npm install`, `git push` and `gh pr create`. Read each one and approve it.

On Plus or higher you can also use Codex Cloud: fork on github.com first, then
connect GitHub in a cloud environment and choose **your fork**.
[Details](connect-github.md#codex).

### Claude Code (Pro or higher)

- **On your computer** (terminal, Desktop app's Code tab, or VS Code): install Git and `gh`, sign in (Step 1), start Claude Code in an empty folder, and paste the starter prompt. Claude asks before each command that changes anything.
- **On the web** (claude.ai/code): fork on github.com first, sign in with GitHub, give the Claude GitHub App access to **only your fork**, select your fork, and paste the starter prompt. If the pull request opens on your fork, open it on github.com instead. [Details](connect-github.md#claude-code).

### Cursor (Free plan works)

1. Open Cursor, choose **File > Open Folder** and pick an empty folder, then **Terminal > New Terminal**.
2. Sign in to `gh` in that terminal (Step 1).
3. Optional: to be asked before every command, go to **Settings > Agents > Approvals & Execution** and choose **Allowlist**.
4. Paste the starter prompt into the Agent chat. After it forks and clones, use **File > Open Folder** to open the new `agentic-marketing-toolkit` folder.

[Details](connect-github.md#cursor).

### Replit

1. Fork on github.com: https://github.com/chickensintrees/agentic-marketing-toolkit/fork, then **Create fork**.
2. Connect GitHub in Replit on the Repositories page (https://replit.com/repos). Review the access it asks for.
3. Import your fork: `https://replit.com/github.com/<your-username>/agentic-marketing-toolkit`.
4. Paste the starter prompt and tell Agent you've already forked.

If the pull request lands on your fork, open it on github.com with
"compare across forks". [Details](connect-github.md#replit).

### Lovable, or no paid plan: the no-install path

Lovable can't connect to an existing repository (its Git sync always creates a
new one), so contribute through GitHub's website instead. It works for anyone.

- **Adding or editing a file** (an industry preset, a docs fix): follow the [no-install path in CONTRIBUTING.md](../../CONTRIBUTING.md#no-install-path-the-github-web-editor). GitHub makes the fork and the pull request for you. Any AI chat, Lovable included, can help draft the file.
- **An idea or prototype**: open an issue with screenshots of your Lovable prototype or the prompt you used. Ideas are contributions too.

## What you approve yourself

Your agent should stop and ask before anything public. Read the command, then approve:

- forking: `gh repo fork chickensintrees/agentic-marketing-toolkit --clone`
- installing and checking: `npm install`, `npm run check`
- committing: `git commit`
- pushing to **your fork**: `git push -u origin <branch>`
- opening the pull request: `gh pr create --repo chickensintrees/agentic-marketing-toolkit ...`
- comments on issues and PRs, after you've read the text

**Say no, or ask Bill first,** if you see:

- `git push --force`, or pushing to `main`
- deleting a repository or branch (`gh repo delete`), or changing settings (`gh repo edit`)
- anything about tokens or secrets, or anything that would print one
- edits to `.github/workflows/`, `AGENTS.md`, `CLAUDE.md` or `replit.md`, unless that's the point of your PR
- installing a GitHub App with access to "All repositories"

## Troubleshooting

| Problem | What to do |
|---|---|
| `gh: command not found` right after installing on Windows | Close the terminal and open a **new window** (a new tab isn't enough). |
| The sign-in code expired | Codes last 15 minutes. Run `gh auth login --web --git-protocol https` again. |
| `git push` asks for a username or password | Run `gh auth setup-git`, then try again. Never type a password or token into the chat. |
| Push refused with 403 or "permission denied" | It's trying to push to the class repo. Ask your agent to run `git remote -v`: `origin` must be **your** fork. |
| "Please tell me who you are" when committing | Your agent can set your name and email. GitHub's private no-reply address is at https://github.com/settings/emails. |
| `npm` not found, or "Node.js version" errors | Install Node.js 22.12 or newer from https://nodejs.org, then open a new terminal. |
| `npm run check` fails | Ask your agent to read the first error and fix the cause. After two failed tries, stop and ask in your PR or an issue. |
| Your PR's checks say pending or "awaiting approval" | Normal for a first-time contributor. Bill approves the checks; nothing is wrong. |
| The PR opened on your fork, not the class repo | Go to https://github.com/chickensintrees/agentic-marketing-toolkit/compare, click **compare across forks**, and choose your fork and branch. |
| Codex or Cursor asks to allow network access | Expected for `gh`, `git push` and `npm install`. Read the command, then approve. |
| `gh pr create` fails in Claude Code on the web | Expected there. Let Claude use its built-in GitHub tools, or open the PR on github.com. |
| Someone already claimed your issue | Pick another, or comment to offer help. |
| "This branch has conflicts" on your PR | Ask your agent to merge `main` into your branch (skill `respond-to-review`). |

## Getting help

- **Ask a question on GitHub:** [open a Question issue](https://github.com/chickensintrees/agentic-marketing-toolkit/issues/new?template=question.yml). Say which tool you use and paste the error message (never a token).
- **Ask Bill.** He's offering help as the class keeps building.

Next: [first issues](first-issues.md) · [build a tool](build-a-tool.md) ·
[how contributing works](../../CONTRIBUTING.md)
