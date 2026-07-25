import { useMediaQuery } from './useMediaQuery'

/**
 * True when the viewport is at or below `breakpoint` px.
 *
 * Used to disable the cursor pet and swap layout-dependent animations on
 * touch devices, where a cursor-follower makes no sense.
 */
export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}
