"use client"

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { easing } from '@/lib/motion'

type MotionProviderProps = {
  children: ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: easing }}
    >
      {children}
    </MotionConfig>
  )
}
