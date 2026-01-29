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
      <section className="relative py-16 lg:py-24 bg-[#1C1C1E]">
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
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF3B30]/3 rounded-full blur-[150px] pointer-events-none" />

        <Container className="relative z-10">
          <ProjectsGrid />
        </Container>
      </section>
    </>
  )
}
