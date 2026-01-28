"use client"

import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { projects } from '../../../data/projects'

export default function ProjectsShowcase() {
  const featured = projects.slice(0, 4)

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <SectionHeader eyebrow="Projekti" title="Projekti koji potvrđuju tempo, standard i disciplinu." />
          <Reveal delay={0.08}>
            <p className="body-muted text-measure">
              Selekcija projekata u kojima su kontrola, brzina i preciznost bili jednako važni kao i konačna isporuka.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06} variant="maskReveal">
              <article className="group card-surface card-hover overflow-hidden rounded-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={false}
                    />
                  ) : (
                    <>
                      <Image
                        src="/images/project-placeholder.svg"
                        alt={`${project.name} placeholder`}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-contain bg-[rgba(15,16,18,0.65)] p-10 transition-transform duration-500 group-hover:scale-[1.02]"
                        priority={false}
                      />
                      <div className="project-skeleton-overlay" aria-hidden="true" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-transparent to-transparent" />
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-micro font-mono uppercase tracking-micro text-white/60">{project.location}</p>
                    <h3 className="mt-2 font-display text-h3 text-white">{project.name}</h3>
                    <p className="mt-2 text-small text-white/70">{project.summary}</p>
                  </div>
                  <div className="grid gap-2 text-small text-white/70 sm:grid-cols-2">
                    <span>Rok: {project.timeline}</span>
                    <span>Model: {project.delivery}</span>
                  </div>
                  <span className="project-cta text-micro font-mono uppercase tracking-micro text-white/60">
                    Pogledaj detalje
                  </span>
                </div>
                <Link href={`/projects/${project.slug}`} prefetch className="absolute inset-0" aria-label={project.name} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
