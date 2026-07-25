import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CounterProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

/**
 * Counts up from zero to `value` the first time it scrolls into view.
 *
 * Animates a proxy object rather than parsing textContent back out on every
 * tick, which keeps the formatting under our control.
 */
export function Counter({ value, suffix = '', className = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reduced) {
        el.textContent = `${value}${suffix}`
        return
      }

      const proxy = { n: 0 }

      gsap.to(proxy, {
        n: value,
        duration,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(proxy.n)}${suffix}`
        },
      })
    },
    { scope: ref, dependencies: [value, suffix, duration, reduced] },
  )

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
