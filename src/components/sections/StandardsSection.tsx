"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function StandardsSection() {
  const reduceMotion = useReducedMotion()

  const proofs = [
    {
      title: 'Kontrolne tačke',
      description: 'Definisane inspekcije i granice kvaliteta na svakoj fazi izvođenja.',
    },
    {
      title: 'Zapisnici i standardi',
      description: 'Dokumentacija i checklist-e koje potvrđuju usaglašenost isporuke.',
    },
    {
      title: 'Protokoli bezbednosti',
      description: 'Sistemski nadzor ljudi, opreme i lokacija tokom izvođenja.',
    },
    {
      title: 'Usklađenost i okruženje',
      description: 'Poštovanje lokalnih regulativa i standarda zaštite okruženja.',
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-[#27272A] overflow-hidden">
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
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#DC2626]/3 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
                Standardi
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Kontrolne tačke koje štite rok, kvalitet i bezbednost.
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-lg">
              Umesto opštih obećanja, prikazujemo sistem kontrole i evidencije koji prati svaki projekat.
            </p>

            {/* Divider */}
            <motion.div
              className="h-px w-20 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING.power4 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer(0.1, 0.2)}
            className="grid gap-6 sm:grid-cols-2"
          >
            {proofs.map((item, index) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={reduceMotion ? {} : { y: -3 }}
                className="group relative p-6 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* Red top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#DC2626] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white uppercase mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
