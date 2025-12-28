'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/content/content'

type ProjectListItemProps = {
  project: Project
}

export default function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <motion.div
      layout
      whileHover={{ x: 6 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="group relative grid gap-6 rounded-2xl px-4 py-8 transition-colors duration-300 hover:bg-white/70 md:grid-cols-[200px_1.2fr_0.8fr]"
    >
      <div className="project-shift h-28 w-full overflow-hidden rounded-lg bg-gradient-to-br from-grey-200 via-grey-100 to-grey-200 transition-transform duration-500 group-hover:scale-[1.03]" />
      <div>
        <p className="eyebrow">Projekt</p>
        <h3 className="mt-2 font-display text-h3">{project.name}</h3>
        <p className="mt-2 body-muted">{project.location}</p>
      </div>
      <div className="flex flex-col gap-4 text-small">
        <div>
          <p className="eyebrow">Status</p>
          <p>{project.status}</p>
        </div>
        <div>
          <p className="eyebrow">Model</p>
          <p>{project.deliveryModel ?? '—'}</p>
        </div>
      </div>
      <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />
      <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[linear-gradient(180deg,rgba(155,14,28,0.9),rgba(10,10,12,0.9))] transition-transform duration-300 group-hover:scale-y-100" />
      <span className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-[linear-gradient(90deg,rgba(155,14,28,0.45),rgba(5,5,5,0.2),transparent)] opacity-70" />
    </motion.div>
  )
}
