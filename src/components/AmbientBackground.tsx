'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!containerRef.current || isMobile) return

    const orbs = containerRef.current.querySelectorAll('.orb')

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        duration: gsap.utils.random(15, 25),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 2,
      })
    })

    return () => {
      orbs.forEach((orb) => gsap.killTweensOf(orb))
    }
  }, [isMobile])

  // Skip rendering on mobile for performance
  if (isMobile) return null

  return (
    <div ref={containerRef} className="ambient-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Red orb - top right */}
      <div
        className="orb absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* Blue-white orb - center left */}
      <div
        className="orb absolute top-[30%] -left-[15%] w-[700px] h-[700px] rounded-full opacity-[0.025]"
        style={{
          background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
          filter: 'blur(140px)',
          willChange: 'transform',
        }}
      />

      {/* White orb - bottom center */}
      <div
        className="orb absolute -bottom-[20%] left-[30%] w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
