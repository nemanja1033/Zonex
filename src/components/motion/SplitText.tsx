"use client"

import type { ReactNode } from 'react'

type SplitTextProps = {
  text: string
  type?: 'words' | 'lines'
  className?: string
  itemClassName?: string
  itemWrapperClassName?: string
  srOnly?: boolean
}

const joiner = (type: SplitTextProps['type']) => (type === 'words' ? '\u00A0' : '')

export default function SplitText({
  text,
  type = 'words',
  className = '',
  itemClassName = '',
  itemWrapperClassName = '',
  srOnly = true,
}: SplitTextProps) {
  const parts = type === 'lines' ? text.split('\n') : text.split(' ')
  const space = joiner(type)

  return (
    <span className={className} aria-label={text} role="text">
      {srOnly ? <span className="sr-only">{text}</span> : null}
      <span aria-hidden="true">
        {parts.map((part, index) => (
          <span
            key={`${part}-${index}`}
            className={type === 'lines' ? `block overflow-hidden ${itemWrapperClassName}` : itemWrapperClassName}
          >
            <span className={`inline-block will-change-transform ${itemClassName}`}>{part}{space}</span>
          </span>
        ))}
      </span>
    </span>
  )
}

export function SplitTextSlots({ children }: { children: ReactNode }) {
  return <span className="inline-block will-change-transform">{children}</span>
}
