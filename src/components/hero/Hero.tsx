'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { site } from '../../../data/site'
import MagneticButton from '../MagneticButton'
import AnimatedCounter from '../AnimatedCounter'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Red line expands
    tl.fromTo('.hero-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' }
    )

    // 2. Tag text fade in
    tl.fromTo('.hero-tag',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    // 3. Title lines - staggered slide up (signature Awwwards effect)
    tl.fromTo('.hero-title-line',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
      '-=0.2'
    )

    // 4. Subtitle
    tl.fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    // 5. Buttons
    tl.fromTo('.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
      '-=0.3'
    )

    // 6. Stats bar slides from bottom
    tl.fromTo('.hero-stats',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1a1e]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="max-w-3xl">
          {/* Tag with red line */}
          <div className="flex items-center gap-3 mb-8">
            <span className="hero-line h-[2px] w-10 bg-[#DC2626] block" style={{ transform: 'scaleX(0)' }} />
            <span className="hero-tag text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase opacity-0">
              {site.hero.tagline}
            </span>
          </div>

          {/* Title - each line wrapped for stagger */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            <span className="hero-title-line block overflow-hidden">
              <span className="block">{site.hero.title}</span>
            </span>
            <span className="hero-title-line block overflow-hidden">
              <span className="block text-gray-500">{site.hero.titleAccent}</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-gray-400 text-lg md:text-xl max-w-lg mb-10 opacity-0">
            {site.hero.subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              href="/projects"
              className="hero-cta bg-[#DC2626] hover:bg-[#b91c1c] text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-colors opacity-0"
            >
              Pogledajte projekte
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="hero-cta border border-white/15 hover:border-white/30 text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-colors opacity-0"
            >
              Kontakt
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats absolute bottom-0 left-0 right-0 border-t border-white/[0.06] opacity-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {site.stats.map((stat, i) => (
              <div key={i} className="py-5 px-4 md:px-6">
                <div className={`font-semibold text-sm md:text-base ${i === 0 ? 'text-[#DC2626]' : 'text-white'}`}>
                  {/* Animate numbers, show text as-is */}
                  {stat.value.includes('+') ? (
                    <AnimatedCounter value={parseInt(stat.value)} suffix="+" />
                  ) : /^\d+$/.test(stat.value) ? (
                    <AnimatedCounter value={parseInt(stat.value)} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-gray-600 text-[11px] tracking-wider uppercase mt-0.5">
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
