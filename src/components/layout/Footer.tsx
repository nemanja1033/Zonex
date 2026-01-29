import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

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
    <footer className="relative overflow-hidden border-t border-[var(--border-light)] bg-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                ZONEX <span className="text-[var(--text-tertiary)]">— INŽENJERING</span>
              </h3>
              <div className="h-1 w-12 rounded-full bg-[var(--brand-red)]" />
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs">
              Inženjering sa jasnim rokovima i proverljivim kvalitetom.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
              Navigacija
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className="group relative inline-flex w-fit items-center text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--brand-red)]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[var(--brand-red)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
              Kontakt
            </h4>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--brand-red)]" />
                <span>{site.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-[var(--brand-red)]" />
                <a
                  href="mailto:info@zonex.rs"
                  className="hover:text-[var(--brand-red)] transition-colors duration-300"
                >
                  info@zonex.rs
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-[var(--brand-red)]" />
                <a
                  href="tel:+381123456789"
                  className="hover:text-[var(--brand-red)] transition-colors duration-300"
                >
                  +381 12 345 6789
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-[var(--text-tertiary)] transition-colors duration-300 hover:text-[var(--brand-red)]"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border-light)] pt-8 text-xs text-[var(--text-tertiary)] md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {site.company.name}. Sva prava zadržana.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-[var(--brand-red)] transition-colors duration-300"
            >
              Privatnost
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--brand-red)] transition-colors duration-300"
            >
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
