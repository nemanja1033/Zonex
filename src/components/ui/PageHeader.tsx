"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion || isCoarse

  return (
    <section className="page-hero blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(178,30,42,0.9),rgba(255,255,255,0.3),transparent)]" />
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(178,30,42,0.4),transparent_70%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(12,18,28,0.55),transparent_65%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[18%] h-32 w-32 rounded-full border border-white/20"
        animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+2.5rem)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="section-number text-white/80">01</span>
          <span className="section-rule bg-white/60" />
          <p className="eyebrow-light">{eyebrow}</p>
        </div>
        <motion.h1
          className="mt-4 hero-title"
          initial={shouldReduce ? undefined : { opacity: 0, y: 18 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mt-4 max-w-2xl hero-copy"
            initial={shouldReduce ? undefined : { opacity: 0, y: 18 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </section>
  )
}
