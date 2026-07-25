import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { Project } from '@/types'

interface ProjectItemProps {
  project: Project
  index: number
  isLast: boolean
}

const STATUS_LABEL: Record<Project['status'], string> = {
  live: 'Live',
  building: 'In progress',
  deploying: 'Deploying soon',
}

/**
 * A single project row. Keeps the original hover behaviour — a preview image
 * that tracks the cursor and tilts based on horizontal speed — rebuilt with
 * quickTo so it no longer allocates a tween per mousemove.
 */
export function ProjectItem({ project, index, isLast }: ProjectItemProps) {
  const rowRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const lastX = useRef(0)

  const setTop = useRef<((v: number) => void) | null>(null)
  const setLeft = useRef<((v: number) => void) | null>(null)
  const setRotate = useRef<((v: number) => void) | null>(null)

  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disabled = reduced || isMobile

  useGSAP(
    () => {
      if (disabled || !imgRef.current) return
      setTop.current = gsap.quickTo(imgRef.current, 'top', { duration: 0.6, ease: 'power3.out' })
      setLeft.current = gsap.quickTo(imgRef.current, 'left', { duration: 0.6, ease: 'power3.out' })
      setRotate.current = gsap.quickTo(imgRef.current, 'rotate', {
        duration: 0.6,
        ease: 'power3.out',
      })
    },
    { scope: rowRef, dependencies: [disabled] },
  )

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || !rowRef.current || !imgRef.current) return

    const rect = rowRef.current.getBoundingClientRect()
    const velocity = e.clientX - lastX.current
    lastX.current = e.clientX

    gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
    setTop.current?.(e.clientY - rect.top)
    setLeft.current?.(e.clientX - rect.left)
    setRotate.current?.(gsap.utils.clamp(-18, 18, velocity * 0.6))
  }

  const handleLeave = () => {
    if (disabled || !imgRef.current) return
    gsap.to(imgRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: 'power3.out' })
  }

  const href = project.link
  const interactive = Boolean(href)

  const content = (
    <>
      <img
        ref={imgRef}
        className="elem-preview"
        src={project.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <span className="elem-index">0{index + 1}</span>

      <div className="elem-main">
        <h2 className="elem-title">{project.title}</h2>
        <p className="elem-tagline">{project.tagline}</p>
      </div>

      <div className="elem-side">
        <span className={`elem-status status-${project.status}`}>
          <span className="status-dot" />
          {STATUS_LABEL[project.status]}
        </span>
        <span className="elem-year">{project.year}</span>
        {interactive && <i className="ri-arrow-right-up-line elem-arrow" />}
      </div>
    </>
  )

  const className = `elem ${isLast ? 'elem-last' : ''} ${project.featured ? 'elem-featured' : ''}`

  if (!interactive) {
    return (
      <div
        ref={rowRef as React.RefObject<HTMLDivElement>}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {content}
      </div>
    )
  }

  return (
    <a
      ref={rowRef as React.RefObject<HTMLAnchorElement>}
      className={className}
      href={href ?? undefined}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {content}
    </a>
  )
}
