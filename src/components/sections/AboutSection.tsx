"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import { about } from '@/content/content'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(47,128,237,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">02</span>
                <span className="section-rule" />
                <span className="eyebrow">O nama</span>
              </div>
              <h2 className="mt-4 section-title">{about.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl body-muted">{about.description}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {about.highlights.map((item, index) => (
            <Reveal key={item} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(160deg,rgba(11,28,45,0.02),rgba(11,28,45,0.06))] p-6 shadow-[0_20px_45px_rgba(11,28,45,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(11,28,45,0.12)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(47,128,237,0),rgba(47,128,237,0.7),rgba(47,128,237,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-muted">
                  <span>0{index + 1}</span>
                  <span>Ključna tačka</span>
                </div>
                <p className="mt-4 text-h3 font-display text-textDark">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
