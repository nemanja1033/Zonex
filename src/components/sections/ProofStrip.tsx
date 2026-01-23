"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'
import { lineReveal, transition, viewport } from '@/lib/motion'

export default function ProofStrip() {
  return (
    <section className="section-divider section-surface">
      <Container className="py-[calc(var(--section-padding)-2rem)]">
        <Reveal>
          <div className="flex items-center gap-3 text-micro font-mono uppercase tracking-micro text-muted">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Dokazi kapaciteta
          </div>
        </Reveal>
        <motion.span
          className="mt-4 block h-px w-24 bg-white/15"
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
            viewport={viewport}
            transition={transition.base}
            style={{ transformOrigin: 'left' }}
          />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((proof, index) => (
            <Reveal key={proof.label} delay={index * 0.06} variant="maskReveal">
              <div className="card-surface card-hover rounded-lg p-5">
                <p className="text-small text-white/70">{proof.label}</p>
                <p className="mt-3 text-h4 font-display text-white">{proof.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
