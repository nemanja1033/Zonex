'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const slides = [
  {
    src: '/images/projects/kfc-zrenjanin/kfc-zrenjanin-03.jpg',
    alt: 'KFC restoran, BIG Shopping Centar Zrenjanin — Zonex Inženjering',
  },
  {
    src: '/images/projects/mcdonalds-ruklada/mcdonalds-ruklada-05.jpeg',
    alt: "McDonald's Ruklada, autoput Miloš Veliki — Zonex Inženjering",
  },
  {
    src: '/images/projects/mcdonalds-zrenjanin/mcdonalds-zrenjanin-03.jpg',
    alt: "McDonald's Zrenjanin — Zonex Inženjering",
  },
  {
    src: '/images/projects/knez-petrol/knez-petrol-01.jpeg',
    alt: 'Knez Petrol benzinska stanica, Šimanovci — Zonex Inženjering',
  },
]

// Each slide has different transform for variety
const transforms = [
  { start: 'scale(1.0) translate(0%, 0%)', end: 'scale(1.08) translate(-1%, -1%)' },
  { start: 'scale(1.05) translate(1%, 0%)', end: 'scale(1.0) translate(-1%, 1%)' },
  { start: 'scale(1.0) translate(-1%, 1%)', end: 'scale(1.07) translate(1%, -1%)' },
  { start: 'scale(1.03) translate(0%, -1%)', end: 'scale(1.1) translate(-1%, 0%)' },
]

const DURATION = 8000 // 8s per slide
const FADE_DURATION = 1500 // 1.5s crossfade

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [key, setKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const advance = useCallback(() => {
    setTransitioning(true)
    fadeTimerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
      setNext((prev) => (prev + 1) % slides.length)
      setTransitioning(false)
      setKey((k) => k + 1)
    }, FADE_DURATION)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(advance, DURATION)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [advance])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* CURRENT SLIDE */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <div
          key={`current-${key}`}
          className="absolute inset-0 hero-kb-animate"
          style={
            {
              '--kb-start': transforms[current % transforms.length].start,
              '--kb-end': transforms[current % transforms.length].end,
              animationDuration: `${DURATION}ms`,
            } as React.CSSProperties
          }
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={60}
            priority={current === 0}
          />
        </div>
      </div>

      {/* NEXT SLIDE (underneath, visible when current fades) */}
      <div className="absolute inset-0 -z-10">
        <div
          key={`next-${key}`}
          className="absolute inset-0 hero-kb-animate"
          style={
            {
              '--kb-start': transforms[next % transforms.length].start,
              '--kb-end': transforms[next % transforms.length].end,
              animationDuration: `${DURATION}ms`,
            } as React.CSSProperties
          }
        >
          <Image
            src={slides[next % slides.length].src}
            alt={slides[next % slides.length].alt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={60}
          />
        </div>
      </div>

      {/* DARK OVERLAY — 3 layers for depth */}
      {/* Layer 1: Even darkening */}
      <div className="absolute inset-0 bg-black/[0.78]" />

      {/* Layer 2: Gradient darker at top and bottom (for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1114] via-transparent to-[#0F1114]/40" />

      {/* Layer 3: Subtle red tint (brand warmth) */}
      <div className="absolute inset-0 bg-red-950/[0.06]" />

      {/* PROGRESS BAR — thin red line at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
        <div
          key={`progress-${key}`}
          className="h-full bg-[#DC2626]/40 hero-progress-bar"
          style={{ animationDuration: `${DURATION}ms` }}
        />
      </div>
    </div>
  )
}
