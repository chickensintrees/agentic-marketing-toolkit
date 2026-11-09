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
    for (const wanted of WANTED_TOOLS) {
      expect(screen.getByRole('heading', { level: 3, name: wanted.name })).toBeInTheDocument()
      // The pitch is on demand: the link's description, shown on hover or focus.
      const link = screen.getByRole('heading', { level: 3, name: wanted.name }).closest('a')!
      expect(link).toHaveAccessibleDescription(wanted.pitch)
      expect(link).toHaveAttribute('href', BUILD_A_TOOL_URL)
    }
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
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument()
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
      expect(screen.getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument(),
    )

    window.history.back()
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /^Competitive rivalry,/ })).toBeInTheDocument(),
    )
    window.history.back()
    await waitFor(() => expect(mainHeading()).toHaveTextContent(PRODUCT_NAME))
    expect(document.title).toBe(PRODUCT_NAME)
    expect(mainHeading()).toHaveFocus()
  })
})
