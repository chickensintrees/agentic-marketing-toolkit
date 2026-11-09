# Agentic Marketing Toolkit

Free, open-source marketing and strategy tools for MBA students, **built by a
class with coding agents**.

**Live site:** https://chickensintrees.github.io/agentic-marketing-toolkit/ ·
**New here?** [docs/students/START-HERE.md](docs/students/START-HERE.md)

## What this is, and how it's built

The Agentic Marketing Toolkit is a suite of small, practical tools for the
frameworks marketing students use: interactive, accurate, and each with a
result you can export and discuss.

It is also an experiment in how products get built now. Many people, each with
their own coding agent, work on **one repository**. Nobody shares a chat; they
share the repo. Every change starts as an issue, happens on a branch in the
contributor's fork, and arrives as a **pull request** that automated checks
verify and a human reviews.

The key unlock is **connecting your agent to GitHub**. Once connected, your
agent manages git for you (fork, branch, commit, push, pull request, review
comments) while you make the decisions and approve each public step. The
repository's harness (its rules, specs, skills and checks) keeps every agent
pointed the same way.

The first tool was built with coding agents the night before a guest lecture.
Every tool after it is meant to come from students, and the class can keep
growing it.

## Tools

| Tool | Framework | What it does | Open |
|---|---|---|---|
| **Five Forces Explorer** | Porter's Five Forces | Learn what drives each of the five forces, rate them for a real industry, and export a summary you can discuss. | [#/five-forces](https://chickensintrees.github.io/agentic-marketing-toolkit/#/five-forces) |

**Wanted next:** SWOT Builder, STP Planner, Customer Persona Builder, Marketing
Mix (4Ps) Planner, Value Proposition Mapper, Customer Journey Map, Perceptual
Map, PESTEL Scanner, Break-even & Pricing Calculator, and Customer Lifetime
Value Calculator. The list lives in [`src/tools/wanted.ts`](src/tools/wanted.ts)
and on the app's Home page. Want to build one? See
[build a tool](docs/students/build-a-tool.md).

## Contribute

1. **Connect your agent to GitHub:** [docs/students/connect-github.md](docs/students/connect-github.md).
2. **Paste the starter prompt** into your agent: [docs/students/starter-prompt.md](docs/students/starter-prompt.md).
3. **Decide and approve.** Your agent follows [AGENTS.md](AGENTS.md), suggests a first issue from [docs/students/first-issues.md](docs/students/first-issues.md), and asks before anything public.

No agent or nothing installed? Use the GitHub web editor:
[CONTRIBUTING.md](CONTRIBUTING.md#no-install-path-the-github-web-editor).
New to the vocabulary? [GitHub basics](docs/github-basics.md).

## Run it locally

You need Git and Node.js 22.12 or newer.

```bash
git clone https://github.com/chickensintrees/agentic-marketing-toolkit.git
cd agentic-marketing-toolkit
npm install
npm run dev
```

To contribute, fork instead of cloning: `gh repo fork chickensintrees/agentic-marketing-toolkit --clone`.

| Command | What it does |
|---|---|
| `npm run dev` | Start the app locally and print a URL to open |
| `npm run test` | Run the unit and component tests |
| `npm run check` | Lint, typecheck, test and build: **the definition of done** |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |

## How this repo is a harness

A harness connects a source of power to a load, under a driver's control: horse,
harness, cart and driver. Here the agent is the power, the harness is what's in
this repository, the useful work is the product, and the human decides.

| Part | What it does | Where |
|---|---|---|
| **Rules** | How every agent behaves: the 12 rules, project rules, the onboarding protocol, hard limits | [`AGENTS.md`](AGENTS.md); [`CLAUDE.md`](CLAUDE.md) imports it for Claude Code; [`replit.md`](replit.md) points Replit to it |
| **Specs** | The source of truth: Bill's intent first, then the specs. Changes flow through a spec before code | [`INTENT.md`](INTENT.md) (Bill's intent; only Bill changes it), [`SPEC.md`](SPEC.md) (suite), [`src/tools/five-forces/SPEC.md`](src/tools/five-forces/SPEC.md) (tool), [`docs/specs/`](docs/specs/README.md) (proposals and templates) |
| **Skills** | Repeatable procedures an agent loads: connect to GitHub, start a contribution, add an industry, add a tool, propose a feature, open a PR, respond to review | [`.agents/skills/`](.agents/skills/) and identical copies in [`.claude/skills/`](.claude/skills/) |
| **Tools** | What the agent can reach. Above all, GitHub, through a browser sign-in | [`docs/students/connect-github.md`](docs/students/connect-github.md) |
| **Checks** | Safeguards that run whether or not the agent remembers the rules | `npm run check`; [`src/tools/registry.test.ts`](src/tools/registry.test.ts); [`src/tools/five-forces/data/industries.test.ts`](src/tools/five-forces/data/industries.test.ts); [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |
| **The integration point** | Where every change enters, explained the same way | [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md), [issue forms](.github/ISSUE_TEMPLATE/), [`docs/workflows/`](docs/workflows/collaborate.md) |
| **The driver** | A human approves each public step, and Bill merges | [`CONTRIBUTING.md`](CONTRIBUTING.md), [`docs/maintainers.md`](docs/maintainers.md) |

The rules come from Bill Moore's
[AI Coding Rules](https://github.com/chickensintrees/ai-coding-rules), which
also has a guide to harness engineering.

## Project structure

```text
INTENT.md                  Bill's intent; outranks the specs
SPEC.md                    suite spec: shell, routing, tool contract, quality gates
AGENTS.md                  the agent playbook (CLAUDE.md and replit.md point here)
src/
  App.tsx, main.tsx        the shell and entry point
  config.ts                product name and repository URL
  shell/                   Home page and routing
  shared/                  design tokens, components and helpers every tool uses
  tools/
    index.ts               the registry of tools (TOOLS)
    wanted.ts              the tools the class could build next
    five-forces/           Five Forces Explorer, with its own SPEC.md
docs/
  students/                start here, starter prompt, connect GitHub, first issues, build a tool
  specs/                   proposal and tool-spec templates
  workflows/               plan, implement, test, review, collaborate
  github-basics.md         the vocabulary, with a diagram
  maintainers.md           setup and review guide for maintainers
.agents/skills/            skills for Codex and Cursor
.claude/skills/            the same skills for Claude Code
.github/                   PR template, issue forms, CI and Pages workflows
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).
Pull requests are reviewed where feasible; not every pull request is merged.

## Credits

Built for Bill Moore's guest lecture to marketing MBA students at West Virginia
University in November 2026, and grown by the class. The first tool was built
with coding agents following [AI Coding Rules](https://github.com/chickensintrees/ai-coding-rules).

Five Forces Explorer is based on:

- Porter, M. E. (1979). How competitive forces shape strategy. *Harvard Business Review*, 57(2).
- Porter, M. E. (2008). The five competitive forces that shape strategy. *Harvard Business Review*, 86(1).

## License

[MIT](LICENSE). Copyright (c) 2026 Bill Moore.

## Disclaimer

These tools are teaching aids. Example data is illustrative, not verified
market research. This is an independent project, not affiliated with or
endorsed by West Virginia University, Harvard Business Review, or Michael E.
Porter.
