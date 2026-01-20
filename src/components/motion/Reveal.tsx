"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { easing, fadeIn, fadeUp } from '@/lib/motion'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'left' | 'right' | 'scale'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  variant?: RevealVariant
  rootMargin?: string
  once?: boolean
  stagger?: number
  'data-reveal'?: RevealVariant
}

const variantsMap = {
  fadeUp,
  fadeIn,
  left: {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 12 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'fadeUp',
  rootMargin = '-15% 0px',
  once = true,
  stagger,
  'data-reveal': dataReveal,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion || isCoarse
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const resolvedVariant = dataReveal ?? variant

  useEffect(() => {
    if (shouldReduce) {
      setInView(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { rootMargin, threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, rootMargin, shouldReduce])

  return (
    <motion.div
      ref={ref}
      className={className}
      data-visible={inView ? 'true' : 'false'}
      initial={shouldReduce ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={
        shouldReduce
          ? {
              hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
              visible: { opacity: 1, y: 0, x: 0, scale: 1 },
            }
          : variantsMap[resolvedVariant]
      }
      transition={{
        duration: shouldReduce ? 0 : 0.6,
        delay,
        ease: easing,
        staggerChildren: stagger,
      }}
    >
      {children}
    </motion.div>
  )
}
