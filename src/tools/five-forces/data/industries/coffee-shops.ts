import type { IndustryPreset } from '../../types'

// Illustrative teaching example, not verified market research.
const preset: IndustryPreset = {
  id: 'coffee-shops',
  profile: {
    name: 'Coffee shops',
    scope: 'Independent and chain coffee shops in one mid-sized U.S. city',
    description:
      'Cafés selling espresso drinks, brewed coffee, and light food to walk-in and take-out customers, from national chains to single-location independents.',
  },
  assessments: {
    rivalry: {
      rating: 4,
      driverIds: [
        'numerous-or-balanced-competitors',
        'high-fixed-low-marginal-costs',
        'perishable-product',
      ],
      rationale:
        'Most cities have many cafés within a short walk or drive, from national chains to independents, plus fast-food restaurants and convenience stores that also sell coffee. Rent and staffing are largely fixed costs, and pastries and brewed coffee do not keep, so slow hours are costly. Shops compete on location, atmosphere, quality, and speed, which keeps rivalry from being only about price.',
      evidence: 'illustrative',
      source: '',
    },
    newEntrants: {
      rating: 4,
      driverIds: [
        'modest-capital-requirements',
        'low-customer-switching-costs',
        'weak-supply-side-scale',
      ],
      rationale:
        'Opening a single café takes a lease, equipment, and permits, but far less capital than most industries, and customers happily try a new place. Chains enjoy some purchasing and brand advantages, yet a small shop can still run at competitive costs. The best locations are a real incumbency advantage, but new cafés open regularly.',
      evidence: 'illustrative',
      source: '',
    },
    supplierPower: {
      rating: 2,
      driverIds: ['differentiated-inputs', 'no-substitute-inputs'],
      rationale:
        'Coffee beans, milk, cups, and equipment are available from many suppliers, so most inputs give cafés plenty of choice. Specialty roasters offer more differentiated beans, and a landlord who controls a high-traffic storefront is supplying a location with no close substitute. Staffing can also become a pressure point when local labor markets are tight.',
      evidence: 'illustrative',
      source: '',
    },
    buyerPower: {
      rating: 3,
      driverIds: ['low-buyer-switching-costs', 'buyers-under-cost-pressure'],
      rationale:
        'Individual customers buy in small amounts and have no bargaining leverage, but they can walk to the café next door at no cost. A daily coffee habit adds up, so some customers trade down when budgets tighten. Convenience, habit, and loyalty programs soften buyer power.',
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
        'Brewing at home or at the office, including with single-serve pods, delivers coffee for a fraction of café prices with almost no switching cost. Energy drinks and tea meet a similar need for a pick-me-up. Cafés defend themselves by selling an experience, such as a place to meet or work, speed, and customization, that home brewing does not replicate.',
      evidence: 'illustrative',
      source: '',
    },
  },
}

export default preset
