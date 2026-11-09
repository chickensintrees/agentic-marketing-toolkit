import { INDUSTRY_PRESETS } from '../data/industries'
import { Emblem } from './Emblem'

interface IndustryPickerProps {
  presetId: string | null
  onSelect: (presetId: string | null) => void
}

/** One engraved emblem per preset plus Custom (SPEC §2.2). */
export function IndustryPicker({ presetId, onSelect }: IndustryPickerProps) {
  const options = [
    ...INDUSTRY_PRESETS.map((p) => ({ id: p.id as string | null, name: p.profile.name })),
    { id: null, name: 'Custom industry' },
  ]
  return (
    <div className="picker" role="group" aria-label="Industry">
      {options.map((option) => (
        <button
          key={option.id ?? 'custom'}
          type="button"
          className="picker-option"
          aria-pressed={option.id === presetId}
          aria-label={option.name}
          title={option.name}
          onClick={() => onSelect(option.id)}
        >
          <Emblem id={option.id} />
        </button>
      ))}
    </div>
  )
}
