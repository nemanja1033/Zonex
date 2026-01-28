export type MotionLevel = 0 | 1 | 2

const parseLevel = (value: string | undefined): MotionLevel => {
  if (value === '1') return 1
  if (value === '2') return 2
  return 0
}

export const getMotionLevel = (): MotionLevel => {
  if (typeof process === 'undefined') return 0
  return parseLevel(process.env.NEXT_PUBLIC_MOTION_LEVEL)
}

export const isMotionLevel = (level: MotionLevel) => getMotionLevel() === level

export const allowGsap = () => getMotionLevel() >= 1

export const allowR3f = () => getMotionLevel() >= 2

export const allowLenis = () =>
  getMotionLevel() >= 2 && process.env.NEXT_PUBLIC_LENIS === '1'
