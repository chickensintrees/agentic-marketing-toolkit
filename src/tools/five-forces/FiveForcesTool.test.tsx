// Component tests for the main journeys. See this tool's SPEC.md §5.

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { FiveForcesTool } from './FiveForcesTool'
import { STORAGE_KEY } from './lib/storage'

/** Renders the tool with a working navigate(), as the shell would. */
function Harness({ initial = '' }: { initial?: string }) {
  const [subpath, setSubpath] = useState(initial)
  return <FiveForcesTool subpath={subpath} navigate={setSubpath} />
}

type User = ReturnType<typeof userEvent.setup>

function viewLink(name: string) {
  const nav = screen.getByRole('navigation', { name: 'Five Forces Explorer' })
  return within(nav).getByRole('link', { name })
}

function industry(name: string) {
  return within(screen.getByRole('group', { name: 'Industry' })).getByRole('button', { name })
}

function diagramForce(name: RegExp) {
  return within(screen.getByRole('group', { name: 'Five forces diagram' })).getByRole('button', { name })
}

async function loadAirlines(user: User) {
  await user.click(industry('U.S. passenger airlines'))
}

async function openDisclosure(user: User, name: string) {
  const toggle = screen.getByRole('button', { name })
  if (toggle.getAttribute('aria-expanded') === 'false') await user.click(toggle)
}

describe('Five Forces Explorer', () => {
  it('has one h1 and view navigation that marks the current view', () => {
    render(<Harness />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five Forces Explorer')
    expect(viewLink('Canvas')).toHaveAttribute('aria-current', 'page')
    expect(viewLink('Summary')).not.toHaveAttribute('aria-current')
  })

  it('main journey: load a preset, select a force on the diagram, change its rating, evidence becomes an assumption, Summary reflects it', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await loadAirlines(user)
    expect(industry('U.S. passenger airlines')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { level: 2, name: 'U.S. passenger airlines' })).toBeInTheDocument()
    expect(screen.getByText('5 / 5 rated')).toBeInTheDocument()

    await user.click(diagramForce(/^Buyer power, 4 of 5/))
    expect(diagramForce(/^Buyer power/)).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { level: 2, name: 'Buyer power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '4 High' })).toBeChecked()
    await openDisclosure(user, 'Reasoning and evidence')
    expect(screen.getByRole('radio', { name: 'Illustrative example (not verified)' })).toBeChecked()

    await user.click(screen.getByRole('radio', { name: '2 Low' }))
    expect(screen.getByRole('radio', { name: '2 Low' })).toBeChecked()
    expect(diagramForce(/^Buyer power, 2 of 5/)).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'My judgment / assumption' })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent(/its evidence is now/)
    expect(screen.getByText('Edited')).toBeInTheDocument()
    expect(
      screen.queryByRole('radio', { name: 'Illustrative example (not verified)' }),
    ).not.toBeInTheDocument()

    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 2, name: 'U.S. passenger airlines' })).toBeInTheDocument()
    expect(screen.getByText('4 illustrative')).toBeInTheDocument()
    expect(screen.getByText('1 assumption')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Buyer power 2/ })).toBeInTheDocument()
    await openDisclosure(user, 'Force by force')
    const recap = screen.getByRole('heading', { level: 4, name: 'Buyer power' }).closest('article')!
    expect(within(recap).getByText('2 – Low')).toBeInTheDocument()
    expect(within(recap).getByText('My judgment / assumption')).toBeInTheDocument()
  })

  it('drivers: only the ticked ones by default, the full checklist on request', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    // Rivalry is selected by default; airlines tick 4 of its 9 drivers.
    expect(screen.getAllByRole('checkbox')).toHaveLength(4)
    await user.click(screen.getByRole('button', { name: 'All 9 drivers' }))
    expect(screen.getAllByRole('checkbox')).toHaveLength(9)
    await user.click(screen.getByRole('checkbox', { name: 'Slow industry growth' }))
    expect(screen.getByRole('checkbox', { name: 'Slow industry growth' })).toBeChecked()
    expect(screen.getByText('Edited')).toBeInTheDocument()
  })

  it('custom industry flow, with a confirmation before discarding input', async () => {
    const user = userEvent.setup()
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<Harness />)

    expect(industry('Custom industry')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('0 / 5 rated')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Industry name'), 'Craft breweries')
    await user.type(screen.getByLabelText('Scope'), 'Independent craft breweries in Appalachia')

    // Switching to a preset now asks first; declining keeps the custom work.
    await loadAirlines(user)
    expect(confirm).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Industry name')).toHaveValue('Craft breweries')

    expect(screen.getByRole('heading', { level: 2, name: 'Competitive rivalry' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: '4 High' }))
    await user.click(screen.getByRole('button', { name: 'All 9 drivers' }))
    await user.click(screen.getByRole('checkbox', { name: 'Slow industry growth' }))
    await openDisclosure(user, 'Reasoning and evidence')
    expect(screen.queryByRole('radio', { name: /Illustrative/ })).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Rationale'), 'Many small brewers chase the same taps.')
    await user.click(screen.getByRole('radio', { name: 'Supported by a source' }))
    expect(screen.getByText(/Until you do, this force is reported as/)).toBeInTheDocument()

    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 2, name: 'Craft breweries' })).toBeInTheDocument()
    expect(screen.getByText('1 source missing')).toBeInTheDocument()
    expect(screen.getAllByText('Not rated').length).toBeGreaterThan(0)
    expect(screen.getByText(/Rate all five forces to see an indicative label/)).toBeInTheDocument()
    const strongest = screen.getByRole('heading', { name: 'Strongest force' }).closest('section')!
    expect(within(strongest).getByText('Competitive rivalry')).toBeInTheDocument()
    await openDisclosure(user, 'Force by force')
    const recap = screen.getByRole('heading', { level: 4, name: 'Competitive rivalry' }).closest('article')!
    expect(within(recap).getByText('Slow industry growth')).toBeInTheDocument()
    expect(within(recap).getByText('Assumption (source missing)')).toBeInTheDocument()
  })

  it('compare select overlays a second, dashed series and adds the difference column', async () => {
    const user = userEvent.setup()
    const { container } = render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))

    expect(container.querySelector('[data-series="comparison"]')).toBeNull()
    expect(screen.queryByRole('columnheader', { name: 'Difference' })).not.toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), 'video-streaming')
    expect(container.querySelector('[data-series="comparison"]')).not.toBeNull()
    expect(screen.getByRole('columnheader', { name: 'Difference' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Subscription video streaming' })).toBeInTheDocument()
    const rivalryRow = screen.getByRole('rowheader', { name: 'Competitive rivalry' }).closest('tr')!
    expect(within(rivalryRow).getByText('+1')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Chart legend' })).toHaveTextContent(/dashed outline/)
    expect(screen.getByRole('img', { name: /Compared with Subscription video streaming/ })).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), '')
    expect(container.querySelector('[data-series="comparison"]')).toBeNull()
  })

  it('shows the strongest forces and the indicative structure once all five are rated', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { name: 'Strongest force' })).toBeInTheDocument()
    // 5 + 3 + 4 + 4 + 3 = 19 / 5 = 3.8
    expect(screen.getByText('Challenging structure')).toBeInTheDocument()
    expect(screen.getByText('Mean rating 3.8 of 5')).toBeInTheDocument()
    expect(screen.getByText(/Averages hide what matters/)).toBeInTheDocument()
    expect(
      screen.getByText('Example ratings are illustrative teaching material, not verified market research.'),
    ).toBeInTheDocument()
  })

  it('implications are edited on the Summary', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    const field = screen.getByLabelText('Which force or forces matter most here, and why?')
    await user.type(field, 'Rivalry, because fares are matched quickly.')
    expect(field).toHaveValue('Rivalry, because fares are matched quickly.')
    expect(screen.getByLabelText(/How could a company respond/)).toBeInTheDocument()
  })

  it('subpath navigation: summary shows the Summary, anything else the Canvas', () => {
    const navigate = vi.fn()
    const { rerender } = render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Nothing to summarize yet' })).toBeInTheDocument()

    for (const subpath of ['analyze', 'learn', 'nonsense', '']) {
      rerender(<FiveForcesTool subpath={subpath} navigate={navigate} />)
      expect(screen.getByRole('group', { name: 'Five forces diagram' })).toBeInTheDocument()
      expect(viewLink('Canvas')).toHaveAttribute('aria-current', 'page')
    }
    expect(viewLink('Canvas')).toHaveAttribute('href', '#/five-forces')
    expect(viewLink('Summary')).toHaveAttribute('href', '#/five-forces/summary')
  })

  it('view links and buttons call navigate()', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="" navigate={navigate} />)
    await user.click(viewLink('Summary'))
    expect(navigate).toHaveBeenLastCalledWith('summary')
    await user.click(screen.getByRole('button', { name: /^Summary/ }))
    expect(navigate).toHaveBeenLastCalledWith('summary')
    await user.click(viewLink('Canvas'))
    expect(navigate).toHaveBeenLastCalledWith('')
  })

  it('the diagram works from the keyboard', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    diagramForce(/^Supplier power/).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('heading', { level: 2, name: 'Supplier power' })).toBeInTheDocument()
    diagramForce(/^Threat of substitutes/).focus()
    await user.keyboard(' ')
    expect(screen.getByRole('heading', { level: 2, name: 'Threat of substitutes' })).toBeInTheDocument()
  })

  it('Summary has an empty state that points to the Canvas', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { name: 'Nothing to summarize yet' })).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Go to the canvas/ }))
    expect(navigate).toHaveBeenCalledWith('')
  })

  it('persists the analysis and the selected force across a remount', async () => {
    const user = userEvent.setup()
    const first = render(<Harness />)
    await loadAirlines(user)
    await user.click(diagramForce(/^Supplier power/))
    await user.click(screen.getByRole('radio', { name: '1 Very low' }))
    first.unmount()

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
    render(<Harness />)
    expect(screen.getByRole('heading', { level: 2, name: 'Supplier power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '1 Very low' })).toBeChecked()
    expect(industry('U.S. passenger airlines')).toHaveAttribute('aria-pressed', 'true')
  })

  it('Start over clears the analysis after confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<Harness />)
    await loadAirlines(user)
    await user.click(screen.getByRole('button', { name: 'Start over' }))
    expect(industry('Custom industry')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('0 / 5 rated')).toBeInTheDocument()
  })

  it('copies the Markdown export and reports success', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    await user.click(screen.getByRole('button', { name: 'Copy as Markdown' }))
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('# Five Forces Analysis: U.S. passenger airlines'),
    )
    expect(await screen.findByText('Copied the Markdown to your clipboard.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download .md' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Print' })).toBeInTheDocument()
  })

  it('framework content is on demand: About this force and About the framework', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(diagramForce(/^Threat of new entrants/))
    const about = screen.getByRole('button', { name: 'About this force' })
    expect(about).toHaveAttribute('aria-expanded', 'false')
    await user.click(about)
    expect(about).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Little expected retaliation/)).toBeVisible()
    expect(screen.getByRole('heading', { name: 'The force is high when…' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'About the framework' }))
    expect(screen.getByRole('heading', { name: 'Factors, not forces' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Sources' })).toBeVisible()
  })
})
