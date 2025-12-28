import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projekti / Reference"
        subtitle="Selekcija projekata kroz različite tipove objekata, sa jasnim statusom i obimom radova."
      />
      <section className="section-divider bg-grey-100 section">
        <Container>
          <ProjectsGrid />
        </Container>
      </section>
    </>
  )
}
