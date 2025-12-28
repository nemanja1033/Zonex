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
      className="group relative grid gap-6 border-b border-border py-8 md:grid-cols-[180px_1.3fr_0.7fr]"
    >
      <div className="h-28 w-full overflow-hidden bg-gradient-to-br from-grey-200 via-grey-100 to-grey-200 transition-transform duration-500 group-hover:scale-[1.02]" />
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
      <Link href={`/projects/${project.slug}`} className="absolute inset-0" aria-label={project.name} />
      <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
    </motion.div>
  )
}
