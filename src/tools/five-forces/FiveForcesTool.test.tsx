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
  const picker = screen.getByRole('group', { name: 'Industry' })
  return within(picker).getByRole('button', { name })
}

/** A force on the plate, found by the start of its accessible name. */
function force(name: string) {
  return screen.getByRole('button', { name: new RegExp(`^${name},`) })
}

async function loadAirlines(user: User) {
  await user.click(industry('U.S. passenger airlines'))
}

describe('Five Forces Explorer', () => {
  it('has one h1 naming the tool and the industry, and a view nav marking the current view', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five Forces Explorer')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Untitled industry')
    expect(viewLink('Plate')).toHaveAttribute('aria-current', 'page')
    expect(viewLink('Summary')).not.toHaveAttribute('aria-current')
    await loadAirlines(user)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('U.S. passenger airlines')
    expect(industry('U.S. passenger airlines')).toHaveAttribute('aria-pressed', 'true')
  })

  it('draws every rating and names it in words on the plate', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    expect(force('Competitive rivalry')).toHaveAccessibleName('Competitive rivalry, not rated')
    await loadAirlines(user)
    expect(force('Competitive rivalry')).toHaveAccessibleName('Competitive rivalry, 5 of 5')
    expect(force('Buyer power')).toHaveAccessibleName('Buyer power, 4 of 5')
    expect(screen.getByRole('group', { name: /Five forces plate for U.S. passenger airlines/ })).toBeInTheDocument()
    expect(screen.getByText('5 of 5 rated')).toBeInTheDocument()
  })

  it('main journey: select a force, change its rating, evidence becomes an assumption, Summary reflects it', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)

    await user.click(force('Buyer power'))
    expect(force('Buyer power')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { level: 2, name: 'Buyer power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '4 High' })).toBeChecked()
    expect(screen.getByText(/pressure on profit/, { selector: '.weight-ends-mid' })).toBeInTheDocument()
    expect(screen.getByText('Illustrative example (not verified)', { selector: '.panel-evidence' })).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: '2 Low' }))
    expect(screen.getByRole('radio', { name: '2 Low' })).toBeChecked()
    expect(force('Buyer power')).toHaveAccessibleName('Buyer power, 2 of 5')
    expect(screen.getByRole('status')).toHaveTextContent(/its evidence is now/)
    await user.click(screen.getByRole('button', { name: 'Rationale and evidence' }))
    expect(screen.getByRole('radio', { name: 'My judgment / assumption' })).toBeChecked()
    expect(screen.queryByRole('radio', { name: 'Illustrative example (not verified)' })).not.toBeInTheDocument()

    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument()
    expect(screen.getByText('4 illustrative · 1 assumption')).toBeInTheDocument()
    const row = screen.getByRole('rowheader', { name: 'Buyer power' }).closest('tr')!
    expect(within(row).getByText('2')).toBeInTheDocument()
    const notes = screen.getAllByRole('region', { name: 'Buyer power' })[0]
    expect(within(notes).getByText('2 – Low')).toBeInTheDocument()
    expect(within(notes).getByText(/My judgment \/ assumption/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Buyer power 2 of 5/ })).toBeInTheDocument()
  })

  it('shows the ticked drivers first and the rest on demand', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(force('Supplier power'))
    expect(screen.queryByRole('checkbox', { name: 'Differentiated supplier inputs' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /more drivers/ }))
    const box = screen.getByRole('checkbox', { name: 'Differentiated supplier inputs' })
    expect(box).not.toBeChecked()
    await user.click(box)
    expect(box).toBeChecked()
  })

  it('custom industry flow, with an on-page confirmation before discarding input', async () => {
    const user = userEvent.setup()
    const confirm = vi.spyOn(window, 'confirm')
    render(<Harness />)

    await user.click(industry('Custom industry'))
    await user.click(screen.getByRole('button', { name: 'Edit profile' }))
    await user.type(screen.getByLabelText('Industry name'), 'Craft breweries')
    await user.type(screen.getByLabelText('Scope'), 'Independent craft breweries in Appalachia')
    await user.click(screen.getByRole('button', { name: 'Done' }))

    await user.click(force('Competitive rivalry'))
    expect(screen.getByRole('heading', { level: 2, name: 'Competitive rivalry' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: '4 High' }))
    await user.click(screen.getByRole('checkbox', { name: 'Slow industry growth' }))
    await user.click(screen.getByRole('button', { name: 'Rationale and evidence' }))
    expect(screen.queryByRole('radio', { name: /Illustrative/ })).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Rationale'), 'Many small brewers chase the same taps.')
    await user.click(screen.getByRole('radio', { name: 'Supported by a source' }))
    expect(screen.getByText(/Until then this force reads/)).toBeInTheDocument()

    // Switching to a preset asks on the page; keeping the work leaves it intact.
    await loadAirlines(user)
    const dialog = screen.getByRole('alertdialog')
    expect(dialog).toHaveTextContent('Replace your edits with U.S. passenger airlines?')
    await user.click(within(dialog).getByRole('button', { name: 'Keep editing' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Craft breweries')
    expect(confirm).not.toHaveBeenCalled()

    await user.click(viewLink('Summary'))
    expect(screen.getByText(/1 source missing/)).toBeInTheDocument()
    const strongest = screen.getByText('Strongest').closest('p')!
    expect(within(strongest).getByText('Competitive rivalry')).toBeInTheDocument()
    expect(screen.queryByText(/Overall \(indicative\)/)).not.toBeInTheDocument()
    const notes = screen.getAllByRole('region', { name: 'Competitive rivalry' })[0]
    expect(within(notes).getByText(/Slow industry growth/)).toBeInTheDocument()
    expect(within(notes).getByText(/Assumption \(source missing\)/)).toBeInTheDocument()

    // Confirming the switch replaces the custom work.
    await loadAirlines(user)
    await user.click(screen.getByRole('button', { name: 'Replace' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('U.S. passenger airlines')
  })

  it('compare select adds a dashed second series and the difference column', async () => {
    const user = userEvent.setup()
    const { container } = render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))

    expect(container.querySelector('.bar-compare')).toBeNull()
    expect(screen.queryByRole('columnheader', { name: 'Difference' })).not.toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), 'video-streaming')
    expect(container.querySelectorAll('.bar-compare').length).toBeGreaterThan(0)
    expect(screen.getByRole('columnheader', { name: 'Difference' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Compare: Subscription video streaming' })).toBeInTheDocument()
    const rivalryRow = screen.getByRole('rowheader', { name: 'Rivalry' }).closest('tr')!
    expect(within(rivalryRow).getByText('+1')).toBeInTheDocument()
    expect(screen.getByText(/Subscription video streaming \(illustrative, dashed\)/)).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Compare with'), '')
    expect(container.querySelector('.bar-compare')).toBeNull()
  })

  it('shows the strongest forces and the indicative structure once all five are rated', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    expect(screen.getByText('Strongest')).toBeInTheDocument()
    // 5 + 3 + 4 + 4 + 3 = 19 / 5 = 3.8
    expect(screen.getByText('Challenging structure')).toBeInTheDocument()
    expect(screen.getByText('Mean rating 3.8 of 5')).toBeInTheDocument()
    expect(screen.getByText(/Averages hide what matters/)).toBeInTheDocument()
    expect(
      screen.getByText('Example ratings are illustrative teaching material, not verified market research.'),
    ).toBeInTheDocument()
  })

  it('subpath navigation: summary shows the Summary; anything else shows the Plate', () => {
    const navigate = vi.fn()
    const { rerender } = render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument()
    expect(viewLink('Summary')).toHaveAttribute('aria-current', 'page')

    for (const subpath of ['analyze', 'learn', 'nonsense', '']) {
      rerender(<FiveForcesTool subpath={subpath} navigate={navigate} />)
      expect(viewLink('Plate')).toHaveAttribute('aria-current', 'page')
      expect(force('Competitive rivalry')).toBeInTheDocument()
    }
    expect(viewLink('Plate')).toHaveAttribute('href', '#/five-forces')
    expect(viewLink('Summary')).toHaveAttribute('href', '#/five-forces/summary')
  })

  it('view links and the Implications panel call navigate()', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="" navigate={navigate} />)
    await user.click(viewLink('Summary'))
    expect(navigate).toHaveBeenLastCalledWith('summary')
    await user.click(screen.getByRole('button', { name: 'Implications' }))
    await user.type(screen.getByLabelText(/Which force or forces matter most/), 'Rivalry')
    expect(screen.getByLabelText(/Which force or forces matter most/)).toHaveValue('Rivalry')
    await user.click(screen.getByRole('button', { name: 'View the summary' }))
    expect(navigate).toHaveBeenLastCalledWith('summary')
  })

  it('Summary has an empty state that points back to the plate', async () => {
    const user = userEvent.setup()
    const navigate = vi.fn()
    render(<FiveForcesTool subpath="summary" navigate={navigate} />)
    expect(screen.getByText('Nothing is rated yet.')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Rate a force on the plate' }))
    expect(navigate).toHaveBeenCalledWith('')
  })

  it('persists the analysis and the open force across a remount', async () => {
    const user = userEvent.setup()
    const first = render(<Harness />)
    await loadAirlines(user)
    await user.click(force('Supplier power'))
    await user.click(screen.getByRole('radio', { name: '1 Very low' }))
    first.unmount()

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
    render(<Harness />)
    expect(screen.getByRole('heading', { level: 2, name: 'Supplier power' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '1 Very low' })).toBeChecked()
    expect(industry('U.S. passenger airlines')).toHaveAttribute('aria-pressed', 'true')
  })

  it('Start over clears the analysis after an on-page confirmation', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(screen.getByRole('button', { name: 'Start over' }))
    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(industry('Custom industry')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('0 of 5 rated')).toBeInTheDocument()
  })

  it('copies the Markdown export and reports success', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(viewLink('Summary'))
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    await user.click(screen.getByRole('button', { name: 'Copy as Markdown' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('# Five Forces Analysis: U.S. passenger airlines'))
    expect(await screen.findByText('Copied the Markdown.')).toBeInTheDocument()
  })

  it('learning content is on demand: about this force, and about the framework', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(force('Threat of new entrants'))
    const toggle = screen.getByRole('button', { name: 'About this force' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('heading', { name: 'What makes this force stronger' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'About the framework' }))
    expect(screen.getByRole('heading', { name: 'Factors, not forces' })).toBeVisible()
    expect(screen.getByText(/How competitive forces shape strategy/)).toBeVisible()
  })

  it('keeps keyboard focus in place: confirmations return it, views move it to the h1', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await loadAirlines(user)
    await user.click(force('Buyer power'))
    await user.click(screen.getByRole('radio', { name: '2 Low' }))

    // Keep editing and Replace both hand focus back to the emblem that asked.
    await user.click(industry('Coffee shops'))
    expect(screen.getByRole('button', { name: 'Keep editing' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Keep editing' }))
    expect(industry('Coffee shops')).toHaveFocus()
    await user.click(industry('Coffee shops'))
    await user.click(screen.getByRole('button', { name: 'Replace' }))
    expect(industry('Coffee shops')).toHaveFocus()

    // Changing view focuses the h1, never a heading further down the page.
    await user.click(viewLink('Summary'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus()
    await user.click(viewLink('Plate'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus()
  })

  it('the edit emblem opens the profile even when Custom is already chosen', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    expect(industry('Custom industry')).toHaveAttribute('aria-pressed', 'true')
    await user.click(industry('Custom industry'))
    expect(screen.getByRole('heading', { level: 2, name: 'Industry profile' })).toHaveFocus()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('on-demand sections sit in the heading outline without skipping levels', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(force('Buyer power'))
    expect(screen.getByRole('heading', { level: 2, name: 'About the framework' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'About this force' })).toBeInTheDocument()
  })
})
