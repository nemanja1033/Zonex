import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ContactForm from '@/components/sections/ContactForm'
import ContactCard from '@/components/ui/ContactCard'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Razgovor o projektu."
        subtitle="Pošaljite osnovne informacije i dobićete predlog obima, faza i dinamike."
      />
      <section className="relative py-16 lg:py-24 bg-[#1C1C1E]">
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF3B30]/3 rounded-full blur-[150px] pointer-events-none" />

        <Container className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />
          <div className="space-y-6">
            <ContactCard />
            <div className="p-6 rounded-2xl bg-[#2C2C2E] border border-white/8">
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Šta sledi</p>
              <p className="text-sm text-white/60">
                U roku od 48h vraćamo se sa predlogom obima, faza i narednih koraka.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
