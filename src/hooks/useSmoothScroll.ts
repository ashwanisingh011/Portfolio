import { useRef } from 'react'
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

/**
 * Creates the single ScrollSmoother instance.
 *
 * ScrollSmoother must exist before any pinned ScrollTrigger is created, so this
 * is called from App before section children mount. Only one instance can exist
 * at a time — `ScrollSmoother.get()` guards against StrictMode double-invoke.
 */
export function useSmoothScroll(enabled: boolean) {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useGSAP(() => {
    if (!enabled) return

    const existing = ScrollSmoother.get()
    if (existing) existing.kill()

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      // Enables data-speed / data-lag parallax on any descendant element.
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    })

    return () => {
      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [enabled])

  return smootherRef
}

/**
 * Scrolls to a section, routed through ScrollSmoother when it is active so the
 * eased scroll position stays in sync. Falls back to native smooth scrolling.
 */
export function scrollToSection(target: string) {
  const smoother = ScrollSmoother.get()

  if (smoother) {
    smoother.scrollTo(target, true, 'top top')
    return
  }

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: target, autoKill: false },
    ease: 'expo.inOut',
  })
}

/** Re-measures every trigger. Call after layout-shifting events like the preloader. */
export function refreshTriggers() {
  ScrollTrigger.refresh()
}
