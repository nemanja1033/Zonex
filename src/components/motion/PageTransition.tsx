"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { pageTransition, reducedMotionVariants } from '@/lib/motion'
import RouteTransitionContext from '@/components/motion/RouteTransitionContext'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsTransitioning(false)
    }, reduceMotion ? 0 : 280)
    setIsTransitioning(true)
    return () => window.clearTimeout(timeout)
  }, [pathname, reduceMotion])

  return (
    <RouteTransitionContext.Provider value={isTransitioning}>
      <motion.div
        key={pathname}
        variants={reduceMotion ? reducedMotionVariants : pageTransition}
        initial="hidden"
        animate="visible"
        transition={reduceMotion ? { duration: 0 } : undefined}
        className="relative"
        onAnimationStart={() => setIsTransitioning(true)}
        onAnimationComplete={() => setIsTransitioning(false)}
      >
        {children}
      </motion.div>
    </RouteTransitionContext.Provider>
  )
}
