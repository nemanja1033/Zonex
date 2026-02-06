"use client"

import { useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />

      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={reduceMotion ? undefined : {
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 70%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 30%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Glow accents */}
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASING.power4 }}
          className="mb-20 space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 backdrop-blur-sm"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#DC2626]"
              animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.25em] text-[#DC2626] font-medium">
              Proces
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1]"
          >
            Proces sa jasnim
            <span className="block text-white/40 mt-2">kontrolnim tackama.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
            className="max-w-2xl text-lg text-white/50 leading-relaxed"
          >
            Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i kvalitetu.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="h-px w-32 bg-gradient-to-r from-[#DC2626]/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Process cards with timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#DC2626]/50 via-[#DC2626]/30 to-[#DC2626]/10"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: EASING.power4 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer(0.15, 0.3)}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
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
        </div>
      </Container>
    </section>
  )
}

function ProcessCard({
  step,
  index,
  reduceMotion,
}: {
  step: { title: string; description: string }
  index: number
  reduceMotion: boolean | null
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Timeline node */}
      <div className="hidden md:flex absolute -top-[10px] left-1/2 -translate-x-1/2 z-20">
        <motion.div
          className="relative flex items-center justify-center"
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-8 h-8 rounded-full border-2 border-[#DC2626]/30"
            animate={isHovered ? { scale: 1.3, borderColor: 'rgba(220, 38, 38, 0.5)' } : {}}
            transition={{ duration: 0.3 }}
          />
          {/* Inner dot */}
          <div className="w-4 h-4 rounded-full bg-[#DC2626] shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
        </motion.div>
      </div>

      <motion.div
        whileHover={reduceMotion ? {} : { y: -12, scale: 1.02 }}
        transition={{ duration: 0.4, ease: EASING.power4 }}
        className="relative mt-12 md:mt-16 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-8 lg:p-10 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Cursor glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.1), transparent 50%)`,
          }}
        />

        {/* Large number badge - background */}
        <motion.span
          className="absolute right-6 top-6 text-[100px] lg:text-[120px] font-bold leading-none text-[#DC2626] select-none pointer-events-none"
          animate={isHovered && !reduceMotion ? { opacity: 0.08, scale: 1.1 } : { opacity: 0.04, scale: 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          {index + 1}
        </motion.span>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
              Faza {index + 1}
            </span>
            <motion.span
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#DC2626]/25 text-sm font-bold text-[#DC2626] bg-[#DC2626]/5"
              animate={isHovered && !reduceMotion ? { scale: 1.15, borderColor: 'rgba(220, 38, 38, 0.5)' } : {}}
              transition={{ duration: 0.3 }}
            >
              0{index + 1}
            </motion.span>
          </div>

          <motion.h3
            className="text-2xl lg:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#DC2626]"
            animate={isHovered && !reduceMotion ? { x: 4 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step.title}
          </motion.h3>

          <p className="text-base leading-relaxed text-white/50">{step.description}</p>

          {/* Animated divider */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-[#DC2626]/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.4, ease: EASING.power4 }}
          />
        </div>

        {/* Corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 h-[2px] w-8 bg-gradient-to-r from-[#DC2626] to-transparent" />
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-gradient-to-b from-[#DC2626] to-transparent" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-0 right-0 h-[2px] w-8 bg-gradient-to-l from-[#DC2626] to-transparent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-gradient-to-t from-[#DC2626] to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
