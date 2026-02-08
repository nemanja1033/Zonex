"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { EASING } from '@/lib/animations'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-[#27272A] pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASING.power4 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#DC2626]">01</span>
          <span className="h-px w-12 bg-gradient-to-r from-white/30 to-transparent" />
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
            {eyebrow}
          </span>
        </motion.div>
        
        <motion.h1
          className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
        >
          {title}
        </motion.h1>
        
        {subtitle ? (
          <motion.p
            className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
        
        {/* Decorative line */}
        <motion.div
          className="mt-8 h-px w-24 bg-gradient-to-r from-[#DC2626]/50 to-transparent"
          initial={reduceMotion ? undefined : { scaleX: 0 }}
          animate={reduceMotion ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASING.power4 }}
          style={{ transformOrigin: 'left' }}
        />
      </Container>
    </section>
  )
}
