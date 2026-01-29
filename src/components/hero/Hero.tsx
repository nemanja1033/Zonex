"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import Button from '@/components/ui/Button'
import SplitText from '@/components/motion/SplitText'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import useSafeLayoutEffect from '@/components/hooks/useSafeLayoutEffect'
import HeroAccent from '@/components/hero/HeroAccent'
import { useRouteTransition } from '@/components/motion/RouteTransitionContext'
import { site } from '../../../data/site'
import { allowGsap, allowR3f } from '@/lib/motionLevel'
import {
  fadeUp,
  maskReveal,
  staggerChildren,
  textRevealItem,
  textRevealLines,
  transition,
} from '@/lib/motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const isTransitioning = useRouteTransition()
  const heroRef = useRef<HTMLElement | null>(null)
  const gsapRef = useRef<any>(null)
  const gsapTargetsRef = useRef<HTMLElement[]>([])
  const [isDesktop, setIsDesktop] = useState(false)
  const enableGsap = allowGsap() && isDesktop && !isCoarse && !reduceMotion && !isTransitioning
  const showWebgl = allowR3f() && isDesktop && !isCoarse && !reduceMotion && !isTransitioning
  const particles = useMemo(
    () => [
      { left: '12%', top: '18%', size: 2, duration: 4.2, delay: 0.2, opacity: 0.5 },
      { left: '22%', top: '70%', size: 2, duration: 5.1, delay: 0.6, opacity: 0.4 },
      { left: '38%', top: '32%', size: 1.5, duration: 3.8, delay: 0.1, opacity: 0.5 },
      { left: '52%', top: '22%', size: 2.5, duration: 4.8, delay: 0.4, opacity: 0.45 },
      { left: '64%', top: '60%', size: 1.8, duration: 4.4, delay: 0.3, opacity: 0.5 },
      { left: '78%', top: '28%', size: 2.2, duration: 5.4, delay: 0.8, opacity: 0.35 },
      { left: '86%', top: '72%', size: 1.6, duration: 4.9, delay: 0.5, opacity: 0.4 },
      { left: '70%', top: '12%', size: 1.4, duration: 3.6, delay: 0.2, opacity: 0.45 },
      { left: '30%', top: '8%', size: 1.7, duration: 4.6, delay: 0.7, opacity: 0.35 },
      { left: '10%', top: '50%', size: 1.5, duration: 5.0, delay: 0.9, opacity: 0.3 },
      { left: '44%', top: '78%', size: 2.1, duration: 4.1, delay: 0.1, opacity: 0.45 },
      { left: '90%', top: '42%', size: 1.9, duration: 4.7, delay: 0.3, opacity: 0.4 },
    ],
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion || isCoarse) return
    const node = heroRef.current
    if (!node) return

    let frame = 0
    const handleMove = (event: MouseEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        node.style.setProperty('--hero-x', `${(x * 16).toFixed(2)}px`)
        node.style.setProperty('--hero-y', `${(y * 12).toFixed(2)}px`)
        frame = 0
      })
    }

    const handleLeave = () => {
      node.style.setProperty('--hero-x', '0px')
      node.style.setProperty('--hero-y', '0px')
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [isCoarse, reduceMotion])

  useSafeLayoutEffect(() => {
    if (!enableGsap) return
    let ctx: { revert: () => void } | undefined

    const run = async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap ?? gsapModule.default
      gsapRef.current = gsap

      if (!heroRef.current) return

      ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
        const headlineMasks = gsap.utils.toArray<HTMLElement>('[data-hero-mask]')
        const rows = gsap.utils.toArray<HTMLElement>('[data-hero-row]')
        const dividers = gsap.utils.toArray<HTMLElement>('[data-hero-divider]')
        gsapTargetsRef.current = [...lines, ...headlineMasks, ...rows, ...dividers]

        gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(headlineMasks, { clipPath: 'inset(0 0 100% 0)' })
        gsap.set(rows, { autoAlpha: 0, y: 12 })
        gsap.set(dividers, { scaleX: 0, transformOrigin: 'left center' })

        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
        timeline.to(lines, { scaleX: 1, duration: 0.6, stagger: 0.08 }, 0.1)
        timeline.to(headlineMasks, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, stagger: 0.08 }, 0.15)
        timeline.to(dividers, { scaleX: 1, duration: 0.35, stagger: 0.08 }, 0.3)
        timeline.to(rows, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08 }, 0.32)
      }, heroRef)
    }

    run()

    return () => {
      ctx?.revert()
      if (gsapRef.current && gsapTargetsRef.current.length > 0) {
        gsapRef.current.killTweensOf(gsapTargetsRef.current)
      }
      const scrollTrigger = gsapRef.current?.ScrollTrigger
      if (scrollTrigger?.getAll) {
        scrollTrigger.getAll().forEach((trigger: { kill: () => void }) => trigger.kill())
      }
      gsapTargetsRef.current = []
    }
  }, [enableGsap])

  const title = `${site.hero.title}`
  const titleLines = title.split(', ')
  return (
    <section
      ref={heroRef}
      className="hero-section relative overflow-hidden bg-gradient-to-b from-white via-[var(--bg-secondary)] to-white text-[var(--text-primary)]"
    >
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Floating red particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {particles.map((particle, index) => (
          <motion.span
            key={`hero-particle-${index}`}
            className="absolute rounded-full bg-[var(--brand-red)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity * 0.3,
            }}
            animate={
              reduceMotion
                ? { opacity: particle.opacity * 0.3 }
                : { y: [0, -30, 0], x: [0, 15, 0], opacity: [0, particle.opacity * 0.3, 0] }
            }
            transition={{
              duration: particle.duration * 1.5,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Soft gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at 20% 10%, rgba(194, 59, 59, 0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <motion.div
              variants={staggerChildren(0.08, 0.06)}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              className="space-y-6"
            >
              <motion.p
                variants={fadeUp}
                className="inline-flex w-fit items-center gap-3 rounded-full border-2 border-[var(--brand-red)] bg-[var(--brand-red-bg)] px-4 py-2 text-micro font-mono uppercase tracking-micro text-[var(--brand-red)] backdrop-blur"
              >
                Generalni izvođač
              </motion.p>
              <div className="hero-line-wrap">
                <span className="hero-line block h-px w-20 bg-[var(--brand-red)]" data-hero-line />
              </div>
              <h1 className="text-h1 font-display text-[var(--text-primary)]">
                <span className="sr-only">{title}</span>
                {enableGsap ? (
                  <span aria-hidden="true" className="block">
                    {titleLines.map((line, index) => (
                      <span key={`${line}-${index}`} className="block overflow-hidden" data-hero-mask>
                        <SplitText
                          text={`${line}${index < titleLines.length - 1 ? ',' : ''}`}
                          type="words"
                          className={`block ${
                            index === titleLines.length - 1
                              ? 'bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--brand-red)] bg-clip-text text-transparent'
                              : ''
                          }`}
                          itemClassName="inline-block"
                          srOnly={false}
                        />
                      </span>
                    ))}
                  </span>
                ) : (
                  <motion.span aria-hidden="true" variants={textRevealLines} className="block">
                    {titleLines.map((line, index) => (
                      <motion.span key={`${line}-${index}`} variants={textRevealItem} className="block overflow-hidden">
                        <SplitText
                          text={`${line}${index < titleLines.length - 1 ? ',' : ''}`}
                          type="words"
                          className={`block ${
                            index === titleLines.length - 1
                              ? 'bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--brand-red)] bg-clip-text text-transparent'
                              : ''
                          }`}
                          itemClassName="inline-block"
                          srOnly={false}
                        />
                      </motion.span>
                    ))}
                  </motion.span>
                )}
              </h1>
              <motion.p variants={fadeUp} className="text-body text-[var(--text-secondary)] text-measure">
                {site.hero.subtitle}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <MagneticButton href="/projects" variant="primary" className="w-full justify-center sm:w-auto">
                  Naši projekti
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary" className="w-full justify-center sm:w-auto">
                  Kontaktirajte tim
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute right-0 top-0 hidden h-48 w-48 overflow-hidden lg:block">
              {showWebgl ? (
                <HeroAccent />
              ) : (
                <div className="h-full w-full rounded-full border border-[var(--border-light)] bg-[radial-gradient(circle_at_center,rgba(194,59,59,0.08),transparent_65%)]" />
              )}
            </div>
            <motion.div
              variants={maskReveal}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              transition={transition.base}
            >
              <div className="bg-white rounded-xl border border-[var(--border-light)] p-5 sm:p-6 md:p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
                <p className="text-micro font-mono uppercase tracking-micro text-[var(--text-tertiary)]">Brzi brief</p>
                <p className="mt-3 text-small text-[var(--text-secondary)]">
                  Pošaljite kratak opis projekta — dobijate predlog plana, okvirni rok i budžet.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Odgovor', value: '24–48h' },
                    { label: 'Format', value: 'Plan + rok + budžet' },
                  ].map((item) => (
                    <div key={item.label} className="relative pb-4" data-hero-row>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-small text-[var(--text-secondary)]">{item.label}</span>
                        <span className="text-small font-semibold text-[var(--text-primary)]">{item.value}</span>
                      </div>
                      <span
                        className="absolute bottom-0 left-0 h-px w-full bg-[var(--border-light)]"
                        data-hero-divider
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <MagneticButton href="/contact" variant="primary">
                    Pošaljite brief
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
      <div className="hero-blueprint" aria-hidden="true">
        <div className="hero-blueprint-line hero-blueprint-line--a">
          <span className="block h-px w-40 bg-[var(--border-medium)]" data-hero-line />
        </div>
        <div className="hero-blueprint-line hero-blueprint-line--b">
          <span className="block h-px w-56 bg-[var(--border-light)]" data-hero-line />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <span
          className="block h-px w-full bg-[linear-gradient(90deg,var(--border-medium),transparent)]"
          data-hero-line
        />
      </div>

      {/* Smooth scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-micro font-mono uppercase tracking-micro text-[var(--text-tertiary)]">Scroll</span>
        <motion.div
          className="h-6 w-[1px] bg-[var(--brand-red)] origin-top"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
