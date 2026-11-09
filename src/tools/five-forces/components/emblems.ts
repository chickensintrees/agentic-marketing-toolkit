// Line-engraved emblems for the example industries (SPEC §2.2), drawn on a
// 48-unit grid in the current ink colour. Unknown ids get the blank-plate
// emblem used for a custom industry. Static, trusted markup only.

const PAPER = 'var(--color-bg)'

const EMBLEMS: Record<string, string> = {
  'coffee-shops': `
    <path d="M18 9c-2 3 2 4 0 7M24 7c-2 3 2 4 0 8M30 9c-2 3 2 4 0 7" fill="none" stroke-width="1"/>
    <path d="M11 20h25v7a12.5 12.5 0 0 1-25 0z" fill="${PAPER}"/>
    <path d="M12.5 24h22M12.8 27h21.4M13.5 30h20M14.8 33h17.4M17 36h13" stroke-width=".6"/>
    <path d="M36 23.5a5 5 0 0 1 0 10" fill="none"/>
    <path d="M6 43h36M10 45.5h28" fill="none"/>`,
  'us-airlines': `
    <path d="M24 4c1.8 0 2.8 2.6 2.8 5.5v9l15 8.5v3.2l-15-4.2v9l5 4v2.6l-7.8-2.2-7.8 2.2v-2.6l5-4v-9l-15 4.2V27l15-8.5v-9C21.2 6.6 22.2 4 24 4z" fill="${PAPER}"/>
    <path d="M27 21l12 6.8M27 23.6l9 5M21 21l-12 6.8M21 23.6l-9 5" stroke-width=".6" fill="none"/>
    <path d="M24 8v28" stroke-width=".6"/>`,
  'soft-drinks': `
    <path d="M20.5 4h7v6c0 3 4.5 5.5 4.5 11v19c0 2-1.2 3.5-3.5 3.5h-9c-2.3 0-3.5-1.5-3.5-3.5V21c0-5.5 4.5-8 4.5-11z" fill="${PAPER}"/>
    <path d="M16 24h16M16 33h16" fill="none"/>
    <path d="M16.5 26.5h15M16.5 28.5h15M16.5 30.5h15" stroke-width=".6"/>
    <circle cx="21" cy="38" r=".9"/><circle cx="26" cy="36.5" r="1.2"/><circle cx="23.5" cy="40.5" r=".7"/>
    <path d="M19.5 4h9" stroke-width="2"/>`,
  'video-streaming': `
    <rect x="5" y="9" width="38" height="25" fill="${PAPER}"/>
    <path d="M7.5 11.5h33v20h-33z" stroke-width=".6" fill="none"/>
    <path d="M20 16.5v10l9-5z"/>
    <path d="M24 34v5M15 41.5h18" fill="none"/>`,
  'whitewater-rafting': `
    <path d="M7 28c4 4 30 4 34 0l-2.5 5.5c-3 2.5-26 2.5-29 0z" fill="${PAPER}"/>
    <path d="M10 31h28" stroke-width=".6"/>
    <circle cx="17" cy="20" r="2.4" fill="${PAPER}"/><circle cx="29" cy="20" r="2.4" fill="${PAPER}"/>
    <path d="M17 22.5v5.5M29 22.5v5.5M13 15l9 20M33 15l-8 19" fill="none"/>
    <path d="M3 38c4-3 6 3 10 0s6 3 10 0 6 3 10 0 6 3 10 0M6 43c4-3 6 3 10 0s6 3 10 0 6 3 10 0" fill="none" stroke-width=".9"/>`,
  custom: `
    <rect x="9" y="8" width="30" height="34" fill="${PAPER}"/>
    <rect x="12" y="11" width="24" height="28" fill="none" stroke-width=".6"/>
    <path d="M16 31l14-14 3 3-14 14-4 1z" fill="${PAPER}"/>
    <path d="M28 19l3 3" fill="none" stroke-width=".6"/>`,
}

/** The emblem's SVG markup for a preset id (null → custom). */
export function emblemMarkup(id: string | null): string {
  return EMBLEMS[id ?? 'custom'] ?? EMBLEMS.custom
}

