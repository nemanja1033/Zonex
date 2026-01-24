import type { Variants } from 'framer-motion'

export const durations = {
  xs: 0.2,
  sm: 0.35,
  md: 0.5,
  lg: 0.8,
} as const

export const easing = {
  easeOut: [0.22, 0.72, 0, 1] as const,
  easeInOut: [0.45, 0, 0.2, 1] as const,
  expoOut: [0.16, 1, 0.3, 1] as const,
} as const

export const transition = {
  base: { duration: durations.md, ease: easing.easeOut },
  fast: { duration: durations.sm, ease: easing.easeOut },
  slow: { duration: durations.lg, ease: easing.expoOut },
  snap: { duration: durations.xs, ease: easing.easeInOut },
} as const

export const springs = {
  gentle: { type: 'spring', stiffness: 120, damping: 18, mass: 0.8 },
  snappy: { type: 'spring', stiffness: 240, damping: 20, mass: 0.6 },
} as const

export const viewport = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1 },
}

export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0.6 },
  visible: { scaleX: 1, opacity: 1 },
}

export const maskReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
}

export const textRevealWords: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
}

export const textRevealLines: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

export const textRevealItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export const staggerChildren = (stagger = 0.08, delay = 0.04): Variants => ({
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: 'var(--shadow-soft)' },
  hover: { y: -3, boxShadow: 'var(--shadow-card)' },
}

export const press: Variants = {
  rest: { scale: 1 },
  pressed: { scale: 0.98 },
}

export const navbarVariants: Variants = {
  rest: { backgroundColor: 'rgba(15, 16, 18, 0)', borderColor: 'rgba(255, 255, 255, 0)' },
  scrolled: { backgroundColor: 'rgba(15, 16, 18, 0.92)', borderColor: 'rgba(255, 255, 255, 0.08)' },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing.easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: easing.easeInOut } },
}

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  exit: { opacity: 1, y: 0, x: 0, scale: 1 },
}

export const resolveVariants = (reduceMotion: boolean, variants: Variants) =>
  reduceMotion ? reducedMotionVariants : variants
