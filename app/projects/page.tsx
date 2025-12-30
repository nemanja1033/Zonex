import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import { site } from '../../data/site'

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projekti"
        title="Naši projekti"
        subtitle={site.projectsIntro}
      />
      <section className="section-divider section section-surface">
        <Container>
          <ProjectsGrid />
        </Container>
      </section>
    </>
  )
}
