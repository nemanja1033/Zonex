"use client"

import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { pageTransition } from '@/lib/motion'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const controls = useAnimation()

  useEffect(() => {
    if (reduceMotion) {
      controls.set('visible')
      return
    }
    const run = async () => {
      await controls.start('hidden')
      await controls.start('visible')
    }
    run()
  }, [controls, pathname, reduceMotion])

  return (
    <motion.div
      variants={pageTransition}
      initial="visible"
      animate={controls}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 0.72, 0, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}
