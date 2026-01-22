"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'
import { lineReveal, transition, viewport } from '@/lib/motion'

export default function ServicesSection() {
  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow">Usluge</p>
              <h2 className="section-title">Integrisane usluge sa jasnim obimom rada.</h2>
              <p className="body-muted text-measure">
                Organizujemo izvođenje u definisanim fazama, uz transparentan plan i dokumentaciju koja prati svaki projekat.
              </p>
            </div>
          </Reveal>
          <motion.span
            className="hidden h-px w-20 bg-white/15 md:block"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={transition.base}
            style={{ transformOrigin: 'left', alignSelf: 'end' }}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {site.services.slice(0, 4).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06} variant="maskReveal">
                <div className="card-surface rounded-lg p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-card">
                  <h3 className="font-display text-h4 text-white">{service.title}</h3>
                  <p className="mt-3 text-small text-white/80">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
