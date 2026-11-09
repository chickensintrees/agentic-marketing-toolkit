import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { ToolProps } from '../types'
import { AnalyzeView } from './components/AnalyzeView'
import { LearnView } from './components/LearnView'
import { SummaryView } from './components/SummaryView'
import { createBlankAnalysis, createPresetAnalysis, findPreset, hasUserInput } from './lib/analysis'
import { VIEWS, viewFromSubpath, type View } from './lib/navigation'
import { freshState, loadState, saveState, type PersistedState } from './lib/storage'
import type { Analysis } from './types'
import './five-forces.css'

const VIEW_HREF = (view: View) => `#/five-forces/${view}`

const CONFIRM_SWITCH =
  'Switch industry? Your ratings, notes, and implications for the current industry will be replaced.'
const CONFIRM_START_OVER =
  'Start over? This clears your whole analysis from this browser and cannot be undone.'

/** Five Forces Explorer: view navigation plus the Learn, Analyze, and Summary views. */
export function FiveForcesTool({ subpath, navigate }: ToolProps) {
  const view = viewFromSubpath(subpath)
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

  const setAnalysis = (analysis: Analysis) => setState((s) => ({ ...s, analysis }))
  const setStep = (step: number) => setState((s) => ({ ...s, step }))

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

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, target: View) => {
    event.preventDefault()
    navigate(target)
  }

  return (
    <div className="five-forces">
      <div className="tool-intro">
        <h1>Five Forces Explorer</h1>
        <p className="tool-purpose">
          Learn Porter’s Five Forces, then use them to analyze a real industry and export
          what you find.
        </p>
      </div>

      <nav className="view-nav" aria-label="Five Forces Explorer">
        <ul>
          {VIEWS.map((item) => (
            <li key={item.id}>
              <a
                href={VIEW_HREF(item.id)}
                aria-current={item.id === view ? 'page' : undefined}
                onClick={(event) => onNavClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {view === 'learn' ? <LearnView onStartAnalysis={() => navigate('analyze')} /> : null}
      {view === 'analyze' ? (
        <AnalyzeView
          analysis={state.analysis}
          step={state.step}
          onStepChange={setStep}
          onChange={setAnalysis}
          onSelectIndustry={selectIndustry}
          onStartOver={startOver}
          onViewSummary={() => navigate('summary')}
        />
      ) : null}
      {view === 'summary' ? (
        <SummaryView analysis={state.analysis} onGoToAnalyze={() => navigate('analyze')} />
      ) : null}
    </div>
  )
}
