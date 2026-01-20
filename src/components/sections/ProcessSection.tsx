"use client"

import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'

export default function ProcessSection() {
  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <p className="eyebrow">Proces</p>
              <h2 className="mt-4 section-title">Proces sa jasnim kontrolnim tačkama.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i kvalitetu.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.process.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} variant="fadeUp">
              <div className="card-surface rounded-lg p-6">
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                  <span>Faza {index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-h4 text-white">{step.title}</h3>
                <p className="mt-2 text-small text-white/80">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
