import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

/** The current URL hash, updated on every hash change (including Back and Forward). */
export function useHash(): string {
  return useSyncExternalStore(subscribe, getHash, () => '')
}
