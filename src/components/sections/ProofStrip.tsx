"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import { site } from '../../../data/site'
import SignalStrip from '@/components/ui/SignalStrip'
import SectionRail from '@/components/motion/SectionRail'

export default function ProofStrip() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section-surface relative overflow-hidden">
      <SectionRail />
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute left-[8%] top-0 h-56 w-72 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.2),transparent_70%)]"
        aria-hidden="true"
      />
      <Container className="py-[calc(var(--section-padding)-2rem)]">
        <SignalStrip className="mb-8" />
        <Reveal className="stamp">
          <div className="flex items-center gap-3 text-micro font-mono uppercase tracking-micro text-muted">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Operativni rezime
          </div>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {site.stats.map((proof, index) => (
            <Reveal key={proof.label} delay={index * 0.08} variant="scale">
              <div className="card-surface rounded-full px-4 py-2 text-small text-white/85 shadow-[0_12px_30px_rgba(3,6,12,0.35)]">
                <span className="text-white/60">{proof.label}:</span> {proof.value}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
