"use client"

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { site } from '../../../data/site'

export default function HomeHero() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 0.4], [0, -24])
  const glow = useTransform(scrollYProgress, [0, 0.4], [0, -12])

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="glow-orb left-[8%] top-[12%] h-44 w-44 bg-[radial-gradient(circle,rgba(178,30,42,0.28),transparent_68%)]" aria-hidden="true" />
      <div className="glow-orb right-[6%] bottom-[10%] h-64 w-64 bg-[radial-gradient(circle,rgba(12,18,28,0.6),transparent_70%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg,rgba(255,255,255,0.16),transparent_38%,rgba(178,30,42,0.3),transparent_68%,rgba(255,255,255,0.16))] opacity-55 blur-2xl"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 80, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[35%] h-64 w-[520px] -skew-y-6 rounded-full bg-[linear-gradient(120deg,rgba(178,30,42,0.18),rgba(12,18,28,0.4),transparent)] opacity-60 blur-3xl"
        style={{ x: glow }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent"
        style={{ y: drift }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-8">
            <Reveal>
              <motion.div
                className="space-y-5"
                initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="flex items-center gap-3 text-micro font-mono uppercase tracking-micro text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  Od 1993. godine
                </div>
                <h1 className="text-h1 font-display text-white">{site.hero.title}</h1>
                <p className="max-w-xl text-body text-white/85">{site.hero.subtitle}</p>
                <div className="flex flex-col items-stretch gap-4 pt-4 sm:flex-row sm:items-center sm:gap-6">
                  <Button href="/projects" className="w-full justify-center sm:w-auto">
                    Naši projekti
                  </Button>
                  <Button href="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
                    Kontaktirajte tim
                  </Button>
                </div>
              </motion.div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_26px_60px_rgba(3,6,12,0.5)] backdrop-blur"
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                <span>Operativni fokus</span>
                <span>Stabilna isporuka</span>
              </div>
              <div className="mt-6 grid gap-4">
                {site.values.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                      <span>{item.title}</span>
                      <span>Signal</span>
                    </div>
                    <p className="mt-3 text-small text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-10 right-6 hidden text-white/10 font-display text-[10vw] tracking-[0.4em] md:block">
        ZONEX
      </div>
    </section>
  )
}
