// The tool registry. See SPEC.md §3.3.
//
// Every tool is one folder under src/tools/ with an index.ts that exports
// `tool`. To add a tool: create its folder, then add one import and one line
// to TOOLS below. The order of TOOLS is the order of the cards on Home.
// src/tools/registry.test.ts fails if a tool folder is not registered here.

import { tool as fiveForces } from './five-forces'
import type { ToolDefinition } from './types'

export const TOOLS: ToolDefinition[] = [fiveForces]

/** Look up a registered tool by id. */
export function findTool(id: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.id === id)
}
