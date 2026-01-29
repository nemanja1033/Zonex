"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'
import { EASING } from '@/lib/animations'

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesCarousel() {
  const reduceMotion = useReducedMotion() ?? false
  const [isMobile, setIsMobile] = useState(false)
  const services = useMemo(
    () =>
      site.services.slice(0, 4).map((service, index) => ({
        ...service,
        number: String(index + 1).padStart(2, '0'),
        image: serviceImages[index % serviceImages.length],
      })),
    []
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const activeService = services[activeIndex]
  const totalLabel = String(services.length).padStart(2, '0')
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRaf = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      if (scrollRaf.current) return
      scrollRaf.current = window.requestAnimationFrame(() => {
        const nodes = cardRefs.current.filter(Boolean) as HTMLDivElement[]
        if (!nodes.length) {
          scrollRaf.current = null
          return
        }
        const scrollLeft = scroller.scrollLeft
        let closestIndex = 0
        let closestDistance = Infinity
        nodes.forEach((node, index) => {
          const targetLeft = node.offsetLeft - (scroller.clientWidth - node.clientWidth) / 2
          const distance = Math.abs(targetLeft - scrollLeft)
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })
        setActiveIndex(closestIndex)
        scrollRaf.current = null
      })
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', handleScroll)
      if (scrollRaf.current) {
        window.cancelAnimationFrame(scrollRaf.current)
        scrollRaf.current = null
      }
    }
  }, [isMobile])

  const scrollToIndex = (index: number) => {
    const node = cardRefs.current[index]
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const goToIndex = (index: number) => {
    const next = Math.max(0, Math.min(services.length - 1, index))
    setActiveIndex(next)
    if (isMobile) {
      window.requestAnimationFrame(() => scrollToIndex(next))
    }
  }

  const handleScroll = (direction: 'prev' | 'next') => {
    const nextIndex = direction === 'prev' ? activeIndex - 1 : activeIndex + 1
    goToIndex(nextIndex)
  }

  const renderDots = (compact = false) => (
    <div className={`flex flex-wrap items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      {services.map((_, index) => (
        <button
          key={`dot-${compact ? 'mobile' : 'desktop'}-${index}`}
          type="button"
          onClick={() => goToIndex(index)}
          className="group"
          aria-label={`Prikaži uslugu ${index + 1}`}
        >
          <span
            className={`block h-1 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? compact
                  ? 'w-10 bg-[#FF3B30]'
                  : 'w-16 bg-[#FF3B30]'
                : index < activeIndex
                  ? compact
                    ? 'w-6 bg-white/30'
                    : 'w-10 bg-white/30'
                  : compact
                    ? 'w-5 bg-white/15 group-hover:bg-white/30'
                    : 'w-8 bg-white/15 group-hover:bg-white/30'
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <section className="relative overflow-x-hidden bg-[#2C2C2E] py-6 md:py-24 lg:py-32">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF3B30]/3 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-3 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5 space-y-3 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASING.power4 }}
            >
              <span className="hidden items-center gap-3 px-4 py-2 rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/5 md:inline-flex">
                <span className="h-2 w-2 rounded-full bg-[#FF3B30]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#FF3B30] font-medium">
                  Usluge
                </span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASING.power4 }}
              className="space-y-2 md:space-y-4"
            >
              <h2 className="font-display text-[22px] leading-[1.18] text-white md:text-5xl xl:text-6xl">
                Integrisane usluge{' '}
                <span className="md:block text-white/60">sa preciznim</span>{' '}
                <span className="md:block text-white/60">fazama isporuke.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING.power4 }}
              className="space-y-2 md:space-y-4"
            >
              <p className="text-[12px] text-white/60 md:text-lg">
                Svaka usluga je strukturisana kroz rokove, kontrolne tačke i jasnu dokumentaciju koju investitori očekuju.
              </p>
              <p className="hidden text-sm text-white/40 md:block md:text-base">
                Operativa, koordinacija i završni standardi u jednoj liniji isporuke.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASING.power4 }}
              className="hidden space-y-6 pt-6 md:block"
            >
              <div className="flex items-baseline gap-3">
                <span className="tabular-nums text-5xl font-semibold text-white">
                  {activeService.number}
                </span>
                <span className="text-2xl text-white/20">/</span>
                <span className="tabular-nums text-2xl text-white/40">{totalLabel}</span>
              </div>
              {renderDots()}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleScroll('prev')}
                  disabled={activeIndex === 0}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                    activeIndex === 0
                      ? 'cursor-not-allowed border-white/10 text-white/20'
                      : 'border-white/20 text-white/60 hover:border-[#FF3B30] hover:bg-[#FF3B30]/10 hover:text-[#FF3B30]'
                  }`}
                  aria-label="Prethodna usluga"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('next')}
                  disabled={activeIndex === services.length - 1}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                    activeIndex === services.length - 1
                      ? 'cursor-not-allowed border-white/10 text-white/20'
                      : 'border-white/20 text-white/60 hover:border-[#FF3B30] hover:bg-[#FF3B30]/10 hover:text-[#FF3B30]'
                  }`}
                  aria-label="Sledeća usluga"
                >
                  →
                </button>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            {isMobile ? (
              <div className="space-y-2 overflow-x-clip">
                <div className="px-4">
                  <div
                    ref={scrollerRef}
                    className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch] overscroll-x-contain"
                    style={{ scrollPaddingInline: '16px' }}
                  >
                    {services.map((service, index) => (
                      <div
                        key={service.title}
                        ref={(node) => {
                          cardRefs.current[index] = node
                        }}
                        className="w-full max-w-[calc(100vw-32px)] flex-shrink-0 snap-center box-border"
                      >
                        <ServiceCard service={service} reduceMotion={reduceMotion} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 md:hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="tabular-nums text-xl font-semibold text-white">
                        {activeService.number}
                      </span>
                      <span className="text-base text-white/20">/</span>
                      <span className="tabular-nums text-sm text-white/40">{totalLabel}</span>
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-white/40">
                      Prevuci
                      <motion.span
                        className="ml-2 inline-block text-[#FF3B30]"
                        aria-hidden="true"
                        animate={reduceMotion ? undefined : { x: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                  {renderDots(true)}
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <ServiceCard key={activeIndex} service={activeService} reduceMotion={reduceMotion} />
              </AnimatePresence>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

type ServiceCardProps = {
  service: {
    title: string
    description: string
    number: string
    image: string
  }
  reduceMotion: boolean
}

function ServiceCard({ service, reduceMotion }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.96 }}
      transition={{ duration: 0.7, ease: EASING.power4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative max-h-[calc(100vh-180px)] overflow-hidden rounded-3xl border border-white/8 bg-[#36363A] shadow-[var(--shadow-lg)] transition-all duration-500 group-hover:border-white/12 group-hover:shadow-[var(--shadow-xl)] md:max-h-none">
        {/* Cursor glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 59, 48, 0.1), transparent 50%)`,
          }}
        />

        <div className="relative">
          <div className="space-y-2 px-3 pb-3 pt-3 md:space-y-4 md:px-8 md:pb-6 md:pt-8">
            <div className="flex items-center justify-between">
              <span className="hidden text-xl font-semibold text-[#FF3B30]/10 md:inline-block md:text-5xl lg:text-6xl">
                {service.number}
              </span>
              <span className="rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#FF3B30] md:px-3 md:py-1.5 md:text-[10px] md:tracking-[0.25em]">
                Usluga {service.number}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#FF3B30] md:text-3xl lg:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-md text-[11px] text-white/60 md:text-base [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden md:[display:block]">
              {service.description}
            </p>
            <div className="hidden flex-wrap gap-2 pt-1 text-[9px] uppercase tracking-wider text-white/40 md:flex md:pt-2 md:text-[11px]">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 md:px-3 md:py-1.5">
                Obim
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 md:px-3 md:py-1.5">
                Rok
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 md:px-3 md:py-1.5">
                Standard
              </span>
            </div>
          </div>
          <div className="relative aspect-[16/9] max-h-[180px] overflow-hidden md:aspect-[4/3] md:max-h-none lg:h-[380px] lg:aspect-auto">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#36363A] via-[#36363A]/40 to-transparent" />
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ transform: reduceMotion ? 'none' : 'scale(1.02)' }}
            />
            <div className="absolute bottom-4 left-5 right-5 z-20 md:bottom-6 md:left-8 md:right-8">
              <motion.a
                href="/services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF3B30] transition-colors hover:text-[#FF453A] md:gap-3 md:text-sm"
                whileHover={reduceMotion ? undefined : { x: 6 }}
                transition={{ duration: 0.3, ease: EASING.power4 }}
              >
                Pogledaj detalje
                <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Border glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#FF3B30]/0 transition-all duration-500 group-hover:border-[#FF3B30]/20" />
      </div>
      
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[#FF3B30]/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
