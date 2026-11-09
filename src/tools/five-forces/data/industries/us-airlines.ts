import type { IndustryPreset } from '../../types'

// Illustrative teaching example, not verified market research.
const preset: IndustryPreset = {
  id: 'us-airlines',
  profile: {
    name: 'U.S. passenger airlines',
    scope: 'U.S. domestic scheduled passenger air travel',
    description:
      'Airlines selling scheduled passenger flights within the United States. A classic teaching case: an industry that creates enormous value for travelers yet has often struggled to earn attractive returns.',
  },
  assessments: {
    rivalry: {
      rating: 5,
      driverIds: [
        'numerous-or-balanced-competitors',
        'similar-products-low-switching',
        'high-fixed-low-marginal-costs',
        'perishable-product',
      ],
      rationale:
        'Several large carriers of broadly similar strength compete on many of the same routes, and many travelers see a seat as a seat and shop mainly on price. Aircraft, crews, and airport facilities are largely fixed costs, and an empty seat earns nothing once the plane departs, which creates strong pressure to discount. Fare cuts on contested routes tend to be matched quickly, so discounts spread.',
      evidence: 'illustrative',
      source: '',
    },
    newEntrants: {
      rating: 3,
      driverIds: [
        'low-customer-switching-costs',
        'open-distribution-access',
        'modest-capital-requirements',
      ],
      rationale:
        'Travelers switch airlines easily, online booking lets a start-up reach customers directly, and aircraft can be leased rather than bought. But safety certification, limited gates and takeoff-and-landing slots at busy airports, and incumbents’ habit of matching fares on contested routes make entry risky. New carriers do appear, but many find it hard to last.',
      evidence: 'illustrative',
      source: '',
    },
    supplierPower: {
      rating: 4,
      driverIds: [
        'concentrated-suppliers',
        'high-switching-costs',
        'no-substitute-inputs',
      ],
      rationale:
        'Large commercial aircraft and engines come from a small number of manufacturers, and changing aircraft types brings retraining and maintenance costs. Skilled employees such as pilots, often represented by unions, supply labor for which there is no good substitute. Jet fuel also has no practical substitute, so swings in its price flow straight into costs.',
      evidence: 'illustrative',
      source: '',
    },
    buyerPower: {
      rating: 4,
      driverIds: [
        'standardized-products',
        'low-buyer-switching-costs',
        'large-share-of-buyer-costs',
      ],
      rationale:
        'Each traveler is a small buyer, but online fare comparison makes prices transparent and switching between airlines nearly costless. Many travelers see seats on different airlines as largely interchangeable, and leisure travelers are especially price sensitive because a ticket is a noticeable share of a trip budget. Loyalty programs and corporate travel contracts soften this for some frequent flyers.',
      evidence: 'illustrative',
      source: '',
    },
    substitutes: {
      rating: 3,
      driverIds: [
        'attractive-price-performance',
        'low-cost-to-switch-to-substitute',
      ],
      rationale:
        'On shorter trips, driving, and in a few corridors rail or bus, can compete with flying on total door-to-door time and cost. Videoconferencing substitutes for some business travel. For long distances there is often no practical alternative, which keeps this force moderate overall.',
      evidence: 'illustrative',
      source: '',
    },
  },
}

export default preset
