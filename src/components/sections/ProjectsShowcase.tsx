"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'

export default function ProjectsShowcase() {
  const reduceMotion = useReducedMotion()
  const featured = projects.slice(0, 4)

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27272A] via-[#252528] to-[#27272A]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Glow accents */}
      <motion.div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 60%)' }}
        animate={reduceMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASING.power4 }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASING.power4 }}
                className="inline-flex items-center gap-3"
              >
                <motion.span
                  className="flex h-3 w-3 items-center justify-center"
                  animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="absolute h-3 w-3 rounded-full bg-[#DC2626]/30 animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-[#DC2626]" />
                </motion.span>
                <span className="text-xs uppercase tracking-[0.25em] text-[#DC2626] font-medium">
                  Projekti
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASING.power4 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1]"
              >
                Projekti koji potvrdjuju
                <span className="block text-white/40 mt-2">tempo, standard i disciplinu.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASING.power4 }}
              className="text-base text-white/45 max-w-md leading-relaxed"
            >
              Selekcija projekata u kojima su kontrola, brzina i preciznost bili jednako vazni kao i konacna isporuka.
            </motion.p>
          </div>

          {/* Animated divider line */}
          <motion.div
            className="mt-12 h-px bg-gradient-to-r from-white/10 via-[#DC2626]/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer(0.15, 0.2)}
          className="grid gap-10 lg:grid-cols-2"
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

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASING.power4 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="/projects"
            className="group relative inline-flex items-center gap-4 px-8 py-4 text-sm text-white/50 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/20 rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover background */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />

            <span className="relative uppercase tracking-[0.2em] font-medium">Svi projekti</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="relative transition-colors duration-300 group-hover:stroke-[#DC2626]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: EASING.power4 }}
            >
              <path d="M5 12h14" strokeLinecap="round" />
              <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  )
}
