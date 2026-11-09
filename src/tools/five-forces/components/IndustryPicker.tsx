import { useId } from 'react'
import { Circled } from '../../../shared/components/Marker'
import { INDUSTRY_PRESETS } from '../data/industries'
import { IndustryDoodle } from './IndustryDoodle'

/** Short labels for the picker. A preset not listed here shows its full name. */
const SHORT_LABELS: Record<string, string> = {
  'us-airlines': 'Airlines',
  'coffee-shops': 'Coffee shops',
  'video-streaming': 'Streaming',
  'soft-drinks': 'Soft drinks',
  'whitewater-rafting': 'Rafting',
}

interface IndustryPickerProps {
  /** The current preset id, or null for a custom industry. */
  value: string | null
  onSelect: (presetId: string | null) => void
}

/** One doodle per preset, plus Custom, as a radio group. SPEC §2.2. */
export function IndustryPicker({ value, onSelect }: IndustryPickerProps) {
  const name = useId()
  const options = [
    ...INDUSTRY_PRESETS.map((preset) => ({
      id: preset.id as string | null,
      label: SHORT_LABELS[preset.id] ?? preset.profile.name,
      full: preset.profile.name,
    })),
    { id: null, label: 'Custom', full: 'Custom industry' },
  ]
  return (
    <fieldset className="picker">
      <legend className="visually-hidden">Industry</legend>
      <div className="picker-row">
        {options.map((option) => {
          const checked = option.id === value
          return (
            <label key={option.id ?? 'custom'} className={checked ? 'picker-option is-checked' : 'picker-option'}>
              <input
                className="visually-hidden"
                type="radio"
                name={name}
                value={option.id ?? 'custom'}
                checked={checked}
                aria-label={option.full}
                onChange={() => onSelect(option.id)}
              />
              <IndustryDoodle presetId={option.id} name={option.full} ink={checked ? 'ink' : 'pencil'} />
              <span className="picker-label" aria-hidden="true">
                {option.label}
              </span>
              {checked ? <Circled seed={`pick-${option.id ?? 'custom'}`} /> : null}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
