import type { Project } from '@/types'

import syncspacImg from '@/assets/SyncSpac.jpg'
import expenseTrackerImg from '@/assets/expensetracker.jpg'
import generativeAiImg from '@/assets/generativeAI.jpg'

export const projects: Project[] = [
  {
    id: 'syncspac',
    title: 'SyncSpac',
    tagline: 'Enterprise multi-tenant project management & collaboration platform',
    year: '2026',
    image: syncspacImg,
    status: 'deploying',
    // TODO: add the live URL once deployed
    link: null,
    repo: 'https://github.com/ashwanisingh011/SyncSpac',
    featured: true,
    stack: [
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Socket.IO',
      'BullMQ',
      'Redis',
      'React 19',
      'Tailwind v4',
      'Cloudinary',
      'Razorpay',
    ],
    metrics: [
      { value: '28', label: 'Mongoose schemas' },
      { value: '6', label: 'RBAC role tiers' },
      { value: '3', label: 'Subscription tiers' },
      { value: '2FA', label: 'TOTP secured' },
    ],
    highlights: [
      {
        title: 'Multi-tenant isolation',
        body: 'Organizations and workspaces partition every query. Tenant boundaries are enforced at the middleware layer so no request can read across an org it does not belong to.',
        icon: 'ri-building-line',
      },
      {
        title: 'RBAC + ABAC authorization',
        body: 'Six role tiers from Super Admin down to Guest. Dynamic middleware evaluates permission at both the resource level and the property level, scoped by ownership.',
        icon: 'ri-shield-keyhole-line',
      },
      {
        title: 'Real-time collaboration',
        body: 'Socket.IO rooms broadcast Kanban column moves, task assignments, presence and typing indicators. The client applies updates optimistically with automatic fallback recovery.',
        icon: 'ri-broadcast-line',
      },
      {
        title: 'Async queue workers',
        body: 'BullMQ on Redis handles transactional email, batch reports and webhooks off the request path. A cron engine expands RecurringTask blueprints into real task instances.',
        icon: 'ri-stack-line',
      },
      {
        title: 'Token rotation & sessions',
        body: 'Short-lived JWT access tokens paired with refresh tokens in HTTP-only cookies, backed by revocable session records and TOTP two-factor via otplib.',
        icon: 'ri-key-2-line',
      },
      {
        title: 'Quota-aware billing',
        body: 'Free, Pro and Business tiers with live INR/USD conversion, promo validation and quota middleware that rejects project creation or uploads past the tier ceiling.',
        icon: 'ri-bank-card-line',
      },
    ],
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    tagline: 'Full-stack MERN budgeting app with JWT auth and live dashboards',
    year: '2025',
    image: expenseTrackerImg,
    status: 'live',
    link: 'https://expense-trakker.netlify.app/',
    repo: null,
    featured: false,
    stack: ['React 18', 'Vite', 'React Router v6', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    metrics: [],
    highlights: [],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    tagline: 'A conversational AI interface built from scratch',
    year: '2025',
    image: generativeAiImg,
    status: 'live',
    link: 'https://ashwanisinghproject1.netlify.app/',
    repo: null,
    featured: false,
    stack: ['React', 'JavaScript', 'REST APIs'],
    metrics: [],
    highlights: [],
  },
]

const featured = projects.find((p) => p.featured)

if (!featured) {
  throw new Error('No featured project defined — the case-study section needs one.')
}

export const featuredProject: Project = featured
