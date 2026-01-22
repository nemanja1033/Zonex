"use client"

import { motion } from 'framer-motion'
import type { TimelineItem } from '@/content/content'
import { fadeUp, transition, viewport } from '@/lib/motion'

type TimelineProps = {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-10">
      <div className="absolute left-3 top-0 h-full w-px bg-[linear-gradient(180deg,var(--accent),rgba(15,15,17,0.6),transparent)]" />
      {items.map((item) => (
        <motion.div
          key={item.year}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={transition.base}
          className="relative grid gap-4 pl-12 md:grid-cols-[120px_1fr]"
        >
          <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-white shadow-[0_0_0_8px_var(--accent-soft)]" />
          <p className="font-display text-h4">{item.year}</p>
          <div>
            <h3 className="font-display text-h4">{item.title}</h3>
            <p className="mt-2 body-muted">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
