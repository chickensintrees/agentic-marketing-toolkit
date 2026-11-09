import type { IndustryPreset } from '../../types'

// Illustrative teaching example, not verified market research.
const preset: IndustryPreset = {
  id: 'soft-drinks',
  profile: {
    name: 'Carbonated soft drinks',
    scope:
      'Branded carbonated soft drinks sold in the United States (brand owners and their bottlers)',
    description:
      'Companies that develop and market branded carbonated soft drinks, sold through grocery and convenience stores, restaurants, and vending.',
  },
  assessments: {
    rivalry: {
      rating: 3,
      driverIds: ['numerous-or-balanced-competitors', 'slow-industry-growth'],
      rationale:
        'The category is led by a few large, well-matched brand owners in a mature market, so growth often comes at a rival’s expense. Competition centers on advertising, new flavors and packaging, and promotions with retailers. Strong brands let rivals compete mainly on marketing rather than on price alone, which keeps rivalry from fully eroding profits.',
      evidence: 'illustrative',
      source: '',
    },
    newEntrants: {
      rating: 2,
      driverIds: ['low-customer-switching-costs', 'few-regulatory-hurdles'],
      rationale:
        'Small brands can launch using contract bottlers and sell online or through specialty stores, little licensing is needed to start, and shoppers readily try new flavors. But building a national brand takes years of heavy advertising, and established players’ relationships with bottlers, retailers, restaurants, and vending operators give them privileged access to shelf space and fountains. The threat of entry at national scale is low.',
      evidence: 'illustrative',
      source: '',
    },
    supplierPower: {
      rating: 2,
      driverIds: ['concentrated-suppliers', 'high-switching-costs'],
      rationale:
        'Most ingredients, such as sweeteners, carbon dioxide, and water, are commodities available from multiple sources. Packaging such as cans comes from a smaller number of large suppliers, and changing suppliers or formats can require changes to bottling lines, so packaging costs can bite. Overall, large brand owners and bottlers are important customers with real leverage, which keeps supplier power low.',
      evidence: 'illustrative',
      source: '',
    },
    buyerPower: {
      rating: 3,
      driverIds: [
        'few-or-large-buyers',
        'buyers-under-cost-pressure',
        'backward-integration-threat',
      ],
      rationale:
        'Large grocery chains, mass merchants, and restaurant chains buy in very large volumes and control shelf space and fountain contracts. Grocery retailing typically runs on thin margins, and retailers can offer their own store brands, which strengthens their hand. Strong consumer loyalty to leading brands limits this power, because retailers need those brands on their shelves.',
      evidence: 'illustrative',
      source: '',
    },
    substitutes: {
      rating: 4,
      driverIds: [
        'attractive-price-performance',
        'low-cost-to-switch-to-substitute',
        'improving-substitutes',
      ],
      rationale:
        'Consumers can easily choose water, sparkling water, juice, sports and energy drinks, coffee, or tea instead. Concern about sugar has nudged some consumers toward these alternatives, and new flavored and functional drinks keep arriving. Large soft-drink companies often sell substitutes too, which cushions them but not the carbonated soft-drink category itself.',
      evidence: 'illustrative',
      source: '',
    },
  },
}

export default preset
