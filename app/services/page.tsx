"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { site } from '../../data/site'
import StandardsSection from '@/components/sections/StandardsSection'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Usluge"
        title="Usluge i pristup"
        subtitle="Organizovane usluge sa jasnim obimom, standardima i dokumentacijom koja prati svaku fazu realizacije."
      />
      
      {/* Services grid */}
      <section className="relative py-16 lg:py-24 bg-[#2D2D32]">
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <Container className="relative z-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
            className="h-px w-20 bg-gradient-to-r from-white/20 to-transparent mb-10"
          />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.08, 0.1)}
            className="grid gap-6 md:grid-cols-2"
          >
            {site.services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                className="group relative p-8 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* Red top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#DC2626] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10">
                  <span className="text-[#DC2626] text-xs font-semibold tracking-[0.2em] uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-bold text-white uppercase mt-3 mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow icon */}
                <div className="mt-6 flex justify-end">
                  <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center group-hover:border-[#DC2626] group-hover:bg-[#DC2626] transition-all duration-300">
                    <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Process section */}
      <section className="relative py-16 lg:py-24 bg-[#27272A]">
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
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#DC2626]/3 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
                Proces
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Proces rada</h2>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
            className="h-px w-20 bg-gradient-to-r from-white/20 to-transparent mb-10"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.08, 0.2)}
            className="grid gap-6 md:grid-cols-4"
          >
            {site.process.map((step, index) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                className="group relative p-6 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* Red top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#DC2626] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#DC2626] text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.15em]">FAZA</span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <StandardsSection />
    </>
  )
}
