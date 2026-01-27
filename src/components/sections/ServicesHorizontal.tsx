"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { site } from '../../../data/site'

const SERVICES_HORIZONTAL_ENABLED = true
const SERVICES_DEBUG = false

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesHorizontal() {
  const services = site.services.slice(0, 4)
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackViewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLSpanElement | null>(null)
  const currentRef = useRef<HTMLSpanElement | null>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])
  const activeIndexRef = useRef(0)
  const delayRef = useRef<number | null>(null)
  const offsetsRef = useRef<number[]>([])
  const tweenRef = useRef<null | { kill: () => void }>(null)
  const triggerRef = useRef<null | { kill: () => void; refresh: () => void }>(null)
  const gsapRef = useRef<null | { killTweensOf: (target: Element | null) => void }>(null)
  const [enableGsap, setEnableGsap] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const update = () => {
      setEnableGsap(
        SERVICES_HORIZONTAL_ENABLED && media.matches && !reduceMotion && !isCoarse
      )
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [isCoarse, reduceMotion])

  useEffect(() => {
    if (!enableGsap) return
    let ctx: { revert: () => void } | undefined

    const run = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsapRef.current = gsap

      const section = sectionRef.current
      const trackViewport = trackViewportRef.current
      const track = trackRef.current
      const progressEl = progressRef.current
      const currentEl = currentRef.current
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

      if (!section || !trackViewport || !track || cards.length === 0) return

      const setActiveIndex = (nextIndex: number) => {
        if (activeIndexRef.current === nextIndex) return
        cards.forEach((card) => card.classList.remove('is-active'))
        if (delayRef.current) {
          window.clearTimeout(delayRef.current)
        }
        delayRef.current = window.setTimeout(() => {
          cards[nextIndex]?.classList.add('is-active')
        }, 100)
        activeIndexRef.current = nextIndex

        if (currentEl) {
          currentEl.textContent = `${String(nextIndex + 1).padStart(2, '0')}`
        }
        if (progressEl) {
          const ratio = cards.length > 1 ? nextIndex / (cards.length - 1) : 0
          gsap.set(progressEl, { scaleX: ratio })
        }
      }

      const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
      const getMaxTranslate = () => Math.max(track.scrollWidth - trackViewport.clientWidth, 0)
      const getScrollDistance = () => '+=300%'

      const computeOffsets = () => {
        const viewportWidth = trackViewport.clientWidth
        const maxTranslate = getMaxTranslate()
        offsetsRef.current = cards.map((card) => {
          const centerOffset = card.offsetLeft - (viewportWidth - card.clientWidth) / 2
          return clamp(-centerOffset, -maxTranslate, 0)
        })

        if (SERVICES_DEBUG) {
          console.log('[services-horizontal] offsets', offsetsRef.current)
          console.log('[services-horizontal] widths', {
            viewportWidth,
            trackWidth: track.scrollWidth,
            maxTranslate,
            cardCount: cards.length,
          })
        }
      }

      computeOffsets()

      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: getScrollDistance,
        pin: true,
        scrub: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: computeOffsets,
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * (cards.length - 1))
          if (nextIndex === activeIndexRef.current) return
          setActiveIndex(nextIndex)
          const offsets = offsetsRef.current
          const targetX = offsets[nextIndex] ?? 0
          tweenRef.current?.kill()
          tweenRef.current = gsap.to(track, {
            x: targetX,
            duration: 0.32,
            ease: 'power3.out',
          })

          if (SERVICES_DEBUG) {
            console.log('[services-horizontal] step', nextIndex, 'x', targetX)
          }
        },
      })

      setActiveIndex(0)
      if (progressEl) {
        gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' })
      }

      ctx = gsap.context(() => triggerRef.current, section)
    }

    run()

    return () => {
      if (delayRef.current) {
        window.clearTimeout(delayRef.current)
      }
      tweenRef.current?.kill()
      triggerRef.current?.kill()
      if (gsapRef.current && trackRef.current) {
        gsapRef.current.killTweensOf(trackRef.current)
      }
      ctx?.revert()
    }
  }, [enableGsap])

  return (
    <section ref={sectionRef} className="section-divider section section-surface services-horizontal">
      <Container>
        <div className="services-horizontal-grid">
          <div className="services-horizontal-left">
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
            <div className="services-progress">
              <div className="services-progress-text">
                <span ref={currentRef} className="services-progress-current">01</span>
                <span className="services-progress-total">/04</span>
              </div>
              <div className="services-progress-track">
                <span ref={progressRef} className="services-progress-bar" />
              </div>
            </div>
          </div>
          <div className="services-horizontal-right">
            <span className="services-ruler" aria-hidden="true" />
            <div ref={trackViewportRef} className="services-track-viewport">
              <div ref={trackRef} className="services-track">
                {services.map((service, index) => {
                  const badge = String(index + 1).padStart(2, '0')
                  const card = (
                    <div
                      key={service.title}
                      ref={(el) => {
                        cardsRef.current[index] = el
                      }}
                      className="service-card card-surface"
                      data-service-card
                    >
                      <span className="service-badge">{badge}</span>
                      <div className="service-header">
                        <p className="service-step text-micro font-mono uppercase tracking-micro text-white/65">
                          Usluga {badge}
                        </p>
                        <h3 className="service-title mt-3 font-display text-h3 text-white">{service.title}</h3>
                        <span className="service-divider" aria-hidden="true" />
                      </div>
                      <p className="mt-3 text-small text-white/80">{service.description}</p>
                      <div className="service-meta">
                        <span>Obim</span>
                        <span>Rok</span>
                        <span>Standard</span>
                      </div>
                      <div className="service-image">
                        <Image
                          src={serviceImages[index % serviceImages.length]}
                          alt={service.title}
                          width={520}
                          height={360}
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="h-[220px] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )

                  if (enableGsap) return card

                  return (
                    <Reveal key={service.title} delay={index * 0.06} variant="maskReveal">
                      {card}
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
