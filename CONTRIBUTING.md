# Contributing to the Agentic Marketing Toolkit

You're invited to help build this. The Agentic Marketing Toolkit is a suite of
free marketing and strategy tools, built by a class: many people, each working
with their own coding agent, contributing through pull requests. You don't need
to be a programmer. You need an idea of what would help someone in marketing,
and the judgment to decide what "good" looks like. Your agent handles the code
and the git.

**New here?** Start with [docs/students/START-HERE.md](docs/students/START-HERE.md).

## Ways to contribute

| Contribution | Effort | How |
|---|---|---|
| **Add an industry** to Five Forces Explorer | About an hour | One new file plus one line. Skill `add-industry`; ideas in [first issues](docs/students/first-issues.md). |
| **Build a new tool** for the suite | A project | Spec first, then code. [Build a tool](docs/students/build-a-tool.md). |
| **Improve a tool** | A few hours | Propose it in the tool's spec first ([docs/specs/](docs/specs/README.md)). |
| **Improve the docs** | Minutes to an hour | Fix what confused you; that's what the next student needs. |
| **Share an idea or report a bug** | Minutes | [Open an issue](https://github.com/chickensintrees/agentic-marketing-toolkit/issues/new/choose). Ideas are contributions. |
| **Review someone's pull request** | Minutes | Comment on what's clear, what isn't, and whether it matches the spec. |

## How it works

1. **Pick or open an issue**, and claim it with a comment.
2. **Fork** the project (your own copy on GitHub) and make a **branch**.
3. **Plan** the change; if it alters how the app behaves, update the spec first.
4. **Make the change**, then run `npm run check` until it passes.
5. **Push** to your fork and open a **pull request** against `main`.
6. **CI** runs the same checks; Bill and classmates review; you fix on the same branch.
7. **Bill merges**, the issue closes, and the live site updates.

With an agent connected to GitHub, you say what you want and approve each
public step; the agent runs the commands. See
[connect your agent to GitHub](docs/students/connect-github.md) and the
[starter prompt](docs/students/starter-prompt.md). Agents follow
[AGENTS.md](AGENTS.md).

## No-install path: the GitHub web editor

No agent, no paid plan, or using Lovable? You can contribute entirely on
github.com. GitHub creates your fork and the pull request for you. CI checks
your change even though you can't run the tests yourself.

### Change one file (for example a docs fix)

1. Open the file on https://github.com/chickensintrees/agentic-marketing-toolkit.
2. Click the **pencil** (Edit this file). GitHub asks you to fork the repository: click **Fork this repository**.
3. Make your edit.
4. Click the green **Commit changes…** (or **Propose changes**) button, describe the change, and confirm.
5. On the next page, fill in the pull request description (the template's four questions), and click **Create pull request**.

### Add an industry preset (two files)

1. **Fork:** open https://github.com/chickensintrees/agentic-marketing-toolkit/fork and click **Create fork**.
2. **Create the preset file:** in your fork, go to `src/tools/five-forces/data/industries/` and choose **Add file > Create new file**. Name it `<id>.ts`, for example `craft-beer.ts` (lowercase, hyphens).
3. **Fill it in:** copy everything from `coffee-shops.ts` in the same folder as a starting point, then change the `id` (it must equal the file name), the profile, and all five assessments. Each rating is 1–5, where higher means more pressure on profitability (a high threat of new entrants means entry is easy). Use only driver ids listed for that force in `src/tools/five-forces/data/forces.ts`. Any AI chat, Lovable included, can help draft it if you paste in `coffee-shops.ts` and the driver ids. You decide the scope and the ratings.
4. **Commit to a new branch:** click **Commit changes…**, choose **Create a new branch for this commit**, name it `add-<id>`, and confirm. If GitHub then offers a pull request form, you can leave it for step 6.
5. **Register it:** switch to your `add-<id>` branch (the branch menu above the file list), open `src/tools/five-forces/data/industries/index.ts`, and click the pencil. Add an import line with the others, such as `import craftBeer from './craft-beer'`, and add `craftBeer,` at the end of the `INDUSTRY_PRESETS` list. Commit directly to the `add-<id>` branch.
6. **Open the pull request:** go to https://github.com/chickensintrees/agentic-marketing-toolkit/compare, click **compare across forks**, and choose your fork and the `add-<id>` branch as the head. Fill in the description, include `Closes #<issue>`, and click **Create pull request**.
7. **Watch the checks** on the pull request. If one fails, its message names the preset and the field. Edit the file on your `add-<id>` branch; the pull request updates itself.

## Spec first

The specs are the source of truth (after [INTENT.md](INTENT.md), Bill's intent,
which only Bill changes): [SPEC.md](SPEC.md) for the suite, and
`src/tools/<tool-id>/SPEC.md` for each tool. If your change alters how the app
behaves, the spec changes first, in the same pull request as the code. A
**spec-only pull request** (a proposal in `docs/specs/`, or a new tool's
`SPEC.md`) is a welcome contribution on its own. See
[docs/specs/README.md](docs/specs/README.md).

A new industry preset, a typo fix, or a bug where the code breaks the spec
needs no spec change.

## What a good pull request explains

The [pull request template](.github/PULL_REQUEST_TEMPLATE.md) asks four questions:

1. **What changed?** One or two plain sentences.
2. **Why does it help someone in marketing?** Who benefits, and how.
3. **How did you test it?** The `npm run check` result, what you clicked through, screenshots for anything visible.
4. **What did the agent do, and what did you decide?** Your judgment is the point. Say which calls were yours.

Plus a short checklist and `Closes #<issue>`. Keep one purpose per pull request.

## After you open a pull request

- **First-time contributors:** GitHub holds the automated checks on your first pull request until Bill approves them. Pending checks don't mean anything is wrong.
- **Review:** pull requests are reviewed where feasible; not every pull request is merged. If one isn't, you'll get a reason, and an issue or spec proposal is still a contribution.
- **Changes requested:** fix them on the same branch and push. The pull request updates itself. Never force-push.
- **Merged:** the linked issue closes, and the site redeploys from `main`.

## Ground rules

- Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Everyone here is learning.
- Example data is illustrative teaching material: cautious, general language, no statistics, market shares or claims about named companies.
- Each tool stays in its own folder and never imports from another tool.
- Leave `AGENTS.md`, `CLAUDE.md`, `replit.md`, the skills and `.github/` alone unless improving them is the purpose of your pull request. Some tools edit these on their own; don't include those edits.
- Never commit passwords, tokens or personal data. This project needs none.
- By contributing, you agree that your contribution is licensed under the project's [MIT License](LICENSE).

## Questions

[Open a Question issue](https://github.com/chickensintrees/agentic-marketing-toolkit/issues/new?template=question.yml),
or ask Bill.
