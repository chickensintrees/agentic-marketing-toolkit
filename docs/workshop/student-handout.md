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
Cursor, Replit or Lovable. Paste this prompt exactly:

```
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

## Connect your agent to GitHub (one time)

This works in any agent that runs terminal commands: Claude Code (Pro or
higher), Codex (including the free desktop app), Cursor, and Replit's Shell.
Your agent can run these steps for you. You just approve, and sign in
through your browser.

1. **Install Git and the GitHub CLI.** Mac: `xcode-select --install`, then
   `brew install gh` (needs Homebrew, from brew.sh). Windows:
   `winget install --id Git.Git -e --source winget`
   and `winget install --id GitHub.cli --source winget`, then open a *new*
   terminal window.
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
- **Lovable:** it can't attach to an existing repo. Use the web editor path
  below.

## No paid plan? Use the web editor

On the project's GitHub page, open the file you want to change and click the
pencil (edit) icon. GitHub forks the project for you, and when you save it
offers to open a pull request. This is a perfectly good way to add one
industry.

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
