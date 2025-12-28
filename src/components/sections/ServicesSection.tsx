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
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-[0_20px_45px_rgba(11,28,45,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(11,28,45,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(47,128,237,0),rgba(47,128,237,0.75),rgba(47,128,237,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-mono uppercase tracking-micro text-muted">0{index + 1}</span>
                    <span className="h-8 w-8 rounded-full border border-border bg-grey-100" />
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
