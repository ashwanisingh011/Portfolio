import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'meshery',
    role: 'Open Source Contributor',
    org: 'Meshery (Layer5)',
    period: '15 PRs merged',
    kind: 'opensource',
    body: 'Contributing across the full stack of a CNCF cloud-native management platform — React UI, the E2E testing framework, and the Golang backend. Migrated components to the Sistent design system, moved entire E2E suites to TypeScript, and fixed routing and documentation architecture bugs.',
    tags: ['React', 'TypeScript', 'Golang', 'Playwright', 'Hugo'],
    link: 'https://github.com/meshery/meshery/pulls?q=is%3Apr+author%3Aashwanisingh011+is%3Amerged',
  },
  {
    id: 'staytuned',
    role: 'Software Development Intern',
    org: 'Staytuned LLP',
    period: '3 months',
    kind: 'work',
    body: 'Backend and cloud-integrated development with Firebase for auth and data. Containerised development environments with Docker and built automation workflows using Dagger.',
    tags: ['Firebase', 'Docker', 'Dagger', 'Node.js'],
    link: 'https://staytuned.website/',
  },
  {
    id: 'frontend-intern',
    role: 'Frontend Developer Intern',
    org: 'Advrd',
    period: '4 months',
    kind: 'work',
    body: 'Built responsive, interactive UI components in Svelte.js. Shipped real features against real deadlines and learned how a codebase behaves when other people depend on it.',
    tags: ['Svelte.js', 'JavaScript', 'CSS'],
    link: 'https://www.advrd.com/',
  },
  {
    id: 'bca',
    role: 'BCA — Computer Applications',
    org: 'Silver Oak University',
    period: 'Present',
    kind: 'education',
    body: 'Studying computer applications while building full-stack projects in parallel. Most of what I know came from shipping things, but the fundamentals came from here.',
    tags: ['DSA', 'C++', 'DBMS'],
    link: 'https://silveroakuni.ac.in/',
  },
]
