// Tools the class could build next, listed on Home under "Help build the
// next tool". See SPEC.md §3.3. When you build one of these, remove its
// entry here in the same pull request that adds the tool to TOOLS.

import type { WantedTool } from './types'

export const WANTED_TOOLS: WantedTool[] = [
  {
    id: 'swot-builder',
    name: 'SWOT Builder',
    pitch:
      'List a company’s strengths, weaknesses, opportunities, and threats, then turn them into strategic options.',
  },
  {
    id: 'stp-planner',
    name: 'STP Planner',
    pitch:
      'Segment a market, decide which segments to target, and write a positioning statement for them.',
  },
  {
    id: 'persona-builder',
    name: 'Customer Persona Builder',
    pitch:
      'Turn customer research into a persona with goals, pain points, and buying triggers a team can design for.',
  },
  {
    id: 'marketing-mix-planner',
    name: 'Marketing Mix (4Ps) Planner',
    pitch:
      'Plan product, price, place, and promotion for an offer, and check that the four support each other.',
  },
  {
    id: 'value-proposition-mapper',
    name: 'Value Proposition Mapper',
    pitch:
      'Match customer jobs, pains, and gains against what an offer provides, and see where the fit is weak.',
  },
  {
    id: 'customer-journey-map',
    name: 'Customer Journey Map',
    pitch:
      'Lay out each stage from awareness to loyalty, with touchpoints, feelings, and the moments worth fixing.',
  },
  {
    id: 'perceptual-map',
    name: 'Perceptual Map',
    pitch:
      'Plot brands on two attributes customers care about to spot crowded positions and open gaps.',
  },
  {
    id: 'pestel-scanner',
    name: 'PESTEL Scanner',
    pitch:
      'Scan political, economic, social, technological, environmental, and legal trends and judge which ones matter.',
  },
  {
    id: 'break-even-pricing',
    name: 'Break-even & Pricing Calculator',
    pitch:
      'Find the sales volume needed to break even at a given price, and see how profit changes as price moves.',
  },
  {
    id: 'customer-lifetime-value',
    name: 'Customer Lifetime Value Calculator',
    pitch:
      'Estimate what a customer is worth over time from margin and retention, and compare it with the cost to acquire one.',
  },
]
