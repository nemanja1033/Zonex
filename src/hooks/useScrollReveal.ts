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

    const elements = ref.current.querySelectorAll('[data-reveal]')

    elements.forEach((el) => {
      const direction = el.getAttribute('data-reveal') || 'up'
      const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0')

      const from: gsap.TweenVars = { opacity: 0 }
      if (direction === 'up') from.y = 40
      if (direction === 'left') from.x = -40
      if (direction === 'right') from.x = 40

      gsap.fromTo(el, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
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
