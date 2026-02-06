"use client"

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../../../data/site'
import { EASING } from '@/lib/animations'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { value: '30+', label: 'Godina iskustva' },
    { value: '1993', label: 'Godina osnivanja' },
    { value: 'Ključ u ruke', label: 'Model isporuke', isText: true },
    { value: 'ISO', label: 'Standardi kvaliteta', isText: true },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: EASING.power4,
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: EASING.power4,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layer 1: Base gradient with depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_-10%,#1a1a2e_0%,#0a0a0a_45%,#050505_100%)]" />

      {/* Layer 2: Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={reduceMotion ? undefined : {
          background: [
            'radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Layer 3: Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 4: Diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 36px)',
        }}
      />

      {/* Layer 5: Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Layer 6: Red ambient glow - top left */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%)',
        }}
        animate={reduceMotion ? undefined : {
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer 7: Secondary glow - bottom right */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 60%)',
        }}
        animate={reduceMotion ? undefined : {
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer 8: Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#DC2626]/40 blur-sm"
        animate={reduceMotion ? undefined : {
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/30 blur-sm"
        animate={reduceMotion ? undefined : {
          y: [10, -10, 10],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-32 lg:pt-40 pb-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          {/* Tag */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <motion.span
              className="h-[2px] bg-[#DC2626]"
              variants={lineVariants}
              style={{ transformOrigin: 'left', width: 48 }}
            />
            <span className="text-[#DC2626] text-[11px] font-semibold tracking-[0.25em] uppercase">
              Generalni izvođač
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#DC2626]"
              animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(2.8rem,8vw,5.5rem)] text-white leading-[0.95] tracking-[0.02em] max-w-[950px] mb-8"
          >
            Inženjering koji<br />
            isporučuje u rokovima,<br />
            <span className="relative">
              <span className="text-[#DC2626]">sa proverljivim</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-[#DC2626] to-transparent"
                initial={{ width: 0 }}
                animate={mounted ? { width: '60%' } : { width: 0 }}
                transition={{ duration: 1.2, delay: 1, ease: EASING.power4 }}
              />
            </span><br />
            <span className="text-[#DC2626]">kvalitetom.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-[560px] mb-12"
          >
            {site.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-3 bg-[#DC2626] text-white px-8 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)]"
            >
              {/* Button shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: '-200%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Naši projekti</span>
              <motion.svg
                className="relative z-10 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 border border-white/15 text-white px-8 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-500 hover:border-white/30 hover:bg-white/[0.03] backdrop-blur-sm"
            >
              <span>Kontaktirajte tim</span>
              <motion.svg
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - repositioned */}
      <motion.div
        className="absolute bottom-44 md:bottom-36 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <motion.div
          className="w-[1px] h-12 relative overflow-hidden"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#DC2626] via-[#DC2626]/50 to-transparent"
            animate={reduceMotion ? undefined : { y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Stats bar - enhanced */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Top border with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          className="backdrop-blur-md bg-[#0A0A0A]/60"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className={`group relative py-6 md:py-8 ${i > 0 ? 'border-l border-white/[0.06]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''} px-4 md:px-6 hover:bg-white/[0.02] transition-colors duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <motion.div
                      className={`${stat.isText ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-1`}
                      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[10px] text-white/40 tracking-[0.15em] uppercase">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
