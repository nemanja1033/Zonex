"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/content/content'
import Reveal from '@/components/ui/Reveal'
import SectionOrnament from '@/components/ui/SectionOrnament'

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const featured = projects.slice(0, 3)

  return (
    <section ref={sectionRef} className="section-divider section section-surface relative overflow-hidden">
      <SectionOrnament targetRef={sectionRef} variant="left" />
      <div
        className="pointer-events-none absolute left-0 top-6 h-72 w-72 bg-[radial-gradient(circle_at_top,rgba(10,10,12,0.2),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[8%] bottom-0 h-64 w-64 bg-[radial-gradient(circle,rgba(155,14,28,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">03</span>
                <span className="section-rule" />
                <span className="eyebrow">Featured projects</span>
              </div>
              <h2 className="mt-4 section-title">Projekti sa jasnim ishodom.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md body-muted">
              Pregled projekata koji potvrđuju kontinuitet, kvalitet i preciznu realizaciju u različitim tipologijama.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {featured.map((project) => (
            <motion.div key={project.slug} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
