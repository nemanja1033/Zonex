import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { services, processSteps } from '@/content/content'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Usluge i pristup"
        subtitle="Organizovane usluge sa jasnim obimom, standardima i dokumentacijom koja prati svaku fazu realizacije."
      />
      <section className="section-divider section section-surface">
        <Container className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="lux-border lux-sheen relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(247,242,236,0.9))] p-6 shadow-[0_22px_55px_rgba(5,5,5,0.14)]">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(155,14,28,0),rgba(155,14,28,0.7),rgba(12,12,14,0.7),rgba(155,14,28,0))]" />
              <p className="text-micro font-mono uppercase tracking-micro text-muted">Usluga</p>
              <h2 className="mt-3 font-display text-h4">{service.title}</h2>
              <p className="mt-3 body-muted">{service.description}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="section-divider section section-surface">
        <Container>
          <h2 className="section-title">Proces rada</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="lux-border lux-sheen relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(247,242,236,0.9))] p-6 shadow-[0_22px_55px_rgba(5,5,5,0.14)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(155,14,28,0),rgba(155,14,28,0.7),rgba(12,12,14,0.7),rgba(155,14,28,0))]" />
                <p className="text-micro font-mono uppercase tracking-micro text-muted">0{index + 1}</p>
                <h3 className="mt-3 font-display text-h4">{step.title}</h3>
                <p className="mt-2 body-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
