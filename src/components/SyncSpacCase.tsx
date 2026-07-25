import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SplitReveal } from './motion/SplitReveal'
import { Counter } from './motion/Counter'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { featuredProject } from '@/data/projects'

/**
 * Nodes of the request-flow diagram. Laid out left-to-right; the connectors
 * draw themselves in sequence as the section scrolls into view.
 */
const FLOW = [
  { id: 'client', label: 'React 19 Client', sub: 'Optimistic UI', icon: 'ri-computer-line' },
  { id: 'api', label: 'Express API', sub: 'RBAC · ABAC · quota', icon: 'ri-server-line' },
  { id: 'db', label: 'MongoDB', sub: '28 schemas', icon: 'ri-database-2-line' },
  { id: 'queue', label: 'BullMQ + Redis', sub: 'Workers · cron', icon: 'ri-stack-line' },
  { id: 'socket', label: 'Socket.IO', sub: 'Workspace rooms', icon: 'ri-broadcast-line' },
]

export function SyncSpacCase() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const project = featuredProject

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return

      // Diagram nodes pop in, then the connectors between them draw.
      gsap.from('.flow-node', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.6)',
        stagger: 0.12,
        scrollTrigger: { trigger: '.flow', start: 'top 75%', once: true },
      })

      gsap.from('.flow-line-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: '.flow', start: 'top 75%', once: true },
      })

      // A pulse travelling the diagram, suggesting a live request.
      gsap.fromTo(
        '.flow-pulse',
        { xPercent: 0, opacity: 0 },
        {
          keyframes: [
            { opacity: 1, duration: 0.2 },
            { xPercent: 100, duration: 1.6, ease: 'power1.inOut' },
            { opacity: 0, duration: 0.2 },
          ],
          repeat: -1,
          repeatDelay: 1.2,
          stagger: 0.2,
          scrollTrigger: { trigger: '.flow', start: 'top 75%' },
        },
      )

      gsap.from('.case-card', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.case-grid', start: 'top 80%', once: true },
      })

      gsap.from('.case-chip', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.03,
        scrollTrigger: { trigger: '.case-stack', start: 'top 88%', once: true },
      })

      gsap.from('.case-shot', {
        opacity: 0,
        y: 70,
        rotateX: 12,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.case-shot-wrap', start: 'top 82%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <section id="syncspac" ref={ref}>
      <div className="case-head">
        <div className="case-head-left">
          <span className="section-label">(flagship project)</span>
          <SplitReveal as="h2" className="case-title" type="chars" stagger={0.03}>
            SyncSpac
          </SplitReveal>
          <p className="case-tagline">{project.tagline}</p>
        </div>

        <div className="case-head-right">
          <span className="case-status">
            <span className="status-dot" />
            Deploying soon
          </span>
          {/* TODO: add the live link alongside this once deployed */}
          <p className="case-note">
            Full-stack TypeScript, built end to end — schema design, authorization, queues,
            real-time sync and billing.
          </p>
          {project.repo && (
            <a className="case-repo" href={project.repo} target="_blank" rel="noreferrer">
              <i className="ri-github-line" /> View source
            </a>
          )}
        </div>
      </div>

      <div className="case-metrics">
        {project.metrics.map((m) => {
          const numeric = Number(m.value)
          return (
            <div className="case-metric" key={m.label}>
              <span className="metric-value">
                {Number.isFinite(numeric) ? <Counter value={numeric} /> : m.value}
              </span>
              <span className="metric-label">{m.label}</span>
            </div>
          )
        })}
      </div>

      <div className="case-shot-wrap">
        <img className="case-shot" src={project.image} alt="SyncSpac login and board interface" />
      </div>

      <div className="flow">
        <span className="flow-caption">Request lifecycle</span>
        <div className="flow-row">
          {FLOW.map((node, i) => (
            <div className="flow-item" key={node.id}>
              <div className="flow-node pet-react">
                <i className={node.icon} />
                <strong>{node.label}</strong>
                <span>{node.sub}</span>
              </div>
              {i < FLOW.length - 1 && (
                <div className="flow-line">
                  <span className="flow-line-fill" />
                  <span className="flow-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="case-grid">
        {project.highlights.map((h) => (
          <article className="case-card pet-react" key={h.title}>
            <i className={h.icon} />
            <h3>{h.title}</h3>
            <p>{h.body}</p>
          </article>
        ))}
      </div>

      <div className="case-stack">
        <span className="section-label">(stack)</span>
        <div className="case-chips">
          {project.stack.map((tech) => (
            <span className="case-chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
