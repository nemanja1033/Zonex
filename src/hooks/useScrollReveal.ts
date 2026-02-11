'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    // Use smaller animations on mobile for better performance
    const isMobile = window.innerWidth < 768
    const offset = isMobile ? 15 : 40
    const duration = isMobile ? 0.4 : 0.8

    const elements = ref.current.querySelectorAll('[data-reveal]')

    elements.forEach((el) => {
      const direction = el.getAttribute('data-reveal') || 'up'
      const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0')

      const from: gsap.TweenVars = { opacity: 0 }
      if (direction === 'up') from.y = offset
      if (direction === 'left') from.x = -offset
      if (direction === 'right') from.x = offset

      gsap.fromTo(el, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })
  }, { scope: ref })

  return ref
}
