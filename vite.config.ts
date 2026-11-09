/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths (SPEC.md §7): the same build works on GitHub Pages
  // (https://<user>.github.io/agentic-marketing-toolkit/), on a fork's Pages
  // site, and on any other static host or path.
  base: './',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
