"use client"

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'

export default function HomeHero() {
  const titleParts = site.hero.title.split(', ')
  const titleLine1 = titleParts[0] ?? site.hero.title
  const titleLine2 = titleParts[1] ?? ''

  const snapshot = [
    { label: 'Godina osnivanja', value: String(site.company.founded) },
    { label: 'Model isporuke', value: 'Ključ u ruke' },
    { label: 'Sedište', value: site.company.location },
  ]

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,26,0.6),rgba(10,10,12,0.95))]" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+1.5rem)] md:py-[calc(var(--section-padding)+2.5rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <Reveal variant="fadeUp">
              <div className="space-y-5">
                <p className="eyebrow">Generalni izvođač</p>
                <h1 className="text-h1 font-display text-white">
                  <span className="block">{titleLine1}{titleLine2 ? ',' : ''}</span>
                  {titleLine2 ? <span className="block">{titleLine2}</span> : null}
                </h1>
                <p className="text-body text-white/85 text-measure">{site.hero.subtitle}</p>
              </div>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.08}>
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Button href="/projects" className="w-full justify-center sm:w-auto">
                  Naši projekti
                </Button>
                <Button href="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
                  Kontaktirajte tim
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal variant="fadeIn" delay={0.12}>
            <div className="card-surface rounded-lg p-6 md:p-8">
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Kratak pregled</p>
              <div className="mt-6 space-y-6">
                {snapshot.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <span className="text-small text-white/70">{item.label}</span>
                    <span className="text-small font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
