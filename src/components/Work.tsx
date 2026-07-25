import { ProjectItem } from './ProjectItem'
import { SplitReveal } from './motion/SplitReveal'
import { projects } from '@/data/projects'

export function Work() {
  return (
    <section id="work">
      <div className="section-head">
        <span className="section-label">(selected work)</span>
        <SplitReveal as="h2" className="section-title" type="words" stagger={0.08}>
          Things I have built
        </SplitReveal>
      </div>

      <div className="work-list">
        {projects.map((project, i) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={i}
            isLast={i === projects.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
