"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import { CheckCircle2 } from 'lucide-react'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function CtaSection() {
  const reduceMotion = useReducedMotion()

  const benefits = [
    { label: 'Odgovor', value: '24-48h' },
    { label: 'Jasna struktura', value: 'Plan + rok' },
    { label: 'Transparentnost', value: 'Budžet' },
  ]

  return (
    <section className="relative overflow-hidden bg-[#2C2C2E] py-24 lg:py-32">
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

      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF3B30]/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASING.power4 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/5"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF3B30]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF3B30] font-medium">
                Kontakt
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
            >
              Spremni za projekat sa
              <span className="block bg-gradient-to-r from-white via-white/90 to-[#FF3B30] bg-clip-text text-transparent">
                jasnim standardima?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
              className="mx-auto max-w-2xl text-lg text-white/60 lg:text-xl"
            >
              Pošaljite osnovne informacije o projektu, a mi vraćamo strukturu, obim i predlog dinamike.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASING.power4 }}
            className="mt-10 flex justify-center"
          >
            <MagneticButton href="/contact" variant="primary" className="text-base px-10 py-4">
              Započnite razgovor
            </MagneticButton>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1, 0.6)}
            className="mt-20 grid gap-8 sm:grid-cols-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                variants={staggerItem}
                whileHover={reduceMotion ? {} : { y: -5 }}
                className="group space-y-3"
              >
                <motion.div 
                  className="flex justify-center"
                  whileHover={reduceMotion ? {} : { scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/20 group-hover:bg-[#FF3B30]/20 group-hover:border-[#FF3B30]/30 transition-all duration-300">
                    <CheckCircle2 className="h-6 w-6 text-[#FF3B30]" />
                  </div>
                </motion.div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  {benefit.label}
                </p>
                <p className="text-xl font-bold text-white">{benefit.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
