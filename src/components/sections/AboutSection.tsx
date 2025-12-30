"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'
import { site } from '../../../data/site'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top,rgba(178,30,42,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[10%] bottom-0 h-72 w-72 bg-[radial-gradient(circle,rgba(12,18,28,0.6),transparent_65%)]"
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
              <h2 className="mt-4 section-title">{site.about.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl body-muted">{site.about.body}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {site.values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_55px_rgba(3,6,12,0.4)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(178,30,42,0),rgba(178,30,42,0.75),rgba(255,255,255,0.3),rgba(178,30,42,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                  <span>0{index + 1}</span>
                  <span>Signal</span>
                </div>
                <p className="mt-4 text-h3 font-display text-white">{item.title}</p>
                <p className="mt-3 text-small text-white/80">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
