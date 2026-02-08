"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import type { Project } from '../../../../data/projects'
import { EASING } from '@/lib/animations'
import { useRef } from 'react'
import useParallax from '@/components/hooks/useParallax'

type CaseHeroProps = {
  project: Project
}

export default function CaseHero({ project }: CaseHeroProps) {
  const reduceMotion = useReducedMotion()
  const imageSrc = project.image ?? '/images/project-placeholder.svg'
  const mediaRef = useRef<HTMLDivElement | null>(null)
  const { y } = useParallax(mediaRef, 14)
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMUMxQzFFIi8+PC9zdmc+'

  return (
    <section className="relative overflow-hidden bg-[#27272A] pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            {/* Meta info */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.power4 }}
              className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/50"
            >
              <span>{project.location}</span>
              <span className="h-3.5 w-px bg-white/20" />
              <span>{project.category}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
            >
              {project.name}
            </motion.h1>

            {/* Summary */}
            <motion.p
              className="max-w-xl text-lg text-white/70 leading-relaxed"
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
            >
              {project.summary}
            </motion.p>

            {/* Project details */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
              className="grid gap-6 border-t border-white/10 pt-6 text-sm md:grid-cols-3"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Model isporuke</p>
                <p className="text-white/80">{project.delivery}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Rok</p>
                <p className="text-white/80">{project.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Otvaranje</p>
                <p className="text-white/80">{project.opened}</p>
              </div>
            </motion.div>

            {/* Focus badges */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASING.power4 }}
              className="flex flex-wrap gap-2"
            >
              {project.focus.map((badge) => (
                <span 
                  key={badge}
                  className="px-3 py-1.5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 text-[10px] uppercase tracking-[0.15em] text-[#DC2626]"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Image card */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASING.power4 }}
            className="group relative overflow-hidden rounded-2xl bg-[#303036] border border-white/12 hover:border-white/18 transition-all duration-300"
          >
            <div ref={mediaRef} className="relative aspect-[4/3] overflow-hidden">
              <motion.div style={reduceMotion ? {} : { y }} className="absolute inset-0">
                <Image
                  src={imageSrc}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#303036] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Obim</p>
              <p className="text-sm text-white/70 leading-relaxed">{project.scope}</p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-[#DC2626]/0 group-hover:border-[#DC2626]/20 rounded-tr-xl transition-all duration-300" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
