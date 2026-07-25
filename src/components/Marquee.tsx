import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { marqueeSkills } from '@/data/skills'

/**
 * Infinite skill ticker whose speed and direction respond to scroll velocity —
 * scroll down and it runs faster, scroll up and it reverses.
 */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const track = root.querySelector<HTMLDivElement>('.marquee-track')
      if (!track) return

      if (reduced) return

      // Two identical halves; animating -50% loops seamlessly.
      const tl = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          // Direction follows scroll direction; magnitude adds a speed boost
          // that decays back to 1 when scrolling stops.
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 600)
          tl.timeScale(v < 0 ? -boost : boost)
          gsap.to(tl, { timeScale: v < 0 ? -1 : 1, duration: 0.8, overwrite: true })
        },
      })

      return () => {
        st.kill()
        tl.kill()
      }
    },
    { scope: ref, dependencies: [reduced] },
  )

  const items = [...marqueeSkills, ...marqueeSkills]

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <div className="marquee-track">
        {items.map((skill, i) => (
          <span className="marquee-item" key={`${skill}-${i}`}>
            {skill}
            <i className="ri-asterisk" />
          </span>
        ))}
      </div>
    </div>
  )
}
