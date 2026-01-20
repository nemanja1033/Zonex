"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import SignalStrip from '@/components/ui/SignalStrip'
import SectionRail from '@/components/motion/SectionRail'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionRail />
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute left-[12%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(178,30,42,0.2),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <Reveal>
          <SignalStrip className="mb-8" />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal className="stamp">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="eyebrow">Usluge</span>
              </div>
              <h2 className="section-title">Integrisane usluge sa preciznim obimom rada.</h2>
              <p className="body-muted text-measure">
                Radimo u jasno definisanim fazama, sa transparentnim obavezama i dokumentacijom koja ostaje iza projekta.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {site.services.slice(0, 4).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.08} variant="fadeUp">
                <div className="group card-surface relative overflow-hidden rounded-3xl p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)] transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.75),rgba(255,255,255,0.3),rgba(178,30,42,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-mono uppercase tracking-micro text-white/50">Usluga</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M8 3v10" strokeLinecap="round" />
                        <path d="M3 8h10" strokeLinecap="round" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-h4 text-white">{service.title}</h3>
                  <p className="mt-3 text-small text-white/80">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
