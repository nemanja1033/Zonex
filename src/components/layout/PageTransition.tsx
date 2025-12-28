'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

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
        initial={reduceMotion ? { opacity: 0, y: 12 } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduceMotion ? { opacity: 0, y: -8 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        className="relative"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-full bg-navy-900"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0.03 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: 'top' }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
