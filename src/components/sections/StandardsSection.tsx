"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function StandardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div className="pointer-events-none absolute right-[6%] top-0 h-72 w-72 bg-[radial-gradient(circle_at_top,rgba(12,18,28,0.6),transparent_70%)]" />
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number">05</span>
                <span className="section-rule" />
                <span className="eyebrow">Zašto nam veruju</span>
              </div>
              <h2 className="section-title">Vreme, kvalitet, bezbednost i zaštita okruženja.</h2>
              <p className="body-muted">
                Standardi nisu deo prezentacije, već svakodnevnog rada. Svaki korak ima proverljiv trag i jasnu odgovornost.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {site.values.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(3,6,12,0.4)]">
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
