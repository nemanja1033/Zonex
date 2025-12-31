"use client"

import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type MotionGateProps = {
  children: ReactNode
}

export default function MotionGate({ children }: MotionGateProps) {
  const isCoarse = useCoarsePointer()

  return <MotionConfig reducedMotion={isCoarse ? 'always' : 'never'}>{children}</MotionConfig>
}
