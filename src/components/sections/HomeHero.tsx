"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { site } from '../../../data/site'
import { clipReveal, fadeUp, lineReveal, stagger, transition } from '@/lib/motion'

export default function HomeHero() {
  const reduceMotion = useReducedMotion()
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
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,26,0.6),rgba(10,10,12,0.95))]"
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.7, 0.55] }}
        transition={reduceMotion ? undefined : { ...transition.slow, duration: 8 }}
      />
      <Container className="relative z-10 py-[calc(var(--section-padding)+1.5rem)] md:py-[calc(var(--section-padding)+2.5rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <motion.div
              variants={stagger(0.12)}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              className="space-y-5"
            >
              <motion.p variants={fadeUp} className="eyebrow">
                Generalni izvođač
              </motion.p>
              <motion.span
                variants={lineReveal}
                className="block h-px w-16 bg-[var(--accent)]"
                style={{ transformOrigin: 'left' }}
              />
              <h1 className="text-h1 font-display text-white">
                <motion.span variants={clipReveal} className="block overflow-hidden">
                  <span className="block">{titleLine1}{titleLine2 ? ',' : ''}</span>
                </motion.span>
                {titleLine2 ? (
                  <motion.span variants={clipReveal} className="block overflow-hidden">
                    <span className="block">{titleLine2}</span>
                  </motion.span>
                ) : null}
              </h1>
              <motion.p variants={fadeUp} className="text-body text-white/85 text-measure">
                {site.hero.subtitle}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Button href="/projects" className="w-full justify-center sm:w-auto">
                  Naši projekti
                </Button>
                <Button href="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
                  Kontaktirajte tim
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            variants={clipReveal}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={transition.base}
          >
            <div className="card-surface rounded-lg p-5 sm:p-6 md:p-8">
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
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
