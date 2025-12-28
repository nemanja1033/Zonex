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
      <section className="section-divider bg-grey-100 section">
        <Container className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="surface p-6">
              <h2 className="font-display text-h4">{service.title}</h2>
              <p className="mt-3 body-muted">{service.description}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="section-divider bg-white section">
        <Container>
          <h2 className="section-title">Proces rada</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="surface-muted p-6">
                <p className="eyebrow">0{index + 1}</p>
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
