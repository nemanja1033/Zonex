"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import Reveal from '@/components/motion/Reveal'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import Button from '@/components/ui/Button'
import { easing } from '@/lib/motion'

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
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-120px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: isLite ? 0.06 : 0.12 } },
          }}
        >
          {featured.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={
                shouldReduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: isLite ? 8 : 14 },
                      visible: { opacity: 1, y: 0, transition: { delay: index * (isLite ? 0.05 : 0.08), ease: easing } },
                    }
              }
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
