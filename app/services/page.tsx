import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { site } from '../../data/site'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Usluge"
        title="Usluge i pristup"
        subtitle="Organizovane usluge sa jasnim obimom, standardima i dokumentacijom koja prati svaku fazu realizacije."
      />
      <section className="section-divider section section-surface">
        <Container className="grid gap-6 md:grid-cols-2">
          {site.services.map((service) => (
            <div key={service.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)]">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.7),rgba(255,255,255,0.2),rgba(178,30,42,0))]" />
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Usluga</p>
              <h2 className="mt-3 font-display text-h4 text-white">{service.title}</h2>
              <p className="mt-3 text-small text-white/80">{service.description}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="section-divider section section-surface">
        <Container>
          <h2 className="section-title">Proces rada</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {site.process.map((step, index) => (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.7),rgba(255,255,255,0.2),rgba(178,30,42,0))]" />
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">0{index + 1}</p>
                <h3 className="mt-3 font-display text-h4 text-white">{step.title}</h3>
                <p className="mt-2 text-small text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
