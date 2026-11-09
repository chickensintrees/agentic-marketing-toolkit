// Tool #1 of the Agentic Marketing Toolkit. The shell finds it through the
// registry in src/tools/index.ts. See SPEC.md §3 and this folder's SPEC.md.

import type { ToolDefinition } from '../types'
import { FiveForcesTool } from './FiveForcesTool'

export const tool: ToolDefinition = {
  id: 'five-forces',
  name: 'Five Forces Explorer',
  framework: 'Porter’s Five Forces',
  tagline:
    'Learn what drives each of the five forces, rate them for a real industry, and export a summary you can discuss.',
  Component: FiveForcesTool,
}
