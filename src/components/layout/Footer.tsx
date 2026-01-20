import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import LogoLockup from '@/components/brand/LogoLockup'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <Container className="py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <LogoLockup theme="light" size="md" />
            <p className="text-small text-white/75">
              Inženjering sa jasnim rokovima i proverljivim kvalitetom.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-micro font-mono uppercase tracking-micro text-white/70">
            <Link className="hover:text-white" href="/projects" prefetch>
              Projekti
            </Link>
            <Link className="hover:text-white" href="/services" prefetch>
              Usluge
            </Link>
            <Link className="hover:text-white" href="/contact" prefetch>
              Kontakt
            </Link>
          </div>
        </div>
        <div className="relative mt-8 flex flex-col gap-2 pt-6 text-micro font-mono uppercase tracking-micro text-white/60 md:flex-row md:justify-between">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
          <span>{site.company.name}</span>
          <span>{site.company.location}</span>
        </div>
      </Container>
    </footer>
  )
}
