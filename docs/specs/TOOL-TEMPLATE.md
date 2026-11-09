# <Tool Name> — Tool Specification

<!--
TOOL SPEC TEMPLATE. Copy this file to src/tools/<tool-id>/SPEC.md and replace
every <placeholder>. The links below are written for that location.
The worked example is src/tools/five-forces/SPEC.md: read it alongside this.
Write requirements that can be checked with a yes or a no. Keep the first
version small: the smallest tool that would help a student in class.
Delete these comments when you're done.
-->

> A tool in the [Agentic Marketing Toolkit](../../../SPEC.md). **This file is
> the single source of truth for this tool**; the suite spec (`/SPEC.md`)
> governs everything shared: the shell, routing, the tool contract,
> accessibility and design rules (suite §2.4), quality gates, and deployment.
> Changes flow through this spec before they flow into code. See
> [AGENTS.md](../../../AGENTS.md) for the workflow.
>
> Tool id: `<tool-id>` · Folder: `src/tools/<tool-id>/` · Routes:
> `#/<tool-id>` (default view)<, `#/<tool-id>/<view>` for each other view>.

## 1. What this is

<Tool Name> teaches **<framework>** by having the user <do what, with what
input, to get what result>.

<!-- Name the framework's original sources: author(s), title, year, publisher
or journal. Only cite sources you have checked. -->

**Sources:** <Author, A. (Year). *Title*. Publisher or Journal.>

### Who it is for

| User | Needs |
|---|---|
| **Student learning the framework** | <what they need to understand> |
| **Student applying it** | <what they do, and what they take away: an export, a chart, a decision> |
| **Instructor / presenter** | A reliable demo with credible examples and no setup, accounts, or API keys. |
| **Student contributor** | A small, well-organized folder where improvements are contained changes that automated checks can verify. |

### Non-goals (version 1)

The suite's non-goals apply (suite spec §1): no backend, accounts, tracking,
AI or paid APIs, and no chart, router or CSS libraries. Example content is
illustrative teaching material, not market research.

<Add this tool's own non-goals: what it deliberately does not do yet.>

## 2. Product requirements

### 2.1 Layout and navigation

- Rendered inside the suite shell (suite spec §2), which provides the header and footer. The tool shows its `h1` ("<Tool Name>"), a one-line purpose, and <its own view navigation, if it has more than one view>.
- Views, in order: <**View A**, **View B**, …>. Navigation works with keyboard alone and calls `navigate('<view>')`.
- The view comes from the `subpath` prop (suite spec §2.2): `''` → <default view>; <`'<view>'` → that view>; any other subpath → <default view>.
- <Where the disclaimer appears, if the tool shows example data: *"Example content is illustrative teaching material, not verified market research."*>

### 2.2 <View A>

<What the user sees and does, as a numbered list or a table. Include empty
states, validation, and what happens on each button.>

### 2.3 <View B>

<Repeat a subsection per view.>

### 2.4 Export (if any)

<What can be copied or downloaded, and the exact format. A Markdown export
like Five Forces Explorer's (its spec §2.5) works well for hand-ins.>

### 2.5 Persistence (if any)

- Saved to `localStorage` under the key `agentic-marketing-toolkit:<tool-id>:v1` on every change.
- Loading tolerates missing, unavailable (throws), or corrupted storage and validates the stored shape; anything invalid falls back to a fresh state without crashing.
- <A "Start over" action, with confirmation, if the tool saves work.>

### 2.6 Accessibility and design

Suite spec §2.4 applies in full: semantic landmarks, one `h1`, labels on every
control, keyboard operable, visible focus, contrast of at least 4.5:1, nothing
carried by color alone, `prefers-reduced-motion` respected, 320 px to desktop
with no horizontal scrolling. The tool uses the shared design tokens and
components in `src/shared/`.

<Anything specific: for example, every chart has `role="img"`, an
`aria-label`, and a visible data table with the same numbers.>

## 3. Data

### 3.1 Types (`src/tools/<tool-id>/types.ts`)

```ts
// <The tool's types: what the user enters, what is calculated, what is
// saved. Keep them small.>
export interface <Thing> {
  id: string
  // ...
}
```

### 3.2 Content (`src/tools/<tool-id>/data/`)

<Any framework content or illustrative examples: what they contain, how many
there are, and the rules they follow (cautious language, no statistics or
named-company claims). If students will add examples, use one file per example
plus an index, as Five Forces Explorer's industry presets do.>

## 4. Architecture (inside `src/tools/<tool-id>/`)

```text
SPEC.md                  this file
index.ts                 exports `tool: ToolDefinition` (suite spec §3.2)
<Name>Tool.tsx           the tool's root component: view nav + views
types.ts                 types from §3.1
data/                    content from §3.2
lib/                     pure, unit-tested logic (no React)
  <logic>.ts             <what it does>
components/              React components, one per file
```

Rules: business logic lives in `lib/` as pure functions with unit tests;
components stay thin; shared UI and helpers come from `src/shared/`; nothing
is imported from another tool.

## 5. Required tests

The suite quality gates apply (suite spec §6), including registry integrity.
This tool's tests must include:

- **Logic** (`lib/*.test.ts`): <each calculation or rule, including edge cases and boundaries>.
- **Data integrity** (`data/*.test.ts`, if the tool has content): <unique ids, required fields, valid references>.
- **Components:** <the main journey, step by step; subpath navigation; persistence across a remount, if any>.

## 6. Changelog

- **0.1.0** — Initial specification.
