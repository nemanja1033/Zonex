"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="relative bg-white py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4"
        >
          <span className="inline-flex items-center rounded-full border-2 border-[var(--brand-red)] bg-[var(--brand-red-bg)] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-red)]">
            Proces
          </span>
          <h2 className="font-display text-4xl text-[var(--text-primary)] md:text-5xl lg:text-6xl">
            Proces sa jasnim <span className="block">kontrolnim tačkama.</span>
          </h2>
          <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
            Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i
            kvalitetu.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Connecting lines for desktop */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            {/* Horizontal line between 1 and 2 */}
            <div
              className="absolute left-1/2 top-[12.5%] h-[1px] w-full border-t-2 border-dashed border-[var(--brand-red)] opacity-30"
              style={{ width: 'calc(50% - 2rem)' }}
            />
            {/* Vertical line between 1 and 3 */}
            <div
              className="absolute left-[25%] top-[12.5%] h-full w-[1px] border-l-2 border-dashed border-[var(--brand-red)] opacity-30"
              style={{ height: 'calc(50% - 2rem)' }}
            />
            {/* Horizontal line between 3 and 4 */}
            <div
              className="absolute left-1/2 bottom-[12.5%] h-[1px] w-full border-t-2 border-dashed border-[var(--brand-red)] opacity-30"
              style={{ width: 'calc(50% - 2rem)' }}
            />
          </div>

          {site.process.slice(0, 4).map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.77, 0, 0.175, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white p-8 shadow-[var(--shadow-md)] transition-all duration-500 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2">
                {/* Large number badge */}
                <span
                  className="absolute left-8 top-8 text-[80px] font-bold leading-none text-[var(--brand-red)] opacity-10"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                {/* Content */}
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      Faza {index + 1}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--brand-red)] text-sm font-bold text-[var(--brand-red)]">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-red)]">
                    {step.title}
                  </h3>

                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                </div>

                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(194,59,59,0.15)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
