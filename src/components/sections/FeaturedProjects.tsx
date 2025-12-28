"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/content/content'
import Reveal from '@/components/ui/Reveal'

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section-divider bg-grey-100 section">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div>
              <p className="eyebrow">02 / Featured projects</p>
              <h2 className="mt-3 section-title">Projekti sa jasnim ishodom.</h2>
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
