// A geometric mark for each wanted tool on Home ("Build next"). A wanted tool
// without its own mark gets the generic open square.

const MARKS: Record<string, string> = {
  'swot-builder':
    '<rect x="6" y="6" width="24" height="24" class="f"/><rect x="34" y="6" width="24" height="24"/><rect x="6" y="34" width="24" height="24"/><rect x="34" y="34" width="24" height="24"/>',
  'stp-planner': '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="15"/><circle cx="32" cy="32" r="6" class="f"/>',
  'persona-builder': '<circle cx="32" cy="20" r="12" class="f"/><path d="M8 60 V50 a24 16 0 0 1 48 0 V60"/>',
  'marketing-mix-planner':
    '<rect x="6" y="6" width="22" height="22" class="f"/><rect x="36" y="6" width="22" height="22"/><rect x="6" y="36" width="22" height="22"/><rect x="36" y="36" width="22" height="22" class="f"/>',
  'value-proposition-mapper': '<rect x="4" y="16" width="30" height="30"/><circle cx="44" cy="31" r="16" class="f"/>',
  'customer-journey-map':
    '<polyline points="4,44 18,22 32,38 46,14 60,30"/><circle cx="18" cy="22" r="4" class="f"/><circle cx="46" cy="14" r="4" class="f"/><circle cx="32" cy="38" r="4" class="f"/>',
  'perceptual-map':
    '<line x1="32" y1="4" x2="32" y2="60"/><line x1="4" y1="32" x2="60" y2="32"/><circle cx="18" cy="16" r="5" class="f"/><circle cx="46" cy="22" r="5" class="f"/><circle cx="40" cy="48" r="5" class="f"/>',
  'pestel-scanner':
    '<rect x="4" y="34" width="6" height="26" class="f"/><rect x="14" y="20" width="6" height="40" class="f"/><rect x="24" y="40" width="6" height="20" class="f"/><rect x="34" y="10" width="6" height="50" class="f"/><rect x="44" y="28" width="6" height="32" class="f"/><rect x="54" y="44" width="6" height="16" class="f"/>',
  'break-even-pricing': '<line x1="4" y1="40" x2="60" y2="22"/><line x1="4" y1="60" x2="60" y2="4"/><circle cx="31" cy="31" r="5" class="f"/>',
  'customer-lifetime-value':
    '<path d="M4 58 H60"/><rect x="8" y="46" width="8" height="12" class="f"/><rect x="20" y="38" width="8" height="20" class="f"/><rect x="32" y="28" width="8" height="30" class="f"/><rect x="44" y="14" width="8" height="44" class="f"/>',
}

const GENERIC = '<rect x="8" y="8" width="48" height="48"/>'

export function WantedMark({ id }: { id: string }) {
  return (
    <svg
      className="wanted-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      // Static, trusted markup defined above.
      dangerouslySetInnerHTML={{ __html: MARKS[id] ?? GENERIC }}
    />
  )
}
