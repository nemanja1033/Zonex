"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-900 text-white section">
      <SectionOrnament targetRef={sectionRef} variant="right" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(155,14,28,0.45),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(10,10,12,0.35),transparent_65%)]" />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="section-number text-white/80">09</span>
                <span className="section-rule bg-white/60" />
                <span className="eyebrow-light">Next step</span>
              </div>
              <h2 className="section-title-light">Spremni za projekat sa jasnim standardima?</h2>
              <p className="text-small text-white/90">
                Pošaljite osnovne informacije o projektu, a mi vraćamo strukturu, obim i predlog dinamike.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center justify-start md:justify-end">
            <Button href="/contact">Započnite razgovor</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
