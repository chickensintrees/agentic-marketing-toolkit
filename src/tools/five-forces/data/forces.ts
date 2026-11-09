import type { ForceDefinition, ForceId } from '../types'

// Framework content for the five forces, in the standard order.
//
// Sources:
//   Porter, M. E. (1979). How competitive forces shape strategy.
//     Harvard Business Review, 57(2).
//   Porter, M. E. (2008). The five competitive forces that shape strategy.
//     Harvard Business Review, 86(1).
//
// Rating convention used throughout the app: a higher rating means a STRONGER
// force, i.e. more pressure on industry profitability. Every driver below is
// phrased so that, when it is present, it makes its force stronger. For the
// threat of new entrants this means Porter's barriers to entry appear as
// *missing or weak* barriers (a weak barrier raises the threat).
//
// Driver labels must not contain commas: the Markdown export lists them
// comma-separated.

export const FORCE_ORDER: readonly ForceId[] = [
  'rivalry',
  'newEntrants',
  'supplierPower',
  'buyerPower',
  'substitutes',
]

/** Compact force names for the radar chart and the Analyze step list. */
export const SHORT_NAMES: Record<ForceId, string> = {
  rivalry: 'Rivalry',
  newEntrants: 'New entrants',
  supplierPower: 'Supplier power',
  buyerPower: 'Buyer power',
  substitutes: 'Substitutes',
}

export const FORCES: ForceDefinition[] = [
  {
    id: 'rivalry',
    name: 'Competitive rivalry',
    question: 'How intensely do existing competitors fight, and on what basis?',
    summary:
      'Rivalry among existing competitors takes familiar forms: price discounting, new product launches, advertising campaigns, and service improvements. How much it erodes profits depends on how intensely firms compete and on what basis. The first five drivers below raise the intensity of rivalry; the last four make price competition, the most damaging basis, more likely, because it transfers profits directly to customers.',
    drivers: [
      {
        id: 'numerous-or-balanced-competitors',
        label: 'Numerous or equally balanced competitors',
        description:
          'When many firms, or a few of similar size and power, chase the same customers, no one can set the terms and each is tempted to take share from the others.',
      },
      {
        id: 'slow-industry-growth',
        label: 'Slow industry growth',
        description:
          'When the market is not expanding, a firm can grow only by taking customers from its rivals.',
      },
      {
        id: 'high-exit-barriers',
        label: 'High exit barriers',
        description:
          'Specialized assets or management devotion to the business keep struggling firms in the market, so excess capacity stays and keeps pressure on prices.',
      },
      {
        id: 'commitment-beyond-economics',
        label: 'Rivals committed beyond economic goals',
        description:
          'Rivals that want leadership for its own sake, or that serve a parent company’s wider strategy, may accept low returns and fight harder.',
      },
      {
        id: 'cannot-read-signals',
        label: 'Rivals cannot read each other’s signals',
        description:
          'Firms that are unfamiliar with one another, compete in very different ways, or pursue different goals tend to misjudge each other’s moves, so they collide more often.',
      },
      {
        id: 'similar-products-low-switching',
        label: 'Similar products and low switching costs',
        description:
          'When buyers see little difference between offerings and can switch cheaply, competition drifts toward price, the most damaging form of rivalry.',
      },
      {
        id: 'high-fixed-low-marginal-costs',
        label: 'High fixed costs and low marginal costs',
        description:
          'Firms are tempted to cut prices toward marginal cost to win any extra revenue that helps cover their fixed costs.',
      },
      {
        id: 'large-capacity-increments',
        label: 'Capacity added in large increments',
        description:
          'When capacity comes in big chunks, such as a new plant, each addition can tip the industry into overcapacity and price cutting.',
      },
      {
        id: 'perishable-product',
        label: 'Perishable product or capacity',
        description:
          'When unsold product or capacity loses its value quickly, as with fresh food, airline seats, or hotel rooms, firms discount rather than lose the sale.',
      },
    ],
    highWhen: [
      'Many competitors, or a few of roughly equal size, fight for the same customers.',
      'Industry growth is slow, so one firm’s gain is another’s loss.',
      'Products look alike to buyers and switching is cheap, so competition moves to price.',
      'High fixed costs, perishable inventory, or excess capacity tempt firms to cut prices.',
      'Rivals are unfamiliar with one another or pursue different goals, so they misread each other’s moves.',
    ],
    lowWhen: [
      'A clear leader, or a few players serving different customer segments, sets the tone.',
      'Demand is growing fast enough for firms to expand without taking customers from each other.',
      'Firms compete on features, service, or brand, which can raise customer value and support prices.',
      'Struggling firms can exit easily, so excess capacity leaves the industry.',
    ],
    example:
      'Airlines are a classic case: several similar carriers fly the same routes, costs are mostly fixed, and an empty seat earns nothing once the plane departs, which are ideal conditions for fare wars.',
    misconception:
      '“All competition destroys profits.” Not quite. Price competition is the most damaging. Rivalry on features, service, or brand can make customers better off while still supporting healthy prices, especially when rivals target different customer needs.',
  },
  {
    id: 'newEntrants',
    name: 'Threat of new entrants',
    question: 'How easy is it for new competitors to enter?',
    summary:
      'New entrants bring new capacity and a desire to win share, which puts pressure on prices, costs, and the investment needed to compete. The threat depends on two things: how high the barriers to entry are, and how hard newcomers expect incumbents to fight back. The first seven drivers below are Porter’s seven barriers to entry, each phrased as missing or weak; the last, expected retaliation, is a separate consideration.',
    drivers: [
      {
        id: 'weak-supply-side-scale',
        label: 'Little advantage from supply-side scale',
        description:
          'If incumbents’ larger volumes do not give them meaningfully lower unit costs, an entrant can compete without first reaching a large scale.',
      },
      {
        id: 'weak-network-effects',
        label: 'Weak network effects (demand-side scale)',
        description:
          'If buyers do not value a product more because many others already use it, entrants do not have to overcome the incumbents’ installed base.',
      },
      {
        id: 'low-customer-switching-costs',
        label: 'Low customer switching costs',
        description:
          'If customers can change suppliers without retraining, retooling, or losing data or perks, an entrant can win them over more easily.',
      },
      {
        id: 'modest-capital-requirements',
        label: 'Modest capital requirements',
        description:
          'When starting up takes little investment, especially little unrecoverable spending on things like up-front advertising or R&D, many more firms can afford to try.',
      },
      {
        id: 'few-incumbency-advantages',
        label: 'Few incumbency advantages',
        description:
          'When incumbents lack proprietary technology, preferred access to inputs, the best locations, established brands, or accumulated experience, entrants start on a near-equal footing.',
      },
      {
        id: 'open-distribution-access',
        label: 'Open access to distribution channels',
        description:
          'If an entrant can reach customers without displacing incumbents from limited channels such as retail shelves, for example by selling online, entry is easier.',
      },
      {
        id: 'few-regulatory-hurdles',
        label: 'Few licensing or regulatory hurdles',
        description:
          'When government policy does not restrict entry through licenses, permits, or other rules, more firms can come in.',
      },
      {
        id: 'little-expected-retaliation',
        label: 'Little expected retaliation',
        description:
          'Separate from the barriers: if incumbents have not fought newcomers hard before, lack the cash, spare capacity, or channel clout to respond, or the market is growing fast enough to make room, entrants expect a softer landing.',
      },
    ],
    highWhen: [
      'A newcomer can reach competitive costs without matching incumbents’ scale.',
      'Customers can switch easily and have no strong reason to stay with incumbents.',
      'Little capital, licensing, or specialized know-how is needed to start.',
      'Entrants can reach customers through open channels, including online.',
    ],
    lowWhen: [
      'Incumbents enjoy large economies of scale or strong network effects.',
      'Entry requires heavy, unrecoverable investment or hard-to-get government licenses.',
      'Incumbents control channels, locations, proprietary technology, or trusted brands.',
      'Incumbents are known to retaliate hard against newcomers, for example with price cuts or marketing blitzes.',
    ],
    example:
      'A would-be carmaker must build factories, supplier relationships, and a trusted brand before it can sell at scale, so the threat of entry is low. A food truck, by contrast, needs relatively little capital, so new competitors appear all the time.',
    misconception:
      '“Few companies have entered recently, so the threat is low.” Not necessarily. It is the threat of entry, not whether entry actually happens, that holds down profitability: incumbents may be keeping prices low precisely to discourage newcomers.',
  },
  {
    id: 'supplierPower',
    name: 'Supplier power',
    question: 'How much leverage do suppliers have over the industry?',
    summary:
      'Powerful suppliers, including suppliers of labor, capture more of the value for themselves by charging higher prices, limiting quality or services, or shifting costs to industry participants. An industry that cannot pass those costs on in its own prices sees its profits squeezed.',
    drivers: [
      {
        id: 'concentrated-suppliers',
        label: 'Suppliers more concentrated than the industry',
        description:
          'When a few suppliers sell to many fragmented industry players, the suppliers can dictate prices, quality, and terms.',
      },
      {
        id: 'industry-not-key-customer',
        label: 'Industry is not an important customer to suppliers',
        description:
          'Suppliers that earn most of their revenue from other industries have little reason to protect this one with reasonable prices.',
      },
      {
        id: 'high-switching-costs',
        label: 'High costs to switch suppliers',
        description:
          'When changing suppliers means retraining staff, retooling, or requalifying inputs, industry players are locked in and suppliers gain leverage.',
      },
      {
        id: 'differentiated-inputs',
        label: 'Differentiated supplier inputs',
        description:
          'Unique or highly valued inputs, such as a patented ingredient or specialized expertise, cannot easily be bought elsewhere.',
      },
      {
        id: 'no-substitute-inputs',
        label: 'No substitute for the supplier’s input',
        description:
          'If there is no other way to meet the need the input serves, industry players must accept the supplier’s terms.',
      },
      {
        id: 'forward-integration-threat',
        label: 'Credible threat of forward integration',
        description:
          'If suppliers could enter the industry themselves, industry players must keep them satisfied rather than squeeze them.',
      },
    ],
    highWhen: [
      'A few suppliers sell to many fragmented industry players.',
      'The industry is a small part of its suppliers’ business.',
      'Inputs are unique or differentiated, with no good substitutes.',
      'Changing suppliers is costly or disruptive.',
    ],
    lowWhen: [
      'Inputs are commodities available from many sources.',
      'The industry is a major customer that suppliers depend on.',
      'Firms can switch suppliers easily or make the input themselves.',
    ],
    example:
      'Personal-computer makers have long relied on a very small number of suppliers for operating systems and processors. With few alternatives and real switching costs, those suppliers have captured a large share of the value in the industry.',
    misconception:
      '“Supplier power is just about the price of raw materials.” It is broader. Suppliers include providers of labor, components, technology, and services, and they can exert power through quality, service, and terms as well as price.',
  },
  {
    id: 'buyerPower',
    name: 'Buyer power',
    question: 'How much leverage do customers have over the industry?',
    summary:
      'Powerful customers capture more of the value by forcing prices down, demanding better quality or more service (which drives costs up), and playing industry participants off against each other. Buyers are powerful when they have negotiating leverage (the first four drivers below) and when they are price sensitive (the last four).',
    drivers: [
      {
        id: 'few-or-large-buyers',
        label: 'Few buyers or large-volume purchases',
        description:
          'Buyers that purchase large volumes relative to a single seller’s size can demand concessions, especially when sellers have high fixed costs and need the volume.',
      },
      {
        id: 'standardized-products',
        label: 'Standardized or undifferentiated products',
        description:
          'If buyers can find an equivalent product from many sellers, they can play the sellers against each other.',
      },
      {
        id: 'low-buyer-switching-costs',
        label: 'Low buyer switching costs',
        description:
          'When changing vendors is easy, buyers can credibly threaten to take their business elsewhere.',
      },
      {
        id: 'backward-integration-threat',
        label: 'Credible threat of backward integration',
        description:
          'Buyers that could make the product themselves, as retailers do with store brands, can use that threat to push prices down.',
      },
      {
        id: 'large-share-of-buyer-costs',
        label: 'Purchase is a large share of buyers’ costs or budgets',
        description:
          'Buyers shop harder and bargain more over purchases that make a big dent in their costs or household budgets.',
      },
      {
        id: 'buyers-under-cost-pressure',
        label: 'Buyers earn low profits or face tight budgets',
        description:
          'Buyers that are squeezed for cash or margins look hard for savings on everything they purchase.',
      },
      {
        id: 'little-effect-on-buyer-quality',
        label: 'Product has little effect on buyers’ own quality',
        description:
          'If the product barely affects the quality of what the buyer makes, or for consumers how well things turn out, buyers focus on price.',
      },
      {
        id: 'little-effect-on-buyer-other-costs',
        label: 'Product has little effect on buyers’ other costs',
        description:
          'A product that pays for itself by cutting the buyer’s labor, material, or other costs is judged on value; one that saves the buyer nothing elsewhere is judged on price.',
      },
    ],
    highWhen: [
      'A few buyers purchase large volumes relative to the size of any one seller.',
      'Products are standardized, so buyers can play sellers off against each other.',
      'Buyers can switch cheaply, or could credibly make the product themselves.',
      'The purchase is a big share of buyers’ costs or budgets, making them price sensitive.',
    ],
    lowWhen: [
      'Buyers are many, small, and fragmented.',
      'The product is differentiated, or switching is costly.',
      'The product strongly affects the quality or results of what buyers make or experience.',
      'Buyers are profitable and care more about quality than price.',
    ],
    example:
      'Large retail chains buy enormous volumes from consumer-goods makers and control scarce shelf space, so they can push for lower prices, promotional support, and favorable terms. Many also sell store brands, which strengthens their hand further.',
    misconception:
      '“Buyers means end consumers.” Buyers also include business customers and channels such as distributors and retailers, which can be far more powerful than the individual consumers at the end of the chain.',
  },
  {
    id: 'substitutes',
    name: 'Threat of substitutes',
    question: 'How easily can buyers meet the same need another way?',
    summary:
      'A substitute performs the same or a similar function by a different means, such as videoconferencing instead of business travel. When substitutes are attractive, they put a ceiling on the prices an industry can charge.',
    drivers: [
      {
        id: 'attractive-price-performance',
        label: 'Attractive price–performance trade-off',
        description:
          'A substitute that delivers similar value for less money, or more value for similar money, caps what the industry can charge.',
      },
      {
        id: 'low-cost-to-switch-to-substitute',
        label: 'Low cost for buyers to switch to the substitute',
        description:
          'If moving to the substitute requires no new equipment, skills, or habits, buyers can defect quickly.',
      },
      {
        id: 'improving-substitutes',
        label: 'Substitutes improving quickly',
        description:
          'Advances in other industries can turn a weak substitute into a strong one, so changes that look unrelated deserve attention.',
      },
      {
        id: 'do-without-or-diy',
        label: 'Easy to do without or do it yourself',
        description:
          'Buyers can also substitute by going without, buying used, or bringing the task in-house.',
      },
    ],
    highWhen: [
      'An alternative offers similar benefits for less money, or better results for similar money.',
      'Buyers can switch to the alternative quickly and cheaply.',
      'Technology or changes in other industries are making substitutes steadily better.',
      'Doing without, buying used, or doing it yourself is a realistic option.',
    ],
    lowWhen: [
      'No alternative meets the need nearly as well.',
      'Switching to a substitute requires new skills, equipment, or habits.',
      'The industry keeps improving its own price–performance relative to the alternatives.',
    ],
    example:
      'Videoconferencing is a substitute for some business air travel: it meets the need to meet by a different means, and every improvement in it puts a ceiling on what travelers will pay to fly.',
    misconception:
      '“Substitutes are competitors’ similar products.” Those are rivals. A substitute meets the same need in a different way, and substitutes are easy to overlook precisely because they can look very different from the industry’s product.',
  },
]

/** Look up a force definition by id. */
export function getForce(id: ForceId): ForceDefinition {
  const force = FORCES.find((f) => f.id === id)
  if (!force) throw new Error(`Unknown force: ${id}`)
  return force
}

/** A short explanation of one framework factor that is not a force. */
export interface FrameworkFactor {
  name: string
  explanation: string
}

// "Factors, not forces" (Porter 2008): these shape profitability only through
// their effect on the five forces.
export const FACTORS_NOT_FORCES: FrameworkFactor[] = [
  {
    name: 'Industry growth rate',
    explanation:
      'Fast growth does not guarantee profits. Growth can soften rivalry, but it can also attract entrants or hand power to suppliers.',
  },
  {
    name: 'Technology and innovation',
    explanation:
      'Advanced technology does not make an industry attractive by itself. A mundane industry with high entry barriers and price-insensitive buyers can be far more profitable than a glamorous one.',
  },
  {
    name: 'Government',
    explanation:
      'Not a sixth force, because government involvement is neither inherently good nor bad for profitability. Ask how specific policies, such as licensing, subsidies, or regulation, change each force.',
  },
  {
    name: 'Complementary products and services',
    explanation:
      'Complements, like software for computers, raise the value of an industry’s product. They matter through their effect on the forces, for example by raising switching costs or barriers to entry.',
  },
]

/** A citation, split so the journal can be set in italics. */
export interface Source {
  authorYear: string
  title: string
  journal: string
  volume: string
  issue: string
}

export const SOURCES: Source[] = [
  {
    authorYear: 'Porter, M. E. (1979).',
    title: 'How competitive forces shape strategy.',
    journal: 'Harvard Business Review',
    volume: '57',
    issue: '2',
  },
  {
    authorYear: 'Porter, M. E. (2008).',
    title: 'The five competitive forces that shape strategy.',
    journal: 'Harvard Business Review',
    volume: '86',
    issue: '1',
  },
]
