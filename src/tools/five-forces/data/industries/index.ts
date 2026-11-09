import type { IndustryPreset } from '../../types'
import coffeeShops from './coffee-shops'
import softDrinks from './soft-drinks'
import usAirlines from './us-airlines'
import videoStreaming from './video-streaming'
import whitewaterRafting from './whitewater-rafting'

// Every preset file in this folder must be registered here. The order of this
// list is the order presets appear in the app. To add an industry, create
// `<id>.ts` next to this file, import it above, and add it below.
export const INDUSTRY_PRESETS: IndustryPreset[] = [
  usAirlines,
  videoStreaming,
  coffeeShops,
  softDrinks,
  whitewaterRafting,
]
