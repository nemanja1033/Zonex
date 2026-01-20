"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { easing } from '@/lib/motion'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="page-hero">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,26,0.65),rgba(10,10,12,0.95))]" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+1.5rem)] md:py-[calc(var(--section-padding)+2rem)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="section-number text-white/80">01</span>
          <span className="section-rule bg-white/40" />
          <p className="eyebrow-light">{eyebrow}</p>
        </div>
        <motion.h1
          className="mt-4 hero-title"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mt-4 max-w-2xl hero-copy"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: easing }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </section>
  )
}
