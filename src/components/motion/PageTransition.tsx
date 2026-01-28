"use client"

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { pageTransition, reducedMotionVariants } from '@/lib/motion'
import { getMotionLevel } from '@/lib/motionLevel'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const motionLevel = getMotionLevel()

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  if (reduceMotion || motionLevel === 0) {
    return <div className="relative">{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={reduceMotion ? reducedMotionVariants : pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={reduceMotion ? { duration: 0 } : undefined}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
