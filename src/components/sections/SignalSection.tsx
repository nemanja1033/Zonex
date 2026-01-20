"use client"

import { useRef } from 'react'
import Container from '@/components/ui/Container'
import SectionOrnament from '@/components/ui/SectionOrnament'
import SignalStrip from '@/components/ui/SignalStrip'
import SectionRail from '@/components/motion/SectionRail'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'
import Heading from '@/components/ui/Heading'
import Stack from '@/components/ui/Stack'

export default function SignalSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionRail />
      <SectionOrnament targetRef={sectionRef} variant="left" />
      <Container>
        <Reveal>
          <SignalStrip className="mb-8" />
        </Reveal>
        <div className="section-head">
          <Reveal className="stamp">
            <Stack gap="sm">
              <span className="eyebrow">Signal</span>
              <Heading as="h2" className="text-white">
                Kontrolni parametri koji vode svaki projekat.
              </Heading>
            </Stack>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-muted text-measure">
              Četiri signala su prisutna u planiranju, izvedbi i kontroli kvaliteta. Kratko, jasno, proverljivo.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1} variant="fadeUp">
              <div className="card-surface rounded-3xl p-6 shadow-[0_18px_45px_rgba(3,6,12,0.4)]">
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/70">
                  <span>{item.title}</span>
                  <span className="text-white/40">Signal</span>
                </div>
                <p className="mt-4 text-small text-white/85">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
