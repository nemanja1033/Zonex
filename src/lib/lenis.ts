import type Lenis from 'lenis'

export const LENIS_ENABLED = false

let lenisInstance: Lenis | null = null

export const setLenisInstance = (instance: Lenis | null) => {
  lenisInstance = instance
}

export const getLenisInstance = () => lenisInstance

export const shouldEnableLenis = () => {
  if (!LENIS_ENABLED || typeof window === 'undefined') return false
  const isFine = window.matchMedia('(pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isDesktop = window.innerWidth >= 1024
  return isFine && isDesktop && !prefersReduced
}

export const createLenisConfig = () => ({
  lerp: 0.1,
  smoothWheel: true,
  smoothTouch: false,
  syncTouch: false,
})

export const attachLenisPerfGuard = (
  onDisable: () => void,
  getLenis: () => Lenis | null
) => {
  let slowFrames = 0
  let last = performance.now()

  const check = (time: number) => {
    const delta = time - last
    last = time

    if (delta > 50) {
      slowFrames += 1
    } else if (slowFrames > 0) {
      slowFrames -= 1
    }

    if (slowFrames > 10) {
      onDisable()
      return
    }

    if (getLenis()) {
      requestAnimationFrame(check)
    }
  }

  requestAnimationFrame(check)
}
