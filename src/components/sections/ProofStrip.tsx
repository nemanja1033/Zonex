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
      <Container className="py-[calc(var(--section-padding)-2rem)]">
        <div className="grid gap-4 md:grid-cols-5">
          {proofs.map((proof, index) => (
            <Reveal key={proof.label} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-white/80 p-5 shadow-[0_16px_35px_rgba(11,28,45,0.06)] backdrop-blur">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(47,128,237,0),rgba(47,128,237,0.65),rgba(47,128,237,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="text-micro font-mono uppercase tracking-micro text-muted">{proof.label}</p>
                <p className="mt-3 font-display text-h4 text-textDark">{proof.value}</p>
                <div className="mt-4 h-[1px] w-10 bg-border" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
