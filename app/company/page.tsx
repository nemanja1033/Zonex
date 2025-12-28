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
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(247,242,236,0.9))] p-8 shadow-[0_24px_60px_rgba(12,17,23,0.14)]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(255,122,26,0),rgba(255,122,26,0.7),rgba(23,176,168,0.8),rgba(255,122,26,0))]" />
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
