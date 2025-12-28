import Container from '@/components/ui/Container'
import { standards } from '@/content/content'
import Reveal from '@/components/ui/Reveal'

export default function StandardsSection() {
  return (
    <section className="section-divider bg-grey-100 section">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow">06 / Standards</p>
              <h2 className="section-title">Kvalitet, bezbednost, dokumentacija.</h2>
              <p className="body-muted">
                Standardi nisu deo prezentacije već deo svakodnevnog rada. Svi procesi ostavljaju proverljiv trag.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {standards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="surface p-6">
                  <h3 className="font-display text-h4">{item.title}</h3>
                  <p className="mt-3 body-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
