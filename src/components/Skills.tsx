import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { skillGroups } from '@/data/skills'

/**
 * Horizontally scrolling skill panels, pinned while the user scrolls through
 * them. Falls back to a normal stacked grid on mobile and under reduced motion,
 * where hijacking scroll direction would be hostile.
 */
export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const horizontal = !reduced && !isMobile

  useGSAP(
    () => {
      const root = ref.current
      if (!root || !horizontal) return

      const track = root.querySelector<HTMLDivElement>('.skills-track')
      if (!track) return

      const distance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          // Pin for exactly as long as the track needs to travel.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: ref, dependencies: [horizontal] },
  )

  return (
    <section id="skills" ref={ref} className={horizontal ? 'is-horizontal' : ''}>
      <div className="skills-track">
        <div className="skills-intro">
          <span className="section-label">(toolkit)</span>
          <h2 className="skills-title">
            What I build
            <br />
            with
          </h2>
          {horizontal && (
            <span className="skills-hint">
              <i className="ri-arrow-right-line" /> keep scrolling
            </span>
          )}
        </div>

        {skillGroups.map((group, i) => (
          <div className="skills-panel pet-react" key={group.label}>
            <header>
              <span className="panel-index">0{i + 1}</span>
              <h3>{group.label}</h3>
            </header>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
