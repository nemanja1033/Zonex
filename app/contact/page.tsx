import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Razgovor o projektu."
        subtitle="Pošaljite osnovne informacije i dobićete predlog obima, faza i dinamike."
      />
      <section className="section-divider section section-surface">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_60px_rgba(3,6,12,0.45)] backdrop-blur">
            <div>
              <label className="text-micro font-mono uppercase tracking-micro text-white/60">Ime i kompanija</label>
              <input
                className="input-field mt-2"
                placeholder="Ime / Kompanija"
              />
            </div>
            <div>
              <label className="text-micro font-mono uppercase tracking-micro text-white/60">Email</label>
              <input className="input-field mt-2" placeholder="Email" />
            </div>
            <div>
              <label className="text-micro font-mono uppercase tracking-micro text-white/60">Opis projekta</label>
              <textarea
                className="input-field mt-2 h-32"
                placeholder="Tip objekta, lokacija, obim"
              />
            </div>
            <button
              type="button"
              className="w-full button-primary py-3 text-micro font-mono uppercase tracking-micro"
            >
              Pošalji upit
            </button>
          </form>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_50px_rgba(3,6,12,0.45)] backdrop-blur">
            <div>
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Email</p>
              <p className="mt-2 text-small text-white/80">office@zonex.rs</p>
            </div>
            <div>
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Telefon</p>
              <p className="mt-2 text-small text-white/80">+381 21 555 300</p>
            </div>
            <div>
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Adresa</p>
              <p className="mt-2 text-small text-white/80">Industrijska 12, Novi Sad</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(178,30,42,0.08))] p-4">
              <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                <span>Mapa</span>
                <span>Lite</span>
              </div>
              <p className="mt-3 text-small text-white/75">Brza lokacija bez teških embedova.</p>
              <a
                className="mt-4 inline-flex text-micro font-mono uppercase tracking-micro text-white/80 underline underline-offset-4"
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
              >
                Otvori u mapama
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
