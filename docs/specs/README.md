# Specs and proposals

In this project, **the spec is the single source of truth**. Changes flow
through a spec before they flow into code, and when spec and code disagree,
the spec wins.

## Where specs live

| File | What it describes | Changes when |
|---|---|---|
| [`SPEC.md`](../../SPEC.md) | The suite: shell, Home, routing, the tool contract, the registry, shared code, quality gates, deployment | Something shared by every tool changes |
| `src/tools/<tool-id>/SPEC.md` | One tool: its views, data, export, architecture and required tests. Example: [`five-forces`](../../src/tools/five-forces/SPEC.md) | That tool's behavior changes |
| `docs/specs/<short-name>.md` (this folder) | A **proposal**: a change someone wants, before it is agreed | Someone has an idea |

The two specs describe what the app does **today**. A proposal describes what
it **should** do after a change.

## Templates

- [`TEMPLATE.md`](TEMPLATE.md): a feature proposal. Copy it to `docs/specs/<short-name>.md`.
- [`TOOL-TEMPLATE.md`](TOOL-TEMPLATE.md): the skeleton of a **new tool's** spec. Copy it to `src/tools/<tool-id>/SPEC.md`. See [build a tool](../students/build-a-tool.md).

## How a proposal moves

1. **Draft.** Copy `TEMPLATE.md`, use a kebab-case name (`radar-svg-download.md`), and fill in every section. Your agent's skill for this is `propose-feature`.
2. **Discuss.** Open a pull request with just the proposal (title "Proposal: <idea>"), or link it from an issue. Bill and classmates comment.
3. **Agree.** Revise until it's approved. Set **Status** to `Accepted`.
4. **Build.** In the implementation PR, edit the relevant `SPEC.md` (including its changelog) and the code together, so they never drift apart.
5. **Keep it.** Leave the proposal here as the record of why the change was made. Set **Status** to `Implemented` and link the PR.

Not everything needs a proposal. A typo, a bug where the code breaks the spec,
or a new industry preset (already covered by the Five Forces spec §3.3) can go
straight to a pull request.

**Status values:** `Draft` · `Accepted` · `Implemented` · `Declined` (with the reason, which is useful too).
