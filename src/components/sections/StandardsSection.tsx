"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import SignalStrip from '@/components/ui/SignalStrip'
import SectionRail from '@/components/motion/SectionRail'

export default function StandardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const proofs = [
    {
      title: 'Kontrolne tačke',
      description: 'Jasno definisane inspekcije i granice kvaliteta na svakoj fazi.',
    },
    {
      title: 'Zapisnici i standardi',
      description: 'Dokumentacija i checklist-e koje obezbeđuju usaglašenost isporuke.',
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
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionRail />
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div className="pointer-events-none absolute right-[6%] top-0 h-72 w-72 bg-[radial-gradient(circle_at_top,rgba(12,18,28,0.6),transparent_70%)]" />
      <Container>
        <Reveal>
          <SignalStrip className="mb-8" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="stamp">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="eyebrow">Dokazi kontrole</span>
              </div>
              <h2 className="section-title">Kontrolne tačke koje štite rok, kvalitet i bezbednost.</h2>
              <p className="body-muted text-measure">
                Umesto opštih obećanja, prikazujemo sistem kontrole i evidencije koji prati svaki projekat.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {proofs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} variant="scale">
                <div className="card-surface rounded-3xl p-6 shadow-[0_18px_45px_rgba(3,6,12,0.4)]">
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
