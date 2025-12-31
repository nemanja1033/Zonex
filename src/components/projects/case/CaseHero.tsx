"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import type { Project } from '../../../../data/projects'

type CaseHeroProps = {
  project: Project
}

export default function CaseHero({ project }: CaseHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(178,30,42,0.35),transparent_70%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-8 h-72 w-72 bg-[radial-gradient(circle,rgba(10,14,20,0.5),transparent_65%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -left-20 top-28 h-56 w-56 rounded-full bg-white/5"
        animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+2.5rem)]">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-micro font-mono uppercase tracking-micro text-white/70">
              <span>{project.location}</span>
              <span className="h-3.5 w-px bg-white/30" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-h1 font-display text-white">{project.name}</h1>
            <p className="max-w-xl text-body text-white/85">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.focus.map((badge, index) => (
                <motion.span
                  key={badge}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-micro font-mono uppercase tracking-micro text-white/70"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.32, 0.72, 0, 1] }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
            <div className="grid gap-6 border-t border-white/10 pt-6 text-small text-white/80 md:grid-cols-3">
              <div>
                <p className="eyebrow-light">Model isporuke</p>
                <p>{project.delivery}</p>
              </div>
              <div>
                <p className="eyebrow-light">Rok</p>
                <p>{project.timeline}</p>
              </div>
              <div>
                <p className="eyebrow-light">Otvaranje</p>
                <p>{project.opened}</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_26px_60px_rgba(3,6,12,0.5)] backdrop-blur">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/project-placeholder.svg"
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Obim</p>
              <p className="mt-3 text-small text-white/80">{project.scope}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
