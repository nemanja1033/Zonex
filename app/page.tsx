import Hero from '@/components/hero/Hero'
import ProofStrip from '@/components/sections/ProofStrip'
import ServicesScroll from '@/components/sections/ServicesScroll'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      {/*
        Removed/Merged: duplicate control/standards blocks,
        simplified to core credibility, services, projects, process, and CTA.
      */}
      <Hero />
      <ProofStrip />
      <ServicesScroll />
      <ProjectsShowcase />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
