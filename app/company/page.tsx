import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Timeline from '@/components/history/Timeline'
import { company, timeline } from '@/content/content'

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company / History"
        title="Kontinuitet i odgovornost od 1993."
        subtitle={`${company.name} razvija se kroz stabilne projekte i dugoročna partnerstva. Fokus ostaje na preciznoj realizaciji i tehničkoj pouzdanosti.`}
      />
      <section className="section-divider section section-surface">
        <Container>
          <div className="surface-elevated p-8">
            <p className="eyebrow">Timeline</p>
            <h2 className="mt-3 section-title">Razvoj kroz ključne faze.</h2>
            <div className="mt-10">
              <Timeline items={timeline} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
