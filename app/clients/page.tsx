import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { clients } from '@/content/content'

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clients / References"
        title="Partneri i sektori"
        subtitle="Radimo sa klijentima u retail, hospitality i energetskom sektoru, uz jasno definisane standarde realizacije."
      />
      <section className="section-divider bg-grey-100 section">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {clients.map((client) => (
              <div key={client.name} className="surface p-6">
                <div className="h-16 border border-dashed border-border bg-grey-100" />
                <h2 className="mt-4 font-display text-h4">{client.name}</h2>
                <p className="mt-2 body-muted">{client.sector}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
