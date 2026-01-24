"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import Button from '@/components/ui/Button'
import SplitText from '@/components/motion/SplitText'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import HeroAccent from '@/components/hero/HeroAccent'
import { site } from '../../../data/site'
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
  const heroRef = useRef<HTMLElement | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const enableGsap = isDesktop && !isCoarse && !reduceMotion

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

  useEffect(() => {
    if (!enableGsap) return
    let ctx: { revert: () => void } | undefined

    const run = async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap ?? gsapModule.default

      if (!heroRef.current) return

      ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
        const headlineMasks = gsap.utils.toArray<HTMLElement>('[data-hero-mask]')
        const rows = gsap.utils.toArray<HTMLElement>('[data-hero-row]')
        const dividers = gsap.utils.toArray<HTMLElement>('[data-hero-divider]')

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
    }
  }, [enableGsap])

  const title = `${site.hero.title}`
  const titleLines = title.split(', ')
  const showWebgl = enableGsap

  return (
    <section ref={heroRef} className="hero-section relative overflow-hidden bg-navy-900 text-white">
      <div className="hero-noise" aria-hidden="true" />
      <div className="absolute inset-0">
        <Image
          src="/images/projects/kfc-zrenjanin-04.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="hero-gradient" aria-hidden="true" />
      </div>
      <Container className="relative z-10 py-[calc(var(--section-padding)+2rem)] md:py-[calc(var(--section-padding)+3.5rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <motion.div
              variants={staggerChildren(0.08, 0.06)}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              className="space-y-6"
            >
              <motion.p variants={fadeUp} className="eyebrow-light">
                Generalni izvođač
              </motion.p>
              <div className="hero-line-wrap">
                <span className="hero-line block h-px w-20 bg-[var(--accent)]" data-hero-line />
              </div>
              <h1 className="text-h1 font-display text-white">
                <span className="sr-only">{title}</span>
                {enableGsap ? (
                  <span aria-hidden="true" className="block">
                    {titleLines.map((line, index) => (
                      <span key={`${line}-${index}`} className="block overflow-hidden" data-hero-mask>
                        <SplitText
                          text={`${line}${index < titleLines.length - 1 ? ',' : ''}`}
                          type="words"
                          className="block"
                          itemClassName="inline-block"
                          srOnly={false}
                        />
                      </span>
                    ))}
                  </span>
                ) : (
                  <motion.span aria-hidden="true" variants={textRevealLines} className="block">
                    {titleLines.map((line, index) => (
                      <motion.span
                        key={`${line}-${index}`}
                        variants={textRevealItem}
                        className="block overflow-hidden"
                      >
                        <SplitText
                          text={`${line}${index < titleLines.length - 1 ? ',' : ''}`}
                          type="words"
                          className="block"
                          itemClassName="inline-block"
                          srOnly={false}
                        />
                      </motion.span>
                    ))}
                  </motion.span>
                )}
              </h1>
              <motion.p variants={fadeUp} className="text-body text-white/85 text-measure">
                {site.hero.subtitle}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <MagneticButton href="/projects" className="w-full justify-center sm:w-auto">
                  Naši projekti
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
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
                <div className="h-full w-full rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_65%)]" />
              )}
            </div>
            <motion.div
              variants={maskReveal}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              transition={transition.base}
            >
              <div className="card-surface rounded-lg p-5 sm:p-6 md:p-8">
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">Kratak pregled</p>
                <div className="mt-6 space-y-4">
                  {[
                    { label: 'Godina osnivanja', value: site.company.founded },
                    { label: 'Model isporuke', value: 'Ključ u ruke' },
                    { label: 'Sedište', value: site.company.location },
                  ].map((item) => (
                    <div key={item.label} className="relative pb-4" data-hero-row>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-small text-white/70">{item.label}</span>
                        <span className="text-small font-semibold text-white">{item.value}</span>
                      </div>
                      <span className="absolute bottom-0 left-0 h-px w-full bg-white/10" data-hero-divider />
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/company" variant="ghost">
                    Upoznajte tim
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
      <div className="hero-blueprint" aria-hidden="true">
        <div className="hero-blueprint-line hero-blueprint-line--a">
          <span className="block h-px w-40 bg-white/20" data-hero-line />
        </div>
        <div className="hero-blueprint-line hero-blueprint-line--b">
          <span className="block h-px w-56 bg-white/15" data-hero-line />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <span className="block h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.4),transparent)]" data-hero-line />
      </div>
    </section>
  )
}
