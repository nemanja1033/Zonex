import type { Variants } from 'framer-motion'

export const easing = [0.22, 0.72, 0, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const stagger = (delay = 0.08): Variants => ({
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
})

export const viewportOnce = { once: true, margin: '-15% 0px' }
