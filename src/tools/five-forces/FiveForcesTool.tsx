import { useEffect, useRef, useState } from 'react'
import { Button } from '../../shared/components/Button'
import { Underline } from '../../shared/components/Marker'
import type { ToolProps } from '../types'
import { BoardDiagram } from './components/BoardDiagram'
import { BoardNotes } from './components/BoardNotes'
import { ConfirmPrompt } from './components/ConfirmPrompt'
import { ForceNotes } from './components/ForceNotes'
import { IndustryPicker } from './components/IndustryPicker'
import { SummaryBoard } from './components/SummaryBoard'
import { FORCES, FORCE_ORDER } from './data/forces'
import { createBlankAnalysis, createPresetAnalysis, findPreset, hasUserInput, ratedCount } from './lib/analysis'
import { viewFromSubpath } from './lib/navigation'
import { freshState, loadState, saveState, type PersistedState } from './lib/storage'
import type { Analysis, ForceId } from './types'
import './five-forces.css'

type Pending = { kind: 'switch'; presetId: string | null } | { kind: 'start-over' }

/** The `step` field stores the selected force: 0 = none, 1–5 = FORCE_ORDER. SPEC §2.6. */
const forceFromStep = (step: number): ForceId | null => (step >= 1 && step <= FORCE_ORDER.length ? FORCE_ORDER[step - 1] : null)
const stepFromForce = (id: ForceId | null) => (id === null ? 0 : FORCE_ORDER.indexOf(id) + 1)

/** Five Forces Explorer: one board (the sketched diagram) and a Summary. SPEC §2. */
export function FiveForcesTool({ subpath, navigate }: ToolProps) {
  // 'learn' and 'analyze' are kept as aliases of the board.
  const view = viewFromSubpath(subpath) === 'summary' ? 'summary' : 'board'
  const [state, setState] = useState<PersistedState>(() => loadState())
  const [pending, setPending] = useState<Pending | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  // Moving between the board and the Summary moves focus to the view's heading.
  // Not on first render: the shell handles focus when a tool opens.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    document.getElementById(view === 'summary' ? 'view-heading' : 'notes-heading')?.focus()
  }, [view])

  const selected = forceFromStep(state.step)
  const setAnalysis = (analysis: Analysis) => setState((s) => ({ ...s, analysis }))
  const select = (id: ForceId | null) => setState((s) => ({ ...s, step: stepFromForce(s.step === stepFromForce(id) ? null : id) }))

  const load = (presetId: string | null) => {
    const preset = findPreset(presetId)
    setState({ analysis: preset ? createPresetAnalysis(preset) : createBlankAnalysis(), step: 0 })
  }

  const chooseIndustry = (presetId: string | null) => {
    if (presetId === state.analysis.presetId) return
    if (hasUserInput(state.analysis)) setPending({ kind: 'switch', presetId })
    else load(presetId)
  }

  const confirmPending = () => {
    if (!pending) return
    if (pending.kind === 'switch') load(pending.presetId)
    else setState(freshState())
    setPending(null)
  }

  const confirm = pending ? (
    <ConfirmPrompt
      question={
        pending.kind === 'switch'
          ? 'Switch industry? Your ratings, notes and implications for this industry will be replaced.'
          : 'Start over? This clears your whole analysis from this browser.'
      }
      confirmLabel={pending.kind === 'switch' ? 'Switch' : 'Start over'}
      cancelLabel="Keep my work"
      onConfirm={confirmPending}
      onCancel={() => setPending(null)}
    />
  ) : null

  const rated = ratedCount(state.analysis)
  const force = selected ? FORCES.find((f) => f.id === selected)! : null

  return (
    <div className="five-forces">
      <div className="ff-top">
        <h1 className="ff-title">
          Five Forces Explorer
          <Underline seed="ff-title" ink="pressure" width={4} />
        </h1>
        {view === 'board' ? <IndustryPicker value={state.analysis.presetId} onSelect={chooseIndustry} /> : null}
        <nav className="ff-nav no-print" aria-label="Five Forces Explorer">
          {view === 'board' ? (
            <a
              className="ff-nav-link"
              href="#/five-forces/summary"
              onClick={(event) => {
                event.preventDefault()
                navigate('summary')
              }}
            >
              Summary <span aria-hidden="true">→</span>
            </a>
          ) : (
            <a
              className="ff-nav-link"
              href="#/five-forces"
              onClick={(event) => {
                event.preventDefault()
                navigate('')
              }}
            >
              <span aria-hidden="true">←</span> Board
            </a>
          )}
        </nav>
      </div>

      {view === 'board' ? (
        <>
          {confirm}
          <div className="board">
            <div className="board-canvas">
              <BoardDiagram analysis={state.analysis} selected={selected} onSelect={select} />
              <div className="board-foot">
                <p className="board-legend">
                  <svg viewBox="0 0 120 26" aria-hidden="true" focusable="false">
                    <path className="stroke ink-pencil" d="M6 13Q26 12 46 13M46 13L38 8M46 13L38 18" strokeWidth={2.5} />
                    <path className="stroke ink-pressure" d="M64 13Q88 12 112 13M64 15Q88 13 112 12M112 13L98 6M112 13L98 20" strokeWidth={6} />
                  </svg>
                  thicker, red = more pressure
                </p>
                <p className="board-progress" aria-live="polite">
                  {rated} of 5 rated
                </p>
              </div>
            </div>
            <aside className="board-side" aria-labelledby="notes-heading">
              {force ? (
                <ForceNotes key={force.id} analysis={state.analysis} force={force} onChange={setAnalysis} />
              ) : (
                <BoardNotes analysis={state.analysis} onChange={setAnalysis} />
              )}
              <div className="board-actions no-print">
                {force ? (
                  <Button variant="quiet" onClick={() => select(null)}>
                    Close notes
                  </Button>
                ) : null}
                <Button variant="quiet" onClick={() => setPending({ kind: 'start-over' })}>
                  Start over
                </Button>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <SummaryBoard analysis={state.analysis} onChange={setAnalysis} onBackToBoard={() => navigate('')} />
      )}
    </div>
  )
}
