"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ServicesHorizontal() {
  const reduceMotion = useReducedMotion()
  const services = site.services.slice(0, 4)

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27272A] via-[#2D2D32] to-[#27272A]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow accents */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASING.power4 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase">
              Usluge
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Integrisane usluge
            <span className="block text-white/50">sa preciznim fazama isporuke.</span>
          </h2>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            Svaka usluga je strukturisana kroz rokove, kontrolne tačke i jasnu dokumentaciju koju investitori očekuju.
          </p>
        </motion.div>

        {/* Services Grid 2x2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid md:grid-cols-2 gap-4 md:gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="group bg-[#2a2a32] border border-white/[0.06] p-7 md:p-8 transition-all duration-400 hover:border-[#DC2626]/20 hover:bg-[#2f2f38] rounded-xl"
            >
              {/* Number */}
              <span className="text-[#DC2626]/30 text-4xl md:text-5xl font-bold leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Separator */}
              <div className="h-[1px] w-8 bg-[#DC2626]/30 my-5" />

              {/* Title */}
              <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['Obim', 'Rok', 'Standard'].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.08em] uppercase text-gray-500 border border-white/[0.06] px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASING.power4 }}
          className="mt-10 md:mt-12"
        >
          <a
            href="/services"
            className="inline-flex items-center gap-3 text-sm text-[#DC2626] font-medium hover:gap-4 transition-all duration-300"
          >
            <span className="uppercase tracking-[0.1em]">Sve usluge</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
