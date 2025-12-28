"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { processSteps } from '@/content/content'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="left" />
      <div
        className="pointer-events-none absolute right-[6%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(10,10,12,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">05</span>
                <span className="section-rule" />
                <span className="eyebrow">How we work</span>
              </div>
              <h2 className="mt-4 section-title">Proces sa jasnim kontrolnim tačkama.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md body-muted">
              Svaka faza ima definisane odgovornosti i standarde dokumentacije. Fokus je na kvalitetu i stabilnosti isporuke.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.92),rgba(246,240,232,0.86))] p-6 shadow-[0_20px_45px_rgba(12,17,23,0.1)] transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(155,14,28,0),rgba(155,14,28,0.75),rgba(12,12,14,0.85),rgba(155,14,28,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-micro font-mono uppercase tracking-micro text-muted">
                    0{index + 1}
                  </span>
                  <span className="h-[1px] flex-1 bg-[linear-gradient(90deg,rgba(155,14,28,0.6),rgba(12,12,14,0.6))]" />
                </div>
                <h3 className="mt-4 font-display text-h4">{step.title}</h3>
                <p className="mt-2 body-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
