import { useEffect } from 'react'

const GAP = 16

function headerOffset() {
  const header = document.querySelector('header')
  return (header?.offsetHeight ?? 72) + GAP
}

function targetTop(hash: string) {
  if (hash === '#top') return 0
  const el = document.querySelector(hash)
  if (!el) return null
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset())
}

/**
 * In-page navigation, handled in JS rather than by the browser's fragment jump.
 *
 * Native fragment navigation lands under the fixed header and, with
 * `scroll-behavior: smooth` on `html`, can be dropped entirely. Doing it here
 * gives an exact landing point, keyboard focus that follows the reader, and a
 * single place to honour reduced motion.
 */
export function useAnchorScroll() {
  useEffect(() => {
    function scrollToHash(hash: string, animate: boolean) {
      const to = targetTop(hash)
      if (to === null) return false
      window.scrollTo({ top: to, behavior: animate ? 'smooth' : 'auto' })
      return true
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const link = (e.target as HTMLElement).closest?.('a')
      const hash = link?.getAttribute('href')
      if (!link || !hash || !hash.startsWith('#') || hash === '#') return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!scrollToHash(hash, !reduced)) return

      e.preventDefault()
      history.pushState(null, '', hash === '#top' ? location.pathname : hash)

      // Keep keyboard focus with the section the reader was sent to.
      const el = hash === '#top' ? null : document.querySelector<HTMLElement>(hash)
      if (el) {
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
    }

    function onPopState() {
      if (location.hash) scrollToHash(location.hash, false)
    }

    // A hash in the URL on first load lands before React has rendered.
    if (location.hash) {
      requestAnimationFrame(() => scrollToHash(location.hash, false))
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])
}
