import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const IDLE_MS = 6000
const BLINK_MIN = 3
const BLINK_MAX = 7
/** Pointer speed (px/frame) above which the body deforms. */
const SQUASH_THRESHOLD = 6

/**
 * A small creature that follows the cursor.
 *
 * Everything is driven from one gsap.ticker callback with quickTo setters
 * rather than per-event tweens, so pointer events stay cheap no matter how fast
 * the mouse moves. Positions are read from a mutable ref; React never
 * re-renders as a result of pointer movement.
 *
 * States: follows the cursor with lag, squashes along its velocity vector when
 * moving fast, blinks on a random interval, falls asleep when idle, and widens
 * its eyes over interactive elements.
 */
export function Pet() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disabled = reduced || isMobile

  useGSAP(
    () => {
      const root = rootRef.current
      if (disabled || !root) return

      const body = root.querySelector<SVGGElement>('.pet-body')
      const eyeL = root.querySelector<SVGGElement>('.pet-eye-l')
      const eyeR = root.querySelector<SVGGElement>('.pet-eye-r')
      const pupilL = root.querySelector<SVGCircleElement>('.pet-pupil-l')
      const pupilR = root.querySelector<SVGCircleElement>('.pet-pupil-r')
      const lidL = root.querySelector<SVGRectElement>('.pet-lid-l')
      const lidR = root.querySelector<SVGRectElement>('.pet-lid-r')
      const zzz = root.querySelector<SVGTextElement>('.pet-zzz')
      if (!body || !eyeL || !eyeR || !pupilL || !pupilR || !lidL || !lidR || !zzz) return

      const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      const pos = { x: pointer.x, y: pointer.y }
      let lastMove = performance.now()
      let asleep = false
      let excited = false

      gsap.set(root, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y })
      gsap.set([lidL, lidR], { scaleY: 0, transformOrigin: 'center top' })

      const setX = gsap.quickSetter(root, 'x', 'px') as (v: number) => void
      const setY = gsap.quickSetter(root, 'y', 'px') as (v: number) => void
      const setRotate = gsap.quickTo(body, 'rotation', { duration: 0.6, ease: 'power3.out' })
      const setScaleX = gsap.quickTo(body, 'scaleX', { duration: 0.5, ease: 'power3.out' })
      const setScaleY = gsap.quickTo(body, 'scaleY', { duration: 0.5, ease: 'power3.out' })
      const setPupilX = gsap.quickTo([pupilL, pupilR], 'x', { duration: 0.3, ease: 'power2.out' })
      const setPupilY = gsap.quickTo([pupilL, pupilR], 'y', { duration: 0.3, ease: 'power2.out' })

      /* ---- sleep / wake ---------------------------------------------- */

      const wake = () => {
        if (!asleep) return
        asleep = false
        // The breathing loop animates the same scaleY the ticker drives, so it
        // has to die before the follow behaviour resumes.
        gsap.killTweensOf(body)
        gsap.killTweensOf(zzz)
        gsap.to([lidL, lidR], { scaleY: 0, duration: 0.25, ease: 'power2.out' })
        gsap.set(zzz, { opacity: 0 })
        gsap.to(root, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
      }

      const sleep = () => {
        if (asleep) return
        asleep = true
        gsap.to([lidL, lidR], { scaleY: 1, duration: 0.4, ease: 'power2.inOut' })
        gsap.to(root, { scale: 0.85, duration: 0.6, ease: 'power2.inOut' })
        // Breathing while asleep.
        gsap.to(body, {
          scaleY: 0.92,
          duration: 1.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        gsap.fromTo(
          zzz,
          { opacity: 0, y: 0, x: 0 },
          {
            opacity: 0.8,
            y: -26,
            x: 10,
            duration: 2.2,
            ease: 'power1.out',
            repeat: -1,
            repeatDelay: 0.3,
          },
        )
      }

      /* ---- blinking ---------------------------------------------------- */

      const blink = () => {
        if (!asleep) {
          gsap
            .timeline()
            .to([lidL, lidR], { scaleY: 1, duration: 0.07, ease: 'power2.in' })
            .to([lidL, lidR], { scaleY: 0, duration: 0.09, ease: 'power2.out' })
        }
        gsap.delayedCall(gsap.utils.random(BLINK_MIN, BLINK_MAX), blink)
      }
      gsap.delayedCall(gsap.utils.random(BLINK_MIN, BLINK_MAX), blink)

      /* ---- per-frame follow ------------------------------------------- */

      const tick = () => {
        const dx = pointer.x - pos.x
        const dy = pointer.y - pos.y

        // Lag behind the cursor — the creature chases rather than sticks.
        pos.x += dx * 0.14
        pos.y += dy * 0.14
        setX(pos.x)
        setY(pos.y)

        const speed = Math.hypot(dx, dy)

        if (speed > SQUASH_THRESHOLD && !asleep) {
          // Stretch along the direction of travel, squash across it.
          const stretch = gsap.utils.clamp(1, 1.45, 1 + speed / 120)
          setScaleX(stretch)
          setScaleY(1 / stretch)
          setRotate((Math.atan2(dy, dx) * 180) / Math.PI)
        } else if (!asleep) {
          setScaleX(excited ? 1.35 : 1)
          setScaleY(excited ? 1.35 : 1)
        }

        // Pupils lean toward the cursor, capped so they stay inside the eye.
        if (!asleep) {
          setPupilX(gsap.utils.clamp(-2.2, 2.2, dx * 0.06))
          setPupilY(gsap.utils.clamp(-2.2, 2.2, dy * 0.06))
        }

        if (!asleep && performance.now() - lastMove > IDLE_MS) sleep()
      }
      gsap.ticker.add(tick)

      /* ---- input ------------------------------------------------------- */

      const onMove = (e: PointerEvent) => {
        pointer.x = e.clientX
        pointer.y = e.clientY
        lastMove = performance.now()
        wake()
      }

      const onDown = () => {
        wake()
        gsap.fromTo(
          root,
          { scale: 0.7 },
          { scale: excited ? 1.3 : 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' },
        )
      }

      // Delegated hover: any interactive element makes the pet perk up.
      const INTERACTIVE = 'a, button, .elem, .pet-react'

      const onOver = (e: PointerEvent) => {
        const target = e.target as Element | null
        if (!target?.closest?.(INTERACTIVE)) return
        excited = true
        gsap.to(root, { scale: 1.3, duration: 0.4, ease: 'back.out(2.5)' })
        gsap.to([pupilL, pupilR], { scale: 1.35, duration: 0.3, ease: 'back.out(3)' })
        gsap.to(body, { opacity: 0.95, duration: 0.3 })
      }

      const onOut = (e: PointerEvent) => {
        const target = e.target as Element | null
        if (!target?.closest?.(INTERACTIVE)) return
        excited = false
        gsap.to(root, { scale: 1, duration: 0.4, ease: 'power3.out' })
        gsap.to([pupilL, pupilR], { scale: 1, duration: 0.3, ease: 'power3.out' })
        gsap.to(body, { opacity: 0.75, duration: 0.3 })
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.addEventListener('pointerout', onOut, { passive: true })

      return () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onDown)
        document.removeEventListener('pointerover', onOver)
        document.removeEventListener('pointerout', onOut)
      }
    },
    { scope: rootRef, dependencies: [disabled] },
  )

  if (disabled) return null

  return (
    <div id="pet" ref={rootRef} aria-hidden="true">
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
        <g className="pet-body" style={{ transformOrigin: '23px 23px' }}>
          <circle cx="23" cy="23" r="15" fill="#fff" opacity="0.75" />
          <g className="pet-eye-l">
            <circle cx="18" cy="21" r="3.6" fill="#0a0a0a" />
            <circle className="pet-pupil-l" cx="18" cy="21" r="1.7" fill="#fff" />
            <rect className="pet-lid-l" x="14" y="17" width="8" height="8" fill="#fff" />
          </g>
          <g className="pet-eye-r">
            <circle cx="28" cy="21" r="3.6" fill="#0a0a0a" />
            <circle className="pet-pupil-r" cx="28" cy="21" r="1.7" fill="#fff" />
            <rect className="pet-lid-r" x="24" y="17" width="8" height="8" fill="#fff" />
          </g>
          <path
            d="M20 28.5 Q23 31 26 28.5"
            stroke="#0a0a0a"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <text
          className="pet-zzz"
          x="34"
          y="14"
          fill="#fff"
          fontSize="9"
          fontWeight="700"
          opacity="0"
        >
          z
        </text>
      </svg>
    </div>
  )
}
