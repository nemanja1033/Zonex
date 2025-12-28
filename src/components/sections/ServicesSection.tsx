import Container from '@/components/ui/Container'
import { services } from '@/content/content'
import Reveal from '@/components/ui/Reveal'

export default function ServicesSection() {
  return (
    <section className="section-divider bg-white section">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number">04</span>
                <span className="section-rule" />
                <span className="eyebrow">Services + approach</span>
              </div>
              <h2 className="section-title">Integrisane usluge sa preciznim obimom rada.</h2>
              <p className="body-muted">
                Radimo u jasno definisanim fazama, sa transparentnim obavezama i dokumentacijom koja ostaje iza projekta.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.05}>
                <div className="surface-muted p-6">
                  <h3 className="font-display text-h4">{service.title}</h3>
                  <p className="mt-3 body-muted">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
