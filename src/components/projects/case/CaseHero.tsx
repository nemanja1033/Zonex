"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import type { Project } from '../../../../data/projects'
import { easing } from '@/lib/motion'

type CaseHeroProps = {
  project: Project
}

export default function CaseHero({ project }: CaseHeroProps) {
  const reduceMotion = useReducedMotion()
  const imageSrc = project.image ?? '/images/project-placeholder.svg'
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMEIwRDEyIi8+PC9zdmc+'

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,26,0.6),rgba(10,10,12,0.95))]" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+1.5rem)] md:py-[calc(var(--section-padding)+2rem)]">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-micro font-mono uppercase tracking-micro text-white/70">
              <span>{project.location}</span>
              <span className="h-3.5 w-px bg-white/30" />
              <span>{project.category}</span>
            </div>
            <motion.h1
              className="text-h1 font-display text-white"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
            >
              {project.name}
            </motion.h1>
            <p className="max-w-xl text-body text-white/85">{project.summary}</p>
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
          <div className="card-surface relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
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
