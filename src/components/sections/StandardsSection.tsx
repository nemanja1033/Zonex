"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { standards } from '@/content/content'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function StandardsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div className="pointer-events-none absolute right-[6%] top-0 h-72 w-72 bg-[radial-gradient(circle_at_top,rgba(10,10,12,0.18),transparent_70%)]" />
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number">08</span>
                <span className="section-rule" />
                <span className="eyebrow">Standards</span>
              </div>
              <h2 className="section-title">Kvalitet, bezbednost, dokumentacija.</h2>
              <p className="body-muted">
                Standardi nisu deo prezentacije već deo svakodnevnog rada. Svi procesi ostavljaju proverljiv trag.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {standards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="lux-border lux-sheen rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(247,242,236,0.88))] p-6 shadow-[0_18px_45px_rgba(12,17,23,0.08)]">
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
