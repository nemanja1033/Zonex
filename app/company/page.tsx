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
      <section className="section-divider bg-grey-100 section">
        <Container>
          <Timeline items={timeline} />
        </Container>
      </section>
    </>
  )
}
