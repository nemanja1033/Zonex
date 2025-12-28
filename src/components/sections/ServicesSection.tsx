"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { services } from '@/content/content'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute left-[12%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number">04</span>
                <span className="section-rule" />
                <span className="eyebrow">Services + approach</span>
              </div>
              <h2 className="section-title">Integrisane usluge sa preciznim obimom rada.</h2>
              <p className="body-muted">
                Radimo u jasno definisanim fazama, sa transparentnim obavezama i dokumentacijom koja ostaje iza projekta.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.05}>
                <div className="group relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.95),rgba(247,242,236,0.88))] p-6 shadow-[0_22px_55px_rgba(12,17,23,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_rgba(12,17,23,0.14)]">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(155,14,28,0),rgba(155,14,28,0.75),rgba(12,12,14,0.8),rgba(155,14,28,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-mono uppercase tracking-micro text-muted">0{index + 1}</span>
                    <span className="h-8 w-8 rounded-full border border-border bg-[linear-gradient(140deg,rgba(155,14,28,0.22),rgba(12,12,14,0.2))]" />
                  </div>
                  <h3 className="mt-4 font-display text-h4">{service.title}</h3>
                  <p className="mt-3 body-muted">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
