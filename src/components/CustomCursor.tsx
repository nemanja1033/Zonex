'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const boundElementsRef = useRef(new Set<Element>())

  const enter = useCallback(() => {
    gsap.to(ring.current, { scale: 3, opacity: 0.06, duration: 0.3, overwrite: true })
    gsap.to(dot.current, { scale: 0.5, duration: 0.3, overwrite: true })
  }, [])

  const leave = useCallback(() => {
    gsap.to(ring.current, { scale: 1, opacity: 0.2, duration: 0.3, overwrite: true })
    gsap.to(dot.current, { scale: 1, duration: 0.3, overwrite: true })
  }, [])

  const bindHoverEvents = useCallback(() => {
    // Use requestIdleCallback for non-blocking binding
    const bind = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        if (!boundElementsRef.current.has(el)) {
          el.addEventListener('mouseenter', enter)
          el.addEventListener('mouseleave', leave)
          boundElementsRef.current.add(el)
        }
      })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(bind, { timeout: 500 })
    } else {
      setTimeout(bind, 100)
    }
  }, [enter, leave])

  useEffect(() => {
    // Only enable on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const move = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08, overwrite: true })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out', overwrite: true })
    }

    window.addEventListener('mousemove', move, { passive: true })

    // Initial bind
    bindHoverEvents()

    // Re-bind when DOM changes (debounced)
    let debounceTimer: NodeJS.Timeout
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(bindHoverEvents, 200)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      clearTimeout(debounceTimer)
      // Clean up all bound event listeners
      boundElementsRef.current.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      boundElementsRef.current.clear()
    }
  }, [bindHoverEvents, enter, leave]) // Stable callbacks, effect runs once

  return (
    <>
      {/* Small dot - follows cursor precisely */}
      <div
        ref={dot}
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-[#DC2626] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
      />
      {/* Larger ring - follows with delay */}
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-20 hidden lg:block"
      />
    </>
  )
}
