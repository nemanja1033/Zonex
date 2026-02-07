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
                whileHover={{ y: -5 }}
                className="group relative p-6 lg:p-8 rounded-2xl bg-[#303036] border border-white/12 hover:border-white/18 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#DC2626]/0 group-hover:border-[#DC2626]/20 rounded-tr-lg transition-all duration-300" />
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DC2626]/3 rounded-full blur-[150px] pointer-events-none" />

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
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-[#303036] border border-white/12 hover:border-white/18 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                    Faza {index + 1}
                  </p>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Number badge */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#DC2626]/20 text-xs font-bold text-[#DC2626]">
                  {index + 1}
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
