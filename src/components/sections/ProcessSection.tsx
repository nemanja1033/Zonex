"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import SignalStrip from '@/components/ui/SignalStrip'
import SectionRail from '@/components/motion/SectionRail'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionRail />
      <SectionOrnament targetRef={sectionRef} variant="left" />
      <div
        className="pointer-events-none absolute right-[6%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(12,18,28,0.6),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <Reveal>
          <SignalStrip className="mb-8" />
        </Reveal>
        <div className="section-head">
          <Reveal className="stamp">
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">05</span>
                <span className="section-rule" />
                <span className="eyebrow">Proces</span>
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
        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-white/10" aria-hidden="true" />
          <div className="space-y-8">
            {site.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1} variant="fadeUp">
                <div className="relative flex gap-6">
                  <div className="relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-micro font-mono uppercase tracking-micro text-white/70">
                    {index + 1}
                  </div>
                  <div className="card-surface flex-1 rounded-3xl p-6 shadow-[0_20px_45px_rgba(3,6,12,0.45)]">
                    <h3 className="font-display text-h4 text-white">{step.title}</h3>
                    <p className="mt-2 text-small text-white/80">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
