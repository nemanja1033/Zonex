"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="page-hero">
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[18%] h-32 w-32 rounded-full border border-white/20"
        animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[6%] top-[40%] h-20 w-36 text-white/50"
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
      >
        <motion.svg viewBox="0 0 160 64" fill="none">
          <motion.path
            d="M4 48L4 12L124 12L124 32L156 32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
          />
        </motion.svg>
      </motion.div>
      <Container className="relative z-10 py-[calc(var(--section-padding)+2.5rem)]">
        <div className="flex items-center gap-4">
          <span className="section-number text-white/80">01</span>
          <span className="section-rule bg-white/60" />
          <p className="eyebrow-light">{eyebrow}</p>
        </div>
        <motion.h1
          className="mt-4 hero-title"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mt-4 max-w-2xl hero-copy"
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </section>
  )
}
