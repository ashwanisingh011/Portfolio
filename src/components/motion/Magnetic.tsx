import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number
}

/**
 * Pulls its child toward the cursor while hovered, then springs back on leave.
 *
 * Uses quickTo rather than a fresh tween per mousemove — quickTo reuses one
 * tween instance, so this stays cheap even at 120Hz pointer events.
 */
export function Magnetic({ children, className = '', strength = 24 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disabled = reduced || isMobile

  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)

  useGSAP(
    () => {
      if (disabled || !ref.current) return
      setX.current = gsap.quickTo(ref.current, 'x', { duration: 0.5, ease: 'power3.out' })
      setY.current = gsap.quickTo(ref.current, 'y', { duration: 0.5, ease: 'power3.out' })
    },
    { scope: ref, dependencies: [disabled] },
  )

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)

    // Normalise against half-size so `strength` means the same thing
    // regardless of how big the element is.
    setX.current?.(gsap.utils.clamp(-strength, strength, (relX / (rect.width / 2)) * strength))
    setY.current?.(gsap.utils.clamp(-strength, strength, (relY / (rect.height / 2)) * strength))
  }

  const handleLeave = () => {
    if (disabled) return
    setX.current?.(0)
    setY.current?.(0)
  }

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
