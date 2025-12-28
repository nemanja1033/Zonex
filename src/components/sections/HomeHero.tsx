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
  const driftSlow = useTransform(scrollYProgress, [0, 0.4], [0, -20])
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
      <motion.div
        className="pointer-events-none absolute left-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-gradient-to-tr from-white/8 via-white/5 to-transparent"
        style={{ y: driftSlow }}
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
              <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/8 p-6 text-white shadow-[0_40px_90px_rgba(11,28,45,0.35)] backdrop-blur">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_55%)]" />
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/10" />
                <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-[rgba(47,128,237,0.2)]" />
                <div className="relative z-10 space-y-6">
                  <div className="rounded-2xl border border-white/15 bg-white/6 p-5">
                    <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/70">
                      <span>Najnoviji projekat</span>
                      <span>2024</span>
                    </div>
                    <h3 className="mt-3 font-display text-h3 text-white">Knez Petrol – Šimanovci</h3>
                    <p className="mt-2 text-small text-white/80">
                      Izgradnja objekta u toku, uz definisane bezbednosne protokole i stabilnu dinamiku radova.
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-micro font-mono uppercase tracking-micro text-white/70">
                      <span>Energy</span>
                      <span className="h-3 w-px bg-white/40" />
                      <span>U toku</span>
                    </div>
                    <div className="mt-5 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/25 via-white/10 to-transparent">
                      <div className="h-full w-full bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent)]" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="relative overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-4 backdrop-blur"
                      >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
                        <p className="text-h3 font-display text-white">{stat.value}</p>
                        <p className="mt-2 text-micro font-mono uppercase tracking-micro text-white/70">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/7 p-5 text-white/85 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-micro font-mono uppercase tracking-micro text-white/70">Kontrolne tačke</p>
                  <span className="text-micro font-mono uppercase tracking-micro text-white/70">24/7</span>
                </div>
                <p className="mt-2 text-small text-white/80">
                  Dnevno praćenje kvaliteta, dinamike i bezbednosti kroz definisane protokole.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-10 right-6 hidden text-white/10 font-display text-[10vw] tracking-[0.4em] md:block">
        ZONEX
      </div>
    </section>
  )
}
