// Shell tests. See SPEC.md §6.

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { BUILD_A_TOOL_URL, CONTRIBUTING_URL, PRODUCT_NAME, REPO_URL } from './config'
import { TOOLS } from './tools'
import { WANTED_TOOLS } from './tools/wanted'

function mainHeading() {
  return screen.getByRole('heading', { level: 1 })
}

describe('suite shell', () => {
  it('Home lists every registered tool and every wanted tool', () => {
    render(<App />)
    expect(mainHeading()).toHaveTextContent(PRODUCT_NAME)
    expect(document.title).toBe(PRODUCT_NAME)
    for (const tool of TOOLS) {
      expect(screen.getByRole('heading', { level: 3, name: tool.name })).toBeInTheDocument()
      expect(screen.getByText(tool.tagline)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: `Open ${tool.name}` })).toHaveAttribute(
        'href',
        `#/${tool.id}`,
      )
    }
    // Each wanted tool shows its name; its pitch opens on request.
    for (const wanted of WANTED_TOOLS) {
      expect(screen.getByRole('heading', { level: 3, name: wanted.name })).toBeInTheDocument()
      expect(screen.getByText(wanted.pitch)).not.toBeVisible()
    }
    expect(within(screen.getByRole('main')).getByRole('link', { name: 'Contribute' })).toHaveAttribute(
      'href',
      CONTRIBUTING_URL,
    )
    expect(screen.getByRole('link', { name: 'How to propose and build a tool' })).toHaveAttribute(
      'href',
      BUILD_A_TOOL_URL,
    )
  })

  it('has the landmarks, the footer links, and the disclaimer', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute('href', REPO_URL)
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Contribute' })).toHaveAttribute(
      'href',
      CONTRIBUTING_URL,
    )
    expect(screen.getByText(/These tools are teaching aids/)).toBeInTheDocument()
  })

  it('opening a tool renders it, sets the title, and moves focus to its heading', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: /Open Five Forces Explorer/ }))
    await waitFor(() => expect(mainHeading()).toHaveTextContent('Five Forces Explorer'))
    expect(document.title).toBe(`Five Forces Explorer · ${PRODUCT_NAME}`)
    expect(mainHeading()).toHaveFocus()
    // The header shows the tool's name next to the product name, which links Home.
    expect(screen.getByRole('link', { name: PRODUCT_NAME })).toHaveAttribute('href', '#/')
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent(
      'Five Forces Explorer',
    )
  })

  it('passes the subpath to the tool', () => {
    window.location.hash = '#/five-forces/summary'
    render(<App />)
    expect(screen.getByRole('heading', { level: 2, name: 'Nothing to summarize yet' })).toBeInTheDocument()
  })

  it("a wanted tool's pitch opens on request", async () => {
    const user = userEvent.setup()
    render(<App />)
    const [first] = WANTED_TOOLS
    await user.click(screen.getByRole('button', { name: first.name }))
    expect(screen.getByText(first.pitch)).toBeVisible()
  })

  it('shows Home for an unknown route', () => {
    window.location.hash = '#/not-a-tool/summary'
    render(<App />)
    expect(mainHeading()).toHaveTextContent(PRODUCT_NAME)
    expect(document.title).toBe(PRODUCT_NAME)
  })

  it('the browser back button returns to the previous route', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: /Open Five Forces Explorer/ }))
    await waitFor(() => expect(mainHeading()).toHaveTextContent('Five Forces Explorer'))
    await user.click(screen.getByRole('link', { name: 'Summary' }))
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 2, name: 'Nothing to summarize yet' })).toBeInTheDocument(),
    )

    window.history.back()
    await waitFor(() =>
      expect(screen.getByRole('group', { name: 'Five forces diagram' })).toBeInTheDocument(),
    )
    window.history.back()
    await waitFor(() => expect(mainHeading()).toHaveTextContent(PRODUCT_NAME))
    expect(document.title).toBe(PRODUCT_NAME)
    expect(mainHeading()).toHaveFocus()
  })
})
