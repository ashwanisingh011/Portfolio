import type { SkillGroup, Stat } from '@/types'

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'C++', 'HTML', 'CSS', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React 19', 'Svelte', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'GSAP', 'Vite'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'MySQL', 'Socket.IO', 'BullMQ', 'Redis', 'JWT'],
  },
  {
    label: 'Infra & Tools',
    items: ['Docker', 'AWS', 'Firebase', 'Cloudinary', 'Git', 'Vercel', 'Netlify'],
  },
]

/** Flat list used by the scrolling marquee */
export const marqueeSkills: string[] = skillGroups.flatMap((g) => g.items)

export const stats: Stat[] = [
  { value: 15, suffix: '', label: 'Open-source PRs merged into Meshery' },
  { value: 28, suffix: '', label: 'Schemas modelled in SyncSpac' },
  { value: 7, suffix: 'mo', label: 'Internship experience shipped' },
  { value: 3, suffix: '+', label: 'Full-stack products built' },
]

export const currentlyLearning: string[] = [
  'System design',
  'DSA',
  'Open Source',
  'Backend',
]
