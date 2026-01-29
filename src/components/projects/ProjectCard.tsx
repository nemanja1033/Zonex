'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Project } from '../../../data/projects'
import { transition } from '@/lib/motion'
import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const shouldReduce = reduceMotion
  const imageSrc = project.image ?? '/images/project-placeholder.svg'
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRjhGOUZBIi8+PC9zdmc+'
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = event.clientX - rect.left
    const mouseYPos = event.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={shouldReduce ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduce ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--border-light)] bg-white shadow-[var(--shadow-md)] transition-shadow duration-500 hover:shadow-[var(--shadow-lg)] hover:shadow-[0_0_40px_rgba(194,59,59,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ height: '400px' }}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[var(--bg-tertiary)] animate-pulse" aria-hidden="true" />
        )}
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={false}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      <div className="space-y-4 p-8">
        <div className="flex flex-wrap gap-2">
          {project.focus?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-xs text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-display text-2xl text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-red)]">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{project.location}</p>
        </div>

        <p className="text-base text-[var(--text-secondary)] line-clamp-2">{project.summary}</p>

        <div className="flex flex-wrap gap-4 pt-2 text-sm text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--brand-red)]" />
            <span>Rok: {project.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--brand-red)]" />
            <span>Model: {project.delivery}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 text-sm font-medium text-[var(--brand-red)] transition-transform duration-300 group-hover:translate-x-2">
          <span>Pogledaj detalje</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />

      {/* Red glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent opacity-0 transition-opacity duration-500 group-hover:border-[var(--brand-red)] group-hover:opacity-100" />
    </motion.div>
  )
}
