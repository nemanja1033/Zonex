'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { Project } from '../../../data/projects'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const disableLayout = reduceMotion || isCoarse
  const imageSrc = project.image ?? '/images/project-placeholder.svg'
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMEIwRDEyIi8+PC9zdmc+'
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 18 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || isCoarse) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const normX = (x / rect.width - 0.5) * 2
    const normY = (y / rect.height - 0.5) * 2
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(() => {
      cardRef.current?.style.setProperty('--card-x', `${x}px`)
      cardRef.current?.style.setProperty('--card-y', `${y}px`)
      tiltX.set(normY * -4)
      tiltY.set(normX * 4)
      rafRef.current = null
    })
  }

  const handleLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--card-x', '50%')
    cardRef.current.style.setProperty('--card-y', '50%')
    tiltX.set(0)
    tiltY.set(0)
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      layout={!disableLayout}
      whileHover={shouldReduce ? undefined : { y: -8 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="group card-glow card-surface relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(3,6,12,0.45)] backdrop-blur"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        shouldReduce
          ? undefined
          : { rotateX, rotateY, transformStyle: 'preserve-3d' }
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 image-skeleton" aria-hidden="true" />}
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05] group-hover:-translate-y-1"
          priority={false}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent" />
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Projekat</p>
          <h3 className="mt-2 font-display text-h3 text-white transition-transform duration-300 group-hover:-translate-y-1">{project.name}</h3>
          <p className="mt-2 text-small text-white/70">{project.location}</p>
        </div>
        <p className="text-small text-white/80 transition-colors duration-300 group-hover:text-white/90">{project.summary}</p>
        <div className="flex flex-wrap gap-2 text-micro font-mono uppercase tracking-micro text-white/70 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="8" cy="8" r="5.5" />
              <path d="M8 4.5v3.5l2.5 1.5" strokeLinecap="round" />
            </svg>
            Rok: {project.timeline}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 8h7" strokeLinecap="round" />
              <path d="M9.5 6.5l2 1.5-2 1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="2.5" y="5" width="3" height="6" rx="1.2" />
            </svg>
            Model: {project.delivery}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 3.5h6" strokeLinecap="round" />
              <path d="M4 5.5h8v6H4z" />
              <path d="M6 2.5v2M10 2.5v2" strokeLinecap="round" />
            </svg>
            Datum: {project.opened}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.focus.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-micro font-mono uppercase tracking-micro text-white/70"
            >
              {badge}
            </span>
          ))}
        </div>
        <p className="text-micro font-mono uppercase tracking-micro text-white/60 opacity-0 transition-all duration-300 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
          Pogledaj detalje
        </p>
      </div>
      <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(178,30,42,0.9),rgba(255,255,255,0.2))] transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  )
}
