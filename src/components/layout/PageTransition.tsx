'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const isLite = isCoarse && !reduceMotion

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={
            shouldReduce
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : isLite
                ? { opacity: 0, y: 6, filter: 'blur(2px)' }
                : { opacity: 0, y: 16, filter: 'blur(6px)' }
          }
          animate={
            shouldReduce
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          exit={
            shouldReduce
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : isLite
                ? { opacity: 0, y: -6, filter: 'blur(2px)' }
                : { opacity: 0, y: -12, filter: 'blur(6px)' }
          }
          transition={
            shouldReduce
              ? { duration: 0 }
              : isLite
                ? { duration: 0.25, ease: [0.22, 0.72, 0, 1] }
                : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }
          }
          className="relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {!shouldReduce && (
        <motion.div
          key={`progress-${pathname}`}
          className="route-progress"
          initial={{ scaleX: 0, opacity: 0.4 }}
          animate={{ scaleX: 1, opacity: [0.6, 1, 0] }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], times: [0, 0.5, 1] }}
        />
      )}
    </>
  )
}
