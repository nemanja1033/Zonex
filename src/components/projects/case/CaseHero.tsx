"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import type { Project } from '@/content/content'

type CaseHeroProps = {
  project: Project
}

export default function CaseHero({ project }: CaseHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-white/8"
        animate={reduceMotion ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2.5rem)]">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-micro font-mono uppercase tracking-micro text-white/80">
              <span>{project.location}</span>
              <span className="h-3.5 w-px bg-white/40" />
              <span>{project.status}</span>
            </div>
            <h1 className="text-h1 font-display text-white">{project.name}</h1>
            <p className="max-w-xl text-body text-white/90">{project.summary}</p>
            <div className="grid gap-6 border-t border-white/15 pt-6 text-small text-white/85 md:grid-cols-3">
              <div>
                <p className="eyebrow-light">Delivery</p>
                <p>{project.deliveryModel ?? '—'}</p>
              </div>
              <div>
                <p className="eyebrow-light">Timeline</p>
                <p>{project.timeline ?? '—'}</p>
              </div>
              <div>
                <p className="eyebrow-light">Client type</p>
                <p>{project.clientType ?? '—'}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="panel p-6 text-textDark">
              <p className="eyebrow">Scope</p>
              <p className="mt-2 text-small">{project.scope ?? '—'}</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="eyebrow">Works performed</p>
                <p className="mt-2 text-small">{project.works ?? '—'}</p>
              </div>
            </div>
            <motion.svg
              viewBox="0 0 240 140"
              className="h-20 w-48"
              initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              <motion.path
                d="M10 120 L90 40 L160 90 L230 20"
                stroke="var(--accent)"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>
          </div>
        </div>
      </Container>
    </section>
  )
}
