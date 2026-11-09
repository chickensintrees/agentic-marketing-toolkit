// Entry point. The global styles are imported first so that each tool's own
// stylesheet (imported by the tool) comes after them and can build on them.
import './shared/tokens.css'
import './shared/base.css'
import './shell/shell.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
