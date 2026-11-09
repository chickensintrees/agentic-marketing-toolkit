# Agentic Marketing Toolkit — Specification

> **This file is the single source of truth for the toolkit as a whole.**
> Each tool also has its own spec at `src/tools/<tool-id>/SPEC.md`, which is
> the source of truth for that tool. Changes flow through the relevant spec
> before they flow into code. If code and spec disagree, the spec wins: fix the
> code, or deliberately update the spec first in the same pull request. See
> [AGENTS.md](AGENTS.md) for the workflow.

## 1. What this is

The **Agentic Marketing Toolkit** is a free, open-source suite of small,
practical marketing and strategy tools for MBA students and anyone else who
uses them. It is **built together by a class**: many people, each working with
their own coding agent, contributing through GitHub pull requests.

It began with a marketing MBA guest lecture on how products get built now:
many humans and agents collaborating on one repository through specs, agent
messages, branches, and pull requests. The first tool, **Five Forces
Explorer**, was built with coding agents the night before that lecture. Every
tool after it is meant to come from students.

The repository is also a worked example of **harness engineering**. It carries
the rules (`AGENTS.md`), the sources of truth (the specs), the skills, and the
automated checks that let many agents work on it safely at the same time.

### Who it is for

| User | Needs |
|---|---|
| **Student using a tool** | Clear, accurate, interactive help with a framework they are studying, with a result they can export. |
| **Student contributor** (usually not a programmer) | A codebase where adding a tool, or improving one, is a contained change in one folder that automated checks can verify. |
| **Instructor / presenter** | A reliable demo with no setup, accounts, or API keys. |
| **Maintainer** (Bill Moore) | Pull requests that are small, well-explained, and verified by CI before review. |

### Non-goals (version 1)

- No backend, accounts, database, analytics, or tracking.
- No calls to AI or other paid APIs, and no credentials of any kind.
- No router library, chart library, or CSS framework. Plain React + CSS.
- Not market research. Example data is teaching material.

## 2. The suite shell

### 2.1 Layout

- **Header:** the product name (links to Home) and, inside a tool, the tool's
  name.
- **Main:** Home, or the active tool.
- **Footer:** link to the GitHub repository (`REPO_URL` in `src/config.ts`, so a
  fork changes one constant), a "Contribute" link to `CONTRIBUTING.md` on
  GitHub, and the disclaimer: *"These tools are teaching aids. Example data is
  illustrative, not verified market research."*

### 2.2 Routing (URL hash)

| Hash | Shows |
|---|---|
| empty, `#`, `#/` | Home |
| `#/<tool-id>` | That tool's default view |
| `#/<tool-id>/<subpath>` | That tool, with `<subpath>` passed to it (e.g. `#/five-forces/summary`) |
| anything else (unknown tool id) | Home |

Back/forward buttons work. Moving between Home and a tool moves keyboard focus
to the new main heading. Each route sets `document.title` to
`<Tool name> · Agentic Marketing Toolkit` (or just the product name on Home).

### 2.3 Home

Visual first and nearly wordless (about 40 words besides the shell):

1. **Title:** the product name as the page's `h1`, and one link to
   `CONTRIBUTING.md` ("Contribute").
2. **Tools:** one entry per registered tool, in registry order, numbered
   (01, 02, …): its name set large, the framework it teaches (if any), its
   tagline in small type, a visual of the tool (for Five Forces, its diagram
   cycling through the example industries), and an "Open" link to
   `#/<tool-id>`.
3. **"Build next":** the wanted-tools list (§3.3) as a grid of geometric marks
   with each tool's name; each name opens to show its one-line pitch. One link
   to `docs/students/build-a-tool.md` on GitHub explains how to propose and
   build one.

### 2.4 Accessibility and design (applies to every tool)

- WCAG 2.1 AA intent: semantic landmarks (`header`, `nav`, `main`, `footer`),
  exactly one `h1` per route, logical heading order, labels on every control,
  visible focus styles, text contrast ≥ 4.5:1, no information carried by
  color alone, and `prefers-reduced-motion` respected.
- Fully keyboard operable.
- Responsive from 320 px phones to desktop with no horizontal scrolling.
- Light and dark themes via `prefers-color-scheme`, defined as CSS custom
  properties on `:root` in `src/shared/`. Tools use these tokens rather than
  their own colors.
- Calm, professional style that projects well in a lecture hall: generous type,
  high contrast, one accent color. The suite's look is monochrome: near-black
  on off-white (inverted in dark mode), a grotesk display face with a
  monospace face for labels and data, hairline rules on a strict grid, and no
  cards, shadows, gradients or pill badges. The single accent marks only
  something the user changed, always alongside a word.

## 3. The tool contract

### 3.1 A tool is one folder

```text
src/tools/<tool-id>/
  SPEC.md          the tool's spec (required) — copy docs/specs/TOOL-TEMPLATE.md
  index.ts         exports `tool: ToolDefinition` (required)
  *.tsx, lib/, data/, components/ …   the tool's own code
  *.test.ts(x)     the tool's tests (required: at least one)
```

- `<tool-id>` is kebab-case and is the folder name.
- A tool may import from `src/shared/` and from its own folder. **It never
  imports from another tool's folder.** Code two tools need moves to
  `src/shared/` in its own pull request.
- A tool keeps its business logic in pure functions with unit tests. Its
  components stay thin.
- Storage keys are namespaced: `agentic-marketing-toolkit:<tool-id>:<version>`.
  Reads tolerate missing, unavailable, or corrupted storage.

### 3.2 Types (`src/tools/types.ts`)

```ts
import type { ComponentType } from 'react'

export interface ToolProps {
  /** Hash path after `#/<tool-id>/`, '' for the tool's default view. */
  subpath: string
  /** Navigate within this tool; navigate('summary') → #/<tool-id>/summary. */
  navigate: (subpath: string) => void
}

export interface ToolDefinition {
  id: string           // kebab-case, equals the folder name
  name: string         // "Five Forces Explorer"
  framework?: string   // "Porter's Five Forces"
  tagline: string      // one line for the Home card
  Component: ComponentType<ToolProps>
}

export interface WantedTool {
  id: string           // kebab-case; must not clash with a registered tool
  name: string         // "SWOT Builder"
  pitch: string        // one line: what it would help a student do
}
```

### 3.3 Registry

- `src/tools/index.ts` exports `TOOLS: ToolDefinition[]`, in Home order. Adding
  a tool = adding its folder and one line here.
- `src/tools/wanted.ts` exports `WANTED_TOOLS: WantedTool[]`. Version 1 lists at
  least: SWOT Builder, STP Planner (segmentation, targeting, positioning),
  Customer Persona Builder, Marketing Mix (4Ps) Planner, Value Proposition
  Mapper, Customer Journey Map, Perceptual Map, PESTEL Scanner, Break-even &
  Pricing Calculator, Customer Lifetime Value Calculator. When a wanted tool is
  built, its entry is removed in the same pull request.

### 3.4 Shared code (`src/shared/`)

Version 1 provides what Five Forces needs and the next tools will reuse:
design tokens and base styles; small UI components (e.g. button, card,
disclosure, status message); and helpers to copy text to the clipboard and to
download a text file. Nothing tool-specific lives here.

## 4. Tools in version 1

| Tool | Folder | Spec |
|---|---|---|
| Five Forces Explorer | `src/tools/five-forces/` | [`src/tools/five-forces/SPEC.md`](src/tools/five-forces/SPEC.md) |

## 5. Architecture

```text
src/
  main.tsx                  entry
  App.tsx                   shell: header, routing, footer
  config.ts                 PRODUCT_NAME, REPO_URL, CONTRIBUTING_URL
  shell/                    Home, router (pure, tested), shell components
  shared/                   tokens, base CSS, UI components, helpers
  tools/
    types.ts                §3.2
    index.ts                TOOLS registry
    wanted.ts               WANTED_TOOLS
    registry.test.ts        §6 registry integrity
    five-forces/            tool #1 (its own SPEC.md)
  test/setup.ts
```

No new runtime dependencies without updating this spec first.

## 6. Quality gates (definition of done)

`npm run check` must pass. It runs `npm run lint` (oxlint, warnings are errors),
`npm run typecheck` (TypeScript, strict), `npm run test` (Vitest), and
`npm run build`. CI runs the same on every push and pull request.

Suite-level tests must include:

- **Registry integrity** — the safety net for pull requests that add tools:
  tool ids are unique, kebab-case, and equal their folder names; every folder
  under `src/tools/` with an `index.ts` is registered in `TOOLS`, and every
  registered tool has a `SPEC.md` and at least one test file (checked with
  `import.meta.glob`); wanted-tool ids are unique and don't clash with
  registered tools.
- **Router:** parsing for every row of §2.2, including unknown ids and trailing
  slashes.
- **Shell:** Home lists every registered tool and every wanted tool; opening a
  tool renders it and sets the title; an unknown route shows Home; the browser
  back button returns to the previous route.

Each tool's spec defines that tool's own required tests.

## 7. Deployment

- GitHub Actions: `ci.yml` runs `npm ci && npm run check` on pushes and pull
  requests; `deploy.yml` publishes `dist/` to GitHub Pages on pushes to `main`
  (Pages source: GitHub Actions). Live at
  https://chickensintrees.github.io/agentic-marketing-toolkit/.
- Vite `base` is `./`, so the build works on any static host and at any path,
  including a fork's own Pages site.
- Node.js 22.12 or newer (required by Vite 8 and Vitest 5).

## 8. Changelog

- **0.3.0** — Visual redesign (monochrome). Home becomes visual first: numbered
  tool entries with a live visual and a "Build next" grid of marks; the design
  tokens and base styles are rewritten (§2.4). Five Forces Explorer moves to a
  single Canvas (its SPEC §2).

- **0.2.0** — Suite. The project becomes the Agentic Marketing Toolkit; Five
  Forces Explorer becomes tool #1 under `src/tools/five-forces/` with its own
  spec; the tool contract, registry, wanted-tools list, and shell are added.
- **0.1.0** — Initial specification (single-tool Five Forces Explorer).
