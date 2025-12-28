"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.75, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}
