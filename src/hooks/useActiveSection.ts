import { useEffect, useState } from 'react'

/**
 * Tracks which section the reader is currently in, so the nav can say where
 * they are instead of leaving every link looking identical.
 *
 * Deliberately not IntersectionObserver: a section taller than the viewport
 * stops firing threshold events once you are inside it, which leaves the nav
 * showing whichever section fired last. Probing the scroll position instead
 * gives the right answer at any offset.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    function measure() {
      frame = 0
      const header = document.querySelector('header')
      // The probe sits just below the header, a quarter into the viewport.
      const probe = (header?.offsetHeight ?? 72) + window.innerHeight * 0.25

      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) current = id
      }

      // Anything within a screen of the bottom counts as the last section,
      // which can otherwise never reach the probe line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1] ?? current

      setActive(current)
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
