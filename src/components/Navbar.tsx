import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollToSection } from '@/hooks/useSmoothScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { socials, RESUME_URL } from '@/data/socials'

const LINKS = [
  { label: 'Work', target: '#work' },
  { label: 'SyncSpac', target: '#syncspac' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Contact', target: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const overlay = overlayRef.current
      if (!overlay) return

      const links = gsap.utils.toArray<HTMLElement>('.menu-link-inner', overlay)
      const meta = gsap.utils.toArray<HTMLElement>('.menu-meta', overlay)

      if (reduced) {
        gsap.set(overlay, { autoAlpha: open ? 1 : 0, clipPath: 'none' })
        gsap.set([links, meta], { yPercent: 0, opacity: 1 })
        return
      }

      if (open) {
        gsap
          .timeline()
          .set(overlay, { autoAlpha: 1, pointerEvents: 'auto' })
          .fromTo(
            overlay,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' },
          )
          .fromTo(
            links,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 },
            '-=0.5',
          )
          .fromTo(meta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      } else {
        gsap
          .timeline()
          .to(links, { yPercent: -110, duration: 0.5, ease: 'expo.in', stagger: 0.03 })
          .to(meta, { opacity: 0, duration: 0.3 }, 0)
          .to(
            overlay,
            { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'expo.inOut' },
            '-=0.2',
          )
          .set(overlay, { autoAlpha: 0, pointerEvents: 'none' })
      }
    },
    { dependencies: [open, reduced] },
  )

  const go = (target: string) => {
    setOpen(false)
    // Let the overlay start closing before the scroll begins, otherwise the
    // wipe and the scroll fight for the same frames.
    gsap.delayedCall(reduced ? 0 : 0.35, () => scrollToSection(target))
  }

  return (
    <>
      <nav id="nav">
        <button className="nav-brand" onClick={() => scrollToSection('#hero')}>
          Ashwani Singh
        </button>

        <div className="nav-right">
          <span className="nav-status pet-react">
            <span className="status-dot" />
            Available for work
          </span>
          <button
            className={`nav-menu-btn ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="nav-menu-label">{open ? 'CLOSE' : 'MENU'}</span>
            <span className="nav-menu-icon">
              <i />
              <i />
            </span>
          </button>
        </div>
      </nav>

      <div id="menu-overlay" ref={overlayRef}>
        <div className="menu-links">
          {LINKS.map((l, i) => (
            <div className="menu-link" key={l.target}>
              <button className="menu-link-inner" onClick={() => go(l.target)}>
                <span className="menu-index">0{i + 1}</span>
                {l.label}
              </button>
            </div>
          ))}
        </div>

        <div className="menu-footer menu-meta">
          <div className="menu-socials">
            {socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <a className="menu-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
            Résumé <i className="ri-arrow-right-up-line" />
          </a>
        </div>
      </div>
    </>
  )
}
