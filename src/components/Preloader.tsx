'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()

    // Fill the progress bar
    tl.to('.preloader-fill', {
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    })

    // Slide the preloader up
    tl.to('.preloader', {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => setVisible(false),
    })

    return () => {
      tl.kill()
    }
  }, [])

  if (!visible) return null

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8">
      <span className="text-white font-bold text-xl tracking-[0.3em] uppercase">
        ZONEX
      </span>
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
        <div className="preloader-fill absolute inset-0 bg-[#DC2626] origin-left scale-x-0" />
      </div>
    </div>
  )
}
