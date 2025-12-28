'use client'

import { motion } from 'framer-motion'
import styles from './Logo.module.css'

interface LogoProps {
  variant?: 'full' | 'mark' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export default function Logo({ 
  variant = 'full', 
  size = 'md',
  animated = false,
  className = '' 
}: LogoProps) {
  if (variant === 'mark') {
    return <StructuralMark size={size} animated={animated} className={className} />
  }
  
  if (variant === 'icon') {
    return <Icon size={size} className={className} />
  }

  return (
    <div className={`${styles.logo} ${styles[size]} ${className}`}>
      <StructuralMark size={size} animated={animated} />
      <span className={styles.wordmark}>ZONEX</span>
    </div>
  )
}

/**
 * STRUCTURAL FRAME MARK
 * Based on steel beam frames / reinforced concrete frames
 * Vertical columns + horizontal beams
 * The "Z" is IMPLIED by structure, not drawn as a letter
 */
function StructuralMark({ size, animated, className = '' }: { size: string; animated: boolean; className?: string }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      },
    },
  }

  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 80,
  }

  const width = sizeMap[size as keyof typeof sizeMap] || 56
  const strokeWidth = size === 'lg' ? 4 : size === 'md' ? 3 : 2.5

  // Structural frame: vertical columns + horizontal beams
  // Forms Z shape through engineering logic, not letterform
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left vertical column (structural) */}
      <motion.rect
        x="10"
        y="10"
        width="12"
        height="80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animated ? pathVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
      />
      
      {/* Top horizontal beam (structural) */}
      <motion.rect
        x="10"
        y="10"
        width="70"
        height="12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animated ? pathVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
        transition={animated ? { delay: 0.3 } : undefined}
      />
      
      {/* Diagonal structural brace (connects top-right to bottom-left) */}
      <motion.line
        x1="80"
        y1="22"
        x2="22"
        y2="78"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        variants={animated ? pathVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
        transition={animated ? { delay: 0.6 } : undefined}
      />
      
      {/* Bottom horizontal beam (structural) */}
      <motion.rect
        x="10"
        y="78"
        width="70"
        height="12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animated ? pathVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
        transition={animated ? { delay: 0.9 } : undefined}
      />
      
      {/* Right vertical column (structural) */}
      <motion.rect
        x="78"
        y="10"
        width="12"
        height="80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animated ? pathVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
        transition={animated ? { delay: 1.2 } : undefined}
      />
    </svg>
  )
}

/**
 * ICON VARIANT
 * Structural mark in square frame (construction signage style)
 */
function Icon({ size, className = '' }: { size: string; className?: string }) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 56,
  }

  const width = sizeMap[size as keyof typeof sizeMap] || 40

  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Square frame (construction signage) */}
      <rect x="5" y="5" width="90" height="90" stroke="currentColor" strokeWidth="3" fill="none" />
      {/* Structural mark inside */}
      <g transform="translate(15, 15) scale(0.7)">
        <rect x="10" y="10" width="12" height="80" stroke="currentColor" strokeWidth="3" fill="none" />
        <rect x="10" y="10" width="70" height="12" stroke="currentColor" strokeWidth="3" fill="none" />
        <line x1="80" y1="22" x2="22" y2="78" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <rect x="10" y="78" width="70" height="12" stroke="currentColor" strokeWidth="3" fill="none" />
        <rect x="78" y="10" width="12" height="80" stroke="currentColor" strokeWidth="3" fill="none" />
      </g>
    </svg>
  )
}