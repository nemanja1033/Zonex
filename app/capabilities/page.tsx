import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { capabilities, standards } from '@/content/content'

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Kapaciteti koji podržavaju složene projekte."
        subtitle="Fokus na ljude, procese i standarde koji omogućavaju precizno izvođenje i kontrolu kvaliteta."
      />
      <section className="section-divider bg-grey-100 section">
        <Container className="grid gap-6 md:grid-cols-2">
          {capabilities.map((item) => (
            <div key={item.title} className="surface p-6">
              <h2 className="font-display text-h4">{item.title}</h2>
              <p className="mt-3 body-muted">{item.description}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="section-divider bg-white section">
        <Container>
          <h2 className="section-title">Standardi rada</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {standards.map((item) => (
              <div key={item.title} className="surface-muted p-6">
                <h3 className="font-display text-h4">{item.title}</h3>
                <p className="mt-3 body-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
