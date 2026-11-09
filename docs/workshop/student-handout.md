# How products get built

*Harnesses for AI agents, and collaboration on GitHub*

**Bill Moore · Guest lecture · West Virginia University · 9 November 2026**

You are invited to help build the **Agentic Marketing Toolkit**, an
open-source suite of marketing tools that this class builds together.
Tool #1 is Five Forces Explorer.

## Links

- **The toolkit (live):** chickensintrees.github.io/agentic-marketing-toolkit [QR]
- **The project on GitHub:** github.com/chickensintrees/agentic-marketing-toolkit [QR]
- **Start here:** the project's `docs/students/START-HERE.md`
- **Bill's AI coding rules:** github.com/chickensintrees/ai-coding-rules

## Contribute with your coding agent

You need a free GitHub account and a coding agent: Claude Code, Codex,
Cursor, Replit or Lovable. Paste this prompt into Claude Code, Codex, Cursor
or Replit. With Lovable, or no agent, skip it and use the web editor path
below.

```
Help me get set up to contribute to our class project: github.com/chickensintrees/agentic-marketing-toolkit. Read AGENTS.md and follow it. Walk me through connecting you to my GitHub account (browser sign-in only), forking the project, and running it. I'm new to this, so explain each step and ask me before anything public.
```

The detailed steps are in the project's AGENTS.md, which your agent reads
first.

## Connect your agent to GitHub (one time)

This works in any agent that runs terminal commands: Claude Code (Pro or
higher), Codex (including the free desktop app), Cursor, and Replit's Shell.
Your agent can run these steps for you. You just approve, and sign in
through your browser.

1. **Install Git, the GitHub CLI and Node.js.** Mac: `xcode-select --install`, then
   `brew install gh` (needs Homebrew, from brew.sh). Windows:
   `winget install --id Git.Git -e --source winget`
   and `winget install --id GitHub.cli --source winget`, then open a *new*
   terminal window. Node.js 22.12 or newer (the LTS version): nodejs.org.
2. **Sign in:** `gh auth login --web --git-protocol https`. Answer **Y** to
   "Authenticate Git", copy the one-time code, and approve "GitHub CLI" at
   github.com/login/device.
3. **Finish:** `gh auth setup-git`, then `gh auth status` to check.

After that, your agent does the git: fork, branch, commit, push, pull
request, comments. You can revoke access anytime at github.com → Settings →
Applications.

- **Claude Code on the web (claude.ai/code):** fork on github.com first, then
  sign in with GitHub and install the Claude GitHub App on your fork only.
  If it can't open the PR, open it yourself from github.com ("compare
  across forks").
- **Replit:** fork on github.com first, connect GitHub at replit.com/repos,
  then import your fork.
- **Lovable:** it can't attach to an existing repo. Use the web editor path
  below.

## No paid plan? Use the web editor

For a one-file change such as a docs fix, open the file on the project's
GitHub page and click the pencil (edit) icon. GitHub forks the project for
you, and when you save it offers to open a pull request.

Adding an industry takes two files: follow "Add an industry preset (two
files)" in the project's CONTRIBUTING.md (fork, create `<id>.ts`, add one
line to `index.ts` on the same branch, then open the pull request with
"compare across forks").

## What you approve yourself

Your agent carries out the git steps. **You** approve:

- Signing in to GitHub (in your browser, never a token pasted into chat).
- Making your fork.
- The plan, before any code is written.
- Every push and every pull request.

If your agent tries any of these without asking, tell it to stop and ask
first.

## Getting help

Open an **issue** on the project with the **"question"** template:
**Issues → New issue → question**. Bill will answer. No question is too
basic.

## Is this required?

**No. Contributing is voluntary unless your instructor assigns it.** Bill
will help anyone who wants to try, now and as the toolkit grows.
