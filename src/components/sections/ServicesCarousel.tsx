"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { site } from '../../../data/site'
import styles from './ServicesCarousel.module.css'

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesCarousel() {
  const services = site.services.slice(0, 4)
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const initRafRef = useRef<number | null>(null)
  const debounceRef = useRef<number | null>(null)
  const tweenRef = useRef<any>(null)
  const gsapRef = useRef<any>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const scroller = scrollerRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!scroller || cards.length === 0) return

    const setSidePadding = () => {
      const firstCard = cards[0]
      if (!firstCard || firstCard.clientWidth === 0) return
      const pad = Math.max(16, (scroller.clientWidth - firstCard.clientWidth) / 2)
      scroller.style.setProperty('--carousel-pad', `${pad}px`)
    }

    const updateActiveIndex = () => {
      const firstCard = cards[0]
      if (!firstCard || firstCard.clientWidth === 0) return
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

    const getClosestIndex = () => {
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

      return closestIndex
    }

    const snapToIndex = (index: number) => {
      const card = cards[index]
      if (!card) return
      const center = card.offsetLeft + card.offsetWidth / 2
      const maxScroll = scroller.scrollWidth - scroller.clientWidth
      const targetLeft = Math.min(maxScroll, Math.max(0, center - scroller.clientWidth / 2))

      if (reduceMotion || !gsapRef.current) {
        scroller.scrollTo({ left: targetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })
        return
      }

      const gsap = gsapRef.current
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }

      const proxy = { x: scroller.scrollLeft }
      tweenRef.current = gsap.to(proxy, {
        x: targetLeft,
        duration: 0.45,
        ease: 'power3.out',
        onUpdate: () => {
          scroller.scrollLeft = proxy.x
        },
        onComplete: () => {
          tweenRef.current = null
        },
      })
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        updateActiveIndex()
      })

      if (debounceRef.current) window.clearTimeout(debounceRef.current)
      debounceRef.current = window.setTimeout(() => {
        const index = getClosestIndex()
        snapToIndex(index)
      }, 120)
    }

    const handleResize = () => {
      setSidePadding()
      updateActiveIndex()
    }

    const init = () => {
      setSidePadding()
      updateActiveIndex()
      if (cards[0]?.clientWidth === 0) {
        initRafRef.current = window.requestAnimationFrame(init)
      }
    }

    init()
    scroller.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const handleInteract = () => setHasInteracted(true)
    const handlePointerDown = () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }
      handleInteract()
    }
    scroller.addEventListener('pointerdown', handlePointerDown, { passive: true })
    scroller.addEventListener('touchstart', handlePointerDown, { passive: true })

    return () => {
      scroller.removeEventListener('scroll', handleScroll)
      scroller.removeEventListener('pointerdown', handlePointerDown)
      scroller.removeEventListener('touchstart', handlePointerDown)
      window.removeEventListener('resize', handleResize)
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (initRafRef.current) {
        window.cancelAnimationFrame(initRafRef.current)
        initRafRef.current = null
      }
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }
    }
  }, [reduceMotion])

  useEffect(() => {
    let mounted = true
    const loadGsap = async () => {
      try {
        const gsapModule = await import('gsap')
        const gsap = gsapModule.gsap ?? gsapModule.default
        try {
          const pluginModule = await import('gsap/ScrollToPlugin')
          const ScrollToPlugin = pluginModule.ScrollToPlugin ?? pluginModule.default
          if (ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin)
        } catch {
          // ScrollToPlugin not available; manual tween will be used.
        }
        if (mounted) gsapRef.current = gsap
      } catch {
        gsapRef.current = null
      }
    }
    loadGsap()
    return () => {
      mounted = false
      gsapRef.current = null
    }
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches || reduceMotion || isCoarse) return

    const handleWheel = (event: WheelEvent) => {
      const { deltaX, deltaY } = event
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return

      const maxScroll = scroller.scrollWidth - scroller.clientWidth
      const atStart = scroller.scrollLeft <= 0
      const atEnd = scroller.scrollLeft >= maxScroll - 1

      if ((atStart && deltaY < 0) || (atEnd && deltaY > 0)) return

      event.preventDefault()
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
      }
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      scroller.scrollLeft = Math.min(maxScroll, Math.max(0, scroller.scrollLeft + deltaY))
      if (!hasInteracted) setHasInteracted(true)
    }

    scroller.addEventListener('wheel', handleWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', handleWheel)
  }, [hasInteracted, isCoarse, reduceMotion])

  const progressLabel = useMemo(() => String(activeIndex + 1).padStart(2, '0'), [activeIndex])
  const progressScale = useMemo(
    () => (services.length > 1 ? activeIndex / (services.length - 1) : 0),
    [activeIndex, services.length]
  )

  const handleDotClick = (index: number) => {
    const target = cardRefs.current[index]
    const scroller = scrollerRef.current
    if (!target || !scroller) return
    const center = target.offsetLeft + target.offsetWidth / 2
    const nextLeft = center - scroller.clientWidth / 2
    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    const clamped = Math.min(maxScroll, Math.max(0, nextLeft))
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }
    if (reduceMotion || !gsapRef.current) {
      scroller.scrollTo({ left: clamped, behavior: reduceMotion ? 'auto' : 'smooth' })
    } else {
      const gsap = gsapRef.current
      const proxy = { x: scroller.scrollLeft }
      tweenRef.current = gsap.to(proxy, {
        x: clamped,
        duration: 0.45,
        ease: 'power3.out',
        onUpdate: () => {
          scroller.scrollLeft = proxy.x
        },
        onComplete: () => {
          tweenRef.current = null
        },
      })
    }
    setHasInteracted(true)
  }

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
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
            <div className="flex flex-col gap-3" aria-live="polite">
              <div className="text-[0.85rem] uppercase tracking-[0.28em] text-white/70">
                <span className="font-mono">{progressLabel}</span>
                <span className="font-mono">/04</span>
              </div>
              <div className={styles.progressTrack}>
                <span className={styles.progressBar} style={{ transform: `scaleX(${progressScale})` }} />
              </div>
              <div className={styles.dots} role="tablist" aria-label="Usluge navigacija">
                {services.map((service, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Prikaži uslugu ${String(index + 1).padStart(2, '0')}: ${service.title}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.carouselWrap}>
            <div ref={scrollerRef} className={styles.carouselScroll} role="region" aria-label="Usluge carousel">
              {services.map((service, index) => {
                const badge = String(index + 1).padStart(2, '0')
                const isActive = index === activeIndex
                return (
                  <article
                    key={service.title}
                    ref={(el) => {
                      cardRefs.current[index] = el
                    }}
                    className={`card-surface rounded-xl p-6 ${styles.card} ${
                      isActive ? styles.cardActive : ''
                    }`}
                    aria-label={`Usluga ${badge}: ${service.title}`}
                  >
                    <motion.span
                      className="text-[0.7rem] uppercase tracking-[0.24em] text-white/70"
                      initial={false}
                      animate={reduceMotion ? { opacity: 1 } : isActive ? { opacity: 1 } : { opacity: 0.7 }}
                    >
                      {badge}
                    </motion.span>
                    <motion.div
                      className="mt-4"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: 1, y: 0 }
                          : isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.8, y: 6 }
                      }
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <p className="text-micro font-mono uppercase tracking-micro text-white/60">Usluga {badge}</p>
                      <motion.h3
                        className="mt-3 font-display text-h3 text-white"
                        initial={false}
                        animate={
                          reduceMotion
                            ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
                            : isActive
                              ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
                              : { opacity: 0.75, clipPath: 'inset(0 0 100% 0)' }
                        }
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        {service.title}
                      </motion.h3>
                      <span className="mt-4 block h-px w-full bg-white/20" aria-hidden="true" />
                    </motion.div>
                    <motion.p
                      className="mt-3 text-small text-white/80"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: 1, y: 0 }
                          : isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.7, y: 8 }
                      }
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {service.description}
                    </motion.p>
                    <motion.div
                      className="mt-4 flex gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-white/55"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: 1, y: 0 }
                          : isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.7, y: 6 }
                      }
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <span className="border-r border-white/15 pr-3">Obim</span>
                      <span className="border-r border-white/15 pr-3">Rok</span>
                      <span>Standard</span>
                    </motion.div>
                    <motion.div
                      className="mt-5 overflow-hidden rounded-lg"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { y: 0, scale: 1 }
                          : isActive
                            ? { y: -6, scale: 1.02 }
                            : { y: 0, scale: 1 }
                      }
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <Image
                        src={serviceImages[index % serviceImages.length]}
                        alt={service.title}
                        width={520}
                        height={360}
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="h-[220px] w-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  </article>
                )
              })}
            </div>
            <span className={`${styles.hint} ${hasInteracted ? styles.hintHidden : ''}`}>Povucite / Skrolujte</span>
            <span className={`${styles.edge} ${styles.edgeLeft}`} aria-hidden="true" />
            <span className={`${styles.edge} ${styles.edgeRight}`} aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  )
}
