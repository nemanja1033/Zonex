"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'
import { lineReveal, transition } from '@/lib/motion'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export default function SectionHeader({ eyebrow, title, description, className = '' }: SectionHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`space-y-4 ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.04}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.08}>
          <p className="body-muted text-measure">{description}</p>
        </Reveal>
      ) : null}
      <motion.span
        className="divider-premium block h-px w-20"
        variants={lineReveal}
        initial={reduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={transition.fast}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}
