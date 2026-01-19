"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

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
  fadeUp: {
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeIn: {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -18, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 18, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  variant = 'fadeUp',
  rootMargin = '-120px 0px',
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
              hidden: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
              visible: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
            }
          : variantsMap[resolvedVariant]
      }
      transition={{
        duration: shouldReduce ? 0 : 0.65,
        delay,
        ease: [0.32, 0.72, 0, 1],
        staggerChildren: stagger,
      }}
    >
      {children}
    </motion.div>
  )
}
