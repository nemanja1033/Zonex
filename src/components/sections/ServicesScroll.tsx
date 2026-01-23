"use client"

import Image from 'next/image'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesScroll() {
  const services = site.services.slice(0, 4)

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="space-y-4">
                <p className="eyebrow">Usluge</p>
                <h2 className="section-title">Integrisane usluge sa preciznim fazama isporuke.</h2>
                <p className="body-muted text-measure">
                  Svaka usluga je strukturisana kroz rokove, kontrolne tačke i jasnu dokumentaciju koju investitori očekuju.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="section-subtitle">Operativa, koordinacija i završni standardi u jednoj liniji isporuke.</p>
            </Reveal>
            <span className="section-rule mt-6 block" />
          </div>
          <div className="services-scroll">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06} variant="maskReveal">
                <div className="group card-surface card-hover rounded-lg p-6 lg:p-7">
                  <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                    <span>0{index + 1}</span>
                    <span className="service-line" />
                  </div>
                  <h3 className="mt-4 font-display text-h3 text-white">{service.title}</h3>
                  <p className="mt-3 text-small text-white/80">{service.description}</p>
                  <div className="mt-6 overflow-hidden rounded-md">
                    <Image
                      src={serviceImages[index % serviceImages.length]}
                      alt={service.title}
                      width={520}
                      height={320}
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
