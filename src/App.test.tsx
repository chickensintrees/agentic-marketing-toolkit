// Shell tests. See SPEC.md §6.

import { render, screen, waitFor } from '@testing-library/react'
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
  it('Home lists every registered tool and every wanted tool, with pitches on demand', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(mainHeading()).toHaveTextContent(PRODUCT_NAME)
    expect(document.title).toBe(PRODUCT_NAME)
    for (const tool of TOOLS) {
      expect(screen.getByRole('heading', { level: 2, name: tool.name })).toBeInTheDocument()
      const link = screen.getByRole('link', { name: `Open ${tool.name}` })
      expect(link).toHaveAttribute('href', `#/${tool.id}`)
      expect(link).toHaveAccessibleDescription(tool.tagline)
    }
    for (const wanted of WANTED_TOOLS) {
      const item = screen.getByRole('button', { name: wanted.name })
      expect(item).toHaveAttribute('aria-expanded', 'false')
      expect(screen.queryByText(wanted.pitch)).not.toBeInTheDocument()
      await user.click(item)
      expect(item).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText(wanted.pitch)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'How to propose and build a tool' })).toHaveAttribute(
      'href',
      BUILD_A_TOOL_URL,
    )
    expect(screen.getByRole('link', { name: 'How to contribute' })).toHaveAttribute('href', CONTRIBUTING_URL)
  })

  it('has the landmarks, the footer links, and the disclaimer', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute('href', REPO_URL)
    expect(screen.getByRole('link', { name: 'Contribute' })).toHaveAttribute('href', CONTRIBUTING_URL)
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
    await user.click(screen.getByRole('link', { name: /Summary/ }))
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
