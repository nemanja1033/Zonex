'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../../../data/projects'
import { easing } from '@/lib/motion'
import { useState } from 'react'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const shouldReduce = reduceMotion
  const imageSrc = project.image ?? '/images/project-placeholder.svg'
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMEIwRDEyIi8+PC9zdmc+'
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      whileHover={shouldReduce ? undefined : { y: -4 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: easing }}
      className="group card-surface relative overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 image-skeleton" aria-hidden="true" />}
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={false}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-transparent to-transparent" />
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Projekat</p>
          <h3 className="mt-2 font-display text-h3 text-white">{project.name}</h3>
          <p className="mt-2 text-small text-white/70">{project.location}</p>
        </div>
        <p className="text-small text-white/80">{project.summary}</p>
        <div className="grid gap-2 text-small text-white/70 sm:grid-cols-2">
          <span>Rok: {project.timeline}</span>
          <span>Model: {project.delivery}</span>
        </div>
        <p className="text-micro font-mono uppercase tracking-micro text-white/60">Pogledaj detalje</p>
      </div>
      <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  )
}
