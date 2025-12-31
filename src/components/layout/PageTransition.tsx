'use client'

import { motion, useReducedMotion } from 'framer-motion'
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
  const shouldReduce = reduceMotion || isCoarse

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}
