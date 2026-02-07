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
    { label: 'Početna', href: '/' },
    { label: 'Projekti', href: '/projects' },
    { label: 'Usluge', href: '/services' },
    { label: 'O nama', href: '/company' },
    { label: 'Kontakt', href: '/contact' },
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      label: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.12]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27272A] to-[#222226]" />

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
                  {social.icon}
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
          className="mt-16 flex flex-col gap-4 border-t border-white/[0.12] pt-8 text-xs text-white/35 md:flex-row md:items-center md:justify-between"
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
