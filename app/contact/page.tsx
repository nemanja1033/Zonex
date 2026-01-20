import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ContactForm from '@/components/sections/ContactForm'
import Reveal from '@/components/motion/Reveal'
import ContactCard from '@/components/ui/ContactCard'

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
          <Reveal variant="scale">
            <ContactForm />
          </Reveal>
          <div className="space-y-6">
            <ContactCard />
            <Reveal delay={0.1}>
              <div className="card-surface rounded-lg p-6">
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">Šta sledi</p>
                <p className="mt-3 text-small text-white/80">
                  U roku od 48h vraćamo se sa predlogom obima, faza i narednih koraka.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
