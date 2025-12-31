"use client"

import { useEffect, useRef, useState } from 'react'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

export default function CursorAura() {
  const rafRef = useRef<number | null>(null)
  const [hidden, setHidden] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const isCoarse = useCoarsePointer()

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotion = () => setEnabled(!media.matches)
    handleMotion()
    media.addEventListener('change', handleMotion)

    const root = document.documentElement

    const update = (x: number, y: number) => {
      root.style.setProperty('--cursor-x', `${x}px`)
      root.style.setProperty('--cursor-y', `${y}px`)
      setHidden(false)
    }

    const handleMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        update(clientX, clientY)
        rafRef.current = null
      })
    }

    const handleLeave = () => {
      setHidden(true)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      media.removeEventListener('change', handleMotion)
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  if (!enabled || isCoarse) return null

  return <div className={`cursor-aura ${hidden ? 'cursor-aura--hidden' : ''}`} aria-hidden="true" />
}
