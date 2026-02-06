'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function Footer() {
  const reduceMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Pocetna', href: '/' },
    { label: 'Projekti', href: '/projects' },
    { label: 'Usluge', href: '/services' },
    { label: 'O nama', href: '/company' },
    { label: 'Kontakt', href: '/contact' },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#050505]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Glow accent */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10 py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1, 0)}
          className="grid gap-12 md:grid-cols-3 lg:gap-20"
        >
          {/* Logo and tagline */}
          <motion.div variants={staggerItem} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                ZONEX <span className="text-white/30 font-normal">| INZENJERING</span>
              </h3>
              <motion.div
                className="h-1 w-16 rounded-full bg-gradient-to-r from-[#DC2626] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASING.power4 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            <p className="text-sm text-white/45 max-w-xs leading-relaxed">
              Inzenjering sa jasnim rokovima i proverljivim kvalitetom. Preko 30 godina iskustva u realizaciji zahtevnih projekata.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={staggerItem} className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/25">
              Navigacija
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className="group relative inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#DC2626] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#DC2626] to-transparent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={staggerItem} className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/25">
              Kontakt
            </h4>
            <div className="space-y-4 text-sm text-white/50">
              <motion.div
                className="flex items-start gap-4 group"
                whileHover={reduceMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 group-hover:bg-[#DC2626]/15 transition-colors">
                  <MapPin className="h-4 w-4 text-[#DC2626]" />
                </div>
                <span className="pt-2.5 group-hover:text-white transition-colors duration-300">
                  {site.company.location}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={reduceMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 group-hover:bg-[#DC2626]/15 transition-colors">
                  <Mail className="h-4 w-4 text-[#DC2626]" />
                </div>
                <a
                  href="mailto:info@zonex.rs"
                  className="hover:text-white transition-colors duration-300"
                >
                  info@zonex.rs
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={reduceMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 group-hover:bg-[#DC2626]/15 transition-colors">
                  <Phone className="h-4 w-4 text-[#DC2626]" />
                </div>
                <a
                  href="tel:+381123456789"
                  className="hover:text-white transition-colors duration-300"
                >
                  +381 12 345 6789
                </a>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:border-[#DC2626]/30 hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
                  aria-label={social.label}
                  whileHover={reduceMotion ? {} : { scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-semibold">{social.label.charAt(0)}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
          className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/30 md:flex-row md:items-center md:justify-between"
        >
          <p>
            {currentYear} {site.company.name}. Sva prava zadrzana.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privatnost
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Uslovi koriscenja
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
