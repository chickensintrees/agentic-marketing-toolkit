// The tool contract. See SPEC.md §3.2.

import type { ComponentType } from 'react'

export interface ToolProps {
  /** Hash path after `#/<tool-id>/`, '' for the tool's default view. */
  subpath: string
  /** Navigate within this tool; navigate('summary') → #/<tool-id>/summary. */
  navigate: (subpath: string) => void
}

export interface ToolDefinition {
  id: string // kebab-case, equals the folder name
  name: string // "Five Forces Explorer"
  framework?: string // "Porter's Five Forces"
  tagline: string // one line for the Home card
  Component: ComponentType<ToolProps>
}

export interface WantedTool {
  id: string // kebab-case; must not clash with a registered tool
  name: string // "SWOT Builder"
  pitch: string // one line: what it would help a student do
}
