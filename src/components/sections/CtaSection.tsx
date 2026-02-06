"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import { CheckCircle2 } from 'lucide-react'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function CtaSection() {
  const reduceMotion = useReducedMotion()

  const benefits = [
    { label: 'Odgovor', value: '24-48h', icon: '01' },
    { label: 'Jasna struktura', value: 'Plan + rok', icon: '02' },
    { label: 'Transparentnost', value: 'Budzet', icon: '03' },
  ]

  return (
    <section className="relative overflow-hidden py-32 lg:py-44">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 50%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#DC2626]/30 blur-sm"
        animate={reduceMotion ? undefined : { y: [-30, 30, -30], x: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-white/20 blur-sm"
        animate={reduceMotion ? undefined : { y: [20, -20, 20], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#DC2626]/40 blur-sm"
        animate={reduceMotion ? undefined : { y: [15, -15, 15], x: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASING.power4 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 backdrop-blur-sm mb-8"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#DC2626]"
              animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.25em] text-[#DC2626] font-medium">
              Kontakt
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASING.power4 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-8"
          >
            Spremni za projekat sa
            <motion.span
              className="block mt-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASING.power4 }}
            >
              <span className="bg-gradient-to-r from-white via-white/90 to-[#DC2626] bg-clip-text text-transparent">
                jasnim standardima?
              </span>
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASING.power4 }}
            className="mx-auto max-w-2xl text-lg text-white/50 lg:text-xl leading-relaxed mb-12"
          >
            Posaljite osnovne informacije o projektu, a mi vracamo strukturu, obim i predlog dinamike.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASING.power4 }}
            className="flex justify-center mb-20"
          >
            <MagneticButton href="/contact" variant="primary" className="text-base px-12 py-5">
              Zapocnite razgovor
            </MagneticButton>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: EASING.power4 }}
          />

          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12, 0.6)}
            className="grid gap-8 sm:grid-cols-3"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.label}
                variants={staggerItem}
                whileHover={reduceMotion ? {} : { y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A]/80 to-[#0F0F0F]/80 border border-white/[0.06] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon container */}
                  <motion.div
                    className="relative flex justify-center mb-6"
                    whileHover={reduceMotion ? {} : { scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 group-hover:bg-[#DC2626]/15 group-hover:border-[#DC2626]/30 transition-all duration-300">
                      <CheckCircle2 className="h-7 w-7 text-[#DC2626]" />
                    </div>
                  </motion.div>

                  {/* Label */}
                  <p className="relative text-xs font-medium uppercase tracking-[0.25em] text-white/35 mb-3">
                    {benefit.label}
                  </p>

                  {/* Value */}
                  <p className="relative text-2xl font-bold text-white">
                    {benefit.value}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-white/15">
                    {benefit.icon}
                  </div>

                  {/* Bottom line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DC2626] via-[#DC2626]/50 to-transparent rounded-b-2xl"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
