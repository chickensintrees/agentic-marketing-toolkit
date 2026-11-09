@AGENTS.md

## Claude Code notes

- AGENTS.md (imported above) is the playbook. Follow it first.
- This repo's skills are in `.claude/skills/`, as identical copies of `.agents/skills/`. If you edit a skill, edit both copies; CI runs `diff -r .agents/skills .claude/skills`.
- Keep the permission prompts on. Ask before each command that changes files, pushes, or posts to GitHub, and never suggest that a student skip permissions.
- For anything bigger than a one-file change, start in plan mode and get the user's OK on the plan before you edit.
- **Claude Code on the web (claude.ai/code):** work in the student's fork, not the class repo. In cloud sessions `gh pr` and `gh issue` fail because the GitHub proxy blocks GraphQL; use the built-in GitHub tools or `gh api repos/...` instead. If "Create PR" opens the PR on the fork, help the student open it on github.com with "compare across forks" (`docs/students/connect-github.md`).
