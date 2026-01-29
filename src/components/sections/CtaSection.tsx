"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import { CheckCircle2 } from 'lucide-react'

export default function CtaSection() {
  const benefits = [
    { label: 'Odgovor', value: '24-48h' },
    { label: 'Jasna struktura', value: 'Plan + rok' },
    { label: 'Transparentnost', value: 'Budžet' },
  ]

  return (
    <section className="relative overflow-hidden bg-[var(--bg-tertiary)] py-16 md:py-24 lg:py-32">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--text-tertiary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full border-2 border-[var(--brand-red)] bg-[var(--brand-red-bg)] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-red)]">
              Kontakt
            </span>

            <h2 className="font-display text-4xl text-[var(--text-primary)] md:text-5xl lg:text-6xl">
              Spremni za projekat sa <span className="block">jasnim standardima?</span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
              Pošaljite osnovne informacije o projektu, a mi vraćamo strukturu, obim i predlog dinamike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex justify-center"
          >
            <MagneticButton href="/contact" variant="primary" className="text-base">
              Započnite razgovor
            </MagneticButton>
          </motion.div>

          {/* Quick benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid gap-8 sm:grid-cols-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="h-8 w-8 text-[var(--brand-red)]" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  {benefit.label}
                </p>
                <p className="text-xl font-bold text-[var(--text-primary)]">{benefit.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
