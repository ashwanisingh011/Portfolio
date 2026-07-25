import { useRef } from 'react'
import { gsap, useGSAP, SplitText } from '@/lib/gsap'
import { Navbar } from './Navbar'
import { Magnetic } from './motion/Magnetic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { scrollToSection } from '@/hooks/useSmoothScroll'
import { RESUME_URL } from '@/data/socials'

interface HeroProps {
  /** Gates the intro until the preloader has finished its curtain wipe. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = ref.current
      if (!root || !ready) return

      const headings = gsap.utils.toArray<HTMLElement>('.hero-line', root)

      if (reduced) {
        gsap.set(['.hero-line .split-char', '#nav', '.hero-sub', '.hero-footer'], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        })
        return
      }

      const splits = headings.map((el) =>
        SplitText.create(el, { type: 'chars', mask: 'chars', charsClass: 'split-char' }),
      )

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from('#nav', { y: -30, opacity: 0, duration: 1.2 }, 0)
        .from(
          splits.flatMap((s) => s.chars),
          { yPercent: 115, duration: 1.4, stagger: 0.022 },
          0.1,
        )
        .from('.hero-sub', { opacity: 0, y: 20, duration: 1 }, 0.6)
        .from('.hero-tag', { opacity: 0, y: 16, duration: 0.9, stagger: 0.1 }, 0.75)
        .from('.hero-footer', { opacity: 0, y: 20, duration: 1 }, 0.9)

      // Parallax the headline apart as the user scrolls away from the hero.
      gsap.to('.hero-line:nth-child(1)', {
        xPercent: -6,
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.hero-line:nth-child(2)', {
        xPercent: 8,
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      })

      return () => splits.forEach((s) => s.revert())
    },
    { scope: ref, dependencies: [ready, reduced] },
  )

  return (
    <section id="hero" ref={ref}>
      <Navbar />

      <div className="hero-heading">
        <h1 className="hero-line">Full-Stack</h1>
        <h1 className="hero-line hero-line-2">Developer</h1>
      </div>

      <div className="hero-meta">
        <p className="hero-sub">
          I build multi-tenant platforms, real-time systems and interfaces that feel considered —
          from schema design through to the last easing curve.
        </p>

        <div className="hero-tags">
          <span className="hero-tag">Available for full-time roles</span>
          <span className="hero-tag">Remote & on-site</span>
        </div>
      </div>

      <div className="hero-footer">
        <a href="https://www.advrd.com/" target="_blank" rel="noreferrer">
          Previously at Advrd <i className="ri-arrow-right-up-line" />
        </a>

        <Magnetic>
          <a className="hero-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
            Résumé <i className="ri-arrow-right-up-line" />
          </a>
        </Magnetic>

        <button className="hero-scroll-cue" onClick={() => scrollToSection('#work')}>
          <span>Scroll</span>
          <span className="cue-track">
            <span className="cue-dot" />
          </span>
        </button>
      </div>
    </section>
  )
}
