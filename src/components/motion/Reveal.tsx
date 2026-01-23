"use client"

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  fadeIn,
  fadeUp,
  lineReveal,
  maskReveal,
  scaleIn,
  transition,
  viewport,
} from '@/lib/motion'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'lineReveal' | 'maskReveal' | 'scale'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  variant?: RevealVariant
  stagger?: number
  'data-reveal'?: RevealVariant
}

const variantsMap = {
  fadeUp,
  fadeIn,
  lineReveal,
  maskReveal,
  scale: scaleIn,
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'fadeUp',
  stagger,
  'data-reveal': dataReveal,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const resolvedVariant = dataReveal ?? variant

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variantsMap[resolvedVariant]}
      transition={{ ...transition.base, delay, staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  )
}
