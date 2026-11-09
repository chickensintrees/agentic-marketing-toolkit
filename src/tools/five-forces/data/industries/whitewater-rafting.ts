import type { IndustryPreset } from '../../types'

// Illustrative teaching example, not verified market research.
// A nod to West Virginia's New River Gorge. Claims are deliberately general.
const preset: IndustryPreset = {
  id: 'whitewater-rafting',
  profile: {
    name: 'Commercial whitewater rafting',
    scope:
      'Guided whitewater rafting trips sold by commercial outfitters in one regional river destination, such as the New River Gorge area of West Virginia',
    description:
      'Licensed outfitters selling guided rafting trips, often bundled with lodging, food, and other outdoor activities. Demand is seasonal and depends on weather and water levels.',
  },
  assessments: {
    rivalry: {
      rating: 3,
      driverIds: [
        'numerous-or-balanced-competitors',
        'high-fixed-low-marginal-costs',
        'perishable-product',
      ],
      rationale:
        'Several outfitters typically run trips on the same stretches of river and compete for the same visitors. Facilities, equipment, and insurance are largely fixed costs, and an empty seat on today’s trip cannot be sold tomorrow, which encourages discounting in slower periods. Outfitters soften price competition by differentiating on safety record, guide quality, and packages that bundle lodging, food, and other activities.',
      evidence: 'illustrative',
      source: '',
    },
    newEntrants: {
      rating: 2,
      driverIds: ['low-customer-switching-costs', 'modest-capital-requirements'],
      rationale:
        'Visitors have no switching costs and often book whichever outfitter they find first online, and rafts, gear, and vans require less capital than many businesses. But commercial outfitters generally need state licenses or permits for river access, which may be limited in number, and must meet safety, insurance, and guide-training requirements. Established outfitters also own well-located facilities and reputations for safety.',
      evidence: 'illustrative',
      source: '',
    },
    supplierPower: {
      rating: 3,
      driverIds: ['differentiated-inputs', 'no-substitute-inputs'],
      rationale:
        'Experienced, trained guides are the most critical input: they shape both safety and the customer experience, and outfitters compete to hire and keep them each season. There is no substitute for a skilled guide on a difficult rapid. Rafts, safety gear, and vehicles are available from multiple suppliers, which keeps overall supplier power moderate.',
      evidence: 'illustrative',
      source: '',
    },
    buyerPower: {
      rating: 3,
      driverIds: [
        'low-buyer-switching-costs',
        'large-share-of-buyer-costs',
        'few-or-large-buyers',
      ],
      rationale:
        'Most customers are individuals and families who can compare outfitters online and switch freely, and for a family a guided trip can be a meaningful share of the vacation budget. Groups such as schools, clubs, and companies book larger volumes and can negotiate discounts. Concern for safety and a memorable experience makes many buyers less focused on price alone.',
      evidence: 'illustrative',
      source: '',
    },
    substitutes: {
      rating: 4,
      driverIds: [
        'attractive-price-performance',
        'low-cost-to-switch-to-substitute',
        'do-without-or-diy',
      ],
      rationale:
        'Visitors can fill a day with many other outdoor activities, such as hiking, mountain biking, climbing, zip lines, or fishing, or choose a different vacation altogether, often for less money. Experienced paddlers can run rivers on their own instead of paying for a guided trip. Seasonality, weather, and water levels can also push customers toward alternatives on any given day.',
      evidence: 'illustrative',
      source: '',
    },
  },
}

export default preset
