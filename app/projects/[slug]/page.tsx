import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import CaseHero from '@/components/projects/case/CaseHero'
import ProjectCard from '@/components/projects/ProjectCard'
import Reveal from '@/components/motion/Reveal'
import { projects } from '../../../data/projects'

type PageProps = {
  params: { slug: string }
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug)
  if (!project) return notFound()
  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMEIwRDEyIi8+PC9zdmc+'

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3)
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const prev = projects[currentIndex - 1] ?? projects[projects.length - 1]
  const next = projects[currentIndex + 1] ?? projects[0]

  return (
    <>
      <CaseHero project={project} />
      <section className="section-divider section section-surface">
        <Container className="space-y-12">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="card-surface rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">Pregled</p>
                <h2 className="mt-3 text-h3 font-display text-white">Osnovne informacije</h2>
                <div className="mt-6 grid gap-4 text-small text-white/80 md:grid-cols-2">
                  <div>
                    <p className="text-micro font-mono uppercase tracking-micro text-white/60">Lokacija</p>
                    <p className="mt-2">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-micro font-mono uppercase tracking-micro text-white/60">Otvaranje</p>
                    <p className="mt-2">{project.opened}</p>
                  </div>
                  <div>
                    <p className="text-micro font-mono uppercase tracking-micro text-white/60">Rok</p>
                    <p className="mt-2">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-micro font-mono uppercase tracking-micro text-white/60">Model</p>
                    <p className="mt-2">{project.delivery}</p>
                  </div>
                </div>
              </div>
              <div className="card-surface rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                <p className="text-micro font-mono uppercase tracking-micro text-white/60">Ključne tačke</p>
                <h3 className="mt-3 text-h4 font-display text-white">Fokus realizacije</h3>
                <ul className="mt-4 space-y-2 text-small text-white/80">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          {project.images?.length ? (
            <div className="space-y-6">
              <Reveal>
                <h2 className="text-h3 font-display text-white">Galerija gradnje</h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.images.map((image, index) => (
                  <Reveal key={image.src} delay={index * 0.04} variant="clipReveal">
                    <div className="card-surface relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-h3 font-display text-white">Povezani projekti</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
          </div>
          <div className="card-surface grid gap-6 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-card md:grid-cols-2">
            <div>
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Prethodni</p>
              <Link className="mt-3 block font-display text-h4 text-white" href={`/projects/${prev.slug}`}>
                {prev.name}
              </Link>
              <p className="mt-2 text-small text-white/70">{prev.location}</p>
            </div>
            <div>
              <p className="text-micro font-mono uppercase tracking-micro text-white/60">Sledeći</p>
              <Link className="mt-3 block font-display text-h4 text-white" href={`/projects/${next.slug}`}>
                {next.name}
              </Link>
              <p className="mt-2 text-small text-white/70">{next.location}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
