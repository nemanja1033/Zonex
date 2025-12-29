"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import { useI18n } from '@/i18n/I18nProvider'

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { messages } = useI18n()
  const { title, subtitle, items } = messages.home.testimonials

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="left" />
      <div
        className="pointer-events-none absolute right-[6%] top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.16),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">06</span>
                <span className="section-rule" />
                <span className="eyebrow">{title}</span>
              </div>
              <h2 className="mt-4 section-title">{title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl body-muted">{subtitle}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.brand} delay={index * 0.05}>
              <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-[0_18px_40px_rgba(12,17,23,0.08)]">
                <p className="text-small text-textDark/90">{item.quote}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-micro font-mono uppercase tracking-micro text-muted">
                  <span>{item.brand}</span>
                  <span>{item.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
