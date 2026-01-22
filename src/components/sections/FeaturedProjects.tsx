"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import Button from '@/components/ui/Button'
import { lineReveal, maskReveal, staggerChildren, transition, viewport } from '@/lib/motion'

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const isLite = isCoarse && !reduceMotion
  const featured = projects.slice(0, 3)

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <p className="eyebrow">Projekti</p>
              <h2 className="mt-4 section-title">Projekti sa preciznim rokovima i jasnim obimom.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Selekcija projekata u kojima su brzina izvođenja, kontrola kvaliteta i standardi investitora bili ključni.
            </p>
          </Reveal>
        </div>
          <motion.span
            className="mt-6 block h-px w-20 bg-white/15"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={transition.base}
            style={{ transformOrigin: 'left' }}
          />
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={viewport}
          variants={staggerChildren(isLite ? 0.06 : 0.12)}
        >
          {featured.map((project) => (
            <motion.div
              key={project.slug}
              variants={shouldReduce ? undefined : maskReveal}
              transition={shouldReduce ? { duration: 0 } : transition.base}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <Reveal delay={0.15} className="mt-10 flex items-center justify-start">
          <Button href="/projects" variant="ghost">
            Svi projekti
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
