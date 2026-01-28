"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import useCleanupRegistry from '@/components/hooks/useCleanupRegistry'
import { site } from '../../../data/site'

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
  const { register } = useCleanupRegistry()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const rafRef = useRef<number | null>(null)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const update = () => setIsDesktop(media.matches && !reduceMotion && !isCoarse)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [isCoarse, reduceMotion])

  useEffect(() => {
    const scroller = scrollerRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!scroller || cards.length === 0) return

    const setSidePadding = () => {
      const firstCard = cards[0]
      if (!firstCard) return
      const pad = Math.max(16, (scroller.clientWidth - firstCard.clientWidth) / 2)
      scroller.style.setProperty('--carousel-pad', `${pad}px`)
    }

    const updateActiveIndex = () => {
      if (!scroller) return
      const center = scroller.scrollLeft + scroller.clientWidth / 2
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - center)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex
        setActiveIndex(closestIndex)
      }
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        updateActiveIndex()
      })
    }

    setSidePadding()
    updateActiveIndex()
    scroller.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      setSidePadding()
      updateActiveIndex()
    }

    window.addEventListener('resize', handleResize)

    if (SERVICES_DEBUG) {
      console.log('[services-carousel]', {
        trackWidth: scroller.scrollWidth,
        viewportWidth: scroller.clientWidth,
        maxScroll: scroller.scrollWidth - scroller.clientWidth,
        cardCount: cards.length,
      })
    }

    const handleInteract = () => setHasInteracted(true)
    scroller.addEventListener('pointerdown', handleInteract, { once: true })
    scroller.addEventListener('touchstart', handleInteract, { once: true })

    const cleanup = () => {
      scroller.removeEventListener('pointerdown', handleInteract)
      scroller.removeEventListener('touchstart', handleInteract)
      scroller.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    register(cleanup)
    return cleanup
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleWheel = (event: WheelEvent) => {
      if (!scroller) return
      const { deltaX, deltaY } = event
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return

      const maxScroll = scroller.scrollWidth - scroller.clientWidth
      const atStart = scroller.scrollLeft <= 0
      const atEnd = scroller.scrollLeft >= maxScroll - 1

      if ((atStart && deltaY < 0) || (atEnd && deltaY > 0)) return

      event.preventDefault()
      scroller.scrollLeft = Math.min(
        maxScroll,
        Math.max(0, scroller.scrollLeft + deltaY)
      )
      if (!hasInteracted) setHasInteracted(true)
    }

    scroller.addEventListener('wheel', handleWheel, { passive: false })

    const cleanup = () => {
      scroller.removeEventListener('wheel', handleWheel)
    }

    register(cleanup)
    return cleanup
  }, [hasInteracted, isDesktop])

  const progressLabel = useMemo(() => String(activeIndex + 1).padStart(2, '0'), [activeIndex])
  const progressScale = useMemo(() => (services.length > 1 ? activeIndex / (services.length - 1) : 0), [activeIndex, services.length])

  const handleDotClick = (index: number) => {
    const target = cardRefs.current[index]
    const scroller = scrollerRef.current
    if (!target || !scroller) return
    const center = target.offsetLeft + target.offsetWidth / 2
    const nextLeft = center - scroller.clientWidth / 2
    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    const clamped = Math.min(maxScroll, Math.max(0, nextLeft))
    scroller.scrollTo({ left: clamped, behavior: reduceMotion ? 'auto' : 'smooth' })
    setHasInteracted(true)
  }

  return (
    <section className="section-divider section section-surface section-spotlight services-horizontal">
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
            <div className="services-progress" aria-live="polite">
              <div className="services-progress-text">
                <span className="services-progress-current">{progressLabel}</span>
                <span className="services-progress-total">/04</span>
              </div>
              <div className="services-progress-track">
                <span className="services-progress-bar" style={{ transform: `scaleX(${progressScale})` }} />
              </div>
              <div className="services-progress-dots" role="tablist" aria-label="Usluge navigacija">
                {services.map((service, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    className={`services-dot ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Prikaži uslugu ${String(index + 1).padStart(2, '0')}: ${service.title}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="services-horizontal-right">
            <span className="services-ruler" aria-hidden="true" />
            <div className="services-carousel-shell">
              <div
                ref={scrollerRef}
                className="services-carousel"
                tabIndex={0}
                role="region"
                aria-label="Usluge carousel"
              >
                <div className="services-track">
                  {services.map((service, index) => {
                    const badge = String(index + 1).padStart(2, '0')
                    const isActive = index === activeIndex
                    return (
                      <div
                        key={service.title}
                        ref={(el) => {
                          cardRefs.current[index] = el
                        }}
                        className={`service-card card-surface ${isActive ? 'is-active' : ''}`}
                        data-index={index}
                        aria-label={`Usluga ${badge}: ${service.title}`}
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
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="h-[220px] w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <span className={`services-hint ${hasInteracted ? 'is-hidden' : ''}`}>
                Povucite / Skrolujte
              </span>
              <span className="services-edge services-edge--left" aria-hidden="true" />
              <span className="services-edge services-edge--right" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
