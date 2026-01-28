"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import PremiumCard from '@/components/ui/PremiumCard'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <SectionHeader eyebrow="Proces" title="Proces sa jasnim kontrolnim tačkama." />
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i kvalitetu.
            </p>
          </Reveal>
        </div>
        <span className="mt-6 block h-px w-20 bg-white/15" data-process-line />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.process.map((step, index) => {
            const cardContent = (
              <>
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                  <span>Faza {index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-h4 text-white">{step.title}</h3>
                <p className="mt-2 text-small text-white/80">{step.description}</p>
              </>
            )

            const card = index === 0 ? (
              <div data-process-card className="rounded-lg">
                <PremiumCard className="p-5 sm:p-6">{cardContent}</PremiumCard>
              </div>
            ) : (
              <div className="card-surface card-hover rounded-lg p-5 sm:p-6" data-process-card>
                {cardContent}
              </div>
            )

            return (
              <Reveal key={step.title} delay={index * 0.06} variant="maskReveal">
                {card}
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
