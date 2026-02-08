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
          className="group relative"
          aria-label={`Prikaži uslugu ${index + 1}`}
        >
          <motion.span
            className={`block h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? compact
                  ? 'w-10 bg-[#DC2626]'
                  : 'w-16 bg-[#DC2626]'
                : index < activeIndex
                  ? compact
                    ? 'w-6 bg-white/30'
                    : 'w-10 bg-white/30'
                  : compact
                    ? 'w-5 bg-white/15 group-hover:bg-white/30'
                    : 'w-8 bg-white/15 group-hover:bg-white/30'
            }`}
            layoutId={`dot-${compact ? 'mobile' : 'desktop'}-${index}`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <section className="relative overflow-x-hidden py-8 md:py-28 lg:py-36">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27272A] via-[#2D2D32] to-[#27272A]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Glow accents */}
      <motion.div
        className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        <div className="grid gap-4 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          {/* Left content */}
          <div className="lg:col-span-5 space-y-4 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASING.power4 }}
            >
              <span className="hidden md:inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 backdrop-blur-sm">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[#DC2626]"
                  animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
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
              <h2 className="font-display text-[22px] leading-[1.2] text-white md:text-5xl xl:text-6xl">
                <span className="block">Integrisane usluge</span>
                <span className="block text-white/50">sa preciznim fazama isporuke.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING.power4 }}
              className="space-y-3 md:space-y-4"
            >
              <p className="text-[13px] text-white/50 md:text-lg leading-relaxed">
                Svaka usluga je strukturisana kroz rokove, kontrolne tačke i jasnu dokumentaciju koju investitori očekuju.
              </p>
              <p className="hidden text-sm text-white/35 md:block md:text-base">
                Operativa, koordinacija i završni standardi u jednoj liniji isporuke.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASING.power4 }}
              className="hidden space-y-6 pt-8 md:block"
            >
              {/* Counter display */}
              <div className="flex items-baseline gap-4">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tabular-nums text-6xl font-bold text-white"
                >
                  {activeService.number}
                </motion.span>
                <span className="text-2xl text-white/15">/</span>
                <span className="tabular-nums text-2xl text-white/30">{totalLabel}</span>
              </div>

              {/* Dots */}
              {renderDots()}

              {/* Navigation buttons */}
              <div className="flex items-center gap-4 pt-2">
                <motion.button
                  type="button"
                  onClick={() => handleScroll('prev')}
                  disabled={activeIndex === 0}
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    activeIndex === 0
                      ? 'cursor-not-allowed border-white/5 text-white/15'
                      : 'border-white/10 text-white/50 hover:border-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626]'
                  }`}
                  whileHover={activeIndex !== 0 ? { scale: 1.05 } : {}}
                  whileTap={activeIndex !== 0 ? { scale: 0.95 } : {}}
                  aria-label="Prethodna usluga"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleScroll('next')}
                  disabled={activeIndex === services.length - 1}
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    activeIndex === services.length - 1
                      ? 'cursor-not-allowed border-white/5 text-white/15'
                      : 'border-white/10 text-white/50 hover:border-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626]'
                  }`}
                  whileHover={activeIndex !== services.length - 1 ? { scale: 1.05 } : {}}
                  whileTap={activeIndex !== services.length - 1 ? { scale: 0.95 } : {}}
                  aria-label="Sledeća usluga"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right content - Card area */}
          <div className="lg:col-span-7">
            {isMobile ? (
              <div className="space-y-3 overflow-x-clip">
                <div className="pl-4 pr-0">
                  <div
                    ref={scrollerRef}
                    className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-0 pr-4 [-webkit-overflow-scrolling:touch] overscroll-x-contain"
                    style={{ scrollPaddingInline: '24px' }}
                  >
                    {services.map((service, index) => (
                      <div
                        key={service.title}
                        ref={(node) => {
                          cardRefs.current[index] = node
                        }}
                        className="w-[calc(100vw-56px)] flex-shrink-0 snap-center box-border first:ml-0"
                      >
                        <ServiceCard service={service} reduceMotion={reduceMotion} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 px-4 md:hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="tabular-nums text-2xl font-bold text-white">
                        {activeService.number}
                      </span>
                      <span className="text-base text-white/15">/</span>
                      <span className="tabular-nums text-sm text-white/30">{totalLabel}</span>
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-white/35">
                      Prevuci
                      <motion.span
                        className="ml-2 inline-block text-[#DC2626]"
                        aria-hidden="true"
                        animate={reduceMotion ? undefined : { x: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        -&gt;
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
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95 }}
      transition={{ duration: 0.7, ease: EASING.power4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#303036] to-[#2A2A30] shadow-[0_24px_80px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:border-white/[0.18] group-hover:shadow-[0_32px_100px_rgba(0,0,0,0.5)]">
        {/* Cursor glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.1), transparent 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative">
          <div className="space-y-3 px-5 pb-4 pt-5 md:space-y-5 md:px-10 md:pb-8 md:pt-10">
            <div className="flex items-center justify-between">
              <motion.span
                className="hidden text-[80px] font-bold leading-none text-[#DC2626]/[0.08] md:inline-block lg:text-[100px]"
                animate={isHovered && !reduceMotion ? { scale: 1.05, opacity: 0.12 } : { scale: 1, opacity: 0.08 }}
                transition={{ duration: 0.4 }}
              >
                {service.number}
              </motion.span>
              <span className="rounded-full border border-[#DC2626]/25 bg-[#DC2626]/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#DC2626] md:px-4 md:py-2 md:text-[10px] md:tracking-[0.25em]">
                Usluga {service.number}
              </span>
            </div>

            <motion.h3
              className="text-[17px] font-bold text-white transition-colors duration-300 group-hover:text-[#DC2626] md:text-3xl lg:text-4xl leading-tight"
              animate={isHovered && !reduceMotion ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>

            <p className="text-[12px] text-white/50 md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
              {service.description}
            </p>

            <div className="hidden flex-wrap gap-2 pt-2 md:flex">
              {['Obim', 'Rok', 'Standard'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-wider text-white/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/10] max-h-[200px] overflow-hidden md:max-h-none lg:h-[400px] lg:aspect-auto">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#303036] via-[#303036]/50 to-transparent" />
            <motion.div
              className="relative w-full h-full"
              animate={isHovered && !reduceMotion ? { scale: 1.08 } : { scale: 1.02 }}
              transition={{ duration: 0.8, ease: EASING.power4 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>

            {/* CTA */}
            <div className="absolute bottom-6 left-6 right-6 z-20 md:bottom-8 md:left-10 md:right-10">
              <motion.a
                href="/services"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-wider text-[#DC2626] transition-colors hover:text-[#EF4444] md:text-sm font-medium"
                animate={isHovered && !reduceMotion ? { x: 8 } : { x: 0 }}
                transition={{ duration: 0.3, ease: EASING.power4 }}
              >
                Pogledaj detalje
                <motion.span
                  aria-hidden="true"
                  animate={isHovered && !reduceMotion ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  -&gt;
                </motion.span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Border glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#DC2626]/0 transition-all duration-500 group-hover:border-[#DC2626]/15" />
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[#DC2626]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}
