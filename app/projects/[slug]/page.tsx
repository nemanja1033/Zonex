import { notFound } from 'next/navigation'
import CaseHero from '@/components/projects/case/CaseHero'
import ProjectDetailContent from './ProjectDetailContent'
import { projects } from '../../../data/projects'

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

  return (
    <>
      <CaseHero project={project} />
      <ProjectDetailContent 
        project={project}
        related={related}
        prev={prev}
        next={next}
      />
    </>
  )
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
