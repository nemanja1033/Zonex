"use client"

import Link from 'next/link'
import { site } from '../../../data/site'

export default function Hero() {
  const stats = [
    { value: '30+', label: 'Godina iskustva' },
    { value: '1993', label: 'Godina osnivanja' },
    { value: 'Ključ u ruke', label: 'Model isporuke', isText: true },
    { value: 'ISO', label: 'Standardi kvaliteta', isText: true },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1a1a2e_0%,#0a0a0a_50%,#0d0d0d_100%)]" />

      {/* Layer 2: Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 3: Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 36px)',
        }}
      />

      {/* Layer 4: Red ambient glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#DC2626]/[0.03] rounded-full blur-[150px]" />

      {/* Content - LEFT aligned */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-32 lg:pt-40">
        <div className="hero-animate">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[2px] w-12 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-semibold tracking-[0.2em] uppercase">
              Generalni izvođač
            </span>
          </div>

          {/* Title - LEFT aligned, max-width constrained */}
          <h1 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] text-white leading-[0.95] tracking-[0.01em] max-w-[900px] mb-8">
            Inženjering koji<br />
            isporučuje u rokovima,<br />
            <span className="text-[#DC2626]">sa proverljivim<br />kvalitetom.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-[520px] mb-10">
            {site.hero.subtitle}
          </p>

          {/* Buttons - in a row */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-4 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#DC2626]/20"
            >
              Naši projekti
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/15 hover:border-white/30 text-white px-8 py-4 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white/[0.03]"
            >
              Kontaktirajte tim
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 md:bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-white/25 text-[9px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#DC2626] to-transparent animate-pulse" />
        </div>
      </div>

      {/* Stats bar - at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`py-6 md:py-8 ${i > 0 ? 'border-l border-white/[0.06]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''} px-4 md:px-6`}
              >
                <div className={`${stat.isText ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-1`}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-gray-500 tracking-[0.1em] uppercase">
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
