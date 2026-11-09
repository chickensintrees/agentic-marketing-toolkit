import { INDUSTRY_PRESETS } from '../data/industries'
import { presetRatings, type Ratings } from '../lib/diagram'
import { ForceDiagram } from './ForceDiagram'

const BLANK: Ratings = {
  rivalry: null,
  newEntrants: null,
  supplierPower: null,
  buyerPower: null,
  substitutes: null,
}

interface IndustryStripProps {
  presetId: string | null
  onSelect: (presetId: string | null) => void
}

/** One button per preset, each with a mark drawn from its own ratings, plus Custom. SPEC §2.3. */
export function IndustryStrip({ presetId, onSelect }: IndustryStripProps) {
  return (
    <div className="industry-strip" role="group" aria-label="Industry">
      {INDUSTRY_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className="industry-option"
          aria-pressed={presetId === preset.id}
          onClick={() => onSelect(preset.id)}
        >
          <ForceDiagram ratings={presetRatings(preset)} mini className="industry-mark" />
          <span className="industry-option-name">{preset.profile.name}</span>
        </button>
      ))}
      <button
        type="button"
        className="industry-option"
        aria-pressed={presetId === null}
        onClick={() => onSelect(null)}
      >
        <ForceDiagram ratings={BLANK} mini className="industry-mark" />
        <span className="industry-option-name">Custom industry</span>
      </button>
    </div>
  )
}
