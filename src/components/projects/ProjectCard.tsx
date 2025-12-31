'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../../../data/projects'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const disableLayout = reduceMotion || isCoarse
  const imageSrc = project.image ?? '/images/project-placeholder.svg'

  return (
    <motion.div
      layout={!disableLayout}
      whileHover={shouldReduce ? undefined : { y: -8 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(3,6,12,0.45)] backdrop-blur"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 text-micro font-mono uppercase tracking-micro text-white/70 md:left-6 md:top-6">
          {project.category}
        </div>
        <div className="absolute right-4 top-4 text-micro font-mono uppercase tracking-micro text-white/70 md:right-6 md:top-6">
          {project.timeline}
        </div>
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Projekat</p>
          <h3 className="mt-2 font-display text-h3 text-white">{project.name}</h3>
          <p className="mt-2 text-small text-white/70">{project.location}</p>
        </div>
        <p className="text-small text-white/80">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.focus.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-micro font-mono uppercase tracking-micro text-white/70"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(178,30,42,0.9),rgba(255,255,255,0.2))] transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  )
}
