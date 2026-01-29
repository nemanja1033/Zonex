'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Početna', href: '/' },
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
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#1C1C1E]">
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
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FF3B30]/3 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1, 0)}
          className="grid gap-12 md:grid-cols-3 lg:gap-16"
        >
          {/* Logo and tagline */}
          <motion.div variants={staggerItem} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                ZONEX <span className="text-white/40">— INŽENJERING</span>
              </h3>
              <div className="h-1 w-12 rounded-full bg-[#FF3B30]" />
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Inženjering sa jasnim rokovima i proverljivim kvalitetom. Preko 30 godina iskustva u realizaciji zahtevnih projekata.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={staggerItem} className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Navigacija
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className="group relative inline-flex w-fit items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight 
                    size={12} 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FF3B30]" 
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF3B30] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={staggerItem} className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Kontakt
            </h4>
            <div className="space-y-4 text-sm text-white/60">
              <div className="flex items-start gap-3 group">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF3B30]" />
                <span className="group-hover:text-white transition-colors duration-300">
                  {site.company.location}
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#FF3B30]" />
                <a
                  href="mailto:info@zonex.rs"
                  className="hover:text-white transition-colors duration-300"
                >
                  info@zonex.rs
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#FF3B30]" />
                <a
                  href="tel:+381123456789"
                  className="hover:text-white transition-colors duration-300"
                >
                  +381 12 345 6789
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-[#FF3B30]/30 hover:bg-[#FF3B30]/10 hover:text-[#FF3B30]"
                  aria-label={social.label}
                >
                  <span className="text-xs font-medium">{social.label.charAt(0)}</span>
                </a>
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
          className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between"
        >
          <p>
            © {currentYear} {site.company.name}. Sva prava zadržana.
          </p>
          <div className="flex gap-6">
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
              Uslovi korišćenja
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
