"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import MagneticButton from '@/components/ui/MagneticButton'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion()
  const featured = projects.slice(0, 3)

  return (
    <section className="relative py-24 lg:py-32 bg-[#27272A] overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#DC2626]/3 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#DC2626] font-medium">
                Projekti
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Projekti sa preciznim
              <span className="block text-white/60">rokovima i jasnim obimom.</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
            className="text-base text-white/50 max-w-md"
          >
            Selekcija projekata u kojima su brzina izvođenja, kontrola kvaliteta i standardi investitora bili ključni.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING.power4 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {featured.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={staggerItem}
            >
              <ProjectCard
                title={project.name}
                location={project.location}
                description={project.summary}
                duration={project.timeline}
                model={project.delivery}
                image={project.image}
                tags={project.focus}
                href={`/projects/${project.slug}`}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASING.power4 }}
          className="mt-12 flex items-center justify-start"
        >
          <MagneticButton href="/projects" variant="secondary">
            Svi projekti
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  )
}
