"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Container from '@/components/ui/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import Button from '@/components/ui/Button'
import SplitText from '@/components/motion/SplitText'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { site } from '../../../data/site'
import {
  fadeUp,
  lineReveal,
  maskReveal,
  textRevealItem,
  textRevealLines,
  transition,
} from '@/lib/motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const heroRef = useRef<HTMLElement | null>(null)

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

  const title = `${site.hero.title}`
  const titleLines = title.split(', ')

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
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              className="space-y-6"
            >
              <motion.p variants={fadeUp} className="eyebrow-light">
                Generalni izvođač
              </motion.p>
              <div className="hero-line-wrap">
                <motion.span
                  variants={lineReveal}
                  className="hero-line block h-px w-20 bg-[var(--accent)]"
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              <h1 className="text-h1 font-display text-white">
                <span className="sr-only">{title}</span>
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
          <motion.div
            variants={maskReveal}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={transition.base}
          >
            <div className="card-surface rounded-lg p-5 sm:p-6 md:p-8">
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Kratak pregled</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="text-small text-white/70">Godina osnivanja</span>
                  <span className="text-small font-semibold text-white">{site.company.founded}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="text-small text-white/70">Model isporuke</span>
                  <span className="text-small font-semibold text-white">Ključ u ruke</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-small text-white/70">Sedište</span>
                  <span className="text-small font-semibold text-white">{site.company.location}</span>
                </div>
              </div>
              <div className="mt-8">
                <Button href="/company" variant="ghost">
                  Upoznajte tim
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      <div className="hero-blueprint" aria-hidden="true">
        <div className="hero-blueprint-line hero-blueprint-line--a">
          <motion.span
            variants={lineReveal}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={transition.fast}
            className="block h-px w-40 bg-white/20"
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="hero-blueprint-line hero-blueprint-line--b">
          <motion.span
            variants={lineReveal}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={transition.fast}
            className="block h-px w-56 bg-white/15"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <motion.span
          variants={lineReveal}
          initial={reduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          transition={transition.base}
          className="block h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.4),transparent)]"
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}
