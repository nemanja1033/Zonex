"use client"

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import { site } from '../../../data/site'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'

export default function HomeHero() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const isLite = isCoarse && !reduceMotion
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 0.4], [0, -24])
  const glow = useTransform(scrollYProgress, [0, 0.4], [0, -12])
  const spotlight = useTransform(scrollYProgress, [0, 0.6], [0, 40])
  const titleParts = site.hero.title.split(', ')
  const titleLine1 = titleParts[0] ?? site.hero.title
  const titleLine2 = titleParts[1] ?? ''
  const focusItems = [
    { label: 'Sedište', value: site.company.location },
    { label: 'Osnovano', value: String(site.company.founded) },
    { label: 'Model', value: site.stats[2]?.value ?? 'Ključ u ruke' },
    { label: 'Fokus', value: 'Rokovi, kvalitet, bezbednost.' },
  ]

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="hero-signal-grid" aria-hidden="true" />
      <motion.div className="hero-spotlight" style={shouldReduce ? undefined : { y: spotlight }} aria-hidden="true" />
      <div className="glow-orb left-[8%] top-[12%] h-44 w-44 bg-[radial-gradient(circle,rgba(178,30,42,0.28),transparent_68%)]" aria-hidden="true" />
      <div className="glow-orb right-[6%] bottom-[10%] h-64 w-64 bg-[radial-gradient(circle,rgba(12,18,28,0.6),transparent_70%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg,rgba(255,255,255,0.16),transparent_38%,rgba(178,30,42,0.3),transparent_68%,rgba(255,255,255,0.16))] opacity-55 blur-2xl"
        animate={shouldReduce ? undefined : { rotate: 360 }}
        transition={shouldReduce ? undefined : { duration: 80, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[35%] h-64 w-[520px] -skew-y-6 rounded-full bg-[linear-gradient(120deg,rgba(178,30,42,0.18),rgba(12,18,28,0.4),transparent)] opacity-60 blur-3xl"
        style={shouldReduce ? undefined : { x: glow }}
        aria-hidden="true"
      />
      <motion.svg
        className="pointer-events-none absolute left-[6%] top-[18%] hidden h-[360px] w-[520px] text-white/15 md:block"
        viewBox="0 0 520 360"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M24 40H496V120L472 140H92L68 164V320H24V40Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={shouldReduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
          animate={shouldReduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 1, opacity: 0.8 }}
          transition={shouldReduce ? { duration: 0 } : { duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
        />
      </motion.svg>
      <motion.div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent"
        style={shouldReduce ? undefined : { y: drift }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-8">
            <Reveal variant="fadeUp">
              <motion.div
                className="relative space-y-5"
                initial={shouldReduce ? undefined : 'hidden'}
                animate={shouldReduce ? undefined : 'visible'}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: isLite ? 0.05 : 0.08 } },
                }}
              >
                {!shouldReduce && (
                  <motion.div
                    className="hero-scanline"
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '120%', opacity: [0, 1, 0] }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 0.72, 0, 1] }}
                    style={{ top: '42%' }}
                    aria-hidden="true"
                  />
                )}
                <motion.div
                  className="flex items-center gap-3 text-micro font-mono uppercase tracking-micro text-white/70"
                  variants={{ hidden: { opacity: 0, y: isLite ? 8 : 14 }, visible: { opacity: 1, y: 0 } }}
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  Od 1993. godine
                </motion.div>
                <motion.h1
                  className="text-h1 font-display text-white"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                >
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { opacity: 0, y: isLite ? 8 : 16, filter: 'blur(6px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    }}
                  >
                    {titleLine1}
                    {titleLine2 ? ',' : ''}
                  </motion.span>
                  {titleLine2 ? (
                    <motion.span
                      className="block"
                      variants={{
                        hidden: { opacity: 0, y: isLite ? 8 : 18, filter: 'blur(6px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      }}
                    >
                      {titleLine2}
                    </motion.span>
                  ) : null}
                </motion.h1>
                <motion.p
                  className="max-w-xl text-body text-white/85"
                  variants={{ hidden: { opacity: 0, y: isLite ? 8 : 14 }, visible: { opacity: 1, y: 0 } }}
                >
                  {site.hero.subtitle}
                </motion.p>
                <motion.div
                  className="flex flex-col items-stretch gap-4 pt-4 sm:flex-row sm:items-center sm:gap-6"
                  variants={{ hidden: { opacity: 0, y: isLite ? 8 : 14 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Button href="/projects" className="w-full justify-center sm:w-auto">
                    Naši projekti
                  </Button>
                  <Button href="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
                    Kontaktirajte tim
                  </Button>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
          <Reveal delay={0.1} variant="scale">
            <motion.div
              className="card-surface rounded-3xl p-6 shadow-[0_26px_60px_rgba(3,6,12,0.5)] backdrop-blur"
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                <span>Kontrolni centar</span>
                <span>Aktivan nadzor</span>
              </div>
              <div className="mt-6 grid gap-4">
                {focusItems.map((item) => (
                  <div key={item.label} className="card-surface rounded-2xl p-4">
                    <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
                      <span>{item.label}</span>
                      <span>Live</span>
                    </div>
                    <p className="mt-3 text-small text-white/80">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-10 right-6 hidden text-white/10 font-display text-[10vw] tracking-[0.4em] md:block">
        ZONEX
      </div>
    </section>
  )
}
