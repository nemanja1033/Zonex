import Container from '@/components/ui/Container'
import { company } from '@/content/content'
import LogoLockup from '@/components/brand/LogoLockup'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 text-white">
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
              <p>{company.name}</p>
            </div>
            <div>
              <p className="eyebrow-light">Sedište</p>
              <p>{company.location}</p>
            </div>
            <div>
              <p className="eyebrow-light">Delatnost</p>
              <p>Inženjering i realizacija objekata</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-micro font-mono uppercase tracking-micro text-white/70 md:flex-row md:justify-between">
          <span>{company.name}</span>
          <span>Sva prava zadržana.</span>
        </div>
      </Container>
    </footer>
  )
}
