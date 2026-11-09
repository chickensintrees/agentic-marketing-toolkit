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

const forceButton = (name: RegExp) => screen.getByRole('button', { name })
const industry = (name: string) => screen.getByRole('radio', { name })

async function loadAirlines(user: User) {
  await user.click(industry('U.S. passenger airlines'))
}

async function goToSummary(user: User) {
  await user.click(screen.getByRole('link', { name: /Summary/ }))
}

describe('Five Forces Explorer', () => {
  it('has one h1, an industry picker, and the five forces as buttons on the diagram', () => {
    render(<Harness />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five Forces Explorer')
    expect(industry('Custom industry')).toBeChecked()
    for (const name of ['Competitive rivalry', 'Threat of new entrants', 'Supplier power', 'Buyer power', 'Threat of substitutes']) {
      expect(screen.getByRole('button', { name: `${name}: not rated` })).toBeInTheDocument()
    }
    expect(screen.getByText('0 of 5 rated')).toBeInTheDocument()
    expect(screen.getByText(/thicker, red = more pressure/)).toBeInTheDocument()
  })

  it('main journey: load a preset, select a force, change its rating, evidence becomes an assumption, Summary reflects it', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await loadAirlines(user)
    expect(industry('U.S. passenger airlines')).toBeChecked()
    expect(screen.getByText('5 of 5 rated')).toBeInTheDocument()

    const buyer = forceButton(/^Buyer power: 4 of 5, High$/)
    await user.click(buyer)
    expect(buyer).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { level: 2, name: 'Buyer power' })).toBeInTheDocument()
    expect(screen.getByText('How much leverage do customers have over the industry?')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /higher means more pressure on profits/ })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '4 High' })).toBeChecked()
    // Only the ticked drivers show until asked.
    expect(screen.getByRole('checkbox', { name: 'Low buyer switching costs' })).toBeChecked()
    expect(screen.queryByRole('checkbox', { name: 'Few buyers or large-volume purchases' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '+ 5 more drivers' }))
    expect(screen.getByRole('checkbox', { name: 'Few buyers or large-volume purchases' })).not.toBeChecked()

    await user.click(screen.getByRole('button', { name: /Rationale and evidence/ }))
    expect(screen.getByRole('radio', { name: 'Illustrative example (not verified)' })).toBeChecked()

    await user.click(screen.getByRole('radio', { name: '2 Low' }))
    expect(screen.getByRole('radio', { name: '2 Low' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'My judgment / assumption' })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent(/its evidence is now/)
    expect(screen.queryByRole('radio', { name: 'Illustrative example (not verified)' })).not.toBeInTheDocument()
    expect(forceButton(/^Buyer power: 2 of 5, Low$/)).toBeInTheDocument()

    await goToSummary(user)
    expect(screen.getByRole('heading', { level: 2, name: 'U.S. passenger airlines' })).toBeInTheDocument()
    expect(screen.getByText('4 illustrative')).toBeInTheDocument()
    expect(screen.getByText('1 assumption')).toBeInTheDocument()
    const row = screen.getByRole('rowheader', { name: 'Buyer power' }).closest('tr')!
    expect(within(row).getByText('2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Per-force notes' }))
    const recap = screen.getByRole('heading', { level: 4, name: 'Buyer power' }).closest('article')!
    expect(within(recap).getByText('2 – Low')).toBeInTheDocument()
    expect(within(recap).getByText('My judgment / assumption')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Buyer power: 2 of 5, Low/ })).toBeInTheDocument()
  })

  it('custom industry flow, with an in-page confirmation before discarding input', async () => {
    const user = userEvent.setup()
    const confirm = vi.spyOn(window, 'confirm')
    render(<Harness />)

    expect(screen.getByLabelText('Industry name')).toBeVisible()
    await user.type(screen.getByLabelText('Industry name'), 'Craft breweries')
    await user.type(screen.getByLabelText('Scope'), 'Independent craft breweries in Appalachia')

    // Switching to a preset now asks in the page; keeping the work changes nothing.
    await loadAirlines(user)
    expect(screen.getByRole('alertdialog', { name: /Switch industry\?/ })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Keep my work' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(industry('Custom industry')).toBeChecked()
    expect(screen.getByLabelText('Industry name')).toHaveValue('Craft breweries')
    expect(confirm).not.toHaveBeenCalled()

    await user.click(forceButton(/^Competitive rivalry: not rated$/))
    expect(screen.getByRole('heading', { level: 2, name: 'Competitive rivalry' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: '4 High' }))
    await user.click(screen.getByRole('button', { name: '+ 9 more drivers' }))
    await user.click(screen.getByRole('checkbox', { name: 'Slow industry growth' }))
    await user.click(screen.getByRole('button', { name: /Rationale and evidence/ }))
    expect(screen.queryByRole('radio', { name: /Illustrative/ })).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Rationale'), 'Many small brewers chase the same taps.')
    await user.click(screen.getByRole('radio', { name: 'Supported by a source' }))
    expect(screen.getByText(/Until you do, this force is reported as/)).toBeInTheDocument()

    await goToSummary(user)
    expect(screen.getByRole('heading', { level: 2, name: 'Craft breweries' })).toBeInTheDocument()
    expect(screen.getByText('1 source missing')).toBeInTheDocument()
    expect(screen.getByText(/4 not rated yet/)).toBeInTheDocument()
    expect(screen.getByText(/Rate all five forces to see an indicative label/)).toBeInTheDocument()
    const strongest = screen.getByRole('heading', { name: 'Strongest force' }).closest('section')!
    expect(within(strongest).getByText('Competitive rivalry')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Per-force notes' }))
    const recap = screen.getByRole('heading', { level: 4, name: 'Competitive rivalry' }).closest('article')!
    expect(within(recap).getByText('Slow industry growth')).toBeInTheDocument()
    expect(within(recap).getByText('Assumption (source missing)')).toBeInTheDocument()
  })

  it('switching industry after confirming replaces the analysis', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(forceButton(/^Supplier power/))
    await user.click(screen.getByRole('radio', { name: '1 Very low' }))
    await user.click(industry('Coffee shops'))
    await user.click(screen.getByRole('button', { name: 'Switch' }))
    expect(industry('Coffee shops')).toBeChecked()
    expect(forceButton(/^Supplier power: 2 of 5, Low$/)).toBeInTheDocument()
  })

  it('compare select adds a second, dashed series and the difference column', async () => {
    const user = userEvent.setup()
    const { container } = render(<Harness />)
    await loadAirlines(user)
    await goToSummary(user)

    expect(container.querySelector('[data-series="comparison"]')).toBeNull()
    expect(screen.queryByRole('columnheader', { name: 'Difference' })).not.toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), 'video-streaming')
    expect(container.querySelector('[data-series="comparison"]')).not.toBeNull()
    expect(screen.getByRole('columnheader', { name: 'Difference' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Subscription video streaming' })).toBeInTheDocument()
    const rivalryRow = screen.getByRole('rowheader', { name: 'Competitive rivalry' }).closest('tr')!
    expect(within(rivalryRow).getByText('+1')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Chart legend' })).toHaveTextContent(/Dashed line: Subscription video streaming/)

    await user.selectOptions(screen.getByLabelText('Compare with'), '')
    expect(container.querySelector('[data-series="comparison"]')).toBeNull()
  })

  it('shows the strongest force and the indicative structure once all five are rated', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await goToSummary(user)
    const strongest = screen.getByRole('heading', { name: 'Strongest force' }).closest('section')!
    expect(within(strongest).getByText('Competitive rivalry')).toBeInTheDocument()
    // 5 + 3 + 4 + 4 + 3 = 19 / 5 = 3.8
    expect(screen.getByText('Challenging structure')).toBeInTheDocument()
    expect(screen.getByText(/Mean rating 3\.8 of 5/)).toBeInTheDocument()
    expect(
      screen.getByText('Example ratings are illustrative teaching material, not verified market research.'),
    ).toBeInTheDocument()
  })

  it('subpath navigation: summary shows the Summary; learn, analyze and anything else show the board', () => {
    const navigate = vi.fn()
    const { rerender } = render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Nothing to summarize yet' })).toBeInTheDocument()
    for (const subpath of ['', 'learn', 'analyze', 'nonsense']) {
      rerender(<FiveForcesTool subpath={subpath} navigate={navigate} />)
      expect(screen.getByRole('group', { name: 'Five forces diagram' })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: /Summary/ })).toHaveAttribute('href', '#/five-forces/summary')
  })

  it('the Summary link and the empty state call navigate()', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    const { rerender } = render(<FiveForcesTool subpath="" navigate={navigate} />)
    await user.click(screen.getByRole('link', { name: /Summary/ }))
    expect(navigate).toHaveBeenLastCalledWith('summary')
    rerender(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Back to the board/ }))
    expect(navigate).toHaveBeenLastCalledWith('')
  })

  it('the diagram works with the keyboard', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    const entrants = forceButton(/^Threat of new entrants/)
    entrants.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('heading', { level: 2, name: 'Threat of new entrants' })).toBeInTheDocument()
    forceButton(/^Threat of substitutes/).focus()
    await user.keyboard(' ')
    expect(screen.getByRole('heading', { level: 2, name: 'Threat of substitutes' })).toBeInTheDocument()
  })

  it('persists the analysis and the selected force across a remount', async () => {
    const user = userEvent.setup()
    const first = render(<Harness />)
    await loadAirlines(user)
    await user.click(forceButton(/^Supplier power/))
    await user.click(screen.getByRole('radio', { name: '1 Very low' }))
    first.unmount()

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
    render(<Harness />)
    expect(screen.getByRole('heading', { level: 2, name: 'Supplier power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '1 Very low' })).toBeChecked()
    expect(industry('U.S. passenger airlines')).toBeChecked()
  })

  it('Start over clears the analysis after an in-page confirmation', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(screen.getByRole('button', { name: 'Start over' }))
    expect(screen.getByRole('alertdialog', { name: /Start over\?/ })).toBeInTheDocument()
    await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Start over' }))
    expect(industry('Custom industry')).toBeChecked()
    expect(screen.getByText('0 of 5 rated')).toBeInTheDocument()
  })

  it('copies the Markdown export and reports success', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await goToSummary(user)
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    await user.click(screen.getByRole('button', { name: 'Copy as Markdown' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('# Five Forces Analysis: U.S. passenger airlines'))
    expect(await screen.findByText('Copied the Markdown to your clipboard.')).toBeInTheDocument()
  })

  it('implications typed on the Summary go into the export', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await goToSummary(user)
    await user.type(screen.getByLabelText(/Which force or forces matter most/), 'Rivalry, by far.')
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    await user.click(screen.getByRole('button', { name: 'Copy as Markdown' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('**Which forces matter most:** Rivalry, by far.'))
  })

  it('learning content is on demand: About this force and About the framework', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const about = screen.getByRole('button', { name: 'About the framework' })
    expect(about).toHaveAttribute('aria-expanded', 'false')
    await user.click(about)
    expect(screen.getByRole('heading', { name: 'Factors, not forces' })).toBeVisible()
    expect(screen.getByText(/How competitive forces shape strategy/)).toBeVisible()

    await user.click(forceButton(/^Threat of new entrants/))
    await user.click(screen.getByRole('button', { name: 'About this force' }))
    expect(screen.getByText(/Little expected retaliation/)).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Common misconception' })).toBeVisible()
  })
})
