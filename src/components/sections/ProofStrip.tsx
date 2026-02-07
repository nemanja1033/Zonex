"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProofStrip() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27272A] via-[#2D2D32] to-[#27272A]" />

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={reduceMotion ? undefined : {
          background: [
            'radial-gradient(ellipse at 0% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 100% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 0% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Glow accent */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EASING.power4 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.span
              className="flex h-3 w-3 items-center justify-center"
              animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="absolute h-3 w-3 rounded-full bg-[#DC2626]/30 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-[#DC2626]" />
            </motion.span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-medium">
              Kapaciteti i reference
            </span>
          </div>
          <motion.div
            className="hidden md:block h-px flex-1 mx-8 bg-gradient-to-r from-white/10 via-white/5 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.stats.map((proof, index) => (
            <StatCard key={proof.label} proof={proof} index={index} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

function StatCard({
  proof,
  index,
  reduceMotion
}: {
  proof: { label: string; value: string }
  index: number
  reduceMotion: boolean | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={reduceMotion ? {} : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: EASING.power4 }}
      className="group relative"
    >
      <div className="relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-[#303036] to-[#2A2A30] border border-white/[0.12] overflow-hidden transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Cursor glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.12), transparent 50%)`,
          }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#DC2626] to-transparent"
            initial={{ width: 0 }}
            animate={isHovered ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-[#DC2626] to-transparent"
            initial={{ height: 0 }}
            animate={isHovered ? { height: 32 } : { height: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Number indicator */}
        <span className="absolute top-6 right-6 text-[10px] font-mono text-white/20 tracking-wider">
          0{index + 1}
        </span>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm text-white/50 mb-4 tracking-wide">{proof.label}</p>
          <motion.p
            className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
            animate={isHovered && !reduceMotion ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {proof.value}
          </motion.p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#DC2626]/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.4, ease: EASING.power4 }}
        />

        {/* Background glow on hover */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#DC2626]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>
    </motion.div>
  )
}
