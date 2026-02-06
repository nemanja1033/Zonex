"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative py-20 lg:py-28 bg-[#242424] overflow-hidden">
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

      {/* Glow accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DC2626]/3 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
                O nama
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {site.about.title}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
            className="text-base text-white/60 max-w-xl leading-relaxed"
          >
            {site.about.body}
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING.power4 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Values grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {site.values.map((item, index) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={reduceMotion ? {} : { y: -5 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-[#2C2C2E] border border-white/8 hover:border-white/12 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
                  <span>0{index + 1}</span>
                  <span>Princip</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#DC2626]/0 group-hover:border-[#DC2626]/20 rounded-tr-lg transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
