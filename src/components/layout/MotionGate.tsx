"use client"

import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'

type MotionGateProps = {
  children: ReactNode
}

export default function MotionGate({ children }: MotionGateProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
