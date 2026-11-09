# Monochrome: rationale

**Idea:** The Porter diagram becomes a black-and-white geometric sign: rivalry is a central mass, and each outer force moves closer, grows larger and presses on a heavier line as it gets stronger.

- **Typography:** Archivo, set wide (wdth 110–125, weight 800+), for display words and huge numerals. IBM Plex Mono, uppercase and tracked, for labels, data and controls, as on a wayfinding sign. No Inter.
- **Palette:** paper `#f6f6f4`, ink `#111111`, mute `#5c5c59`, rule `#d4d4cf`, ring `#b3b3ac`. The single accent, burnt orange `#a8460f` (`#f0a46b` in dark mode, taken from the lecture deck), only marks a rating the student has changed from the preset, and it always comes with the word "Edited". Dark mode inverts the palette.
- **Encoding:** a filled disc for rivalry, squares for the two bargaining powers (suppliers and buyers), and inward-pointing triangles for the two threats (entrants and substitutes). Rating 1–5 sets three things at once: distance on five dotted rings (closer means stronger), shape size, and the stroke weight of the pressure line. Every shape also prints its number, so color carries no meaning.
- **Industry marks:** each industry's mark is its own force signature, drawn small from its five ratings. Airlines and coffee shops look different because their structures differ.
- **Next tools:** each gets a geometric mark drawn in code (a 2×2 grid for SWOT, a target for STP, crossing lines for break-even, and so on) in a hairline grid. No cards and no shadows.
- **Motion:** changing industry slides the shapes along their axes over 0.75 s. The home figure cycles through the five presets. Both are off under `prefers-reduced-motion`.
- **Why it isn't SaaS:** no rounded cards, shadows, gradients, pills, blue buttons or marketing copy. Buttons are hard rectangles, there is a strict 12-column grid, the type is the decoration, and explanations appear only on request ("Why this rating?", "All 9 drivers").
- **One canvas:** pick an industry in the strip, tap a shape, rate it with five squares, toggle drivers, then go to Summary for Copy Markdown (the spec §2.5 format).
- **Images:** none needed. All visuals are inline SVG generated from the real presets in `data/industries/`.
