"use client"

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white section">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,26,0.6),rgba(10,10,12,0.95))]" />
      <Container>
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow-light">Kontakt</p>
              <h2 className="section-title-light">Spremni za projekat sa jasnim standardima?</h2>
              <p className="text-small text-white/85 text-measure">
                Pošaljite osnovne informacije o projektu, a mi vraćamo strukturu, obim i predlog dinamike.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex items-center justify-start md:justify-end">
            <Button href="/contact" className="w-full justify-center sm:w-auto">
              Započnite razgovor
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
