"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProofStrip() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative py-16 lg:py-20 bg-[#242424] overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#DC2626]/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: EASING.power4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
            Dokazi kapaciteta
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASING.power4 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.stats.map((proof, index) => (
            <motion.div
              key={proof.label}
              variants={staggerItem}
              whileHover={reduceMotion ? {} : { y: -5 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-[#2C2C2E] border border-white/8 hover:border-white/12 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <p className="text-sm text-white/60 mb-3">{proof.label}</p>
                <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {proof.value}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#DC2626]/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
