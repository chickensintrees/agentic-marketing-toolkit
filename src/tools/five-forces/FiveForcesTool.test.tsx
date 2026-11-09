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

function stepButton(name: RegExp) {
  const steps = screen.getByRole('navigation', { name: 'Analysis steps' })
  return within(steps).getByRole('button', { name })
}

function viewLink(name: string) {
  const nav = screen.getByRole('navigation', { name: 'Five Forces Explorer' })
  return within(nav).getByRole('link', { name })
}

async function loadAirlines(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText('Industry'), 'us-airlines')
}

describe('Five Forces Explorer', () => {
  it('has one h1 and view navigation that marks the current view', () => {
    render(<Harness initial="analyze" />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five Forces Explorer')
    expect(viewLink('Analyze')).toHaveAttribute('aria-current', 'page')
    expect(viewLink('Learn')).not.toHaveAttribute('aria-current')
  })

  it('main journey: load a preset, change a rating, evidence becomes an assumption, Summary reflects it', async () => {
    const user = userEvent.setup()
    render(<Harness initial="analyze" />)

    await loadAirlines(user)
    expect(screen.getByLabelText('Industry name')).toHaveValue('U.S. passenger airlines')
    expect(screen.getByText(/5 of 5/)).toBeInTheDocument()

    await user.click(stepButton(/Buyer power/))
    expect(screen.getByRole('heading', { level: 3, name: 'Buyer power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '4 High' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Illustrative example (not verified)' })).toBeChecked()

    await user.click(screen.getByRole('radio', { name: '2 Low' }))
    expect(screen.getByRole('radio', { name: '2 Low' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'My judgment / assumption' })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent(/its evidence is now/)
    expect(
      screen.queryByRole('radio', { name: 'Illustrative example (not verified)' }),
    ).not.toBeInTheDocument()

    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument()
    expect(screen.getByText('4 illustrative')).toBeInTheDocument()
    expect(screen.getByText('1 assumption')).toBeInTheDocument()
    const recap = screen.getByRole('heading', { level: 4, name: 'Buyer power' }).closest('article')!
    expect(within(recap).getByText('2 – Low')).toBeInTheDocument()
    expect(within(recap).getByText('My judgment / assumption')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Buyer power 2/ })).toBeInTheDocument()
  })

  it('custom industry flow, with a confirmation before discarding input', async () => {
    const user = userEvent.setup()
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<Harness initial="analyze" />)

    expect(screen.getByLabelText('Industry')).toHaveValue('custom')
    await user.type(screen.getByLabelText('Industry name'), 'Craft breweries')
    await user.type(screen.getByLabelText('Scope'), 'Independent craft breweries in Appalachia')

    // Switching to a preset now asks first; declining keeps the custom work.
    await loadAirlines(user)
    expect(confirm).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Industry name')).toHaveValue('Craft breweries')

    await user.click(screen.getByRole('button', { name: /Next: Rivalry/ }))
    expect(screen.getByRole('heading', { level: 3, name: 'Competitive rivalry' })).toBeInTheDocument()
    expect(screen.queryByRole('radio', { name: /Illustrative/ })).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: '4 High' }))
    await user.click(screen.getByRole('checkbox', { name: 'Slow industry growth' }))
    await user.type(screen.getByLabelText('Rationale'), 'Many small brewers chase the same taps.')
    await user.click(screen.getByRole('radio', { name: 'Supported by a source' }))
    expect(screen.getByText(/Until you do, this force is reported as/)).toBeInTheDocument()

    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 3, name: 'Craft breweries' })).toBeInTheDocument()
    expect(screen.getByText('1 source missing')).toBeInTheDocument()
    expect(screen.getByText(/Not rated yet/)).toBeInTheDocument()
    expect(screen.getByText(/Rate all five forces to see an indicative label/)).toBeInTheDocument()
    const strongest = screen.getByRole('heading', { name: 'Strongest force' }).closest('section')!
    expect(within(strongest).getByText('Competitive rivalry')).toBeInTheDocument()
    const recap = screen.getByRole('heading', { level: 4, name: 'Competitive rivalry' }).closest('article')!
    expect(within(recap).getByText('Slow industry growth')).toBeInTheDocument()
    expect(within(recap).getByText('Assumption (source missing)')).toBeInTheDocument()
  })

  it('compare select overlays a second, dashed series and adds the difference column', async () => {
    const user = userEvent.setup()
    const { container } = render(<Harness initial="analyze" />)
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
    expect(screen.getByRole('list', { name: 'Chart legend' })).toHaveTextContent(/dashed line/)
    expect(screen.getByRole('img', { name: /Compared with Subscription video streaming/ })).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), '')
    expect(container.querySelector('[data-series="comparison"]')).toBeNull()
  })

  it('shows the strongest forces and the indicative structure once all five are rated', async () => {
    const user = userEvent.setup()
    render(<Harness initial="analyze" />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { name: 'Strongest force' })).toBeInTheDocument()
    // 5 + 3 + 4 + 4 + 3 = 19 / 5 = 3.8
    expect(screen.getByText('Challenging structure')).toBeInTheDocument()
    expect(screen.getByText('Mean rating 3.8 of 5')).toBeInTheDocument()
    expect(
      screen.getByText('Example ratings are illustrative teaching material, not verified market research.'),
    ).toBeInTheDocument()
  })

  it('subpath navigation: each subpath shows its view, unknown subpaths show Learn', () => {
    const navigate = vi.fn()
    const { rerender } = render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument()

    rerender(<FiveForcesTool subpath="analyze" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Analyze an industry' })).toBeInTheDocument()

    rerender(<FiveForcesTool subpath="nonsense" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Learn the framework' })).toBeInTheDocument()

    rerender(<FiveForcesTool subpath="" navigate={navigate} />)
    expect(viewLink('Learn')).toHaveAttribute('aria-current', 'page')
    expect(viewLink('Summary')).toHaveAttribute('href', '#/five-forces/summary')
  })

  it('view links and calls to action call navigate()', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="" navigate={navigate} />)
    await user.click(viewLink('Summary'))
    expect(navigate).toHaveBeenLastCalledWith('summary')
    await user.click(screen.getByRole('button', { name: /Analyze an industry/ }))
    expect(navigate).toHaveBeenLastCalledWith('analyze')
  })

  it('Summary has an empty state that points to Analyze', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { name: 'Nothing to summarize yet' })).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Go to Analyze/ }))
    expect(navigate).toHaveBeenCalledWith('analyze')
  })

  it('persists the analysis and the current step across a remount', async () => {
    const user = userEvent.setup()
    const first = render(<Harness initial="analyze" />)
    await loadAirlines(user)
    await user.click(stepButton(/Supplier power/))
    await user.click(screen.getByRole('radio', { name: '1 Very low' }))
    first.unmount()

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
    render(<Harness initial="analyze" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Supplier power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '1 Very low' })).toBeChecked()
    await user.click(stepButton(/Industry/))
    expect(screen.getByLabelText('Industry')).toHaveValue('us-airlines')
  })

  it('Start over clears the analysis after confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<Harness initial="analyze" />)
    await loadAirlines(user)
    await user.click(screen.getByRole('button', { name: 'Start over' }))
    expect(screen.getByLabelText('Industry')).toHaveValue('custom')
    expect(screen.getByText(/0 of 5/)).toBeInTheDocument()
  })

  it('copies the Markdown export and reports success', async () => {
    const user = userEvent.setup()
    render(<Harness initial="analyze" />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    await user.click(screen.getByRole('button', { name: 'Copy as Markdown' }))
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('# Five Forces Analysis: U.S. passenger airlines'),
    )
    expect(await screen.findByText('Copied the Markdown to your clipboard.')).toBeInTheDocument()
  })

  it('Learn: a force card expands to its full detail', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const toggle = screen.getByRole('button', { name: /Threat of new entrants/ })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Little expected retaliation/)).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Factors, not forces' })).toBeInTheDocument()
  })
})
