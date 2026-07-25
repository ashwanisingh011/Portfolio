import { useState } from 'react'
import { useGSAP } from '@/lib/gsap'

import { Preloader } from '@/components/Preloader'
import { Pet } from '@/components/Pet'
import { ProgressRail } from '@/components/ProgressRail'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Work } from '@/components/Work'
import { SyncSpacCase } from '@/components/SyncSpacCase'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

import { useSmoothScroll, refreshTriggers } from '@/hooks/useSmoothScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function App() {
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  // ScrollSmoother must exist before any pinned trigger is created, which is
  // why it is created here rather than inside a section component.
  useSmoothScroll(!reduced)

  // Triggers measured while the preloader covered the page need re-measuring.
  useGSAP(() => {
    if (ready) refreshTriggers()
  }, [ready])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />

      {/* Fixed-position UI lives outside the smooth wrapper. */}
      <Pet />
      <ProgressRail />
      <div className="grain" aria-hidden="true" />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero ready={ready} />
            <Marquee />
            <Work />
            <SyncSpacCase />
            <About />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
