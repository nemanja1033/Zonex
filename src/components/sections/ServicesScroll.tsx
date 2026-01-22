"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { site } from '../../../data/site'

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesScroll() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const shouldAnimate = useMemo(() => !reduceMotion && !isCoarse && isDesktop, [reduceMotion, isCoarse, isDesktop])

  useEffect(() => {
    if (!shouldAnimate) return
    let ctx: { revert: () => void } | undefined

    const run = async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap ?? gsapModule.default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>('[data-service-item]')
        const lines = gsap.utils.toArray<HTMLElement>('[data-service-line]')
        const media = gsap.utils.toArray<HTMLElement>('[data-service-media]')

        gsap.set(items, { autoAlpha: 0, y: 24 })
        gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1000',
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
          },
        })

        items.forEach((item, index) => {
          const at = index * 0.6
          timeline.to(item, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at)
          timeline.to(lines[index], { scaleX: 1, duration: 0.35, ease: 'power2.out' }, at + 0.08)
          if (media[index]) {
            timeline.fromTo(
              media[index],
              { y: 12 },
              { y: -10, duration: 0.7, ease: 'power2.out' },
              at
            )
          }
          if (index < items.length - 1) {
            timeline.to(item, { autoAlpha: 0, y: -12, duration: 0.4, ease: 'power2.in' }, at + 0.4)
          }
        })
      }, sectionRef)
    }

    run()

    return () => {
      ctx?.revert()
    }
  }, [shouldAnimate])

  const services = site.services.slice(0, 4)

  return (
    <section ref={sectionRef} className="section-divider section section-surface">
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
          <div className={`services-scroll ${shouldAnimate ? 'services-scroll--stacked' : ''}`} data-animate={shouldAnimate}>
            {services.map((service, index) => {
              const card = (
                <div className="service-item card-surface rounded-lg p-6 lg:p-7" data-service-item>
                  <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                    <span>0{index + 1}</span>
                    <span className="service-line" data-service-line />
                  </div>
                  <h3 className="mt-4 font-display text-h3 text-white">{service.title}</h3>
                  <p className="mt-3 text-small text-white/80">{service.description}</p>
                  <div className="mt-6 overflow-hidden rounded-md" data-service-media>
                    <Image
                      src={serviceImages[index % serviceImages.length]}
                      alt={service.title}
                      width={520}
                      height={320}
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="h-[200px] w-full object-cover"
                    />
                  </div>
                </div>
              )

              if (shouldAnimate) return card

              return (
                <Reveal key={service.title} delay={index * 0.06} variant="maskReveal">
                  {card}
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
