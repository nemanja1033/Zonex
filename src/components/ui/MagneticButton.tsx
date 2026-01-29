"use client"

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { EASING, SPRING } from '@/lib/animations'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const frame = useRef<number | null>(null)
  const contentRef = useRef<HTMLSpanElement | null>(null)
  const buttonRef = useRef<HTMLElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

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
        const strength = 0.35
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
    setIsHovered(false)
  }

  const handleEnter = () => {
    setIsHovered(true)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#FF3B30] text-white hover:shadow-[0_8px_32px_rgba(255,59,48,0.4)] border border-[#FF3B30]'
      case 'secondary':
        return 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_4px_24px_rgba(255,255,255,0.1)]'
      case 'ghost':
        return 'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/30'
      default:
        return 'bg-[#FF3B30] text-white'
    }
  }

  const classes = `magnetic-button group relative inline-flex min-h-[48px] items-center gap-3 rounded-full px-7 py-3.5 font-medium text-sm uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E] active:scale-[0.97] transition-all duration-300 overflow-hidden ${getVariantStyles()} ${className}`

  const content = (
    <>
      {/* Shine effect */}
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        initial={{ x: '-200%' }}
        animate={isHovered && !reduceMotion ? { x: '200%' } : { x: '-200%' }}
        transition={{ 
          duration: 0.7, 
          ease: 'linear',
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.5
        }}
      />

      <span ref={contentRef} className="magnetic-content relative inline-flex items-center gap-3 will-change-transform">
        <span>{children}</span>
        <motion.span 
          className="inline-flex h-4 w-4 items-center justify-center"
          animate={isHovered ? { x: 4, scale: 1.1 } : { x: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: EASING.power4 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 8h9" strokeLinecap="round" />
            <path d="M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
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
        onMouseEnter={handleEnter}
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
      onMouseEnter={handleEnter}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
