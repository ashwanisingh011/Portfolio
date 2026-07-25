export type ProjectStatus = 'live' | 'building' | 'deploying'

export interface ProjectMetric {
  /** The number or short value, e.g. "28" */
  value: string
  /** What the number means, e.g. "Mongoose schemas" */
  label: string
}

export interface ProjectHighlight {
  title: string
  body: string
  /** Remixicon class name, e.g. "ri-shield-keyhole-line" */
  icon: string
}

export interface Project {
  id: string
  title: string
  /** One line shown under the title on hover */
  tagline: string
  year: string
  image: string
  status: ProjectStatus
  /** Live deployment. Null while the project is still being deployed. */
  link: string | null
  repo: string | null
  /** Flagship projects get a dedicated case-study section */
  featured: boolean
  stack: string[]
  metrics: ProjectMetric[]
  highlights: ProjectHighlight[]
}

export type ExperienceKind = 'work' | 'opensource' | 'education'

export interface Experience {
  id: string
  role: string
  org: string
  /** Display string, e.g. "2024 — 2025" */
  period: string
  kind: ExperienceKind
  body: string
  tags: string[]
  link: string | null
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Stat {
  value: number
  /** Rendered after the counted number, e.g. "+" or "k" */
  suffix: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  /** Remixicon class name */
  icon: string
}

export type PetMood = 'follow' | 'excited' | 'sleep'
