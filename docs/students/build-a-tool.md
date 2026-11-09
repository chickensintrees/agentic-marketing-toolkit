# Build a new tool

The Agentic Marketing Toolkit grows one tool at a time, and every tool after
Five Forces Explorer is meant to come from students. You don't need to be a
programmer. You need a framework you understand, a clear idea of who it helps,
and a coding agent connected to GitHub ([start here](START-HERE.md)).

A tool is **one folder**, `src/tools/<tool-id>/`, with its own spec. It is built
**spec first**, in two pull requests: first the spec, then the code. Your agent
has a skill for this, `add-tool`. Ask it to "use the add-tool skill".

## 1. Pick a tool, or propose your own

**From the wanted list.** These appear on the app's Home page under "Plates in
preparation" and are listed in `src/tools/wanted.ts`:

| Tool | Folder name (`<tool-id>`) |
|---|---|
| SWOT Builder | `swot-builder` |
| STP Planner (segmentation, targeting, positioning) | `stp-planner` |
| Customer Persona Builder | `persona-builder` |
| Marketing Mix (4Ps) Planner | `marketing-mix-planner` |
| Value Proposition Mapper | `value-proposition-mapper` |
| Customer Journey Map | `customer-journey-map` |
| Perceptual Map | `perceptual-map` |
| PESTEL Scanner | `pestel-scanner` |
| Break-even & Pricing Calculator | `break-even-pricing` |
| Customer Lifetime Value Calculator | `customer-lifetime-value` |

Each has a ready-made issue in [first issues](first-issues.md). Check the
[open issues](https://github.com/chickensintrees/agentic-marketing-toolkit/issues)
first: if someone has claimed it, offer to help in a comment instead.

**Your own idea.** Open a
[New tool issue](https://github.com/chickensintrees/agentic-marketing-toolkit/issues/new?template=new-tool.yml):
what it teaches, who it helps, and the smallest useful version. Wait for a
reply from Bill before you start, so two people don't build the same thing.

## 2. Write the spec (pull request 1)

The spec is the plan the code will follow, and the source of truth afterwards.
Ask your agent to:

1. Copy [`docs/specs/TOOL-TEMPLATE.md`](../specs/TOOL-TEMPLATE.md) to `src/tools/<tool-id>/SPEC.md`.
2. Interview you, one question at a time: which framework, which sources, who uses it, what they do in each view, what they take away, and what the smallest version is.
3. Fill in every section. Requirements and tests should be checkable with a yes or a no.
4. Open a pull request titled "Spec: <Tool name>" with only that one file.

Things every tool spec respects (from the suite [SPEC.md](../../SPEC.md)):

- **Non-goals:** no backend, accounts, tracking, AI or paid APIs, and no chart, router or CSS libraries.
- **Accessibility:** keyboard operable, labels on every control, readable contrast, no meaning carried by color alone.
- **Illustrative data:** example content is teaching material, not market research; no precise statistics or claims about named companies.
- **Faithful to the source:** name the framework's original authors and articles or books.

Bill and classmates comment on the spec PR. Revise it until it's approved.
Five Forces Explorer's spec, [`src/tools/five-forces/SPEC.md`](../../src/tools/five-forces/SPEC.md),
is the worked example.

## 3. Build it (pull request 2)

Once the spec is approved, your agent builds the tool in the folder, following
the spec. A tool folder looks like this:

```text
src/tools/<tool-id>/
  SPEC.md          your spec
  index.ts         describes the tool to the suite (name, tagline, component)
  <Name>Tool.tsx   the tool's main screen
  lib/             the logic, as small functions, each with tests
  components/      the pieces of the screen
  data/            any illustrative example content
```

The rules that keep many tools working together:

- Your tool **never imports from another tool's folder**. Shared pieces come from `src/shared/`.
- It uses the shared colors and components, so every tool looks like part of one product.
- It has at least one test file. Logic lives in `lib/` with tests next to it.

## 4. Register it

Three small edits, in the same pull request as the code:

1. **`src/tools/index.ts`:** add one import and add your tool to the end of `TOOLS`. It then appears on Home and at `#/<tool-id>`.
2. **`src/tools/wanted.ts`:** remove your tool's entry from `WANTED_TOOLS`.
3. **`SPEC.md` §4:** add a row for your tool to the tools table.

Add only your own lines. Other students are editing the same lists, and adding
one line keeps merges simple.

## 5. Check it

```bash
npm run check
```

This runs lint, type checks, every test and the build. It includes the
**registry test** (`src/tools/registry.test.ts`), which fails with a clear
message if your folder isn't registered, has no `SPEC.md` or test file, or is
still on the wanted list. Then open the tool with `npm run dev` and try every
view with only the keyboard.

Your agent then opens the pull request (skill `verify-and-open-pr`). Include a
screenshot of each view. The same checks run again on GitHub, and Bill reviews.

## After it merges

Your tool goes live on the class site the next time `main` deploys. Keep
improving it with small pull requests: each behavior change goes into your
tool's `SPEC.md` first.
