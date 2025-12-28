'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/content/content'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:border-accent hover:shadow-[0_26px_60px_rgba(11,28,45,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 top-6 h-32 w-32 rounded-full bg-[rgba(47,128,237,0.12)] blur-2xl" />
      </div>
      <div className="relative h-52 overflow-hidden bg-[linear-gradient(135deg,rgba(11,28,45,0.05),rgba(11,28,45,0.0))]">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(47,128,237,0),rgba(47,128,237,0.65),rgba(47,128,237,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="project-shift h-full w-full bg-gradient-to-br from-grey-200 via-grey-100 to-grey-200 transition-transform duration-500 group-hover:scale-[1.06]" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Projekt</p>
            <h3 className="mt-2 font-display text-h3">{project.name}</h3>
            <p className="mt-2 body-muted">{project.location}</p>
          </div>
          <span className="text-micro font-mono uppercase tracking-micro text-textDark">
            {project.status}
          </span>
        </div>
        <p className="text-small text-textDark">{project.summary}</p>
        <div className="flex items-center justify-between border-t border-border pt-4 text-micro font-mono uppercase tracking-micro text-muted">
          <span>{project.type}</span>
          <span>{project.timeline}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-6 bg-white/98 px-6 py-4 text-micro text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase tracking-micro">Scope</span>
          <span className="text-textDark">{project.deliveryModel ?? '—'}</span>
        </div>
      </div>
      <Link href={`/projects/${project.slug}`} className="absolute inset-0" aria-label={project.name} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  )
}
