import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import { site } from '../../data/site'

export const metadata: Metadata = {
  title: 'Projekti',
  description: 'Pogledajte realizovane projekte Zonex Inženjering — McDonald\'s, KFC, Zlatiborski konaci, benzinske stanice i drugi objekti.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projekti"
        title="Naši projekti"
        subtitle={site.projectsIntro}
      />
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
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#DC2626]/3 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <ProjectsGrid />
        </Container>
      </section>
    </>
  )
}
