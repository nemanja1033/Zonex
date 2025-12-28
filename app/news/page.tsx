import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { updates } from '@/content/content'

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="Vesti i ažuriranja"
        subtitle="Kratki pregledi aktivnosti i važnih tačaka u toku realizacije."
      />
      <section className="section-divider bg-grey-100 section">
        <Container className="space-y-6">
          {updates.map((update) => (
            <div key={update.title} className="surface p-6">
              <p className="eyebrow">{update.date}</p>
              <h2 className="mt-3 font-display text-h3">{update.title}</h2>
              <p className="mt-3 body-muted">{update.summary}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}
