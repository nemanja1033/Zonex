"use client"

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { projects } from '../../../data/projects'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProjectsShowcase() {
  const featured = projects.slice(0, 4)

  return (
    <section className="relative py-24 lg:py-32 bg-[#1C1C1E] overflow-hidden">
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF3B30]/3 rounded-full blur-[150px] pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASING.power4 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
                className="inline-flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-[#FF3B30]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#FF3B30] font-medium">
                  Projekti
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
                className="text-4xl lg:text-5xl font-bold text-white"
              >
                Projekti koji potvrđuju
                <span className="block text-white/60">tempo, standard i disciplinu.</span>
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
              className="text-base text-white/50 max-w-md"
            >
              Selekcija projekata u kojima su kontrola, brzina i preciznost bili jednako važni kao i konačna isporuka.
            </motion.p>
          </div>

          {/* Divider line */}
          <motion.div
            className="mt-8 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
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
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASING.power4 }}
          className="mt-16 text-center"
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-300"
          >
            <span className="uppercase tracking-[0.15em]">Svi projekti</span>
            <motion.span
              className="inline-flex"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: EASING.power4 }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="transition-colors duration-300 group-hover:stroke-[#FF3B30]"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
