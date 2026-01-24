"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { attachLenisPerfGuard, createLenisConfig, setLenisInstance, shouldEnableLenis } from '@/lib/lenis'

type LenisProviderProps = {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!shouldEnableLenis()) return

    const lenis = new Lenis(createLenisConfig())
    lenisRef.current = lenis
    setLenisInstance(lenis)

    const onDisable = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lenisRef.current?.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }

    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)
    attachLenisPerfGuard(onDisable, () => lenisRef.current)

    return () => {
      onDisable()
    }
  }, [])

  return <>{children}</>
}
