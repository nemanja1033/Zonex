"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { getLenisInstance } from '@/lib/lenis'

export default function ProcessSection() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [enableGsap, setEnableGsap] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const update = () => setEnableGsap(media.matches && !reduceMotion && !isCoarse)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [isCoarse, reduceMotion])

  useEffect(() => {
    if (!enableGsap) return
    let ctx: { revert: () => void } | undefined

    const run = async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap ?? gsapModule.default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-process-card]')
        const line = gsap.utils.toArray<HTMLElement>('[data-process-line]')

        gsap.set(cards, { autoAlpha: 0, y: 24 })
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

        const lenis = getLenisInstance()
        if (lenis) {
          lenis.on('scroll', ScrollTrigger.update)
          ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
              if (typeof value === 'number') {
                lenis.scrollTo(value, { immediate: true })
              }
              return lenis.scroll
            },
            getBoundingClientRect() {
              return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
          })
          ScrollTrigger.addEventListener('refresh', () => lenis.resize())
          ScrollTrigger.refresh()
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=900',
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
          },
        })

        timeline.to(line, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 0)

        cards.forEach((card, index) => {
          timeline.to(card, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, index * 0.35 + 0.1)
        })
      }, sectionRef)
    }

    run()

    return () => {
      ctx?.revert()
    }
  }, [enableGsap])

  return (
    <section ref={sectionRef} className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <p className="eyebrow">Proces</p>
              <h2 className="mt-4 section-title">Proces sa jasnim kontrolnim tačkama.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Svaka faza ima definisane odgovornosti, standarde i dokumentaciju. Fokus je na stabilnosti rokova i kvalitetu.
            </p>
          </Reveal>
        </div>
        <span className="mt-6 block h-px w-20 bg-white/15" data-process-line />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {site.process.map((step, index) => {
            const card = (
              <div className="card-surface card-hover rounded-lg p-5 sm:p-6" data-process-card>
                <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                  <span>Faza {index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-h4 text-white">{step.title}</h3>
                <p className="mt-2 text-small text-white/80">{step.description}</p>
              </div>
            )

            if (enableGsap) return <div key={step.title}>{card}</div>

            return (
              <Reveal key={step.title} delay={index * 0.06} variant="maskReveal">
                {card}
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
