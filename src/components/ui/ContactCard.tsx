"use client"

import { motion } from 'framer-motion'
import { site } from '../../../data/site'
import { EASING } from '@/lib/animations'

type ContactCardProps = {
  showMapLink?: boolean
}

export default function ContactCard({ showMapLink = true }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASING.power4 }}
      className="group p-6 md:p-8 rounded-2xl bg-[#2C2C2E] border border-white/8 hover:border-white/12 transition-all duration-300 space-y-6"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Email</p>
        <a 
          href="mailto:office@zonex.rs" 
          className="text-base text-white hover:text-[#FF3B30] transition-colors duration-300"
        >
          office@zonex.rs
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Telefon</p>
        <a 
          href="tel:+38121555300" 
          className="text-base text-white hover:text-[#FF3B30] transition-colors duration-300"
        >
          +381 21 555 300
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Adresa</p>
        <p className="text-base text-white/80">{site.company.location}</p>
      </div>
      {showMapLink && (
        <div className="rounded-xl border border-white/8 bg-white/5 p-4">
          <p className="text-sm text-white/70 mb-1">Brza lokacija</p>
          <p className="text-xs text-white/50 mb-3">Prikaži adresu bez teških embedova.</p>
          <a
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#FF3B30] hover:text-[#FF453A] transition-colors duration-300"
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
          >
            Otvori u mapama
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </motion.div>
  )
}
