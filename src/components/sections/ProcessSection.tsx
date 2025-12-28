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
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(145deg,rgba(11,28,45,0.03),rgba(11,28,45,0.07))] p-6 shadow-[0_18px_40px_rgba(11,28,45,0.06)] transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(47,128,237,0),rgba(47,128,237,0.7),rgba(47,128,237,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-micro font-mono uppercase tracking-micro text-muted">
                    0{index + 1}
                  </span>
                  <span className="h-[1px] flex-1 bg-border" />
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
