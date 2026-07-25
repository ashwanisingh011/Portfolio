import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SEEN_KEY = 'portfolio:preloaded'

interface PreloaderProps {
  onComplete: () => void
}

/**
 * First-visit intro: a 0→100 counter with the name scrambling in, followed by a
 * curtain wipe that hands off to the hero.
 *
 * Skipped entirely on repeat visits within the same tab (sessionStorage) and
 * under reduced motion, in both cases calling onComplete synchronously so the
 * hero animation is never left waiting.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const reduced = useReducedMotion()

  const [skip] = useState(() => {
    if (typeof window === 'undefined') return true
    return reduced || sessionStorage.getItem(SEEN_KEY) === '1'
  })

  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (skip) {
        onComplete()
        return
      }

      const root = rootRef.current
      if (!root) return

      sessionStorage.setItem(SEEN_KEY, '1')
      document.body.style.overflow = 'hidden'

      const counter = root.querySelector<HTMLSpanElement>('.pre-count')
      const name = root.querySelector<HTMLHeadingElement>('.pre-name')
      const role = root.querySelector<HTMLParagraphElement>('.pre-role')
      const bar = root.querySelector<HTMLDivElement>('.pre-bar-fill')
      const panels = gsap.utils.toArray<HTMLDivElement>('.pre-panel', root)
      if (!counter || !name || !role || !bar) return

      const progress = { n: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          onComplete()
        },
      })

      tl.to(name, { opacity: 1, duration: 0.3 })
        .to(
          name,
          {
            duration: 1.4,
            scrambleText: { text: 'ASHWANI SINGH', chars: 'upperCase', speed: 0.4 },
          },
          0,
        )
        .to(role, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0.5)
        .to(
          progress,
          {
            n: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.n)).padStart(3, '0')
            },
          },
          0,
        )
        .to(bar, { scaleX: 1, duration: 2.2, ease: 'power2.inOut' }, 0)
        .to([counter, name, role, bar.parentElement], {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        })
        // Curtain wipe: vertical panels lift in sequence to reveal the hero.
        .to(
          panels,
          {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 1,
            ease: 'expo.inOut',
            stagger: 0.08,
          },
          '-=0.2',
        )
        .set(root, { display: 'none' })

      return () => {
        document.body.style.overflow = ''
      }
    },
    { scope: rootRef, dependencies: [skip] },
  )

  if (skip) return null

  return (
    <div id="preloader" ref={rootRef}>
      <div className="pre-panels">
        {Array.from({ length: 5 }, (_, i) => (
          <div className="pre-panel" key={i} />
        ))}
      </div>

      <div className="pre-inner">
        <h1 className="pre-name">------------</h1>
        <p className="pre-role">Full-Stack Developer</p>
        <div className="pre-bar">
          <div className="pre-bar-fill" />
        </div>
        <span className="pre-count">000</span>
      </div>
    </div>
  )
}
