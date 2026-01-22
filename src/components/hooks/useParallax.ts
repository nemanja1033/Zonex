"use client"

import { useReducedMotion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

export default function useParallax(targetRef: RefObject<HTMLElement>, distance = 16) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const yRange = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const staticY = useMotionValue(0)
  const y = reduceMotion || isCoarse ? staticY : yRange

  return { y }
}
