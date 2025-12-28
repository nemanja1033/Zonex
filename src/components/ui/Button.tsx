import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export default function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const springX = useSpring(magnetX, { stiffness: 220, damping: 16 })
  const springY = useSpring(magnetY, { stiffness: 220, damping: 16 })
  const styles = variant === 'primary' ? 'button-primary' : 'button-ghost'

  const classes = `group inline-flex items-center gap-3 font-mono text-micro uppercase tracking-micro ${styles} ${className}`

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width
    const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height
    magnetX.set(offsetX * 12)
    magnetY.set(offsetY * 10)
  }

  const handleLeave = () => {
    magnetX.set(0)
    magnetY.set(0)
  }

  const Wrapper = motion.span
  const wrapperProps = reduceMotion
    ? { className: 'inline-flex', style: { x: 0, y: 0 } }
    : {
        className: 'inline-flex',
        style: { x: springX, y: springY },
        onMouseMove: handleMove,
        onMouseLeave: handleLeave,
      }

  if (href) {
    return (
      <Wrapper {...wrapperProps}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper {...wrapperProps}>
      <button className={classes}>{children}</button>
    </Wrapper>
  )
}
