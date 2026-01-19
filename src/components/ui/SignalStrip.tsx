"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type SignalStripProps = {
  className?: string
}

export default function SignalStrip({ className = '' }: SignalStripProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduceMotion) {
      setActive(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-120px 0px', threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <div ref={ref} className={`signal-strip ${active ? 'signal-strip--active' : ''} ${className}`}>
      <span className="signal-dot" aria-hidden="true" />
    </div>
  )
}
