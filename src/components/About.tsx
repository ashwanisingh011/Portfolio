import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SplitReveal } from './motion/SplitReveal'
import { Counter } from './motion/Counter'
import { Magnetic } from './motion/Magnetic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { experiences } from '@/data/experience'
import { stats, currentlyLearning } from '@/data/skills'
import { mailtoCompose } from '@/data/socials'
import portrait from '@/assets/ashwani.jpeg'

const KIND_ICON = {
  work: 'ri-briefcase-line',
  opensource: 'ri-git-branch-line',
  education: 'ri-graduation-cap-line',
} as const

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return

      // The vertical spine of the timeline draws as you scroll through it.
      gsap.from('.timeline-spine-fill', {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.6,
        },
      })

      gsap.from('.timeline-entry', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.timeline', start: 'top 75%', once: true },
      })

      gsap.from('.timeline-dot', {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(3)',
        stagger: 0.15,
        scrollTrigger: { trigger: '.timeline', start: 'top 75%', once: true },
      })

      gsap.from('.stat-block', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true },
      })

      gsap.from('.learning-chip', {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: { trigger: '.learning', start: 'top 88%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <section id="about" ref={ref}>
      <div className="about-intro">
        <div className="about-portrait" data-speed="0.92">
          <img src={portrait} alt="Ashwani Singh" />
          <span className="portrait-ring" />
        </div>

        <div className="about-copy">
          <span className="section-label">(about me)</span>

          <SplitReveal as="h2" className="about-headline" type="words" stagger={0.05}>
            I like problems that have a shape.
          </SplitReveal>

          <SplitReveal as="div" className="about-body" type="lines" stagger={0.04}>
            <p>
              I&rsquo;m a BCA student at Silver Oak University and a full-stack developer. Most of
              what I know came from building things that had to actually work — not tutorials, but
              systems with real constraints: tenant boundaries that cannot leak, queues that must
              not drop jobs, interfaces that stay responsive while five people edit the same board.
            </p>
            <p>
              I have 15 pull requests merged into Meshery, a CNCF cloud-native management platform,
              working across its React UI, its Playwright E2E suite and its Golang backend.
              Contributing to a codebase that size taught me more about reading unfamiliar code
              than any project of my own ever did. Alongside that I&rsquo;ve done two internships —
              four months in Svelte on the frontend, two months on backend and infrastructure with
              Firebase, Docker and Dagger.
            </p>
            <p>
              My most recent build, SyncSpac, is a multi-tenant platform with 28 schemas,
              role-based authorization down to the property level, and a real-time collaboration
              engine. I care about clean code the way I care about clean writing — not as
              decoration, but because the next person to read it deserves to understand it quickly.
              Usually that next person is me.
            </p>
          </SplitReveal>

          <Magnetic>
            <a className="about-cta" href={mailtoCompose} target="_blank" rel="noreferrer">
              Let&rsquo;s talk <i className="ri-arrow-right-up-line" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat-block" key={s.label}>
            <span className="stat-value">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="timeline">
        <span className="section-label">(the path so far)</span>

        <div className="timeline-inner">
          <span className="timeline-spine">
            <span className="timeline-spine-fill" />
          </span>

          {experiences.map((exp) => (
            <article className="timeline-entry" key={exp.id}>
              <span className="timeline-dot">
                <i className={KIND_ICON[exp.kind]} />
              </span>

              <div className="timeline-content">
                <header>
                  <h3>
                    {exp.role}
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noreferrer">
                        {' '}
                        @ {exp.org} <i className="ri-arrow-right-up-line" />
                      </a>
                    ) : (
                      <span> @ {exp.org}</span>
                    )}
                  </h3>
                  <span className="timeline-period">{exp.period}</span>
                </header>

                <p>{exp.body}</p>

                <div className="timeline-tags">
                  {exp.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="learning">
        <span className="section-label">(currently learning)</span>
        <div className="learning-chips">
          {currentlyLearning.map((item) => (
            <span className="learning-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
