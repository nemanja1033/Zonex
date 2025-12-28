"use client"

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { company } from '@/content/content'
import Reveal from '@/components/ui/Reveal'

export default function HomeHero() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 0.4], [0, -40])
  const stats = [
    { label: 'Godina osnivanja', value: '1993' },
    { label: 'Iskustvo', value: '30+ godina' },
    { label: 'Projekti', value: '480+' },
  ]

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <motion.div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/12 via-white/6 to-transparent"
        style={{ y: drift }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-10">
            <Reveal>
              <div className="space-y-4">
                <p className="eyebrow-light">Founded {company.founded}</p>
                <h1 className="text-h1 font-display text-white">
                  Inženjering visokog standarda za objekte koji traju.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-body text-white/90">
                Više od 30 godina vodimo projekte sa jasnim obimom, kontrolom kvaliteta i disciplinom izvođenja. Fokus je
                na predvidivoj realizaciji i trajnoj vrednosti.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-wrap items-center gap-6">
              <Button href="/projects">Pogledajte projekte</Button>
              <Button href="/contact" variant="ghost">
                Kontaktirajte tim
              </Button>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid gap-6 border-t border-white/20 pt-6 text-small text-white/85 md:grid-cols-3">
                <div>
                  <p className="eyebrow-light">Sedište</p>
                  <p>{company.location}</p>
                </div>
                <div>
                  <p className="eyebrow-light">Model rada</p>
                  <p>Turnkey i završni radovi</p>
                </div>
                <div>
                  <p className="eyebrow-light">Fokus</p>
                  <p>Retail i hospitality objekti</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="space-y-6">
              <div className="panel p-6 text-textDark">
                <div className="relative h-56 w-full overflow-hidden rounded-md bg-gradient-to-br from-grey-200 via-grey-100 to-grey-200">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,28,45,0.15),transparent)]" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="eyebrow">Najnoviji projekat</p>
                  <span className="text-micro font-mono uppercase tracking-micro text-muted">2024</span>
                </div>
                <h3 className="mt-2 font-display text-h3">Knez Petrol – Šimanovci</h3>
                <p className="mt-2 text-small text-muted">Izgradnja objekta u toku, uz definisane bezbednosne protokole.</p>
                <div className="mt-4 flex items-center justify-between text-micro font-mono uppercase tracking-micro text-muted">
                  <span>Energy</span>
                  <span>U toku</span>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="panel-muted p-4 text-textDark">
                    <p className="text-h3 font-display">{stat.value}</p>
                    <p className="mt-2 section-subtitle">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-10 right-6 text-white/10 font-display text-[10vw] tracking-[0.4em]">
        ZONEX
      </div>
    </section>
  )
}
