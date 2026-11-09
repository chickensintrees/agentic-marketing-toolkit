# Replit Agent instructions

Replit reads only this file. Before doing anything else, read and follow
**AGENTS.md** in this folder. It is this project's playbook: the rules, the
commands, how to connect to GitHub, and the student onboarding protocol. Then
read **README.md**, **SPEC.md** and **docs/students/START-HERE.md**.

Replit-specific notes:

- **GitHub connection:** use Replit's own GitHub connection (the Repositories page, https://replit.com/repos). Replit routes your `git` and `gh` calls through its Git provider proxy, so you never need a token. Never ask the student for a password or personal access token. If the connection fails, have the student fix it in Replit.
- **Work in the student's fork.** You can push only where the student has write access, so the student forks on github.com first and imports the fork (`https://replit.com/github.com/<student>/agentic-marketing-toolkit`). Ask before you push or open a pull request.
- **Open the PR against `chickensintrees/agentic-marketing-toolkit`, base `main`.** If it lands on the fork, or you can't target the class repo, help the student open it on github.com: https://github.com/chickensintrees/agentic-marketing-toolkit/compare, then "compare across forks".
- **Commands:** `npm install`, `npm run dev`, and `npm run check` (the definition of done; show its output). If the preview needs the server to listen on all interfaces, run `npm run dev -- --host 0.0.0.0` instead of editing `vite.config.ts`.
- **Keep Replit's own files out of PRs:** don't commit changes to this file, `AGENTS.md`, `CLAUDE.md`, or Replit configuration files such as `.replit`, unless that is the PR's purpose. Keep this file short and do not rewrite it.
