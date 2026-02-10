import Hero from '@/components/hero/Hero'
import ServicesHorizontal from '@/components/sections/ServicesHorizontal'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesHorizontal />
      <ProjectsShowcase />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
