"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

const proofs = [
  { label: 'Founded', value: '1993' },
  { label: '30+ years', value: 'Stability' },
  { label: 'Delivery', value: 'Turnkey' },
  { label: 'Works', value: 'Finishing' },
  { label: 'Focus', value: 'Retail + Hospitality' },
]

export default function ProofStrip() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute left-[8%] top-0 h-56 w-72 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.2),transparent_70%)]"
        aria-hidden="true"
      />
      <Container className="py-[calc(var(--section-padding)-2rem)]">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.6fr] md:items-center">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-micro font-mono uppercase tracking-micro text-muted">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                Signal strip
              </div>
              <h2 className="section-title">Operativna stabilnost u brojkama.</h2>
              <p className="body-muted">
                Bez obzira na tip objekta, fokus je na kontroli obima, dinamici i jasnom statusu.
              </p>
              <div className="h-[2px] w-28 bg-[linear-gradient(90deg,rgba(155,14,28,0.9),transparent)]" />
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-5">
            {proofs.map((proof, index) => (
              <Reveal key={proof.label} delay={index * 0.05}>
                <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.9),rgba(247,242,236,0.85))] p-5 shadow-[0_18px_40px_rgba(12,17,23,0.08)] backdrop-blur">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(155,14,28,0),rgba(155,14,28,0.7),rgba(12,12,14,0.8),rgba(155,14,28,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-micro font-mono uppercase tracking-micro text-muted">{proof.label}</p>
                  <p className="mt-3 font-display text-h4 text-textDark">{proof.value}</p>
                  <div className="mt-4 h-[1px] w-10 bg-[linear-gradient(90deg,rgba(155,14,28,0.8),transparent)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
