import { useRef, useState } from 'react'
import { useGSAP, ScrollTrigger } from '@/lib/gsap'

const SECTIONS = [
  { id: '#hero', label: 'Intro' },
  { id: '#work', label: 'Work' },
  { id: '#syncspac', label: 'SyncSpac' },
  { id: '#about', label: 'About' },
  { id: '#skills', label: 'Skills' },
  { id: '#contact', label: 'Contact' },
]

/**
 * Fixed rail showing scroll progress and the section currently in view.
 * Lives outside #smooth-content so it stays pinned to the viewport.
 */
export function ProgressRail() {
  const fillRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const fill = fillRef.current
    if (!fill) return

    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        fill.style.transform = `scaleY(${self.progress})`
      },
    })

    const triggers = SECTIONS.map((section, i) =>
      ScrollTrigger.create({
        trigger: section.id,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      }),
    )

    return () => {
      progress.kill()
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="progress-rail" aria-hidden="true">
      <span className="rail-track">
        <span className="rail-fill" ref={fillRef} />
      </span>
      <span className="rail-label">{SECTIONS[active]?.label ?? ''}</span>
      <span className="rail-count">
        0{active + 1} <i>/</i> 0{SECTIONS.length}
      </span>
    </div>
  )
}
