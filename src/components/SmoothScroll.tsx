'use client'

import { useEffect, useRef, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const prevPathnameRef = useRef(pathname)

  // CRITICAL: Kill ScrollTriggers DURING render, BEFORE unmount cleanup runs
  // This makes the component cleanup much faster since triggers are already dead
  useMemo(() => {
    if (prevPathnameRef.current !== pathname) {
      // Route changed! Kill all ScrollTriggers immediately
      ScrollTrigger.getAll().forEach(t => t.kill(false)) // false = don't restore styles
      gsap.globalTimeline.clear() // Clear any pending animations
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Handle route change - kill ScrollTriggers and reset scroll
  useEffect(() => {
    // Kill all ScrollTriggers immediately to prevent expensive cleanup during unmount
    // This is much faster than letting each component kill its own triggers
    const triggers = ScrollTrigger.getAll()
    triggers.forEach(trigger => trigger.kill())

    // Reset scroll position
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }

    // Refresh ScrollTrigger after new page content loads
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(refreshTimer)
  }, [pathname])

  return <>{children}</>
}
