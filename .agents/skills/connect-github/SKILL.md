---
name: connect-github
description: Check whether you (the coding agent) can reach GitHub, and if not, guide the student through a safe browser sign-in so you can handle git for them. Use at the start of any contribution, when gh or git push asks for credentials, when a push or pull request fails with 401/403, or when the student asks how to connect their agent to GitHub.
---

# Connect to GitHub

This is the key step. Once you can reach GitHub, you can fork, branch, commit,
push, open the pull request, read reviews and watch CI for the student. The
student decides and approves; you do the mechanics.

**Safety first, every time:**

- Never ask for a password or a token in chat, and never suggest pasting one.
- Never run `gh auth token`, `gh auth status --show-token`, or print environment variables that might hold a token.
- The only code the student types is the 8-character one-time code, and only on https://github.com/login/device.

## 1. Find out what you already have (report it; don't assume)

Check in this order and tell the student what you found in one or two sentences.

```bash
git --version
gh --version
gh auth status        # "Logged in to github.com account <login>" means connected
```

1. **GitHub CLI signed in.** Use `gh` and `git` from here on. Run `gh auth setup-git` once so `git push` uses the same sign-in.
2. **GitHub MCP tools** are available (names like `get_me`, `fork_repository`, `create_pull_request`). Call `get_me` and confirm the login with the student. MCP tools can fork, branch, comment and open PRs. `push_files` and `create_or_update_file` commit file contents through the API; they do not push local commits, so prefer `git push` when you have a local clone.
3. **Your tool's own connection.** Codex Cloud, Claude Code on the web and Replit each connect to GitHub in their own settings. They reach only accounts and repos where the student connected or installed them, so work in the student's **fork**. Go to section 3.
4. **Nothing yet.** Go to section 2.

## 2. Sign in with the GitHub CLI (local tools: Codex desktop/CLI, Claude Code, Cursor)

1. **Install if missing** (ask before installing anything):
   - macOS: `brew install gh` if Homebrew is present; otherwise the installer at https://github.com/cli/cli/releases/latest. Git: `xcode-select --install`.
   - Windows: `winget install --id GitHub.cli --source winget` and `winget install --id Git.Git -e --source winget`. Then open a **new** terminal window; a new tab is not enough.
2. **Have the student run this in their own terminal window**, not inside your shell. Interactive prompts are unreliable in agent shells.

   ```bash
   gh auth login --web --git-protocol https
   ```

   - At "Authenticate Git with your GitHub credentials?" answer **Y**.
   - gh prints a one-time code. Press Enter, sign in at https://github.com/login/device, type the code, check that the page names **GitHub CLI**, and click **Authorize**.
   - If they use plain `gh auth login`, the answers are: GitHub.com, HTTPS, Yes, **Login with a web browser**. Never "Paste an authentication token".
3. **Verify:** run `gh auth status` yourself and show the line that names the account.
4. If the login ran without the git question, run `gh auth setup-git`.
5. Codes expire after 15 minutes. If it timed out, run the login again.

Sandbox notes: Codex keeps network off by default and asks before network
commands; approve `gh` and `git push` with the narrowest scope offered. Cursor's
sandbox may also ask before network commands. If a `gh` command fails only
inside the sandbox, say so and offer to rerun it with the tool's approval.

## 3. Tool-specific connections

- **Claude Code on the web (claude.ai/code):** fork on github.com first, sign in with GitHub, install the Claude GitHub App on the student's account for **only the fork**, and select the fork. `gh pr` and `gh issue` fail in cloud sessions (GraphQL is blocked); use the built-in GitHub tools or `gh api repos/...`.
- **Codex Cloud (ChatGPT Plus or higher):** fork first; in the cloud environment, Connect GitHub and select the fork.
- **Replit:** fork first; connect GitHub on https://replit.com/repos; import the fork. Agent's git calls go through Replit's proxy, so no token is ever needed. Never give Agent a personal access token.
- **Lovable:** Lovable's Git sync always creates a new repository, so it cannot connect to the class repo or a fork. Use the GitHub web editor path in `CONTRIBUTING.md`.
- **VS Code with GitHub Copilot:** GitHub's MCP server signs in with OAuth there, so no token is needed.

In Cursor, Claude Code and Codex, GitHub's hosted MCP server needs a personal
access token. Don't set that up for a student; use the GitHub CLI instead.

## 4. If the pull request can't target the class repo

Some connections can push to the fork but not open the PR on
`chickensintrees/agentic-marketing-toolkit`. Then the student opens it in the
browser: https://github.com/chickensintrees/agentic-marketing-toolkit/compare,
click **compare across forks**, choose their fork and branch as the head, and
click **Create pull request**.

## 5. Tell the student how to disconnect later

- GitHub CLI: `gh auth logout` removes it from this computer. To revoke it on GitHub: Settings > Applications > Authorized OAuth Apps > GitHub CLI > Revoke.
- GitHub Apps (Claude, Replit, Lovable, Cursor): Settings > Applications > Installed GitHub Apps > Configure, then Uninstall.

Human-readable steps for every tool: `docs/students/connect-github.md`.
