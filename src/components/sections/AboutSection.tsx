"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative py-20 lg:py-28 bg-[#2D2D32] overflow-hidden">
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
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />

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
              whileHover={reduceMotion ? {} : { y: -3 }}
              className="group relative p-6 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
            >
              {/* Red top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#DC2626] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#DC2626] text-xs font-semibold tracking-[0.15em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">PRINCIP</span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
