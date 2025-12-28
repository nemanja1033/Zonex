import Container from '@/components/ui/Container'
import { processSteps } from '@/content/content'
import Reveal from '@/components/ui/Reveal'

export default function ProcessSection() {
  return (
    <section className="section-divider bg-grey-100 section">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">05</span>
                <span className="section-rule" />
                <span className="eyebrow">How we work</span>
              </div>
              <h2 className="mt-4 section-title">Proces sa jasnim kontrolnim tačkama.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md body-muted">
              Svaka faza ima definisane odgovornosti i standarde dokumentacije. Fokus je na kvalitetu i stabilnosti isporuke.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="surface p-6">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-3 font-display text-h4">{step.title}</h3>
                <p className="mt-2 body-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
