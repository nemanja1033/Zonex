import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import LogoLockup from '@/components/brand/LogoLockup'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(178,30,42,0.8),rgba(255,255,255,0.2),transparent)]" />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(178,30,42,0.24),transparent_65%)]" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(12,18,28,0.6),transparent_60%)]" />
      <Container className="py-[var(--section-padding)]">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div>
              <LogoLockup theme="light" size="md" className="mb-6" />
              <p className="eyebrow-light">Kontakt</p>
              <h3 className="mt-3 font-display text-h3 text-white">Jasan kanal za projektne informacije.</h3>
            </div>
            <div className="grid gap-4 text-small text-white/90 md:grid-cols-2">
              <div>
                <p className="eyebrow-light">Email</p>
                <p>office@zonex.rs</p>
              </div>
              <div>
                <p className="eyebrow-light">Telefon</p>
                <p>+381 21 555 300</p>
              </div>
              <div>
                <p className="eyebrow-light">Adresa</p>
                <p>Industrijska 12, Novi Sad</p>
              </div>
            </div>
          </div>
          <div className="space-y-5 border-l border-white/10 pl-6 text-small text-white/85">
            <div>
              <p className="eyebrow-light">Naziv</p>
              <p>{site.company.name}</p>
            </div>
            <div>
              <p className="eyebrow-light">Sedište</p>
              <p>{site.company.location}</p>
            </div>
            <div>
              <p className="eyebrow-light">Delatnost</p>
              <p>Inženjering i realizacija objekata</p>
            </div>
          </div>
        </div>
        <div className="relative mt-12 flex flex-col gap-2 pt-6 text-micro font-mono uppercase tracking-micro text-white/70 md:flex-row md:justify-between">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(178,30,42,0.6),rgba(255,255,255,0.15),transparent)]" />
          <span>{site.company.name}</span>
          <span>Sva prava zadržana.</span>
        </div>
      </Container>
    </footer>
  )
}
