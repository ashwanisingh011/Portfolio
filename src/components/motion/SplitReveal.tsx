import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, SplitText } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SplitRevealProps {
  children: ReactNode
  /** Element to render as. Defaults to a div. */
  as?: ElementType
  className?: string
  /** Split granularity. Chars reads as more deliberate, lines as more editorial. */
  type?: 'chars' | 'words' | 'lines'
  /** Seconds between each unit. */
  stagger?: number
  delay?: number
  /** Animate on scroll into view rather than on mount. */
  onScroll?: boolean
}

/**
 * Reveals text by splitting it into chars/words/lines and sliding each unit up
 * from behind a clipping mask.
 *
 * Uses SplitText's `onSplit` callback so the animation is re-created whenever
 * the text re-splits on resize (`autoSplit`), rather than leaving stale
 * transforms on the old elements.
 */
export function SplitReveal({
  children,
  as: Tag = 'div',
  className = '',
  type = 'lines',
  stagger = 0.06,
  delay = 0,
  onScroll = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return

      const split = SplitText.create(ref.current, {
        type,
        // Wrapping in a mask element is what produces the "rolls up from
        // nothing" look rather than a plain fade.
        mask: type,
        autoSplit: true,
        linesClass: 'split-line',
        onSplit: (self) => {
          const targets = self[type]
          return gsap.from(targets, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger,
            delay,
            scrollTrigger: onScroll
              ? { trigger: ref.current, start: 'top 85%', once: true }
              : undefined,
          })
        },
      })

      return () => split.revert()
    },
    { scope: ref, dependencies: [reduced, type, stagger, delay, onScroll] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
