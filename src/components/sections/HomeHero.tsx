"use client"

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { company, featuredProjectSlugs, projects } from '@/content/content'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'

export default function HomeHero() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 0.4], [0, -40])
  const driftSlow = useTransform(scrollYProgress, [0, 0.4], [0, -20])
  const panelShift = useTransform(scrollYProgress, [0, 0.4], [0, -24])
  const cardDrift = useTransform(scrollYProgress, [0, 0.4], [0, -12])
  const orbDrift = useTransform(scrollYProgress, [0, 0.4], [0, 16])
  const glowShift = useTransform(scrollYProgress, [0, 0.4], [0, -10])
  const beamShift = useTransform(scrollYProgress, [0, 0.4], [-60, 60])
  const sheenShift = useTransform(scrollYProgress, [0, 0.4], [24, -24])
  const titleWords = 'Inženjering visokog standarda za objekte koji traju.'.split(' ')
  const stats = [
    { label: 'Godina osnivanja', value: 1993, suffix: '' },
    { label: 'Iskustvo', value: 30, suffix: '+' },
    { label: 'Projekti', value: 480, suffix: '+' },
  ]
  const focusPills = ['Projektovanje', 'Izvođenje', 'Nadzor', 'Rokovi']
  const featuredFromSlugs = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project))
    .slice(0, 3)
  const featuredProjects = featuredFromSlugs.length ? featuredFromSlugs : projects.slice(0, 3)
  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] },
    }),
  }
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 0.7, 0.1, 1] },
    },
  }

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-900 text-white">
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="glow-orb left-[6%] top-[12%] h-44 w-44 bg-[radial-gradient(circle,rgba(96,10,16,0.32),transparent_68%)]" aria-hidden="true" />
      <div className="glow-orb right-[10%] bottom-[18%] h-56 w-56 bg-[radial-gradient(circle,rgba(40,8,10,0.28),transparent_70%)]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_120deg,rgba(255,255,255,0.18),transparent_38%,rgba(96,10,16,0.38),transparent_68%,rgba(255,255,255,0.18))] opacity-55 blur-2xl"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[35%] h-64 w-[520px] -skew-y-6 rounded-full bg-[linear-gradient(120deg,rgba(96,10,16,0.28),rgba(12,12,14,0.18),transparent)] opacity-60 blur-3xl"
        style={{ x: beamShift }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/12 via-white/6 to-transparent"
        style={{ y: drift }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-gradient-to-tr from-white/8 via-white/5 to-transparent"
        style={{ y: driftSlow }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[20%] h-24 w-24 rounded-full border border-white/20"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], x: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[18%] h-[180px] w-[180px] rounded-[40%] border border-white/10 bg-white/5 blur-[1px]"
        animate={reduceMotion ? undefined : { rotate: [0, 12, 0], scale: [1, 1.06, 1] }}
        transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_70%)] opacity-70"
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.8, 0.45] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-10">
            <Reveal>
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial={reduceMotion ? undefined : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3">
                  <span className="eyebrow-light">Founded {company.founded}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-micro font-mono uppercase tracking-micro text-white/70">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-soft)]" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                    </span>
                    Active build
                  </span>
                </motion.div>
                <motion.h1
                  className="text-h1 font-display text-white"
                  initial={reduceMotion ? undefined : 'hidden'}
                  animate={reduceMotion ? undefined : 'visible'}
                >
                  {titleWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      className="inline-block pr-[0.15em]"
                      variants={wordVariants}
                      custom={index}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.div
                  variants={fadeUp}
                  className="h-[2px] w-32 rounded-full bg-gradient-to-r from-white/70 via-white/30 to-transparent"
                  animate={reduceMotion ? undefined : { scaleX: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </Reveal>
            <Reveal delay={0.1}>
              <motion.p
                className="max-w-xl text-body text-white/90"
                variants={fadeUp}
                initial={reduceMotion ? undefined : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
              >
                Više od 30 godina vodimo projekte sa jasnim obimom, kontrolom kvaliteta i disciplinom izvođenja. Fokus je
                na predvidivoj realizaciji i trajnoj vrednosti.
              </motion.p>
            </Reveal>
            <Reveal delay={0.15}>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial={reduceMotion ? undefined : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
              >
                {focusPills.map((pill) => (
                  <motion.span
                    key={pill}
                    variants={fadeUp}
                    className="rounded-full border border-white/15 bg-white/6 px-4 py-2 text-micro font-mono uppercase tracking-micro text-white/70"
                  >
                    {pill}
                  </motion.span>
                ))}
              </motion.div>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-wrap items-center gap-6">
              <motion.div
                className="flex flex-wrap items-center gap-6"
                variants={containerVariants}
                initial={reduceMotion ? undefined : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
              >
                <motion.div variants={fadeUp} whileHover={reduceMotion ? undefined : { y: -2 }}>
                  <Button href="/projects">Pogledajte projekte</Button>
                </motion.div>
                <motion.div variants={fadeUp} whileHover={reduceMotion ? undefined : { y: -2 }}>
                  <Button href="/contact" variant="ghost">
                    Kontaktirajte tim
                  </Button>
                </motion.div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.3}>
              <motion.div
                className="relative grid gap-6 pt-6 text-small text-white/85 md:grid-cols-3"
                variants={containerVariants}
                initial={reduceMotion ? undefined : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
              >
                <div className="divider-glow-light absolute left-0 right-0 top-0" aria-hidden="true" />
                <motion.div variants={fadeUp}>
                  <p className="eyebrow-light">Sedište</p>
                  <p>{company.location}</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <p className="eyebrow-light">Model rada</p>
                  <p>Turnkey i završni radovi</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <p className="eyebrow-light">Fokus</p>
                  <p>Retail i hospitality objekti</p>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <motion.div
              className="space-y-6"
              style={{ y: panelShift }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              <motion.div
                className="lux-border lux-sheen relative overflow-hidden rounded-[28px] bg-white/8 p-6 text-white shadow-[0_40px_90px_rgba(11,28,45,0.35)] backdrop-blur"
                whileHover={reduceMotion ? undefined : { y: -6, boxShadow: '0 48px 120px rgba(11,28,45,0.5)' }}
                transition={reduceMotion ? undefined : { duration: 0.4, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]"
                  style={{ y: glowShift }}
                />
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_55%)]"
                  style={{ y: cardDrift }}
                />
                <motion.div
                  className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/10"
                  style={{ y: cardDrift }}
                />
                <motion.div
                  className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-[rgba(155,14,28,0.26)]"
                  style={{ y: orbDrift }}
                />
                <motion.div
                  className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full border border-white/10"
                  animate={reduceMotion ? undefined : { rotate: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
                  transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.svg
                  className="pointer-events-none absolute left-6 top-6 h-16 w-24 text-white/40"
                  viewBox="0 0 120 80"
                  fill="none"
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 1 }}
                >
                  <motion.path
                    d="M6 74L6 10L92 10L92 44L114 44"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? undefined : { pathLength: 0 }}
                    animate={reduceMotion ? undefined : { pathLength: 1 }}
                    transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
                  />
                </motion.svg>
                <div className="relative z-10 space-y-6">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/6 p-5"
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={reduceMotion ? undefined : { duration: 0.35, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 hero-sheen opacity-30" />
                    <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/70">
                      <span>Istaknuti projekti</span>
                      <span>Izbor</span>
                    </div>
                    <div className="mt-4 space-y-4">
                      {featuredProjects.map((project, index) => (
                        <motion.div
                          key={project.name}
                          className="lux-border lux-sheen flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4"
                          initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={reduceMotion ? undefined : { duration: 0.5, delay: 0.1 + index * 0.07 }}
                        >
                          <div>
                            <p className="text-small font-display text-white">{project.name}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-micro font-mono uppercase tracking-micro text-white/60">
                              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{project.type}</span>
                              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{project.status}</span>
                            </div>
                          </div>
                          <span className="text-micro font-mono uppercase tracking-micro text-white/50">
                            0{index + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="lux-border lux-sheen relative mt-5 h-32 w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/25 via-white/10 to-transparent">
                      <motion.div
                        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent)]"
                        style={{ x: sheenShift }}
                      />
                      <div className="relative h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_55%)]" />
                    </div>
                  </motion.div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="lux-border lux-sheen relative overflow-hidden rounded-2xl bg-[linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-4 backdrop-blur"
                        initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                duration: 0.6,
                                delay: 0.2 + index * 0.08,
                                ease: [0.22, 0.7, 0.1, 1],
                              }
                        }
                        whileHover={reduceMotion ? undefined : { y: -4 }}
                      >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
                        <p className="text-h3 font-display text-white">
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="mt-2 text-micro font-mono uppercase tracking-micro text-white/70">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="lux-border lux-sheen rounded-2xl bg-white/7 p-5 text-white/85 backdrop-blur"
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { duration: 0.6, delay: 0.25 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-micro font-mono uppercase tracking-micro text-white/70">Kontrolne tačke</p>
                  <span className="text-micro font-mono uppercase tracking-micro text-white/70">24/7</span>
                </div>
                <p className="mt-2 text-small text-white/80">
                  Dnevno praćenje kvaliteta, dinamike i bezbednosti kroz definisane protokole.
                </p>
              </motion.div>
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
