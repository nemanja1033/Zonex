"use client"

import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'
import Heading from '@/components/ui/Heading'
import Stack from '@/components/ui/Stack'

export default function SignalSection() {
  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <Stack gap="sm">
              <span className="eyebrow">Principi rada</span>
              <Heading as="h2" className="text-white">
                Kontrolni parametri koji vode svaki projekat.
              </Heading>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Četiri principa su prisutna u planiranju, izvedbi i kontroli kvaliteta. Kratko, jasno, proverljivo.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} variant="fadeUp">
              <div className="card-surface rounded-lg p-6">
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/70">
                  <span>{item.title}</span>
                  <span>Princip</span>
                </div>
                <p className="mt-4 text-small text-white/85">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
