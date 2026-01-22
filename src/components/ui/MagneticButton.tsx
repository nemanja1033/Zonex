"use client"

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const frame = useRef<number | null>(null)
  const contentRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion || isCoarse) return
    if (!contentRef.current) return
    if (frame.current) return

    const target = event.currentTarget
    frame.current = window.requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      const strength = 0.2
      contentRef.current!.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
      frame.current = null
    })
  }

  const handleLeave = () => {
    if (!contentRef.current) return
    contentRef.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const styles = variant === 'primary' ? 'button-primary' : 'button-ghost'
  const classes = `magnetic-button group inline-flex min-h-[44px] items-center gap-3 rounded-md px-5 py-3 font-mono text-micro uppercase tracking-micro focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] active:scale-[0.98] ${styles} ${className}`

  const content = (
    <span ref={contentRef} className="magnetic-content inline-flex items-center gap-3">
      <span>{children}</span>
      <span className="inline-flex h-3 w-3 items-center justify-center transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3.5 8h9" strokeLinecap="round" />
          <path d="M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        prefetch={href.startsWith('/')}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {content}
    </button>
  )
}
