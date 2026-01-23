"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { transition } from '@/lib/motion'

export default function RouteProgress() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <motion.div
      key={`route-progress-${pathname}`}
      className="route-progress"
      initial={{ scaleX: 0, opacity: 0.4 }}
      animate={{ scaleX: 1, opacity: [0.6, 1, 0] }}
      transition={{ ...transition.slow, times: [0, 0.5, 1] }}
    />
  )
}
