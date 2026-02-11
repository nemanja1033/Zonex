'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { site } from '../../../data/site'
import AnimatedCounter from '../AnimatedCounter'
import HeroSlideshow from './HeroSlideshow'

gsap.registerPlugin(useGSAP)

// Check if this is first visit (preloader needs to run)
const getInitialDelay = () => {
  if (typeof window === 'undefined') return 0.1
  const hasVisited = sessionStorage.getItem('zonex-visited')
  if (!hasVisited) {
    sessionStorage.setItem('zonex-visited', 'true')
    return 2.2 // Wait for preloader on first visit
  }
  return 0.1 // Instant on subsequent visits
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: getInitialDelay() })

    // 1. Eyebrow line expands
    tl.fromTo('.hero-accent-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' }
    )

    // 2. Eyebrow text fades in
    tl.fromTo('.hero-eyebrow-text',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    )

    // 3. Title lines slide up from overflow:hidden wrapper
    tl.fromTo('.hero-line',
      { y: '110%' },
      { y: '0%', duration: 0.85, ease: 'power3.out', stagger: 0.08 },
      '-=0.15'
    )

    // 4. Description paragraph
    tl.fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.35'
    )

    // 5. Scroll indicator
    tl.fromTo('.hero-scroll',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    )

    // 6. Buttons
    tl.fromTo('.hero-btn',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
      '-=0.25'
    )

    // 7. Stats
    tl.fromTo('.hero-stat',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      '-=0.2'
    )
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background slideshow with Ken Burns effect */}
      <HeroSlideshow />

      {/* Grain overlay - above slideshow */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Hero radial glow behind title - subtle accent */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.08] pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse, #DC2626 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Main content - above slideshow */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="hero-accent-line h-[2px] w-12 bg-[#DC2626] block" style={{ transform: 'scaleX(0)' }} />
              <span className="hero-eyebrow-text text-[#DC2626] text-[11px] font-medium tracking-[0.2em] uppercase opacity-0">
                {site.hero.eyebrow}
              </span>
            </div>

            {/* Title - each line wrapped for stagger animation */}
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight mb-8">
              {/* White lines */}
              {site.hero.title.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="hero-line block text-white">{line}</span>
                </span>
              ))}
              {/* Red accent lines */}
              {site.hero.titleAccent.map((line, i) => (
                <span key={`accent-${i}`} className="block overflow-hidden">
                  <span className="hero-line block text-[#DC2626]">{line}</span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="hero-desc text-gray-400 text-base md:text-lg max-w-lg mb-10 opacity-0 leading-relaxed">
              {site.hero.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="hero-btn group inline-flex items-center gap-3 bg-[#DC2626] hover:bg-[#b91c1c] text-white px-7 py-4 text-sm font-semibold tracking-wider uppercase transition-colors opacity-0"
              >
                {site.hero.ctaPrimary}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="hero-btn group inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white px-7 py-4 text-sm font-semibold tracking-wider uppercase transition-colors opacity-0"
              >
                {site.hero.ctaSecondary}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll indicator - right side with animated line */}
          <div className="hero-scroll absolute right-6 md:right-12 lg:right-20 bottom-32 opacity-0 hidden md:flex flex-col items-center gap-3">
            <span className="text-gray-500 text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gray-700 relative overflow-hidden">
              <div className="absolute inset-x-0 h-full bg-[#DC2626] animate-scroll-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {site.stats.map((stat, i) => (
              <div
                key={i}
                className={`hero-stat py-6 px-4 md:px-6 opacity-0 ${i > 0 ? 'border-l border-white/[0.08]' : ''}`}
              >
                <div className="font-bold text-lg md:text-xl text-white mb-1">
                  {stat.value.includes('+') ? (
                    <AnimatedCounter value={parseInt(stat.value)} suffix="+" />
                  ) : /^\d+$/.test(stat.value) ? (
                    <AnimatedCounter value={parseInt(stat.value)} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-gray-500 text-[10px] md:text-[11px] tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
