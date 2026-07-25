import { useMediaQuery } from './useMediaQuery'

/**
 * Tracks the user's reduced-motion preference and keeps tracking it — someone
 * can flip the OS setting while the page is open.
 *
 * Every animated component in this app reads this and renders its final state
 * immediately when it is true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
