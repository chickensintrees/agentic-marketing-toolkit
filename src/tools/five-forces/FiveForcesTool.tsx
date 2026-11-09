import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { ToolProps } from '../types'
import { CanvasView } from './components/CanvasView'
import { SummaryView } from './components/SummaryView'
import { createBlankAnalysis, createPresetAnalysis, findPreset, hasUserInput } from './lib/analysis'
import { freshState, loadState, saveState, type PersistedState } from './lib/storage'
import { canvasViewFromSubpath, forceFromStep, stepForForce, subpathForView, type CanvasView as View } from './lib/views'
import type { Analysis, ForceId } from './types'
import './five-forces.css'

const VIEW_LINKS: readonly { id: View; label: string }[] = [
  { id: 'canvas', label: 'Canvas' },
  { id: 'summary', label: 'Summary' },
]

const viewHref = (view: View) => {
  const sub = subpathForView(view)
  return sub ? `#/five-forces/${sub}` : '#/five-forces'
}

const CONFIRM_SWITCH =
  'Switch industry? Your ratings, notes, and implications for the current industry will be replaced.'
const CONFIRM_START_OVER =
  'Start over? This clears your whole analysis from this browser and cannot be undone.'

/** Five Forces Explorer: the Canvas and the Summary. See SPEC §2. */
export function FiveForcesTool({ subpath, navigate }: ToolProps) {
  const view = canvasViewFromSubpath(subpath)
  const [state, setState] = useState<PersistedState>(() => loadState())

  // Save on every change (SPEC §2.6). saveState never throws.
  useEffect(() => {
    saveState(state)
  }, [state])

  // When the view changes inside the tool, move focus to the new view's
  // heading. Not on first render: the shell handles focus when a tool opens.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    document.getElementById('view-heading')?.focus()
  }, [view])

  const selected: ForceId = forceFromStep(state.step) ?? 'rivalry'
  const setAnalysis = (analysis: Analysis) => setState((s) => ({ ...s, analysis }))
  const selectForce = (forceId: ForceId) => setState((s) => ({ ...s, step: stepForForce(forceId) }))

  const selectIndustry = (presetId: string | null) => {
    if (presetId === state.analysis.presetId) return
    if (hasUserInput(state.analysis) && !window.confirm(CONFIRM_SWITCH)) return
    const preset = findPreset(presetId)
    setAnalysis(preset ? createPresetAnalysis(preset) : createBlankAnalysis())
  }

  const startOver = () => {
    if (!window.confirm(CONFIRM_START_OVER)) return
    setState(freshState())
  }

  const go = (target: View) => navigate(subpathForView(target))
  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, target: View) => {
    event.preventDefault()
    go(target)
  }

  return (
    <div className="five-forces">
      <div className="tool-bar">
        <h1 className="tool-title">Five Forces Explorer</h1>
        <nav className="view-nav no-print" aria-label="Five Forces Explorer">
          <ul>
            {VIEW_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={viewHref(item.id)}
                  aria-current={item.id === view ? 'page' : undefined}
                  onClick={(event) => onNavClick(event, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {view === 'canvas' ? (
        <CanvasView
          analysis={state.analysis}
          selected={selected}
          onSelectForce={selectForce}
          onChange={setAnalysis}
          onSelectIndustry={selectIndustry}
          onStartOver={startOver}
          onViewSummary={() => go('summary')}
        />
      ) : (
        <SummaryView analysis={state.analysis} onChange={setAnalysis} onGoToCanvas={() => go('canvas')} />
      )}
    </div>
  )
}
