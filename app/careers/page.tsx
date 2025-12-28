import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Karijere u stabilnom sistemu."
        subtitle="Tražimo ljude sa fokusom na preciznost, odgovornost i timsku koordinaciju."
      />
      <section className="section-divider bg-grey-100 section">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <h2 className="font-display text-h3">Otvorene pozicije</h2>
              <p className="body-muted">
                Trenutno nemamo javne oglase, ali uvek razmatramo profile koji donose iskustvo u vođenju gradilišta,
                koordinaciji radova i kontroli kvaliteta.
              </p>
            </div>
            <div className="surface p-6">
              <p className="eyebrow">Kontakt</p>
              <p className="mt-3 body-muted">
                Pošaljite biografiju na{' '}
                <span className="font-semibold text-textDark">career@zonex.rs</span>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
