"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  rootMargin?: string
  once?: boolean
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
  slideInLeft: {
    hidden: { opacity: 0, x: -18, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 18, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scaleIn: {
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
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const isLite = isCoarse && !reduceMotion
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

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
      initial={shouldReduce ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={
        shouldReduce
          ? {
              hidden: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
              visible: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
            }
          : variantsMap[variant]
      }
      transition={
        shouldReduce
          ? { duration: 0 }
          : isLite
            ? { duration: 0.35, delay: Math.min(delay, 0.12), ease: [0.22, 0.72, 0, 1] }
            : { duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }
      }
    >
      {children}
    </motion.div>
  )
}
