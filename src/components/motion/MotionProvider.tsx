"use client"

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'
import { transition } from '@/lib/motion'

type MotionProviderProps = {
  children: ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={transition.base}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
