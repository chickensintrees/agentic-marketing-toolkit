# Connect your agent to GitHub

This is the key step. A coding agent that can reach GitHub can manage git for
you: fork the project, make a branch, commit, push, open the pull request,
read review comments and watch the automated checks. You decide what to build
and approve each public step. The agent does the mechanics.

> **Safety rules (read these first)**
>
> - **Never paste a password or token into a chat**, and never into a file. Every method below is a browser sign-in.
> - The only code you ever type is the 8-character one-time code, and only at **https://github.com/login/device**. Only enter a code that your own terminal or agent showed you in the last 15 minutes.
> - On the GitHub page that asks you to authorize, check the name: it should be the app you expect, such as **GitHub CLI**, **Claude** or **Replit**.
> - When a GitHub App asks which repositories it may use, choose **Only select repositories** and pick just your fork.
> - If you ever paste a token by mistake, revoke it right away (see [the last section](#how-to-disconnect-later)).

## Which method for my tool?

| Tool | How it connects | Section |
|---|---|---|
| Codex in the ChatGPT desktop app, Codex CLI or IDE | GitHub CLI sign-in on your computer | [Codex](#codex) |
| Claude Code (terminal, Desktop, VS Code) | GitHub CLI sign-in on your computer | [Claude Code](#claude-code) |
| Claude Code on the web (claude.ai/code) | Claude's GitHub App, on your fork | [Claude Code](#claude-code) |
| Cursor | GitHub CLI sign-in in Cursor's terminal | [Cursor](#cursor) |
| Replit | Replit's GitHub connection, on your fork | [Replit](#replit) |
| Lovable | Can't connect to this repo; use the web editor | [Lovable](#lovable) |
| No agent, or no paid plan | GitHub's web editor | [GitHub web editor](#github-web-editor-no-install) |

## Install Git and the GitHub CLI (tools that run on your computer)

The GitHub CLI, `gh`, is GitHub's official command-line tool. One sign-in lets
any agent that can run terminal commands use GitHub on your behalf. It doesn't
include Git, so install both. Your agent can run these for you; approve them.

**Mac**

- Git: `xcode-select --install`
- GitHub CLI: `brew install gh` if you have Homebrew. Otherwise download the macOS installer from https://github.com/cli/cli/releases/latest.

**Windows** (PowerShell)

```powershell
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli --source winget
```

Then close the terminal and open a **new window**. A new tab isn't enough.

**Linux:** follow https://github.com/cli/cli/blob/trunk/docs/install_linux.md

Also install **Node.js 22.12 or newer** (the LTS version) from https://nodejs.org
so you can run the app.

## Sign in with the GitHub CLI

Run this **yourself, in your own terminal window** (Terminal on a Mac,
PowerShell on Windows, or Cursor's terminal), not inside the agent's chat:

```bash
gh auth login --web --git-protocol https
```

1. When it asks **"Authenticate Git with your GitHub credentials?"**, answer **Y**.
2. It shows a one-time code like `ABCD-1234`. Copy it and press **Enter**. Your browser opens https://github.com/login/device.
3. Sign in to GitHub, type the code, check that the page says **GitHub CLI**, and click **Authorize**.
4. Back in the terminal, check it worked:

   ```bash
   gh auth status
   ```

   You should see "Logged in to github.com account <your-username>".

If you ran plain `gh auth login` instead, answer: **GitHub.com**, **HTTPS**,
**Yes**, then **Login with a web browser**. Never choose "Paste an
authentication token". If `git push` later asks for a password, run
`gh auth setup-git` once.

**What your agent can do now** (it asks you first for anything public):

| You say | The agent runs |
|---|---|
| "Fork the project and get it running" | `gh repo fork chickensintrees/agentic-marketing-toolkit --clone`, then `npm install` and `npm run dev` |
| "Claim issue 12" | `gh issue comment 12 --repo chickensintrees/agentic-marketing-toolkit --body "..."` |
| "Push my work" | `git push -u origin <branch>` (to your fork) |
| "Open the pull request" | `gh pr create --repo chickensintrees/agentic-marketing-toolkit --base main ...` |
| "Did the checks pass?" | `gh pr checks <number> --repo chickensintrees/agentic-marketing-toolkit` |
| "What did Bill say?" | `gh pr view <number> --repo chickensintrees/agentic-marketing-toolkit --comments` |

GitHub asks for broad access when you sign in this way (your repositories,
organizations and gists). That's normal for a personal account; you can
revoke it after the course.

## Codex

**Codex in the ChatGPT desktop app** (Free and Go include it; Plus or higher
also unlocks the CLI and IDE extension):

1. Install Git and `gh`, and sign in (above).
2. Open the ChatGPT desktop app, choose **Codex**, start a new chat, and open or create a folder such as `Documents/mba-class`.
3. Paste the [starter prompt](starter-prompt.md).
4. Codex keeps the network off by default, so it asks before commands like `gh repo fork`, `npm install`, `git push` and `gh pr create`. Read each one and approve it with the narrowest option offered.
5. If a `gh` command fails only inside Codex's sandbox, approve running it with network access when Codex offers.

**Codex Cloud** (Plus or higher):

1. Fork on github.com first: https://github.com/chickensintrees/agentic-marketing-toolkit/fork
2. In ChatGPT, choose **Work in > Cloud**, then create and publish an environment. Select **your fork**, and **Connect GitHub** if prompted.
3. Start the task with the starter prompt. When your change is ready, choose to open a pull request.
4. If the PR opens on your fork, open it on the class repo [in the browser](#if-the-pull-request-lands-on-your-fork).

## Claude Code

Claude Code needs a paid Claude plan (Pro or higher).

**On your computer** (terminal, the Desktop app's Code tab, or VS Code):

1. Install Git and `gh` (on Windows, Claude Code recommends Git for Windows), and sign in (above).
2. Start Claude Code in an empty folder (run `claude` in the terminal, or open the Code tab), and paste the [starter prompt](starter-prompt.md).
3. Claude asks permission before each command that isn't read-only. Read and approve the fork, the push and the pull request one at a time.
4. In the Desktop app, signing in to `gh` also lets it show your PR's checks.

**On the web** (claude.ai/code):

1. Fork on github.com first: https://github.com/chickensintrees/agentic-marketing-toolkit/fork
2. Open https://claude.ai/code and click **Sign in with GitHub**.
3. Install the Claude GitHub App for your account at https://github.com/apps/claude/installations/new, choose **Only select repositories**, and pick your fork.
4. Select your fork, paste the starter prompt, and review the changes Claude makes.
5. If **Create PR** opens the pull request on your fork, open it on the class repo [in the browser](#if-the-pull-request-lands-on-your-fork). In cloud sessions, Claude can't use `gh pr` or `gh issue` (GitHub's GraphQL API is blocked there), so it uses its built-in GitHub tools instead.

## Cursor

The Free plan includes Agent with limited usage.

1. Install Git and `gh`.
2. In Cursor: **File > Open Folder** (an empty folder), then **Terminal > New Terminal**, and sign in there (above).
3. Optional but recommended: to be asked before every command, open **Settings > Agents > Approvals & Execution** and choose **Allowlist**, with nothing on the list. The default mode can approve some commands without asking you.
4. Paste the [starter prompt](starter-prompt.md) into the Agent chat.
5. After the agent forks and clones, use **File > Open Folder** to open the new `agentic-marketing-toolkit` folder.

You don't need the Cursor GitHub app (it's for Cursor's Cloud Agents) or an MCP
server.

## Replit

Replit's Agent pushes only where you have write access, so you work in your fork.

1. Fork on github.com: https://github.com/chickensintrees/agentic-marketing-toolkit/fork, then **Create fork**.
2. Open https://replit.com/repos, choose **GitHub**, and connect your account. Review the access it asks for before approving.
3. Import your fork: in the prompt box choose **+ > Import an existing project > GitHub** and paste `https://github.com/<your-username>/agentic-marketing-toolkit`, or open `https://replit.com/github.com/<your-username>/agentic-marketing-toolkit`.
4. Paste the [starter prompt](starter-prompt.md) and tell Agent you've already forked.
5. When the change is ready: "Run npm run check and show me the output. Then commit to a new branch, push it to my fork, and open a pull request against chickensintrees/agentic-marketing-toolkit main with Closes #N in the description."
6. If the PR lands on your fork, or Agent can't target the class repo, open it [in the browser](#if-the-pull-request-lands-on-your-fork).

Replit routes Agent's git commands through its own proxy, so Agent never holds
a token. **Never give Agent a personal access token**; if the connection fails,
fix it in Replit. Replit's repository workflow is early access and may not be
available on every account.

## Lovable

Lovable's Git sync **can't connect to an existing repository**; it always
creates a new one. So don't connect Lovable to the class repo or your fork.

- Use Lovable to prototype an idea if you like, then contribute through the [GitHub web editor](#github-web-editor-no-install).
- Or open an issue describing your idea, with screenshots of the prototype or the prompt you used.

## GitHub web editor (no install)

Works for anyone, with no agent and nothing to install. Best for adding or
changing one or two files, such as a new industry preset or a docs fix. When
you edit a file in someone else's repository, GitHub forks it and opens a pull
request for you. Step by step: [the no-install path in CONTRIBUTING.md](../../CONTRIBUTING.md#no-install-path-the-github-web-editor).

## If the pull request lands on your fork

Some connections can push to your fork but can't open the pull request on the
class repo. Open it yourself:

1. Go to https://github.com/chickensintrees/agentic-marketing-toolkit/compare
2. Click **compare across forks**.
3. Base repository: `chickensintrees/agentic-marketing-toolkit`, base: `main`. Head repository: `<your-username>/agentic-marketing-toolkit`, compare: your branch.
4. Add a title, and fill in the description from the template. Include `Closes #<issue number>`.
5. Leave **Allow edits from maintainers** on, and click **Create pull request**.

## VS Code with GitHub Copilot (optional)

GitHub's official MCP server gives agents direct access to issues, branches and
pull requests. In VS Code 1.101 or newer with GitHub Copilot, it signs in
through the browser, so no token is needed. Verified students get Copilot
Student free through GitHub Education (approval can take several days).

In Cursor, Claude Code and Codex, GitHub's hosted MCP server currently needs a
personal access token. Skip it for this class: the GitHub CLI does the same
job with a browser sign-in.

## How to disconnect later

- **GitHub CLI:** `gh auth logout` removes the sign-in from your computer. To revoke it on GitHub: **Settings > Applications > Authorized OAuth Apps > GitHub CLI > Revoke**. This signs out every computer where you used `gh`.
- **GitHub Apps** (Claude, Replit, Lovable, Cursor): **Settings > Applications > Installed GitHub Apps > Configure**, then **Uninstall**. Also check **Authorized GitHub Apps**.
- **Claude:** disconnect GitHub at https://claude.ai/customize/connectors. That deletes Claude's stored GitHub credentials; revoke on GitHub as well if you want the access gone everywhere.
- **Replit:** Repositories page, **Manage**, then **Disconnect** under your personal account.
- **Personal access tokens**, if you ever made one: delete it at https://github.com/settings/tokens. If a token was pasted into a chat or committed, delete it immediately.
