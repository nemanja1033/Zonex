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
]

// Each slide has different transform for variety (desktop only)
const transforms = [
  { start: 'scale(1.0) translate(0%, 0%)', end: 'scale(1.08) translate(-1%, -1%)' },
  { start: 'scale(1.05) translate(1%, 0%)', end: 'scale(1.0) translate(-1%, 1%)' },
  { start: 'scale(1.0) translate(-1%, 1%)', end: 'scale(1.07) translate(1%, -1%)' },
]

const DURATION = 8000 // 8s per slide
const FADE_DURATION = 1500 // 1.5s crossfade

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [key, setKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())
    // No resize listener needed - check only on mount
  }, [])

  const advance = useCallback(() => {
    setTransitioning(true)
    fadeTimerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
      setNext((prev) => (prev + 1) % slides.length)
      setTransitioning(false)
      setKey((k) => k + 1)
    }, FADE_DURATION)
  }, [])

  // Only run JS slideshow on desktop
  useEffect(() => {
    if (isMobile) return // CSS handles mobile slideshow

    timerRef.current = setInterval(advance, DURATION)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [advance, isMobile])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* MOBILE: CSS-only crossfade slideshow (no JS, pure GPU) */}
      <div className="hero-slideshow-mobile md:hidden absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={50}
            priority={i === 0}
          />
        ))}
      </div>

      {/* DESKTOP: JS-powered Ken Burns slideshow */}
      <div className="hidden md:block">
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
      </div>

      {/* DARK OVERLAY — 3 layers for depth */}
      {/* Layer 1: Even darkening */}
      <div className="absolute inset-0 bg-black/[0.78]" />

      {/* Layer 2: Gradient darker at top and bottom (for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1114] via-transparent to-[#0F1114]/40" />

      {/* Layer 3: Subtle red tint (brand warmth) */}
      <div className="absolute inset-0 bg-red-950/[0.06]" />

      {/* PROGRESS BAR — desktop only */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05]">
        <div
          key={`progress-${key}`}
          className="h-full bg-[#DC2626]/40 hero-progress-bar"
          style={{ animationDuration: `${DURATION}ms` }}
        />
      </div>

      {/* MOBILE: Progress dots */}
      <div className="hero-dots md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <span className="hero-dot" />
        <span className="hero-dot" />
        <span className="hero-dot" />
      </div>
    </div>
  )
}
