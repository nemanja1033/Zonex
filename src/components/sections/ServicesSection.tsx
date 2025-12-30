"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute left-[12%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(178,30,42,0.2),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number">02</span>
                <span className="section-rule" />
                <span className="eyebrow">Usluge</span>
              </div>
              <h2 className="section-title">Integrisane usluge sa preciznim obimom rada.</h2>
              <p className="body-muted">
                Radimo u jasno definisanim fazama, sa transparentnim obavezama i dokumentacijom koja ostaje iza projekta.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {site.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.05}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)] transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.75),rgba(255,255,255,0.3),rgba(178,30,42,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-mono uppercase tracking-micro text-white/60">0{index + 1}</span>
                    <span className="h-8 w-8 rounded-full border border-white/15 bg-[linear-gradient(140deg,rgba(178,30,42,0.3),rgba(12,18,28,0.6))]" />
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
