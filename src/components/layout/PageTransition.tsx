'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? { opacity: 0, y: 12 } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduceMotion ? { opacity: 0, y: -6 } : { opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        className="relative"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-navy-900"
          initial={reduceMotion ? { scaleY: 0 } : { scaleY: 1 }}
          animate={reduceMotion ? { scaleY: 0 } : { scaleY: 0 }}
          exit={reduceMotion ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: 'top' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.55),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(10,10,12,0.45),transparent_60%)]" />
          <motion.svg
            className="absolute left-[8%] top-[35%] h-16 w-40 text-white/70"
            viewBox="0 0 160 64"
            fill="none"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <motion.path
              d="M4 48L4 12L124 12L124 32L156 32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? undefined : { pathLength: 0 }}
              animate={reduceMotion ? undefined : { pathLength: 1 }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            />
          </motion.svg>
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,rgba(155,14,28,0.9),rgba(10,10,12,0.9),transparent)]"
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
