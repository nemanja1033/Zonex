"use client"

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow accents */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#DC2626]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#DC2626]/2 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASING.power4 }}
          className="mb-16 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5"
          >
            <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
              Proces
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
          >
            Proces sa jasnim
            <span className="block text-white/60">kontrolnim tačkama.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
            className="max-w-2xl text-lg text-white/60"
          >
            Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i kvalitetu.
          </motion.p>
        </motion.div>

        {/* Process cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer(0.15, 0.3)}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {site.process.slice(0, 4).map((step, index) => (
            <ProcessCard 
              key={step.title} 
              step={step} 
              index={index} 
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

function ProcessCard({ 
  step, 
  index, 
  reduceMotion 
}: { 
  step: { title: string; description: string }
  index: number
  reduceMotion: boolean | null
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={reduceMotion ? {} : { y: -8 }}
        transition={{ duration: 0.4, ease: EASING.power4 }}
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#242424] p-8 lg:p-10 transition-all duration-500 hover:border-white/12 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        {/* Large number badge - background */}
        <span
          className="absolute right-8 top-8 text-[100px] lg:text-[120px] font-bold leading-none text-[#DC2626] opacity-[0.05] select-none pointer-events-none"
          aria-hidden="true"
        >
          {index + 1}
        </span>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              Faza {index + 1}
            </span>
            <motion.span 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DC2626]/30 text-sm font-bold text-[#DC2626]"
              animate={isHovered && !reduceMotion ? { scale: 1.1, borderColor: 'rgba(220, 38, 38, 0.6)' } : {}}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.span>
          </div>

          <motion.h3 
            className="text-2xl lg:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#DC2626]"
          >
            {step.title}
          </motion.h3>

          <p className="text-base leading-relaxed text-white/60">{step.description}</p>

          {/* Animated divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-[#DC2626]/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.4, ease: EASING.power4 }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#DC2626]/0 group-hover:border-[#DC2626]/20 rounded-tl-2xl transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#DC2626]/0 group-hover:border-[#DC2626]/20 rounded-br-2xl transition-all duration-500" />
      </motion.div>
    </motion.div>
  )
}
