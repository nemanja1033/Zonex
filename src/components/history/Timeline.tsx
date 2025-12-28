"use client"

import { motion } from 'framer-motion'
import type { TimelineItem } from '@/content/content'

type TimelineProps = {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-10">
      <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-accent/80 via-border to-transparent" />
      {items.map((item) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="relative grid gap-4 pl-12 md:grid-cols-[120px_1fr]"
        >
          <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-accent bg-white shadow-[0_0_0_6px_rgba(47,128,237,0.08)]" />
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
