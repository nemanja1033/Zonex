"use client"

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '../../../data/site'

const serviceImages = [
  '/images/projects/kfc-zrenjanin-01.jpg',
  '/images/projects/kfc-zrenjanin-02.jpg',
  '/images/projects/kfc-zrenjanin-03.jpg',
  '/images/projects/kfc-zrenjanin-05.jpg',
]

export default function ServicesCarousel() {
  const reduceMotion = useReducedMotion() ?? false
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

  const handleScroll = (direction: 'prev' | 'next') => {
    setActiveIndex((current) => {
      if (direction === 'prev') return Math.max(0, current - 1)
      return Math.min(services.length - 1, current + 1)
    })
  }

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 lg:py-32">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                Usluge
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="font-display text-4xl leading-[1.1] text-white md:text-5xl xl:text-6xl">
                Integrisane usluge
                <br />
                sa preciznim
                <br />
                fazama isporuke.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg text-white/70">
                Svaka usluga je strukturisana kroz rokove, kontrolne tačke i jasnu dokumentaciju koju investitori očekuju.
              </p>
              <p className="text-base text-white/55">
                Operativa, koordinacija i završni standardi u jednoj liniji isporuke.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="tabular-nums text-5xl font-semibold text-white">{activeService.number}</span>
                <span className="text-2xl text-white/20">/</span>
                <span className="tabular-nums text-2xl text-white/35">04</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {services.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group"
                    aria-label={`Prikaži uslugu ${index + 1}`}
                  >
                    <span
                      className={`block h-1 rounded-full transition-all duration-500 ${
                        index === activeIndex
                          ? 'w-16 bg-[var(--accent)]'
                          : index < activeIndex
                            ? 'w-10 bg-white/30'
                            : 'w-8 bg-white/20 group-hover:bg-white/35'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleScroll('prev')}
                  disabled={activeIndex === 0}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                    activeIndex === 0
                      ? 'cursor-not-allowed border-white/10 text-white/10'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-label="Prethodna usluga"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('next')}
                  disabled={activeIndex === services.length - 1}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                    activeIndex === services.length - 1
                      ? 'cursor-not-allowed border-white/10 text-white/10'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-label="Sledeća usluga"
                >
                  →
                </button>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <ServiceCard key={activeIndex} service={activeService} reduceMotion={reduceMotion} />
            </AnimatePresence>
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(34,38,46,0.98),rgba(18,20,24,0.98))]">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(194, 59, 59, 0.12), transparent 50%)`,
          }}
        />
        <div className="relative">
          <div className="space-y-4 px-8 pb-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="text-6xl font-semibold text-[rgba(194,59,59,0.2)]">{service.number}</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                Usluga {service.number}
              </span>
            </div>
            <h3 className="text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-[var(--accent)] lg:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-md text-base text-white/65">{service.description}</p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] uppercase tracking-wider text-white/45">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Obim</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Rok</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Standard</span>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden lg:h-[380px]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[rgba(18,20,24,0.9)] via-transparent to-transparent" />
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ transform: reduceMotion ? 'none' : 'scale(1.02)' }}
            />
            <div className="absolute bottom-6 left-8 right-8 z-20">
              <motion.a
                href="/services"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-white"
                whileHover={reduceMotion ? undefined : { x: 6 }}
                transition={{ duration: 0.2 }}
              >
                Pogledaj detalje
                <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-[rgba(194,59,59,0.3)]" />
      </div>
      <motion.div
        className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[rgba(194,59,59,0.12)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
