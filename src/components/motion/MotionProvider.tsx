"use client"

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

type MotionProviderProps = {
  children: ReactNode
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      {children}
    </MotionConfig>
  )
}
