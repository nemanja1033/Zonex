"use client"

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
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
  const buttonRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion || isCoarse) return
    if (!contentRef.current || !buttonRef.current) return
    if (frame.current) return

    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 50

    if (distance < maxDistance) {
      frame.current = window.requestAnimationFrame(() => {
        const strength = 0.3
        contentRef.current!.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
        contentRef.current!.style.transition = 'transform 0.15s ease-out'
        frame.current = null
      })
    }
  }

  const handleLeave = () => {
    if (!contentRef.current) return
    contentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)'
    contentRef.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--brand-red)] text-white hover:shadow-[0_0_40px_rgba(194,59,59,0.3)] border border-[var(--brand-red)]'
      case 'secondary':
        return 'bg-white text-[var(--text-primary)] border-2 border-[var(--brand-red)] hover:shadow-[0_0_30px_rgba(194,59,59,0.15)]'
      case 'ghost':
        return 'button-ghost'
      default:
        return 'button-primary'
    }
  }

  const classes = `magnetic-button group relative inline-flex min-h-[44px] items-center gap-3 rounded-full px-6 py-3 font-mono text-micro uppercase tracking-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2 active:scale-[0.97] transition-all duration-300 overflow-hidden ${getVariantStyles()} ${className}`

  const content = (
    <>
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out pointer-events-none" />

      <span ref={contentRef} className="magnetic-content relative inline-flex items-center gap-3 will-change-transform">
        <span>{children}</span>
        <span className="inline-flex h-3 w-3 items-center justify-center transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 8h9" strokeLinecap="round" />
            <path d="M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        ref={buttonRef as any}
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
    <button
      ref={buttonRef as any}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {content}
    </button>
  )
}
