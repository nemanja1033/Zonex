"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type SectionRailProps = {
  className?: string
}

export default function SectionRail({ className = '' }: SectionRailProps) {
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
      { rootMargin: '-20% 0px', threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <div
      ref={ref}
      className={`section-rail ${active ? 'section-rail--active' : ''} ${className}`}
      aria-hidden="true"
    >
      <span className="section-rail-dot" />
    </div>
  )
}
