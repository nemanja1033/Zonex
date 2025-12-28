import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import { projects } from '@/content/content'
import CaseHero from '@/components/projects/case/CaseHero'
import MetaGrid from '@/components/projects/case/MetaGrid'
import Gallery from '@/components/projects/case/Gallery'
import ChapterNav from '@/components/projects/case/ChapterNav'
import ProjectCard from '@/components/projects/ProjectCard'
import Link from 'next/link'

type PageProps = {
  params: { slug: string }
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug)
  if (!project) return notFound()

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3)
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const prev = projects[currentIndex - 1] ?? projects[projects.length - 1]
  const next = projects[currentIndex + 1] ?? projects[0]
  const chapters = [
    { id: 'overview', label: 'Overview' },
    { id: 'scope', label: 'Scope' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'result', label: 'Result' },
  ]

  return (
    <>
      <CaseHero project={project} />
      <section className="section-divider section section-surface">
        <Container className="grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
          <div className="space-y-12">
            <div id="overview" className="space-y-6">
              <p className="eyebrow">Overview</p>
              <MetaGrid project={project} />
            </div>
            <div id="scope" className="space-y-6">
              <h2 className="section-title">Challenge / Our role / Solution</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="surface-elevated p-6">
                  <p className="eyebrow">Challenge</p>
                  <p className="mt-3 body-muted">{project.challenge}</p>
                </div>
                <div className="surface-elevated p-6">
                  <p className="eyebrow">Our role</p>
                  <p className="mt-3 body-muted">{project.role}</p>
                </div>
                <div className="surface-elevated p-6">
                  <p className="eyebrow">Solution</p>
                  <p className="mt-3 body-muted">{project.solution}</p>
                </div>
              </div>
            </div>
            <div id="gallery">
              <Gallery title="Izvođenje i detalji" />
            </div>
            <div id="result" className="space-y-6">
              <h2 className="section-title">Result</h2>
              <p className="body-muted">{project.result}</p>
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-h3">Related projects</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <ProjectCard key={item.slug} project={item} />
                ))}
              </div>
            </div>
            <div className="surface-elevated grid gap-6 p-6 md:grid-cols-2">
              <div>
                <p className="eyebrow">Previous</p>
                <Link className="mt-3 block font-display text-h4" href={`/projects/${prev.slug}`}>
                  {prev.name}
                </Link>
                <p className="mt-2 body-muted">{prev.location}</p>
              </div>
              <div>
                <p className="eyebrow">Next</p>
                <Link className="mt-3 block font-display text-h4" href={`/projects/${next.slug}`}>
                  {next.name}
                </Link>
                <p className="mt-2 body-muted">{next.location}</p>
              </div>
            </div>
          </div>
          <ChapterNav chapters={chapters} />
        </Container>
      </section>
    </>
  )
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
