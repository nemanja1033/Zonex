import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/ui/Reveal'
import SignalStrip from '@/components/ui/SignalStrip'
import { site } from '../../data/site'

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
          <Reveal className="md:col-span-2">
            <SignalStrip className="mb-8" />
          </Reveal>
          {site.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05} variant={index % 2 === 0 ? 'fadeUp' : 'slideInRight'}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.7),rgba(255,255,255,0.2),rgba(178,30,42,0))]" />
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">Usluga</p>
                <h2 className="mt-3 font-display text-h4 text-white">{service.title}</h2>
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
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {site.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05} variant="fadeUp">
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.45)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.7),rgba(255,255,255,0.2),rgba(178,30,42,0))]" />
                  <p className="text-micro font-mono uppercase tracking-micro text-white/60">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-h4 text-white">{step.title}</h3>
                  <p className="mt-2 text-small text-white/80">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
