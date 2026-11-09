import type { IndustryPreset } from '../../types'

// Illustrative teaching example, not verified market research.
const preset: IndustryPreset = {
  id: 'video-streaming',
  profile: {
    name: 'Subscription video streaming',
    scope: 'Subscription video-on-demand services for U.S. households',
    description:
      'Services that charge consumers a recurring fee for on-demand access to a library of series, films, and sometimes live events, delivered over the internet.',
  },
  assessments: {
    rivalry: {
      rating: 4,
      driverIds: [
        'numerous-or-balanced-competitors',
        'high-fixed-low-marginal-costs',
        'commitment-beyond-economics',
      ],
      rationale:
        'Many well-funded services compete for the same households’ subscriptions and viewing time. Content is a large fixed cost while serving one more viewer costs little, which rewards chasing subscribers with heavy content spending and promotions. Some rivals belong to larger companies that may value streaming for strategic reasons beyond its own profits.',
      evidence: 'illustrative',
      source: '',
    },
    newEntrants: {
      rating: 3,
      driverIds: ['low-customer-switching-costs', 'open-distribution-access'],
      rationale:
        'Streaming technology is widely available, and new services can reach viewers through app stores, smart TVs, and the open internet, where subscribers can sign up or cancel in minutes. That makes niche entry relatively easy. Competing at national scale, however, demands a deep content library, heavy marketing, and patience through years of investment, so the threat of a major new rival is lower.',
      evidence: 'illustrative',
      source: '',
    },
    supplierPower: {
      rating: 4,
      driverIds: [
        'differentiated-inputs',
        'no-substitute-inputs',
        'forward-integration-threat',
      ],
      rationale:
        'Hit series, films, and live sports are highly differentiated inputs with no close substitutes. Content owners can credibly integrate forward by launching their own services, and some have pulled licensed content back to do so. Top creative talent also commands strong terms. Services that produce their own content reduce this dependence but take on large fixed costs.',
      evidence: 'illustrative',
      source: '',
    },
    buyerPower: {
      rating: 3,
      driverIds: ['low-buyer-switching-costs', 'buyers-under-cost-pressure'],
      rationale:
        'Each subscriber is a tiny buyer with no individual bargaining power. But monthly plans let households cancel, pause, or rotate between services at almost no cost, and many households keep an eye on their total entertainment spending. Exclusive content and personalized recommendations make some subscribers stickier.',
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
        'Viewers can fill the same time with free ad-supported video, short-form social video, gaming, traditional TV, or simply doing without. Many of these alternatives cost little or nothing and are a tap away. The threat is strongest for casual viewing and weaker for must-see exclusives and live events.',
      evidence: 'illustrative',
      source: '',
    },
  },
}

export default preset
