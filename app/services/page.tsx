import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../data/site'
import StandardsSection from '@/components/sections/StandardsSection'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Usluge"
        title="Usluge i pristup"
        subtitle="Organizovane usluge sa jasnim obimom, standardima i dokumentacijom koja prati svaku fazu realizacije."
      />
      <section className="section-divider section section-surface">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal variant="lineReveal" className="md:col-span-2">
            <span className="block h-px w-20 bg-white/15" />
          </Reveal>
          {site.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05} variant="clipReveal">
              <div className="card-surface relative overflow-hidden rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                <h2 className="font-display text-h4 text-white">{service.title}</h2>
                <p className="mt-3 text-small text-white/80">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
      <section className="section-divider section section-surface">
        <Container>
          <Reveal>
            <h2 className="section-title">Proces rada</h2>
          </Reveal>
          <Reveal variant="lineReveal" className="mt-6">
            <span className="block h-px w-20 bg-white/15" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {site.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05} variant="clipReveal">
                <div className="card-surface rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                  <p className="text-micro font-mono uppercase tracking-micro text-white/60">Faza {index + 1}</p>
                  <h3 className="mt-3 font-display text-h4 text-white">{step.title}</h3>
                  <p className="mt-2 text-small text-white/80">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <StandardsSection />
    </>
  )
}
