"use client"

import type { ReactNode } from 'react'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  children: ReactNode
}

export default function Heading({ as = 'h2', className = '', children }: HeadingProps) {
  const Tag = as
  const base =
    as === 'h1'
      ? 'text-h1'
      : as === 'h2'
        ? 'text-h2'
        : as === 'h3'
          ? 'text-h3'
          : 'text-h4'

  return <Tag className={`font-display ${base} ${className}`}>{children}</Tag>
}
