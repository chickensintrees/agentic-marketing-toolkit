import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { ToolProps } from '../types'
import { AboutFramework } from './components/AboutFramework'
import { ConfirmBar } from './components/ConfirmBar'
import { ForcePanel } from './components/ForcePanel'
import { ImplicationsPanel } from './components/ImplicationsPanel'
import { IndustryPicker } from './components/IndustryPicker'
import { KeyPanel } from './components/KeyPanel'
import { Plate } from './components/Plate'
import { ProfilePanel } from './components/ProfilePanel'
import { SummaryView } from './components/SummaryView'
import { FORCES } from './data/forces'
import { createBlankAnalysis, createPresetAnalysis, findPreset, hasUserInput, ratedCount } from './lib/analysis'
import { industryTitle } from './lib/markdown'
import { panelToStep, plateLabel, plateViewFromSubpath, stepToPanel, type Panel, type PlateView } from './lib/plate'
import { freshState, loadState, saveState, type PersistedState } from './lib/storage'
import type { Analysis, ForceId } from './types'
import './five-forces.css'

const VIEWS: { id: PlateView; label: string; subpath: string }[] = [
  { id: 'plate', label: 'Plate', subpath: '' },
  { id: 'summary', label: 'Summary', subpath: 'summary' },
]

type Pending = { kind: 'switch'; presetId: string | null; name: string } | { kind: 'start-over' } | null

/** True on phone-width screens, where the plate switches to its portrait layout. */
function useNarrow(): boolean {
  const query = '(max-width: 600px)'
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false)
  const [narrow, setNarrow] = useState(get)
  useEffect(() => {
    if (!window.matchMedia) return
    const list = window.matchMedia(query)
    const update = () => setNarrow(list.matches)
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [])
  return narrow
}

/** Five Forces Explorer: one plate to pick, see, select and rate, plus the Summary. SPEC §2. */
export function FiveForcesTool({ subpath, navigate }: ToolProps) {
  const view = plateViewFromSubpath(subpath)
  const [state, setState] = useState<PersistedState>(() => loadState())
  const [profileOpen, setProfileOpen] = useState(false)
  const [pending, setPending] = useState<Pending>(null)
  const narrow = useNarrow()

  useEffect(() => {
    saveState(state)
  }, [state])

  const { analysis } = state
  const panel: Panel = profileOpen ? { kind: 'profile' } : stepToPanel(state.step)
  const panelKey = panel.kind === 'force' ? panel.forceId : panel.kind

  // Moving between views or panels moves focus to the new heading. Not on
  // first render: the shell handles focus when a tool opens.
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    const target =
      view === 'summary'
        ? document.getElementById('view-heading')
        : document.querySelector<HTMLElement>('.plate-panel h2')
    target?.focus()
  }, [view, panelKey])

  const setAnalysis = (next: Analysis) => setState((s) => ({ ...s, analysis: next }))
  const openPanel = (next: Panel) => {
    setProfileOpen(next.kind === 'profile')
    setState((s) => ({ ...s, step: panelToStep(next) }))
  }
  const selectForce = (forceId: ForceId) => {
    const same = panel.kind === 'force' && panel.forceId === forceId
    openPanel(same ? { kind: 'key' } : { kind: 'force', forceId })
  }

  const loadIndustry = (presetId: string | null) => {
    const preset = findPreset(presetId)
    setState((s) => ({ ...s, analysis: preset ? createPresetAnalysis(preset) : createBlankAnalysis() }))
    setProfileOpen(preset === undefined)
  }
  const selectIndustry = (presetId: string | null) => {
    if (presetId === analysis.presetId) return
    if (hasUserInput(analysis)) {
      const name = findPreset(presetId)?.profile.name ?? 'a custom industry'
      setPending({ kind: 'switch', presetId, name })
      return
    }
    loadIndustry(presetId)
  }
  const confirmPending = () => {
    if (pending?.kind === 'switch') loadIndustry(pending.presetId)
    if (pending?.kind === 'start-over') {
      setState(freshState())
      setProfileOpen(false)
    }
    setPending(null)
  }

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    navigate(target)
  }

  const title = industryTitle(analysis)
  const rated = ratedCount(analysis)
  const selected = panel.kind === 'force' ? panel.forceId : null
  const selectedForce = selected ? FORCES.find((f) => f.id === selected) : undefined

  return (
    <div className="five-forces">
      <div className="plate-head">
        <h1 id="view-heading" tabIndex={-1}>
          <span className="h1-kicker">Five Forces Explorer{view === 'summary' ? ' · Summary' : ''}</span>
          <span className="h1-industry">{title}</span>
        </h1>
        <div className="plate-head-tools no-print">
          <nav className="view-nav" aria-label="Five Forces Explorer">
            <ul>
              {VIEWS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#/five-forces${item.subpath ? `/${item.subpath}` : ''}`}
                    aria-current={item.id === view ? 'page' : undefined}
                    onClick={(event) => onNavClick(event, item.subpath)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <IndustryPicker presetId={analysis.presetId} onSelect={selectIndustry} />
        </div>
      </div>

      {pending ? (
        <ConfirmBar
          message={
            pending.kind === 'switch'
              ? `Replace your edits with ${pending.name}?`
              : 'Start over? This clears your analysis from this browser.'
          }
          confirmLabel={pending.kind === 'switch' ? 'Replace' : 'Clear'}
          onConfirm={confirmPending}
          onCancel={() => setPending(null)}
        />
      ) : null}

      {view === 'plate' ? (
        <div className="stage">
          <figure className="plate-figure">
            <Plate
              analysis={analysis}
              selected={selected}
              onSelect={selectForce}
              narrow={narrow}
              label={plateLabel(title, analysis)}
            />
            <figcaption>
              <span className="sc">Fig. 1.</span> <i>Line weight shows pressure on profit.</i>{' '}
              <span className="progress">
                {rated} of 5 rated
              </span>
            </figcaption>
            <div className="plate-actions no-print">
              <button type="button" className="button button-quiet" onClick={() => openPanel({ kind: 'profile' })}>
                Edit profile
              </button>
              <button type="button" className="button button-quiet" onClick={() => openPanel({ kind: 'implications' })}>
                Implications
              </button>
              <button type="button" className="button button-quiet" onClick={() => setPending({ kind: 'start-over' })}>
                Start over
              </button>
            </div>
            <AboutFramework />
          </figure>

          <div className="plate-panel">
            {panel.kind === 'force' && selectedForce ? (
              <ForcePanel key={selectedForce.id} analysis={analysis} force={selectedForce} onChange={setAnalysis} />
            ) : null}
            {panel.kind === 'profile' ? (
              <ProfilePanel analysis={analysis} onChange={setAnalysis} onDone={() => openPanel({ kind: 'key' })} />
            ) : null}
            {panel.kind === 'implications' ? (
              <ImplicationsPanel analysis={analysis} onChange={setAnalysis} onViewSummary={() => navigate('summary')} />
            ) : null}
            {panel.kind === 'key' ? <KeyPanel hasIndustry={analysis.presetId !== null || analysis.profile.name !== ''} /> : null}
            {panel.kind !== 'implications' ? (
              <p className="panel-next">
                <a href="#/five-forces/summary" onClick={(event) => onNavClick(event, 'summary')}>
                  Read the summary
                </a>
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <SummaryView analysis={analysis} narrow={narrow} onGoToPlate={() => navigate('')} />
      )}
    </div>
  )
}
