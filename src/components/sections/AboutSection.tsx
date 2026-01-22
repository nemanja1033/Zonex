"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'
import { lineReveal, transition, viewport } from '@/lib/motion'

export default function AboutSection() {
  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <p className="eyebrow">O nama</p>
              <h2 className="mt-4 section-title">{site.about.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">{site.about.body}</p>
          </Reveal>
        </div>
        <motion.span
          className="mt-6 block h-px w-20 bg-white/15"
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
            viewport={viewport}
            transition={transition.base}
            style={{ transformOrigin: 'left' }}
          />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {site.values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} variant="maskReveal">
              <div className="card-surface rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                  <span>0{index + 1}</span>
                  <span>Princip</span>
                </div>
                <p className="mt-4 text-h4 font-display text-white">{item.title}</p>
                <p className="mt-3 text-small text-white/80">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
