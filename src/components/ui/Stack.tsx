"use client"

import type { ReactNode } from 'react'

type StackProps = {
  children: ReactNode
  className?: string
  gap?: 'sm' | 'md' | 'lg'
}

const gaps: Record<NonNullable<StackProps['gap']>, string> = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
}

export default function Stack({ children, className = '', gap = 'md' }: StackProps) {
  return <div className={`flex flex-col ${gaps[gap]} ${className}`}>{children}</div>
}
