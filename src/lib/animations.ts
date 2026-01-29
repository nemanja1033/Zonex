/**
 * Premium Animation System - 60fps Guaranteed
 * 
 * CRITICAL RULES:
 * - ONLY animate: transform, opacity, filter
 * - NEVER animate: width, height, background, border, margin, padding
 * - Use will-change ONLY during active animations
 * - Remove will-change after animation completes
 * - All animations must use GPU-accelerated properties
 */

// Easing curves
export const EASING = {
  // Standard easings
  linear: [0, 0, 1, 1] as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  
  // Power easings (use these primarily)
  power1: [0.25, 0.46, 0.45, 0.94] as const,
  power2: [0.55, 0.085, 0.68, 0.53] as const,
  power3: [0.645, 0.045, 0.355, 1] as const,
  power4: [0.77, 0, 0.175, 1] as const, // PRIMARY CHOICE
  
  // Special effects
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  bounce: [0.175, 0.885, 0.32, 1.275] as const,
  anticipate: [0.8, -0.6, 0.2, 1.6] as const,
  
  // Smooth
  smooth: [0.4, 0, 0.2, 1] as const,
  smoothOut: [0, 0, 0.2, 1] as const,
  smoothIn: [0.4, 0, 1, 1] as const,
} as const

// Duration presets (in milliseconds)
export const DURATION = {
  instant: 0,
  fast: 150,      // Micro-interactions
  base: 300,      // Standard transitions
  slow: 500,      // Emphasized transitions
  slower: 700,    // Heavy animations
  slowest: 1000,  // Hero animations
} as const

// Spring configurations
export const SPRING = {
  gentle: { stiffness: 100, damping: 20, mass: 1 },
  default: { stiffness: 150, damping: 25, mass: 1 },
  bouncy: { stiffness: 200, damping: 15, mass: 0.8 },
  snappy: { stiffness: 300, damping: 30, mass: 0.5 },
  stiff: { stiffness: 400, damping: 40, mass: 0.5 },
} as const

// Viewport settings for scroll-triggered animations
export const VIEWPORT = {
  default: { once: true, margin: '-100px' },
  tight: { once: true, margin: '-50px' },
  loose: { once: true, margin: '-200px' },
  always: { once: false, margin: '-100px' },
} as const

// Animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
}

export const fadeInRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

export const scaleInUp = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
}

export const maskReveal = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  animate: { clipPath: 'inset(0 0 0% 0)' },
  exit: { clipPath: 'inset(100% 0 0 0)' },
}

export const lineReveal = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 },
}

// Stagger container variants
export const staggerContainer = (staggerAmount = 0.08, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.slow / 1000,
      ease: EASING.power4,
    },
  },
}

// Split text animation helpers
export const textRevealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
}

export const textRevealWord = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASING.power4,
    },
  },
}

export const textRevealChar = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASING.power4,
    },
  },
}

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING.power4,
    },
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.3,
      ease: EASING.power4,
    },
  },
}

// Card hover effects
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASING.power4,
    },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: EASING.power4,
    },
  },
}

// 3D tilt effect helper
export const calculateTilt = (
  mouseX: number,
  mouseY: number,
  elementRect: DOMRect,
  maxTilt = 8
) => {
  const x = (mouseX - elementRect.left) / elementRect.width
  const y = (mouseY - elementRect.top) / elementRect.height
  
  const rotateX = (y - 0.5) * -maxTilt
  const rotateY = (x - 0.5) * maxTilt
  
  return { rotateX, rotateY }
}

// Magnetic effect helper
export const calculateMagneticOffset = (
  mouseX: number,
  mouseY: number,
  elementRect: DOMRect,
  strength = 0.15
) => {
  const x = mouseX - (elementRect.left + elementRect.width / 2)
  const y = mouseY - (elementRect.top + elementRect.height / 2)
  
  return {
    x: x * strength,
    y: y * strength,
  }
}

// Transition presets
export const transition = {
  instant: { duration: 0 },
  fast: { duration: DURATION.fast / 1000, ease: EASING.power4 },
  base: { duration: DURATION.base / 1000, ease: EASING.power4 },
  slow: { duration: DURATION.slow / 1000, ease: EASING.power4 },
  slower: { duration: DURATION.slower / 1000, ease: EASING.power4 },
  slowest: { duration: DURATION.slowest / 1000, ease: EASING.power4 },
  spring: { type: 'spring', ...SPRING.default },
  springBouncy: { type: 'spring', ...SPRING.bouncy },
  springSnappy: { type: 'spring', ...SPRING.snappy },
}

// Scroll-triggered animation presets
export const scrollReveal = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT.default,
    transition: transition.slow,
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT.default,
    transition: transition.slow,
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: VIEWPORT.default,
    transition: transition.slow,
  },
}

// Utility to create staggered delays
export const staggerDelay = (index: number, baseDelay = 0, stagger = 0.08) => 
  baseDelay + index * stagger

// Utility to create responsive animation values
export const responsiveAnimation = (
  mobileValue: number,
  desktopValue: number,
  isMobile: boolean
) => isMobile ? mobileValue : desktopValue

// Named export with all utilities
export const animations = {
  EASING,
  DURATION,
  SPRING,
  VIEWPORT,
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInUp,
  maskReveal,
  lineReveal,
  staggerContainer,
  staggerItem,
  textRevealContainer,
  textRevealWord,
  textRevealChar,
  pageTransition,
  cardHover,
  calculateTilt,
  calculateMagneticOffset,
  transition,
  scrollReveal,
  staggerDelay,
  responsiveAnimation,
}
