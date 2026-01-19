"use client"

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={
          reduceMotion
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 14, filter: 'blur(6px)' }
        }
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={
          reduceMotion
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: -10, filter: 'blur(4px)' }
        }
        transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
