import type { SocialLink } from '@/types'

export const EMAIL = 'ashwanisingh9737@gmail.com'

export const RESUME_URL =
  'https://drive.google.com/file/d/1kVJ5n6LPMy_FckFJI1U72nYboYTXXWct/view?usp=sharing'

export const mailtoCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
  "Let's Connect",
)}&body=${encodeURIComponent('Hi Ashwani,\nI’d love to chat about')}`

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ashwani-singh-cs/',
    icon: 'ri-linkedin-line',
  },
  { label: 'GitHub', href: 'https://github.com/ashwanisingh011', icon: 'ri-github-line' },
  { label: 'X', href: 'https://x.com/CodeWithBCA', icon: 'ri-twitter-x-line' },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/ashwani_singh_007/',
    icon: 'ri-code-s-slash-line',
  },
]
