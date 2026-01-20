"use client"

import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'

export default function StandardsSection() {
  const proofs = [
    {
      title: 'Kontrolne tačke',
      description: 'Definisane inspekcije i granice kvaliteta na svakoj fazi izvođenja.',
    },
    {
      title: 'Zapisnici i standardi',
      description: 'Dokumentacija i checklist-e koje potvrđuju usaglašenost isporuke.',
    },
    {
      title: 'Protokoli bezbednosti',
      description: 'Sistemski nadzor ljudi, opreme i lokacija tokom izvođenja.',
    },
    {
      title: 'Usklađenost i okruženje',
      description: 'Poštovanje lokalnih regulativa i standarda zaštite okruženja.',
    },
  ]

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow">Standardi</p>
              <h2 className="section-title">Kontrolne tačke koje štite rok, kvalitet i bezbednost.</h2>
              <p className="body-muted text-measure">
                Umesto opštih obećanja, prikazujemo sistem kontrole i evidencije koji prati svaki projekat.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {proofs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} variant="fadeUp">
                <div className="card-surface rounded-lg p-6">
                  <h3 className="font-display text-h4 text-white">{item.title}</h3>
                  <p className="mt-3 text-small text-white/80">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
