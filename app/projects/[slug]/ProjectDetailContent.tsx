"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import { EASING, staggerContainer, staggerItem } from '@/lib/animations'
import type { Project } from '../../../data/projects'

type ProjectDetailContentProps = {
  project: Project
  related: Project[]
  prev: Project
  next: Project
}

export default function ProjectDetailContent({ 
  project, 
  related, 
  prev, 
  next 
}: ProjectDetailContentProps) {
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMUMxQzFFIi8+PC9zdmc+'

  return (
    <section className="relative py-16 lg:py-24 bg-[#27272A]">
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
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#DC2626]/3 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASING.power4 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="p-6 lg:p-8 bg-[#303036] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Pregled</p>
            <h2 className="text-2xl font-bold text-white mb-6">Osnovne informacije</h2>
            <div className="grid gap-6 text-sm md:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Lokacija</p>
                <p className="text-white/80">{project.location}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Otvaranje</p>
                <p className="text-white/80">{project.opened}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Rok</p>
                <p className="text-white/80">{project.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Model</p>
                <p className="text-white/80">{project.delivery}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 lg:p-8 bg-[#303036] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Ključne tačke</p>
            <h3 className="text-xl font-bold text-white mb-4">Fokus realizacije</h3>
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#DC2626] flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Gallery */}
        {project.images?.length ? (
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASING.power4 }}
              className="text-2xl lg:text-3xl font-bold text-white"
            >
              Galerija gradnje
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer(0.08, 0.1)}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {project.images.map((image, index) => (
                <motion.div
                  key={image.src}
                  variants={staggerItem}
                  className="group relative aspect-[4/3] overflow-hidden bg-[#303036] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : null}

        {/* Related Projects */}
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
            className="text-2xl lg:text-3xl font-bold text-white"
          >
            Povezani projekti
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <ProjectCard
                key={item.slug}
                title={item.name}
                location={item.location}
                description={item.summary}
                duration={item.timeline}
                model={item.delivery}
                image={item.image}
                tags={item.focus}
                href={`/projects/${item.slug}`}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASING.power4 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <Link 
            href={`/projects/${prev.slug}`}
            className="group p-6 bg-[#303036] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">← Prethodni</p>
            <h3 className="text-lg font-bold text-white group-hover:text-[#DC2626] transition-colors duration-300">
              {prev.name}
            </h3>
            <p className="mt-1 text-sm text-white/60">{prev.location}</p>
          </Link>
          <Link 
            href={`/projects/${next.slug}`}
            className="group p-6 bg-[#303036] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 text-right"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Sledeći →</p>
            <h3 className="text-lg font-bold text-white group-hover:text-[#DC2626] transition-colors duration-300">
              {next.name}
            </h3>
            <p className="mt-1 text-sm text-white/60">{next.location}</p>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
