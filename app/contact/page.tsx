import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Razgovor o projektu."
        subtitle="Pošaljite osnovne informacije i dobićete predlog obima, faza i dinamike."
      />
      <section className="section-divider bg-grey-100 section">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-6 surface p-6">
            <div>
              <label className="eyebrow">Ime i kompanija</label>
              <input
                className="mt-2 w-full border border-border bg-white px-4 py-3 text-small outline-none"
                placeholder="Ime / Kompanija"
              />
            </div>
            <div>
              <label className="eyebrow">Email</label>
              <input className="mt-2 w-full border border-border bg-white px-4 py-3 text-small outline-none" placeholder="Email" />
            </div>
            <div>
              <label className="eyebrow">Opis projekta</label>
              <textarea
                className="mt-2 h-32 w-full border border-border bg-white px-4 py-3 text-small outline-none"
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
          <div className="space-y-6 surface p-6">
            <div>
              <p className="eyebrow">Email</p>
              <p className="mt-2 text-small">office@zonex.rs</p>
            </div>
            <div>
              <p className="eyebrow">Telefon</p>
              <p className="mt-2 text-small">+381 21 555 300</p>
            </div>
            <div>
              <p className="eyebrow">Adresa</p>
              <p className="mt-2 text-small">Industrijska 12, Novi Sad</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
