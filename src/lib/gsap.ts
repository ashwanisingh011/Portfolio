import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

/**
 * Single registration point for every GSAP plugin used in the app.
 *
 * Registering from multiple modules is harmless on its own, but React 19's
 * StrictMode double-mounts in development — routing every plugin through one
 * module keeps registration order deterministic and makes it obvious what the
 * animation surface actually is.
 */
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  ScrambleTextPlugin,
)

/** Matches the CSS custom easing used across the site. */
export const EASE = 'expo.out'
export const EASE_INOUT = 'expo.inOut'

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  ScrambleTextPlugin,
}
